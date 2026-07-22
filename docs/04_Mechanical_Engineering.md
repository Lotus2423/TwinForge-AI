# Mechanical Engineering

> Engineering Foundation of TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Mechanical Engineering |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the engineering knowledge required for TwinForge AI.

It explains:

- Three Phase Induction Motor
- Machine Construction
- Components
- Working Principle
- Mechanical Behaviour
- Failure Mechanisms
- Sensor Placement
- Maintenance Concepts

This document acts as the engineering knowledge base for the AI system and Digital Twin.

---

# Why Three Phase Induction Motor?

The Three Phase Induction Motor is selected as the first prototype because it is:

- Used in almost every manufacturing industry.
- Reliable and well documented.
- Easy to instrument with sensors.
- Rich in measurable parameters.
- Suitable for predictive maintenance.
- Easy to demonstrate in an academic environment.

---

# Common Industrial Applications

- Pumps
- Compressors
- Conveyor Systems
- HVAC Systems
- CNC Machines
- Fans
- Mixers
- Industrial Robots
- Machine Tools
- Production Lines

---

# Working Principle

The motor works on the principle of **Electromagnetic Induction**.

1. Three-phase AC supply is applied to the stator.
2. A rotating magnetic field (RMF) is generated.
3. The RMF induces current in the rotor.
4. Rotor current creates its own magnetic field.
5. Interaction between the two magnetic fields produces torque.
6. The shaft rotates and drives the connected machine.

---

# Main Components

## Stator

Purpose:

- Produces rotating magnetic field.
- Houses three-phase winding.

Possible Failures:

- Insulation breakdown
- Overheating
- Short circuit
- Moisture damage

---

## Rotor

Purpose:

- Converts magnetic energy into mechanical rotation.

Possible Failures:

- Broken rotor bars
- Rotor imbalance
- Cracks
- Mechanical wear

---

## Bearings

Purpose:

- Support the rotating shaft.
- Reduce friction.

Possible Failures:

- Wear
- Lubrication loss
- Fatigue
- Corrosion
- Overheating

---

## Shaft

Purpose:

- Transfers mechanical power.

Possible Failures:

- Misalignment
- Bending
- Fatigue cracks
- Excessive vibration

---

## Cooling Fan

Purpose:

- Removes heat from the motor.

Possible Failures:

- Broken blades
- Dust blockage
- Reduced airflow

---

## Housing

Purpose:

- Protects internal components.
- Supports mounting.

Possible Failures:

- Loose mounting
- Corrosion
- Structural damage

---

# Machine Parameters

TwinForge AI continuously monitors:

- Temperature
- Vibration
- Current
- RPM

Future parameters:

- Voltage
- Power
- Energy
- Humidity
- Oil Quality
- Sound
- Thermal Images

---

# Sensor Placement

## Temperature Sensor

Location:

Bearing Housing / Motor Body

Purpose:

Monitor abnormal heating.

---

## Vibration Sensor

Location:

Bearing Housing

Purpose:

Detect imbalance, looseness and bearing wear.

---

## Current Sensor

Location:

Power Input

Purpose:

Detect overloads and electrical faults.

---

## RPM Sensor

Location:

Motor Shaft

Purpose:

Monitor rotational speed.

---

# Operating States

Healthy

- Stable temperature
- Low vibration
- Normal current
- Rated RPM

---

Warning

- Temperature increasing
- Slight vibration increase

---

High Risk

- Multiple abnormal parameters
- Rapid trend changes

---

Critical

- Severe vibration
- High temperature
- Possible failure

---

# Mechanical Failure Categories

Mechanical

- Bearing Wear
- Shaft Misalignment
- Rotor Imbalance
- Loose Mounting

Electrical

- Stator Fault
- Rotor Fault
- Phase Imbalance
- Overcurrent

Thermal

- Cooling Failure
- Overheating

Environmental

- Dust
- Moisture
- Corrosion

---

# Maintenance Types

Reactive Maintenance

Repair after failure.

---

Preventive Maintenance

Maintenance based on schedule.

---

Predictive Maintenance

Maintenance based on actual machine health.

TwinForge AI focuses on Predictive Maintenance.

---

# Digital Twin Mapping

Each physical component has a corresponding digital component.

Physical Machine

↓

Digital Twin

Bearing

↓

Bearing Object

Rotor

↓

Rotor Object

Fan

↓

Cooling Module

Sensors

↓

Live Data Nodes

---

# AI Perspective

TwinForge AI does not evaluate sensors independently.

Instead, it understands relationships between components.

Example:

Cooling Fan Failure

↓

Reduced Airflow

↓

Motor Temperature Rises

↓

Bearing Temperature Increases

↓

Lubrication Degrades

↓

Vibration Increases

↓

Bearing Wear Accelerates

↓

Failure Probability Increases

This engineering reasoning forms the foundation of Explainable AI.

---

# Design Considerations

The platform must support:

- Multiple motor sizes
- Different manufacturers
- Additional sensors
- Future machine types

No assumptions should be hardcoded for a single motor model.

---

# Related Documents

- 05_Machine_Study.md
- 06_Failure_Analysis.md
- 07_Sensor_Architecture.md
- 12_AI_Architecture.md
- 15_Digital_Twin.md

---

# Summary

The Three Phase Induction Motor serves as the initial engineering model for TwinForge AI.

Understanding its construction, operation, and failure mechanisms is essential for building accurate AI models, realistic Digital Twins, and effective predictive maintenance capabilities.

This document provides the mechanical foundation upon which the rest of the platform is built.