# Architecture Decision Records (ADR)

**Version:** 1.0 | **Status:** Draft | **Date:** 2026-07-21

_Full content to be elaborated during Phase 1 documentation sprint._

See cross-references in [02_System_Architecture.md](02_System_Architecture.md) and [01_Project_Bible.md](01_Project_Bible.md).

## ADR-001: FastAPI over Django
**Decision:** Use FastAPI for the backend.  
**Reason:** Native async, WebSocket support, Pydantic validation, Python ecosystem shared with AI layer.  
**Tradeoffs:** Less out-of-the-box admin, less ecosystem than Django.

## ADR-002: PostgreSQL over InfluxDB
**Decision:** Use PostgreSQL with indexed time-series tables.  
**Reason:** Single database reduces operational complexity for MVP. TimescaleDB extension adds time-series capabilities when needed.  
**Tradeoffs:** Less optimized for pure time-series than InfluxDB.

## ADR-003: React Three Fiber over Babylon.js
**Decision:** Use Three.js via React Three Fiber for Digital Twin.  
**Reason:** React ecosystem integration, large community, good GLTF support.  
**Tradeoffs:** Lower-level than Babylon.js, requires more manual scene management.

## ADR-004: Claude API over local LLM
**Decision:** Use Anthropic Claude API for Factory Assistant.  
**Reason:** MVP priority is quality of explanations. Running local LLM requires GPU hardware. Can migrate to local model (Mistral/LLaMA) in production if cost is a concern.
