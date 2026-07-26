# System Requirements (SRS)

**Version:** 1.0 | **Status:** Draft | **Date:** 2026-07-21

_Full content to be elaborated during Phase 1 documentation sprint._

See cross-references in [02_System_Architecture.md](02_System_Architecture.md) and [01_Project_Bible.md](01_Project_Bible.md).

## Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | System shall ingest sensor data from ESP32 via HTTP POST | P0 |
| FR-02 | System shall store all sensor readings with timestamps | P0 |
| FR-03 | System shall compute health score within 2 seconds of reading | P0 |
| FR-04 | System shall broadcast predictions to connected dashboards via WebSocket | P0 |
| FR-05 | System shall create alerts when health score drops below threshold | P0 |
| FR-06 | System shall provide LLM-powered explanation for every prediction | P0 |
| FR-07 | System shall render 3D Digital Twin colored by health score | P1 |
| FR-08 | System shall allow engineers to query Factory Assistant in natural language | P1 |
| FR-09 | System shall maintain 90 days of sensor history | P1 |
| FR-10 | System shall support multiple machines per factory | P1 |

## Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | API response time < 500ms (p95) |
| NFR-02 | WebSocket latency < 200ms for real-time updates |
| NFR-03 | System uptime > 99.5% |
| NFR-04 | AI prediction model accuracy > 88% on test set |
| NFR-05 | Dashboard loads in < 3 seconds on 4G |
| NFR-06 | Supports 50 concurrent WebSocket connections (MVP) |
