-- TwinForge AI — Initial Database Schema
-- Run: psql -U twinforge -d twinforge_db -f 001_initial_schema.sql

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    name          VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(50) NOT NULL DEFAULT 'engineer',
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Factories
CREATE TABLE IF NOT EXISTS factories (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255) NOT NULL,
    location   VARCHAR(255),
    owner_id   UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Machines
CREATE TABLE IF NOT EXISTS machines (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id        UUID REFERENCES factories(id) ON DELETE CASCADE,
    name              VARCHAR(255) NOT NULL,
    machine_type      VARCHAR(100) NOT NULL,
    model_number      VARCHAR(100),
    manufacturer      VARCHAR(100),
    rated_power_kw    DECIMAL(10,2),
    rated_voltage_v   DECIMAL(10,2),
    rated_current_a   DECIMAL(10,2),
    rated_rpm         INTEGER,
    installation_date DATE,
    location_bay      VARCHAR(100),
    api_key           VARCHAR(255) UNIQUE,
    is_active         BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Sensor readings (time-series)
CREATE TABLE IF NOT EXISTS sensor_readings (
    id              BIGSERIAL PRIMARY KEY,
    machine_id      UUID NOT NULL REFERENCES machines(id) ON DELETE CASCADE,
    device_id       VARCHAR(100),
    temperature_c   DECIMAL(6,2),
    vibration_mms   DECIMAL(8,4),
    current_a       DECIMAL(8,3),
    rpm             INTEGER,
    raw_payload     JSONB,
    recorded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sensor_readings_machine_time
    ON sensor_readings(machine_id, recorded_at DESC);

-- Predictions
CREATE TABLE IF NOT EXISTS predictions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id          UUID NOT NULL REFERENCES machines(id) ON DELETE CASCADE,
    health_score        DECIMAL(5,2),
    failure_probability DECIMAL(5,4),
    failure_type        VARCHAR(100),
    rul_days            DECIMAL(8,1),
    confidence          DECIMAL(5,4),
    explanation         TEXT,
    feature_importance  JSONB,
    recommended_action  TEXT,
    model_version       VARCHAR(50),
    predicted_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_predictions_machine_time ON predictions(machine_id, predicted_at DESC);

-- Alerts
CREATE TABLE IF NOT EXISTS alerts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id      UUID NOT NULL REFERENCES machines(id) ON DELETE CASCADE,
    prediction_id   UUID REFERENCES predictions(id),
    severity        VARCHAR(20) NOT NULL CHECK (severity IN ('info','warning','critical')),
    alert_type      VARCHAR(100),
    title           VARCHAR(255),
    message         TEXT,
    is_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_at TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Maintenance tasks
CREATE TABLE IF NOT EXISTS maintenance_tasks (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id    UUID NOT NULL REFERENCES machines(id),
    alert_id      UUID REFERENCES alerts(id),
    title         VARCHAR(255),
    description   TEXT,
    priority      VARCHAR(20) CHECK (priority IN ('low','medium','high','urgent')),
    status        VARCHAR(20) DEFAULT 'pending',
    assigned_to   UUID REFERENCES users(id),
    scheduled_for TIMESTAMPTZ,
    completed_at  TIMESTAMPTZ,
    notes         TEXT,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Seed: demo factory + user
INSERT INTO factories (name, location) VALUES ('Demo Factory', 'Unit 3, Sector B') ON CONFLICT DO NOTHING;
