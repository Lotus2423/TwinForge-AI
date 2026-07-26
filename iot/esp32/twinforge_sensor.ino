/**
 * TwinForge AI — ESP32 Sensor Firmware v1.0
 *
 * Hardware:
 *   - ESP32 DevKit v1
 *   - DHT22 (Temperature) → GPIO 4
 *   - MPU-6050 (Vibration/Accel) → SDA: GPIO 21, SCL: GPIO 22
 *   - SCT-013 CT Clamp (Current) → GPIO 34 (ADC)
 *   - Hall Effect Sensor A3144 (RPM) → GPIO 2
 *
 * Sends JSON payload to TwinForge backend every 5 seconds via HTTP POST.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <Wire.h>
#include <MPU6050.h>

// ── Configuration ───────────────────────────────────────────────────────
const char* WIFI_SSID       = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD   = "YOUR_WIFI_PASSWORD";
const char* BACKEND_URL     = "http://192.168.1.100:8000/api/v1/sensors/ingest";
const char* MACHINE_ID      = "motor-01";
const char* DEVICE_ID       = "esp32-bay3-01";
const char* DEVICE_API_KEY  = "your-device-api-key-here";
const char* FIRMWARE_VER    = "1.0.0";

// ── Pin definitions ─────────────────────────────────────────────────────
#define DHT_PIN         4
#define DHT_TYPE        DHT22
#define CURRENT_PIN     34
#define RPM_PIN         2

// ── Constants ───────────────────────────────────────────────────────────
#define SAMPLE_INTERVAL_MS   5000
#define VIB_SAMPLES          512
#define CURRENT_SAMPLES      200
#define RPM_COUNT_WINDOW_MS  1000
#define BURDEN_RESISTOR      33.0f   // Ω — matches SCT-013 output
#define CT_RATIO             100.0f  // SCT-013-000 = 100A : 50mA
#define ADC_MAX              4095.0f
#define ADC_VREF             3.3f

// ── Globals ─────────────────────────────────────────────────────────────
DHT dht(DHT_PIN, DHT_TYPE);
MPU6050 mpu;

volatile uint32_t rpmPulseCount = 0;
uint32_t lastSampleTime = 0;

// ── RPM ISR ─────────────────────────────────────────────────────────────
void IRAM_ATTR rpmISR() {
  rpmPulseCount++;
}

// ── Setup ───────────────────────────────────────────────────────────────
void setup() {
  Serial.begin(115200);
  Serial.println("[TwinForge] Booting...");

  // WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\n[TwinForge] WiFi connected: %s\n", WiFi.localIP().toString().c_str());

  // DHT22
  dht.begin();

  // MPU-6050
  Wire.begin();
  mpu.initialize();
  if (!mpu.testConnection()) {
    Serial.println("[TwinForge] MPU-6050 connection FAILED");
  }

  // RPM interrupt
  pinMode(RPM_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(RPM_PIN), rpmISR, RISING);

  Serial.println("[TwinForge] All sensors initialized. Starting loop.");
}

// ── Read temperature ─────────────────────────────────────────────────────
float readTemperature() {
  float t = dht.readTemperature();
  if (isnan(t)) {
    Serial.println("[TwinForge] DHT22 read error");
    return -1.0f;
  }
  return t;
}

// ── Read vibration (RMS from MPU-6050 Z-axis) ────────────────────────────
float readVibrationRMS() {
  float sumSq = 0;
  for (int i = 0; i < VIB_SAMPLES; i++) {
    int16_t ax, ay, az, gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    float az_g = az / 16384.0f;  // Convert to g (±2g scale)
    sumSq += az_g * az_g;
    delayMicroseconds(100);      // 10kHz sampling
  }
  float rms_g = sqrt(sumSq / VIB_SAMPLES);
  return rms_g * 9.81f * 1000.0f;  // Convert g → mm/s² → approximate mm/s RMS
}

// ── Read current (SCT-013 via ADC) ────────────────────────────────────────
float readCurrentRMS() {
  float sumSq = 0;
  for (int i = 0; i < CURRENT_SAMPLES; i++) {
    float voltage = (analogRead(CURRENT_PIN) / ADC_MAX) * ADC_VREF;
    float centered = voltage - (ADC_VREF / 2.0f);
    float current = (centered / BURDEN_RESISTOR) * CT_RATIO;
    sumSq += current * current;
    delayMicroseconds(100);
  }
  return sqrt(sumSq / CURRENT_SAMPLES);
}

// ── Read RPM (pulse counting) ─────────────────────────────────────────────
int readRPM() {
  rpmPulseCount = 0;
  delay(RPM_COUNT_WINDOW_MS);
  uint32_t pulses = rpmPulseCount;
  return pulses * 60;   // pulses/sec × 60 = RPM (1 pulse per revolution)
}

// ── Send payload to backend ────────────────────────────────────────────────
bool sendPayload(float temp, float vib, float current, int rpm) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[TwinForge] WiFi disconnected. Reconnecting...");
    WiFi.reconnect();
    return false;
  }

  // Build JSON
  StaticJsonDocument<512> doc;
  doc["machine_id"]        = MACHINE_ID;
  doc["device_id"]         = DEVICE_ID;
  doc["firmware_version"]  = FIRMWARE_VER;
  doc["timestamp"]         = "";  // Server assigns UTC timestamp

  JsonObject sensors = doc.createNestedObject("sensors");
  sensors["temperature_c"]  = round(temp * 10) / 10.0;
  sensors["vibration_mms"]  = round(vib * 100) / 100.0;
  sensors["current_a"]      = round(current * 10) / 10.0;
  sensors["rpm"]            = rpm;

  JsonObject quality = doc.createNestedObject("signal_quality");
  quality["wifi_rssi"] = WiFi.RSSI();

  String payload;
  serializeJson(doc, payload);

  // POST to backend
  HTTPClient http;
  http.begin(BACKEND_URL);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-Device-Key", DEVICE_API_KEY);

  int code = http.POST(payload);
  bool ok = (code == 200 || code == 201);

  if (ok) {
    Serial.printf("[TwinForge] Sent OK | T=%.1f°C V=%.2fmm/s I=%.1fA RPM=%d\n",
                  temp, vib, current, rpm);
  } else {
    Serial.printf("[TwinForge] Send FAILED HTTP %d\n", code);
  }

  http.end();
  return ok;
}

// ── Main loop ─────────────────────────────────────────────────────────────
void loop() {
  uint32_t now = millis();
  if (now - lastSampleTime < SAMPLE_INTERVAL_MS) return;
  lastSampleTime = now;

  float temperature = readTemperature();
  float vibration   = readVibrationRMS();
  float current     = readCurrentRMS();
  int   rpm         = readRPM();

  if (temperature < 0) return;  // Sensor error — skip this cycle

  sendPayload(temperature, vibration, current, rpm);
}
