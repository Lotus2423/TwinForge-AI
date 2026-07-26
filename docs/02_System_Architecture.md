# System Architecture v2.0

## Overview

TwinForge AI follows a layered, event-driven architecture with clear separation of concerns.

## Layers

```
┌─────────────────────────────────────┐
│           HARDWARE LAYER            │
│   3-Phase Motor + Sensors + ESP32   │
└────────────────┬────────────────────┘
                 │ MQTT / HTTP over WiFi
┌────────────────▼────────────────────┐
│            EDGE LAYER               │
│        ESP32 Firmware               │
│   Sensor reading → JSON payload     │
└────────────────┬────────────────────┘
                 │ HTTP POST / MQTT Pub
┌────────────────▼────────────────────┐
│           BACKEND LAYER             │
│  FastAPI  │  PostgreSQL  │  Queue   │
│  REST API │  Time-series │  Events  │
└─────┬─────┴──────┬───────┴──────────┘
      │            │
┌─────▼─────┐ ┌───▼──────────────────┐
│PREDICTION │ │  FACTORY ASSISTANT   │
│    AI     │ │       AI (LLM)       │
└─────┬─────┘ └──────────┬───────────┘
      │                  │
┌─────▼──────────────────▼───────────┐
│        WEBSOCKET GATEWAY            │
│     Real-time event broadcast       │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│          FRONTEND LAYER             │
│  React Dashboard │ 3D Digital Twin  │
│  Sensor Charts   │ AI Chat UI       │
└─────────────────────────────────────┘
```

## Communication Protocols

| Connection | Protocol | Format |
|---|---|---|
| ESP32 → Backend | HTTP POST / MQTT | JSON |
| Backend → AI | Internal function call / Queue | Python objects |
| Backend → Frontend | WebSocket | JSON events |
| Frontend → Backend | REST API | JSON |
| Auth | JWT Bearer Token | HTTP Header |

## Data Flow

1. ESP32 reads sensors every 5 seconds
2. Sends JSON payload to `/api/v1/sensors/ingest`
3. Backend stores to PostgreSQL time-series table
4. Triggers Prediction AI pipeline
5. AI returns health score, failure probability, RUL
6. Backend broadcasts to all connected WebSocket clients
7. Frontend updates dashboard, charts, and Digital Twin color
8. If health < threshold, alert created and notification sent

## Scalability Design

- Backend: Stateless FastAPI workers (horizontal scaling)
- Database: Connection pooling via SQLAlchemy + pgBouncer
- WebSocket: Redis Pub/Sub for multi-instance broadcasts
- AI: Separate microservice, callable via internal HTTP
- Frontend: Static CDN deployment

## Security Zones

- Public: `/api/v1/auth/*` only
- Authenticated: All other API routes (JWT required)
- Internal: AI service not exposed externally
- IoT: Device authentication via API key per machine
