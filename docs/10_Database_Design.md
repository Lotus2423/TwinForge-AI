# Database Design

> Enterprise Database Architecture for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Database Design |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |
| Database | PostgreSQL |

---

# Purpose

This document defines the database architecture for TwinForge AI.

It explains:

- Database design principles
- Entity relationships
- Table structure
- Constraints
- Indexing
- Multi-tenancy
- Time-series data strategy
- Scalability
- Future expansion

This database is designed to support thousands of factories, millions of sensor readings, and future AI services.

---

# Database Principles

TwinForge AI follows these principles:

- Normalized Design (3NF)
- UUID Primary Keys
- Soft Deletes
- Audit Logging
- Timestamp Tracking
- Foreign Key Integrity
- Scalable Time-Series Storage
- API-Friendly Schema

---

# High-Level Entity Relationship

```
Organization
      │
      ▼
Factory
      │
      ▼
Machine
      │
      ▼
Sensor
      │
      ▼
Sensor Reading
      │
      ▼
Prediction
      │
      ▼
Maintenance
      │
      ▼
Alert
```

---

# Core Tables

## Organization

Represents a company using TwinForge AI.

Fields

- id (UUID)
- name
- industry
- country
- created_at
- updated_at

---

## Factory

Represents a physical factory.

Fields

- id
- organization_id
- name
- location
- timezone
- status

Relationship

One Organization

↓

Many Factories

---

## User

Represents platform users.

Fields

- id
- organization_id
- full_name
- email
- password_hash
- role
- status
- last_login

Roles

- Admin
- Factory Manager
- Maintenance Engineer
- Operator
- Viewer

---

## Machine

Represents industrial assets.

Fields

- id
- factory_id
- machine_code
- machine_name
- machine_type
- manufacturer
- model
- serial_number
- installation_date
- status

Relationship

One Factory

↓

Many Machines

---

## Sensor

Represents every installed sensor.

Fields

- id
- machine_id
- sensor_type
- sensor_code
- unit
- sampling_rate
- status
- calibration_date

Relationship

One Machine

↓

Many Sensors

---

## SensorReading

Stores raw telemetry.

Fields

- id
- sensor_id
- timestamp
- value
- quality_score
- source

This table is expected to become the largest table.

---

## Prediction

Stores AI predictions.

Fields

- id
- machine_id
- prediction_time
- health_score
- failure_probability
- failure_type
- remaining_useful_life
- confidence_score

---

## Alert

Stores generated alerts.

Fields

- id
- machine_id
- alert_type
- severity
- message
- acknowledged
- created_at

---

## MaintenanceRecord

Stores maintenance history.

Fields

- id
- machine_id
- maintenance_type
- description
- engineer
- scheduled_date
- completed_date
- status

---

## AuditLog

Stores platform activity.

Fields

- id
- user_id
- action
- entity
- entity_id
- timestamp
- ip_address

---

# Entity Relationships

```
Organization
    │
    ├── Users
    │
    └── Factories
            │
            └── Machines
                    │
                    ├── Sensors
                    │       │
                    │       └── Sensor Readings
                    │
                    ├── Predictions
                    │
                    ├── Alerts
                    │
                    └── Maintenance Records
```

---

# Time-Series Strategy

Sensor readings are stored separately from machine metadata.

Advantages

- Fast inserts
- Efficient analytics
- Easier partitioning
- Better scalability

---

# Indexing Strategy

Indexes should exist on:

- machine_id
- sensor_id
- timestamp
- organization_id
- factory_id
- health_score
- failure_probability

Composite indexes

(machine_id, timestamp)

(sensor_id, timestamp)

(alert_type, severity)

---

# Soft Delete

Instead of deleting records:

deleted_at

is populated.

Advantages

- Recovery
- Audit
- Compliance

---

# Audit Trail

Every important action should be logged.

Examples

Machine Created

Machine Deleted

Prediction Generated

Sensor Offline

Maintenance Updated

User Login

---

# Data Retention

Sensor Data

2 Years

Predictions

5 Years

Maintenance

Lifetime

Audit Logs

7 Years

Future

Configurable retention policies.

---

# Database Constraints

Machine Code

Unique

Email

Unique

Sensor Code

Unique

Foreign Keys

Required

Health Score

0–100

Failure Probability

0–100

---

# Multi-Tenant Design

Each Organization owns:

Factories

↓

Machines

↓

Sensors

↓

Data

Organizations cannot access each other's data.

---

# Backup Strategy

Daily Backup

Weekly Full Backup

Monthly Archive

Point-in-Time Recovery (Future)

---

# Performance Optimization

Connection Pooling

Indexes

Pagination

Partitioning

Materialized Views (Future)

Read Replicas (Future)

---

# Security

Encrypted Connections

Least Privilege

Parameterized Queries

Role-Based Access

Audit Logging

---

# Future Tables

EnergyReading

DigitalTwinState

Firmware

Notification

AIModel

TrainingDataset

Simulation

AnomalyDetection

---

# Database Growth Strategy

Prototype

↓

Single PostgreSQL Instance

↓

Partitioned Tables

↓

Read Replicas

↓

Distributed Database

↓

Cloud Managed Database

---

# Related Documents

08_Backend_Architecture.md

09_Frontend_Architecture.md

11_API_Specification.md

12_AI_Architecture.md

17_Security_Model.md

---

# Summary

The TwinForge AI database is designed as a scalable, normalized, and secure foundation for predictive maintenance, explainable AI, and Digital Twin technology.

The schema supports future growth from a single prototype motor to enterprise-scale industrial deployments without requiring fundamental redesign.

---