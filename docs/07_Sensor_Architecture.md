# Sensor Architecture

> Hardware Data Acquisition Architecture for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Sensor Architecture |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the sensor architecture used in TwinForge AI.

It explains:

- Sensor selection
- Sensor placement
- ESP32 integration
- Data acquisition
- Communication protocol
- Sampling strategy
- Calibration
- Data validation
- Future expansion

This document acts as the bridge between the physical machine and the digital platform.

---

# Overview

TwinForge AI continuously collects machine health data using industrial sensors connected to an ESP32 Edge Device.

The objective is to provide accurate, reliable, and real-time data for AI analysis and Digital Twin synchronization.

---

# Sensor Architecture

```
Industrial Machine

        │

        ▼

+----------------------+
| Temperature Sensor   |
+----------------------+

+----------------------+
| Vibration Sensor     |
+----------------------+

+----------------------+
| Current Sensor       |
+----------------------+

+----------------------+
| RPM Sensor           |
+----------------------+

        │

        ▼

+----------------------+
| ESP32 Edge Device    |
+----------------------+

        │

 MQTT / HTTP

        │

        ▼

FastAPI Backend

        │

        ▼

Database

        │

        ▼

Prediction AI

        │

        ▼

Dashboard & Digital Twin
```

---

# Current Sensors

## Temperature Sensor

Purpose

Monitor motor body and bearing temperature.

Recommended Sensor

DS18B20 (Prototype)

Industrial PT100/PT1000 (Production)

Measured Unit

°C

Sampling Rate

1 sample/second

Thresholds

Normal

25°C – 60°C

Warning

60°C – 75°C

Critical

Above 75°C

---

## Vibration Sensor

Purpose

Detect mechanical abnormalities.

Prototype Sensor

SW-420

Recommended Production Sensor

ADXL345 / Industrial IEPE Accelerometer

Measured Unit

mm/s RMS

Sampling Rate

10 samples/second (Prototype)

1000 Hz+ (Production)

---

## Current Sensor

Purpose

Measure motor current consumption.

Prototype Sensor

ACS712

Production Sensor

Industrial Current Transformer (CT)

Measured Unit

Ampere (A)

Sampling Rate

1 sample/second

---

## RPM Sensor

Purpose

Measure shaft rotational speed.

Prototype Sensor

Hall Effect Sensor

Production Sensor

Optical Encoder

Measured Unit

RPM

Sampling Rate

2 samples/second

---

# Future Sensors

TwinForge AI is designed to support additional sensors without changing the architecture.

Future Sensors

- Voltage
- Power
- Energy
- Humidity
- Pressure
- Flow Rate
- Oil Quality
- Sound
- Thermal Camera

---

# Sensor Placement

Temperature

Bearing Housing

↓

Vibration

Drive-End Bearing

↓

Current

Power Supply Line

↓

RPM

Motor Shaft

---

# Sensor Data Model

Each sensor transmits:

Sensor ID

Machine ID

Timestamp

Sensor Type

Measured Value

Unit

Status

Quality Score

Example

```json
{
  "machine_id": "MTR-001",
  "sensor_id": "TMP-001",
  "timestamp": "2026-08-12T14:05:00Z",
  "type": "temperature",
  "value": 58.4,
  "unit": "°C",
  "status": "healthy",
  "quality": 0.99
}
```

---

# ESP32 Responsibilities

The ESP32 performs:

- Read sensor values
- Validate measurements
- Timestamp readings
- Package data
- Transmit to backend
- Retry failed transmissions
- Buffer data during network failures
- Monitor device health

---

# Communication Protocol

Prototype

HTTP REST API

Production

MQTT

Future

MQTT over TLS

---

# MQTT Topic Structure

```
twinforge/

├── machines/

│   ├── MTR-001/

│   │

│   ├── temperature

│   ├── vibration

│   ├── current

│   ├── rpm

│   ├── alerts

│   ├── health

│   └── heartbeat
```

---

# Data Validation

Every reading is checked before entering the database.

Validation Rules

Temperature

Must be between

-20°C and 150°C

Vibration

Must be positive

Current

Cannot be negative

RPM

Must be within machine limits

Invalid readings are rejected and logged.

---

# Sensor Health Monitoring

TwinForge AI continuously checks sensor health.

Sensor States

Healthy

Warning

Offline

Calibration Required

Fault Detected

---

# Sampling Strategy

| Sensor | Rate |
|---------|------|
| Temperature | 1 Hz |
| Current | 1 Hz |
| RPM | 2 Hz |
| Vibration | 10 Hz (Prototype) |

Sampling rates should be configurable.

---

# Data Pipeline

```
Sensor

↓

ESP32

↓

Validation

↓

MQTT

↓

Backend API

↓

Database

↓

Prediction AI

↓

Factory Assistant

↓

Dashboard

↓

Digital Twin
```

---

# Calibration

Each sensor requires:

- Initial calibration
- Periodic recalibration
- Calibration certificate (Production)
- Offset correction
- Drift monitoring

Calibration history should be stored in the database.

---

# Fault Handling

If a sensor fails:

- Mark sensor as Offline
- Generate alert
- Continue using remaining sensors
- Notify maintenance team

The system should degrade gracefully instead of stopping completely.

---

# Security

Prototype

Local Wi-Fi

Production

TLS Encryption

Device Authentication

API Keys / Certificates

Secure Firmware Updates

---

# Future Expansion

Future versions should support:

- Plug-and-play sensors
- Auto-discovery
- Edge AI preprocessing
- Multi-device synchronization
- OTA firmware updates
- Industrial protocols (Modbus, OPC UA)

---

# Related Documents

- 04_Mechanical_Engineering.md
- 05_Machine_Study.md
- 06_Failure_Analysis.md
- 08_Backend_Architecture.md
- 12_AI_Architecture.md

---

# Summary

The Sensor Architecture is the foundation of TwinForge AI.

Accurate, validated, and reliable sensor data enables trustworthy AI predictions, realistic Digital Twin synchronization, and effective predictive maintenance.

The architecture is designed to scale from a single prototype motor to thousands of industrial machines without fundamental redesign.

---