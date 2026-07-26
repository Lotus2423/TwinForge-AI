# API Specification v1.0

Base URL: `https://api.twinforge.ai/api/v1`  
Auth: `Authorization: Bearer <JWT>`  
Format: JSON  
Version: REST API v1

---

## Authentication

### POST /auth/login
Login and receive JWT token.

**Request:**
```json
{ "email": "engineer@factory.com", "password": "secure123" }
```
**Response 200:**
```json
{ "access_token": "eyJ...", "token_type": "bearer", "expires_in": 3600 }
```

---

## Machines

### GET /machines
List all machines for authenticated user's factory.

**Response 200:**
```json
[
  {
    "id": "uuid",
    "name": "Motor-01",
    "machine_type": "induction_motor",
    "is_active": true,
    "health_score": 34.2,
    "latest_alert_severity": "critical",
    "last_seen": "2026-07-21T14:32:07Z"
  }
]
```

### POST /machines
Register a new machine.

### GET /machines/{id}
Get full machine details including latest prediction.

### PATCH /machines/{id}
Update machine metadata.

---

## Sensor Ingestion

### POST /sensors/ingest
Primary endpoint for ESP32 data. Requires machine API key.

**Headers:** `X-Device-Key: <machine-api-key>`

**Request:**
```json
{
  "machine_id": "uuid",
  "timestamp": "2026-07-21T14:32:07.123Z",
  "sensors": {
    "temperature_c": 78.4,
    "vibration_mms": 7.42,
    "current_a": 38.2,
    "rpm": 1482
  }
}
```

**Response 201:**
```json
{
  "reading_id": 12345,
  "prediction_triggered": true,
  "message": "Reading stored. Prediction pipeline triggered."
}
```

### GET /sensors/{machine_id}/history
Get sensor history with pagination and time range.

**Query params:** `from`, `to`, `limit`, `sensor` (optional filter)

---

## Predictions

### GET /predictions/{machine_id}/latest
Get latest AI prediction for a machine.

**Response 200:**
```json
{
  "id": "uuid",
  "health_score": 34.2,
  "failure_probability": 0.91,
  "failure_type": "bearing_wear",
  "rul_days": 5.0,
  "confidence": 0.87,
  "explanation": "Vibration increased 42% over 7 days...",
  "feature_importance": {
    "vibration_trend": 0.54,
    "temperature_trend": 0.31,
    "current_variation": 0.15
  },
  "predicted_at": "2026-07-21T14:32:08Z"
}
```

### GET /predictions/{machine_id}/history
Historical predictions for trend analysis.

---

## Alerts

### GET /alerts
List all active alerts, ordered by severity.

### PATCH /alerts/{id}/acknowledge
Acknowledge an alert.

---

## WebSocket

### ws://host/ws/{client_id}
Real-time event stream.

**Event types:**
```json
{ "type": "sensor_update", "machine_id": "uuid", "data": {...} }
{ "type": "prediction_update", "machine_id": "uuid", "data": {...} }
{ "type": "alert_created", "alert": {...} }
{ "type": "machine_status_change", "machine_id": "uuid", "status": "critical" }
```

---

## Factory Assistant

### POST /assistant/chat
Send a message to the Factory Assistant AI.

**Request:**
```json
{
  "message": "Why is Motor-01 showing critical health?",
  "machine_id": "uuid",
  "conversation_id": "optional-uuid"
}
```

**Response 200:**
```json
{
  "reply": "Motor-01 ke vibration readings...",
  "sources": ["sensor_history", "prediction_engine"],
  "conversation_id": "uuid"
}
```
