# API Specification

> REST API & WebSocket Contract for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | API Specification |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |
| API Style | REST + WebSocket |

---

# Purpose

This document defines the public API contract of TwinForge AI.

It covers:

- Authentication
- User Management
- Factory Management
- Machine Management
- Sensors
- Predictions
- Alerts
- Maintenance
- AI Assistant
- WebSocket Events
- Error Handling
- API Versioning

The API is designed using REST principles and OpenAPI standards.

---

# Base URL

Development

```

http://localhost:8000/api/v1

```

Production

```

https://api.twinforge.ai/v1

```

---

# Authentication

Method

JWT Bearer Token

Header

```

Authorization: Bearer <token>

```

---

# Response Format

Success

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Machine not found",
  "error_code": "MACHINE_NOT_FOUND"
}
```

---

# Authentication APIs

## Register

POST

```

/auth/register

```

Request

```json
{
  "name": "Lotus Kumar",
  "email": "lotus@example.com",
  "password": "StrongPassword123"
}
```

---

## Login

POST

```

/auth/login

```

Response

```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

## Logout

POST

```

/auth/logout

```

---

## Refresh Token

POST

```

/auth/refresh

```

---

# User APIs

GET

```

/users

```

GET

```

/users/{id}

```

POST

```

/users

```

PUT

```

/users/{id}

```

DELETE

```

/users/{id}

```

---

# Factory APIs

GET

```

/factories

```

POST

```

/factories

```

GET

```

/factories/{id}

```

PUT

```

/factories/{id}

```

DELETE

```

/factories/{id}

```

---

# Machine APIs

## Register Machine

POST

```

/machines

```

---

## Get Machines

GET

```

/machines

```

---

## Machine Details

GET

```

/machines/{machine_id}

```

---

## Update Machine

PUT

```

/machines/{machine_id}

```

---

## Delete Machine

DELETE

```

/machines/{machine_id}

```

---

## Machine Health

GET

```

/machines/{machine_id}/health

```

Example Response

```json
{
  "machine_id": "MTR-001",
  "health_score": 92,
  "status": "Healthy"
}
```

---

# Sensor APIs

Get Sensor List

GET

```

/machines/{machine_id}/sensors

```

Latest Readings

GET

```

/machines/{machine_id}/sensors/latest

```

Historical Data

GET

```

/machines/{machine_id}/sensors/history

```

Query Parameters

```

?from=

?to=

?sensor=temperature

```

---

# Prediction APIs

Latest Prediction

GET

```

/machines/{machine_id}/prediction

```

Prediction History

GET

```

/machines/{machine_id}/predictions

```

Example Response

```json
{
  "health_score": 87,
  "failure_probability": 0.82,
  "failure_type": "Bearing Wear",
  "remaining_useful_life": "5 days",
  "confidence": 0.94
}
```

---

# Alert APIs

GET

```

/alerts

```

GET

```

/alerts/{id}

```

PATCH

```

/alerts/{id}/acknowledge

```

DELETE

```

/alerts/{id}

```

---

# Maintenance APIs

GET

```

/maintenance

```

POST

```

/maintenance

```

PUT

```

/maintenance/{id}

```

GET

```

/maintenance/history

```

---

# AI Assistant APIs

Ask AI

POST

```

/ai/chat

```

Example Request

```json
{
  "question": "Why is Motor-01 unhealthy?"
}
```

Example Response

```json
{
  "answer": "Motor-01 shows increasing vibration and temperature over the past six days. This pattern matches historical bearing wear. Recommended action: inspect the drive-end bearing within five days."
}
```

---

# Digital Twin APIs

GET

```

/digital-twin/{machine_id}

```

Returns

- 3D model metadata
- Current state
- Health color
- Animation state
- Component highlights

---

# Dashboard APIs

GET

```

/dashboard/overview

```

Returns

- Total Machines
- Healthy Machines
- Active Alerts
- Maintenance Due
- Average Health Score

---

# WebSocket

Endpoint

```

ws://localhost:8000/ws

```

Future

```

wss://api.twinforge.ai/ws

```

---

# WebSocket Events

Sensor Update

```json
{
  "event": "sensor.updated"
}
```

Machine Health

```json
{
  "event": "machine.health.updated"
}
```

Prediction

```json
{
  "event": "prediction.generated"
}
```

Alert

```json
{
  "event": "alert.created"
}
```

Digital Twin

```json
{
  "event": "digital_twin.updated"
}
```

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# API Versioning

Current Version

```

/api/v1

```

Future

```

/api/v2

```

Older versions remain supported during migration.

---

# Rate Limiting

Prototype

Unlimited

Production

100 requests/minute per user

Future

Configurable per organization

---

# Security

HTTPS

JWT Authentication

RBAC

Input Validation

SQL Injection Protection

CORS

Audit Logging

---

# OpenAPI

FastAPI automatically generates

Swagger UI

```

/docs

```

ReDoc

```

/redoc

```

---

# Related Documents

08_Backend_Architecture.md

09_Frontend_Architecture.md

10_Database_Design.md

12_AI_Architecture.md

17_Security_Model.md

---

# Summary

The TwinForge AI API provides a secure, versioned, and scalable interface for communication between frontend applications, IoT devices, AI services, and third-party integrations.

The API follows REST best practices while leveraging WebSockets for real-time industrial monitoring and Digital Twin synchronization.

---