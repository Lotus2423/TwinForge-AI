# Requirement Traceability Matrix

**Version:** 1.0 | **Status:** Draft | **Date:** 2026-07-21

_Full content to be elaborated during Phase 1 documentation sprint._

See cross-references in [02_System_Architecture.md](02_System_Architecture.md) and [01_Project_Bible.md](01_Project_Bible.md).

## Traceability Table

| Requirement | Design Doc | Backend Component | Frontend Component | Test |
|---|---|---|---|---|
| FR-01 (Sensor ingest) | 07_Sensor_Architecture | api/sensors.py | — | tests/api/test_sensors_api.py |
| FR-02 (Store readings) | 10_Database_Design | models/sensor_reading.py | — | tests/unit/test_sensor_validation.py |
| FR-03 (Health score) | 12_AI_Architecture | ai/prediction_ai/ | features/predictions/ | tests/ai/test_model_accuracy.py |
| FR-04 (WebSocket) | 08_Backend_Architecture | api/ws/gateway.py | hooks/useWebSocket.ts | tests/integration/test_websocket.py |
| FR-06 (Explanation) | 13_Explainable_AI | ai/prediction_ai/explainer.py | features/predictions/ | tests/ai/test_explanation_generation.py |
| FR-07 (Digital Twin) | 15_Digital_Twin | — | components/twin/ | tests/frontend/ |
