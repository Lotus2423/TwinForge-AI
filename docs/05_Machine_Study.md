<<<<<<< HEAD
# Machine Study — Three Phase Induction Motor

## Why This Machine First?

1. Present in 90%+ of industrial facilities worldwide
2. Well-documented failure modes
3. Multiple measurable physical parameters
4. Failures have clear early warning signals
5. Cost of failure is high but failure is predictable

## Failure Frequency (Industry Data)

| Failure Mode | Frequency |
|---|---|
| Bearing failures | 51% |
| Stator winding faults | 16% |
| Rotor failures | 10% |
| Other electrical | 12% |
| Other mechanical | 11% |

## Bearing Life Theory (L10)

L10 = (C/P)^3 × (10^6 / 60N) hours

Where:
- C = Basic dynamic load rating
- P = Equivalent dynamic bearing load
- N = Rotational speed (RPM)

Higher temperature → lubricant degrades → bearing life halves for every 15°C rise above rated temperature.

## Sensor Selection Rationale

| Sensor | What it detects |
|---|---|
| Temperature | Overheating, friction increase, cooling failure |
| Vibration (accelerometer) | Imbalance, bearing wear, misalignment, looseness |
| Current (CT clamp) | Overload, rotor bar break, electrical faults |
| RPM (hall effect) | Speed deviation, slip increase, rotor condition |

## Future Machine Expansion

After motor, TwinForge AI will support:
- Centrifugal pumps (cavitation, seal wear, impeller damage)
- Air compressors (valve wear, piston ring wear)
- CNC spindles (tool wear, chatter, bearing damage)
- Conveyor systems (belt wear, roller damage)
=======
# Machine Study

> Digital Identity of the First Machine in TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Machine Study |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |
| Prototype Machine | Three Phase Induction Motor |

---

# Purpose

This document defines how a physical machine is represented inside the TwinForge AI platform.

It describes:

- Machine identity
- Technical specifications
- Sensor mapping
- Operational limits
- Health model
- Digital Twin representation
- AI monitoring parameters

This document serves as the bridge between Mechanical Engineering and Software Architecture.

---

# Machine Overview

Machine Name

Motor-01

Machine Type

Three Phase Induction Motor

Category

Rotating Equipment

Industry

Manufacturing

Prototype Status

Primary Development Machine

---

# Machine Identity

Every machine registered in TwinForge AI has a unique identity.

Example

Machine ID

MTR-001

Machine Name

Motor-01

Factory

Factory-A

Production Line

Assembly Line-1

Location

Zone-A

Manufacturer

ABB

Model Number

M3BP 132SMC

Serial Number

ABB20260001

Installation Date

01 January 2026

---

# Technical Specifications

Power Rating

5 HP

Voltage

415 V

Frequency

50 Hz

Rated Speed

1440 RPM

Rated Current

7.5 A

Efficiency

91 %

Protection Class

IP55

Cooling

TEFC (Totally Enclosed Fan Cooled)

Mounting Type

Foot Mounted

---

# Component Hierarchy

Motor

├── Housing

├── Stator

├── Rotor

├── Shaft

├── Bearings

│ ├── Drive End Bearing

│ └── Non-Drive End Bearing

├── Cooling Fan

└── Terminal Box

---

# Sensor Configuration

## Temperature Sensor

Sensor ID

TMP-001

Location

Bearing Housing

Unit

°C

Sampling Rate

1 second

Purpose

Bearing temperature monitoring

---

## Vibration Sensor

Sensor ID

VIB-001

Location

Drive End Bearing

Unit

mm/s RMS

Sampling Rate

100 ms

Purpose

Mechanical condition monitoring

---

## Current Sensor

Sensor ID

CUR-001

Location

Motor Input

Unit

Ampere

Sampling Rate

1 second

Purpose

Electrical load monitoring

---

## RPM Sensor

Sensor ID

RPM-001

Location

Motor Shaft

Unit

RPM

Sampling Rate

500 ms

Purpose

Speed monitoring

---

# Operational Limits

Temperature

Normal

25°C – 60°C

Warning

60°C – 75°C

Critical

Above 75°C

---

Vibration

Normal

0 – 2 mm/s

Warning

2 – 4 mm/s

Critical

Above 4 mm/s

---

Current

Normal

Below Rated Current

Warning

Rated +10%

Critical

Rated +20%

---

RPM

Normal

1400–1450 RPM

Warning

±5%

Critical

Outside Safe Range

---

# Machine States

Healthy

Green

Warning

Yellow

High Risk

Orange

Critical

Red

Offline

Gray

Maintenance

Blue

---

# Digital Twin Representation

Each machine has one Digital Twin.

The Digital Twin stores:

- Machine Metadata
- Live Sensor Data
- Historical Data
- AI Predictions
- Maintenance History
- Health State
- Alerts
- Active Faults

---

# Machine Lifecycle

Registered

↓

Installed

↓

Commissioned

↓

Running

↓

Monitoring

↓

Maintenance

↓

Back to Service

↓

Retired

---

# Health Score

The overall machine health is calculated using:

- Temperature
- Vibration
- Current
- RPM
- AI Prediction
- Historical Trends

Health Score Range

100–90

Excellent

89–75

Good

74–60

Needs Attention

59–40

High Risk

Below 40

Critical

---

# Alerts

TwinForge AI generates alerts for:

High Temperature

High Vibration

Current Overload

RPM Drop

Sensor Failure

Communication Loss

AI Failure Prediction

Maintenance Due

---

# AI Inputs

Prediction AI receives:

Temperature

Vibration

Current

RPM

Operating Hours

Previous Failures

Maintenance History

Environmental Conditions

---

# AI Outputs

Health Score

Failure Probability

Failure Type

Remaining Useful Life

Confidence Score

Maintenance Recommendation

Risk Level

---

# Dashboard Information

Each machine card displays:

Machine Name

Health Score

Status

Temperature

Vibration

Current

RPM

Last Prediction

Remaining Useful Life

Current Alerts

---

# Database Mapping

Machine Table

↓

Sensor Table

↓

Sensor Readings

↓

Predictions

↓

Alerts

↓

Maintenance Records

---

# API Endpoints

GET /machines

GET /machines/{id}

POST /machines

PUT /machines/{id}

DELETE /machines/{id}

GET /machines/{id}/health

GET /machines/{id}/history

GET /machines/{id}/alerts

---

# Future Expansion

Future versions should support:

Pumps

Compressors

CNC Machines

Gearboxes

Industrial Robots

Conveyor Systems

Fans

Generators

Each machine type should inherit from the same core machine model.

---

# Related Documents

04_Mechanical_Engineering.md

06_Failure_Analysis.md

07_Sensor_Architecture.md

10_Database_Design.md

12_AI_Architecture.md

15_Digital_Twin.md

---

# Summary

Motor-01 is the reference machine for TwinForge AI.

It serves as the first digital asset in the platform and provides the foundation for AI prediction, Digital Twin visualization, database design, and dashboard implementation.

Future machines should extend this model without changing the underlying architecture.

---
>>>>>>> e4fea739018aef91fb91a75cd8174f3e53823c57
