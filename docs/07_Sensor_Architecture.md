# Sensor Architecture

## Current Sensor Suite (MVP)

| Sensor | Type | Interface | Sampling Rate | Unit |
|---|---|---|---|---|
| Temperature | NTC Thermistor / DHT22 | GPIO / I2C | 1 Hz | °C |
| Vibration | MPU-6050 (3-axis accelerometer) | I2C | 100 Hz | mm/s RMS |
| Current | SCT-013 CT Clamp | ADC | 50 Hz | Amperes |
| RPM | Hall Effect Sensor (A3144) | GPIO Interrupt | Event-driven | RPM |

## ESP32 Wiring Map

```
ESP32 GPIO Map:
  GPIO 21 (SDA) → MPU-6050 SDA, DHT22 (if I2C variant)
  GPIO 22 (SCL) → MPU-6050 SCL
  GPIO 4        → DHT22 Data
  GPIO 34 (ADC) → SCT-013 output (via burden resistor)
  GPIO 35 (ADC) → Phase B current
  GPIO 32 (ADC) → Phase C current
  GPIO 2        → Hall effect sensor input
  3.3V          → Sensor VCC
  GND           → Common ground
```

## Sensor Data Format (JSON Payload)

```json
{
  "machine_id": "motor-01",
  "device_id": "esp32-bay3-01",
  "timestamp": "2026-07-21T14:32:07.123Z",
  "firmware_version": "1.0.0",
  "sensors": {
    "temperature_c": 78.4,
    "vibration_mms": 7.42,
    "current_a": 38.2,
    "rpm": 1482,
    "current_phase_b_a": 37.9,
    "current_phase_c_a": 38.5
  },
  "signal_quality": {
    "wifi_rssi": -62,
    "sensor_errors": []
  }
}
```

## Sampling Strategy

- Temperature: Every 5 seconds (slow-changing)
- Vibration: RMS calculated over 512 samples at 100Hz = every 5.12 seconds
- Current: RMS over one full cycle (20ms at 50Hz)
- RPM: Counted over 1-second window (pulse counting)

## Future Sensors

| Sensor | Purpose | Timeline |
|---|---|---|
| Thermal camera (FLIR Lepton) | Hotspot detection | Phase 2 |
| Sound / microphone (MEMS) | Acoustic emission | Phase 2 |
| Voltage (ZMPT101B) | Power quality | Phase 2 |
| Oil quality sensor | Lubrication monitoring | Phase 3 |
| Humidity (SHT31) | Condensation risk | Phase 2 |
