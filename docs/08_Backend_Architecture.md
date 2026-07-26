# Backend Architecture

## Framework: FastAPI

Chosen for:
- Native async support (WebSockets, concurrent sensor ingestion)
- Automatic OpenAPI/Swagger documentation
- Python ecosystem (shares libraries with AI layer)
- High performance (on par with Node.js)

## Module Structure

```
backend/app/
├── main.py              # FastAPI app factory, lifespan events
├── api/
│   ├── v1/
│   │   ├── router.py    # Aggregates all v1 routes
│   │   ├── machines.py  # Machine CRUD endpoints
│   │   ├── sensors.py   # Sensor ingestion + query
│   │   ├── predictions.py # AI prediction results
│   │   ├── alerts.py    # Alert management
│   │   ├── maintenance.py # Maintenance scheduling
│   │   └── auth.py      # JWT authentication
│   └── ws/
│       └── gateway.py   # WebSocket connection manager
├── core/
│   ├── config.py        # Pydantic Settings (reads .env)
│   ├── security.py      # JWT creation/verification
│   └── exceptions.py    # Custom exception handlers
├── database/
│   ├── connection.py    # SQLAlchemy engine + session
│   └── base.py          # DeclarativeBase
├── models/              # SQLAlchemy ORM models
├── schemas/             # Pydantic request/response schemas
├── services/            # Business logic layer
├── middleware/          # CORS, logging, rate limiting
└── utils/               # Helpers, formatters
```

## API Versioning Strategy

All routes prefixed with `/api/v1/`.  
When breaking changes are needed: `/api/v2/` — old version maintained for 6 months.

## Authentication Flow

```
Client → POST /api/v1/auth/login {email, password}
       ← 200 {access_token, token_type: "bearer", expires_in}

Client → GET /api/v1/machines (Authorization: Bearer <token>)
       ← 200 [...machines]
```

## WebSocket Architecture

```python
# Single WebSocket endpoint handles all real-time updates
# ws://host/ws/{client_id}

# Events broadcast:
# - sensor_update: new sensor reading
# - prediction_update: new AI assessment
# - alert_created: new alert
# - machine_status_change: health threshold crossed
# - digital_twin_update: Twin state changed
```

## Rate Limiting

- Sensor ingestion: 1 request/5 seconds per device
- API: 100 requests/minute per authenticated user
- WebSocket: 1 connection per client ID
