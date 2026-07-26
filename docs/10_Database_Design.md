# Database Design

## Database: PostgreSQL 16

### Why PostgreSQL?
- JSONB for flexible sensor payloads
- Window functions for trend analysis
- TimescaleDB extension for time-series (future)
- Mature, production-proven

## Entity Relationship Diagram

```
users ────────────── factories
  │                      │
  │                   machines
  │                      │
  │              ┌───────┴────────┐
  │          sensors          predictions
  │              │                │
  │         sensor_readings    alerts
  │                              │
  └──────── maintenance_tasks ───┘
```

## Tables

### users
```sql
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role        VARCHAR(50) NOT NULL DEFAULT 'engineer',
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### factories
```sql
CREATE TABLE factories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    location    VARCHAR(255),
    owner_id    UUID REFERENCES users(id),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### machines
```sql
CREATE TABLE machines (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id      UUID REFERENCES factories(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    machine_type    VARCHAR(100) NOT NULL,  -- 'induction_motor', 'pump', etc.
    model_number    VARCHAR(100),
    manufacturer    VARCHAR(100),
    rated_power_kw  DECIMAL(10,2),
    rated_voltage_v DECIMAL(10,2),
    rated_current_a DECIMAL(10,2),
    rated_rpm       INTEGER,
    installation_date DATE,
    location_bay    VARCHAR(100),
    api_key         VARCHAR(255) UNIQUE,    -- For ESP32 authentication
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### sensor_readings (Time-series — main data table)
```sql
CREATE TABLE sensor_readings (
    id              BIGSERIAL PRIMARY KEY,
    machine_id      UUID REFERENCES machines(id) ON DELETE CASCADE,
    device_id       VARCHAR(100),
    temperature_c   DECIMAL(6,2),
    vibration_mms   DECIMAL(8,4),
    current_a       DECIMAL(8,3),
    rpm             INTEGER,
    raw_payload     JSONB,           -- Full ESP32 payload stored here
    recorded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Index for time-range queries
CREATE INDEX idx_sensor_readings_machine_time 
    ON sensor_readings(machine_id, recorded_at DESC);
```

### predictions
```sql
CREATE TABLE predictions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id          UUID REFERENCES machines(id) ON DELETE CASCADE,
    health_score        DECIMAL(5,2),       -- 0–100
    failure_probability DECIMAL(5,4),       -- 0.0000–1.0000
    failure_type        VARCHAR(100),       -- 'bearing_wear', 'overheating', etc.
    rul_days            DECIMAL(8,1),       -- Remaining Useful Life
    confidence          DECIMAL(5,4),       -- Model confidence 0–1
    explanation         TEXT,              -- AI-generated text explanation
    feature_importance  JSONB,             -- XAI feature weights
    model_version       VARCHAR(50),
    predicted_at        TIMESTAMPTZ DEFAULT NOW()
);
```

### alerts
```sql
CREATE TABLE alerts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id      UUID REFERENCES machines(id) ON DELETE CASCADE,
    prediction_id   UUID REFERENCES predictions(id),
    severity        VARCHAR(20) NOT NULL,   -- 'info', 'warning', 'critical'
    alert_type      VARCHAR(100),
    title           VARCHAR(255),
    message         TEXT,
    is_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_at TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### maintenance_tasks
```sql
CREATE TABLE maintenance_tasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id      UUID REFERENCES machines(id),
    alert_id        UUID REFERENCES alerts(id),
    title           VARCHAR(255),
    description     TEXT,
    priority        VARCHAR(20),            -- 'low', 'medium', 'high', 'urgent'
    status          VARCHAR(20) DEFAULT 'pending',
    assigned_to     UUID REFERENCES users(id),
    scheduled_for   TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```
