# TwinForge AI System Architecture

> Technical Blueprint for the TwinForge AI Platform

---

# Document Information

| Field | Value |
|-------|-------|
| Document | System Architecture |
| Version | 1.0 |
| Status | Active |
| Owner | Lotus Kumar |
| Project | TwinForge AI |

---

# Purpose

This document defines the complete technical architecture of TwinForge AI.

It describes how every module communicates, how data flows through the system, and how the platform is designed for scalability, maintainability, and future growth.

This document serves as the engineering blueprint for implementation.

---

# High-Level Architecture

```
                    ┌────────────────────────────┐
                    │   Industrial Machine       │
                    └─────────────┬──────────────┘
                                  │
                          Temperature
                          Vibration
                          Current
                          RPM
                                  │
                    ┌─────────────▼──────────────┐
                    │       ESP32 Edge Device    │
                    └─────────────┬──────────────┘
                                  │
                             MQTT / HTTP
                                  │
                    ┌─────────────▼──────────────┐
                    │        FastAPI Backend     │
                    └─────────────┬──────────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
      PostgreSQL          Prediction AI      WebSocket Gateway
             │                    │                    │
             └────────────┬───────┘                    │
                          ▼                            ▼
                Factory Assistant AI          React Dashboard
                                                     │
                                                     ▼
                                             Digital Twin
```

---

# System Layers

TwinForge AI follows a layered architecture.

```
Presentation Layer

↓

Application Layer

↓

Business Logic Layer

↓

AI Layer

↓

Data Layer

↓

Edge Layer

↓

Physical Machine
```

---

# Layer Responsibilities

## Presentation Layer

Technology

- React
- TypeScript
- TailwindCSS
- React Query
- Three.js

Responsibilities

- Dashboard
- Charts
- Alerts
- Digital Twin
- AI Chat
- Analytics

---

## Application Layer

Technology

FastAPI

Responsibilities

- Authentication
- API Routing
- Validation
- Business Logic
- WebSockets

---

## AI Layer

Contains

Prediction AI

Factory Assistant AI

Future

Maintenance AI

Energy AI

Digital Twin AI

---

## Data Layer

Technology

PostgreSQL

Stores

- Users
- Factories
- Machines
- Sensors
- Sensor Readings
- Predictions
- Alerts
- Maintenance Logs

---

## Edge Layer

Technology

ESP32

Responsibilities

- Read Sensors
- Validate Data
- Send MQTT Messages
- Buffer Offline Data
- Device Health Monitoring

---

# Data Flow

```
Sensor Reading

↓

ESP32

↓

MQTT Broker

↓

FastAPI Backend

↓

Database

↓

Prediction AI

↓

Prediction Result

↓

Factory Assistant

↓

WebSocket

↓

Dashboard

↓

Digital Twin
```

---

# Core Modules

## Authentication Service

Responsibilities

- User Login
- JWT Authentication
- Roles
- Permissions

---

## Machine Service

Responsibilities

- Register Machine
- Machine Status
- Machine Metadata

---

## Sensor Service

Responsibilities

- Store Readings
- Validate Values
- Detect Missing Data

---

## Prediction Service

Responsibilities

- Health Score
- Failure Probability
- Remaining Useful Life
- Confidence Score

---

## AI Assistant

Responsibilities

- Explain Predictions
- Answer User Questions
- Recommend Maintenance

---

## Notification Service

Responsibilities

- Alerts
- Warning Messages
- Maintenance Notifications

---

# Communication

ESP32 → Backend

MQTT

Backend → Dashboard

WebSocket

Dashboard → Backend

REST API

AI → Backend

Internal Python Services

---

# Database Design Overview

Core Entities

```
Factory

↓

Machine

↓

Sensor

↓

SensorReading

↓

Prediction

↓

Alert

↓

MaintenanceRecord
```

Relationships

One Factory

↓

Many Machines

↓

Many Sensors

↓

Many Readings

↓

Many Predictions

---

# AI Pipeline

```
Sensor Data

↓

Cleaning

↓

Validation

↓

Feature Engineering

↓

Prediction Model

↓

Failure Classification

↓

Health Score

↓

Explainable AI

↓

Factory Assistant

↓

Dashboard
```

---

# Digital Twin Synchronization

Each Digital Twin is synchronized using WebSockets.

Machine States

🟢 Healthy

🟡 Warning

🟠 High Risk

🔴 Critical

State changes trigger

- Color updates
- Animations
- Alerts
- AI Recommendations

---

# Security Model

Authentication

JWT

Authorization

Role-Based Access Control

Encryption

HTTPS

Secrets

Environment Variables

---

# Deployment Architecture

```
React Frontend

↓

Nginx

↓

FastAPI

↓

PostgreSQL

↓

Prediction AI

↓

ESP32 Devices
```

Future

Docker Compose

↓

Kubernetes

↓

Cloud Deployment

---

# Scalability Strategy

Future architecture should support

- Multiple factories
- Thousands of machines
- Millions of sensor readings
- Multiple AI services
- Horizontal scaling
- Distributed deployment

---

# Engineering Principles

- Modular Architecture
- SOLID Principles
- API First Design
- Explainable AI
- Event-Driven Communication
- Clean Code
- Testability
- Production Readiness

---

# Future Expansion

TwinForge AI will evolve to include

- Maintenance AI
- Energy AI
- Digital Twin AI
- Mobile Application
- Multi-Tenant SaaS
- Enterprise Integrations
- Edge AI Deployment
- Cloud Analytics

---

# Related Documents

- 01_Project_Bible.md
- 03_Business_Model.md
- 08_Backend_Architecture.md
- 09_Frontend_Architecture.md
- 10_Database_Design.md
- 12_AI_Architecture.md
- 15_Digital_Twin.md

---

> The architecture should prioritize scalability, explainability, modularity, and production readiness. Every new feature must integrate into this architecture rather than bypass it.