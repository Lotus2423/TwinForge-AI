# Quality Attributes

**Version:** 1.0 | **Status:** Draft | **Date:** 2026-07-21

_Full content to be elaborated during Phase 1 documentation sprint._

See cross-references in [02_System_Architecture.md](02_System_Architecture.md) and [01_Project_Bible.md](01_Project_Bible.md).

## Quality Attribute Scenarios

| Attribute | Scenario | Measure |
|---|---|---|
| Performance | 10 ESP32 devices sending simultaneously | < 500ms ingestion latency |
| Reliability | Network interruption during ESP32 transmission | Data buffered on device, retransmitted on reconnect |
| Scalability | Factory adds 50 machines | No code change required, only horizontal backend scaling |
| Explainability | Engineer asks "why critical?" | AI provides sensor trends + failure chain in < 3 seconds |
| Usability | Maintenance engineer with no AI background | Can understand health score and recommendation without training |
