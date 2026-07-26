<<<<<<< HEAD
# Digital Twin Architecture

## Concept

The Digital Twin is a real-time 3D representation of the physical machine. It reflects the machine's health state visually. Color, animations, and highlighted components communicate failure risk at a glance.

## Health State Mapping

| Health Score | Color | Animation | Description |
|---|---|---|---|
| 80–100 | 🟢 Green (#10b981) | Smooth rotation | Healthy |
| 60–79 | 🟡 Yellow (#f59e0b) | Normal rotation | Warning |
| 30–59 | 🟠 Amber (#f97316) | Slight vibration | High Risk |
| 0–29 | 🔴 Red (#ef4444) | Shake animation | Critical |
| Offline | ⚫ Gray (#374151) | Stopped | No data |

## Technology Stack

- **Three.js** — 3D rendering engine
- **React Three Fiber** — React wrapper for Three.js
- **@react-three/drei** — Helpers (OrbitControls, Environment, Text)
- **GSAP** — Smooth animation transitions

## 3D Model Structure

```
MotorScene
├── Environment (HDRI lighting)
├── MotorBody (main cylindrical housing)
│   ├── StatorHousing (outer case)
│   ├── CoolingFins (ribs on housing)
│   ├── TerminalBox (connection box)
│   └── HealthEmissive (color overlay driven by health score)
├── Shaft (protruding shaft + coupling)
├── EndShields (front and rear bearing caps)
│   └── BearingIndicator (highlighted when bearing fault)
├── CoolingFan (rear fan with rotation animation)
│   └── FanFaultIndicator
├── SensorOverlays
│   ├── TemperatureHeatmap
│   └── VibrationParticles
└── InfoPanel (floating health data overlay)
```

## WebSocket Synchronization

```typescript
// Every time backend sends prediction_update event:
onPredictionUpdate(data => {
  twinStore.setHealthScore(data.health_score);
  twinStore.setFailureType(data.failure_type);
  twinStore.setFaultComponents(data.faulty_components);
  // Three.js material colors update automatically via store
});
```

## 3D Model Source

MVP: Parametrically generated motor model using Three.js primitives.  
Phase 2: Import from Blender GLTF export.  
Phase 3: Import from CAD (SolidWorks → GLTF pipeline).
=======
# Digital Twin

> Real-Time Digital Representation of Industrial Machines

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Digital Twin |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the Digital Twin architecture used by TwinForge AI.

The Digital Twin provides a real-time visual representation of an industrial machine by combining:

- Live sensor data
- AI predictions
- Machine metadata
- Maintenance history
- Interactive 3D visualization

It serves as the primary visualization layer for operators, engineers, and factory managers.

---

# Vision

TwinForge AI does not display static machine models.

Instead, every machine has a living digital counterpart that continuously reflects its real-world condition.

The Digital Twin should:

- Display machine health
- Show live sensor values
- Highlight faulty components
- Animate machine operation
- Explain AI predictions
- Visualize maintenance status
- Synchronize in real time

---

# Digital Twin Architecture

```
Physical Machine

↓

Sensors

↓

ESP32

↓

Backend API

↓

Prediction AI

↓

WebSocket Gateway

↓

Digital Twin Engine

↓

React Dashboard

↓

3D Visualization
```

---

# Twin Components

Each Digital Twin consists of:

Machine Metadata

↓

3D Geometry

↓

Sensor Layer

↓

AI Layer

↓

Animation Layer

↓

Visualization Layer

---

# Core Responsibilities

The Digital Twin should:

Represent the physical machine.

Display live operating conditions.

Reflect AI health predictions.

Show maintenance status.

Support historical playback.

Visualize abnormal behavior.

---

# Machine States

Healthy

Green

Machine runs normally.

---

Warning

Yellow

Minor abnormalities detected.

---

High Risk

Orange

Maintenance should be scheduled.

---

Critical

Red

Immediate inspection required.

---

Offline

Gray

No communication with machine.

---

Maintenance

Blue

Machine under maintenance.

---

# Component-Level Visualization

Each component can have its own health status.

Motor

├── Housing

├── Stator

├── Rotor

├── Shaft

├── Bearings

├── Cooling Fan

└── Terminal Box

Example

Bearing

Health: 62%

Color: Orange

Animation: Pulsing

---

# Live Sensor Overlay

Displayed directly on the 3D model.

Temperature

58°C

Vibration

2.8 mm/s

Current

7.2 A

RPM

1441

Health Score

87%

---

# AI Visualization

The Digital Twin displays:

Health Score

Failure Probability

Confidence Score

Remaining Useful Life

Predicted Failure Type

Maintenance Recommendation

---

# Animation States

Healthy

Normal Rotation

Warning

Slight Highlight Animation

High Risk

Pulsing Component

Critical

Red Flashing Component

Failure

Rotation Stops

Smoke Effect (Simulation Mode Only)

---

# WebSocket Synchronization

Data Flow

```
Sensor

↓

Backend

↓

Prediction AI

↓

WebSocket

↓

React

↓

Three.js

↓

Digital Twin
```

Updates should occur in near real time.

---

# Time-Series Playback

Future feature.

Users can:

Pause

Rewind

Replay

Fast Forward

Watch machine degradation over time.

---

# Failure Simulation

Simulation mode allows users to observe:

Bearing wear progression

Temperature increase

Rotor imbalance

Cooling fan failure

Misalignment

This mode is educational and does not affect real machine data.

---

# User Interaction

Users can:

Rotate model

Zoom

Select components

View sensor values

Inspect AI predictions

Open maintenance history

Highlight faulty components

---

# Dashboard Integration

The Digital Twin communicates with:

Dashboard

Machine Details

Prediction Module

Maintenance Module

Analytics

Factory Assistant AI

---

# Three.js Integration

Technology

Three.js

Rendering

React Three Fiber

Model Format

GLB / GLTF

Lighting

Physically Based Rendering (PBR)

Animation

Three.js Animation Mixer

---

# Rendering Pipeline

```
3D Model

↓

React Three Fiber

↓

Material Updates

↓

Health Coloring

↓

Animation

↓

Render Frame
```

---

# Performance

Lazy loading

Model compression

Texture optimization

Level of Detail (LOD)

Efficient animation updates

GPU acceleration

---

# Security

The Digital Twin is read-only.

Users cannot directly control physical machines.

Future remote-control capabilities must require:

Authentication

Authorization

Operator approval

Audit logging

---

# Future Features

Digital Twin AI

Fleet Visualization

Factory Layout View

AR Support

VR Support

Thermal Overlay

Component Explosion View

Maintenance Simulation

Failure Prediction Timeline

Multi-Machine Synchronization

---

# Related Documents

05_Machine_Study.md

07_Sensor_Architecture.md

12_AI_Architecture.md

14_Factory_Assistant.md

16_UI_UX_System.md

---

# Summary

The Digital Twin is the visual intelligence layer of TwinForge AI.

Rather than displaying static engineering models, it continuously synchronizes with live sensor data and AI predictions to create an interactive representation of machine health.

It enables engineers to understand complex industrial systems through intuitive visualization while supporting predictive maintenance and explainable AI.

---
>>>>>>> e4fea739018aef91fb91a75cd8174f3e53823c57
