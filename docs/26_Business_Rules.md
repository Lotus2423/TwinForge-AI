# Business Rules

**Version:** 1.0 | **Status:** Draft | **Date:** 2026-07-21

_Full content to be elaborated during Phase 1 documentation sprint._

See cross-references in [02_System_Architecture.md](02_System_Architecture.md) and [01_Project_Bible.md](01_Project_Bible.md).

## Core Business Rules

| ID | Rule |
|---|---|
| BR-01 | Health score below 30 always triggers a CRITICAL alert |
| BR-02 | Health score 30–60 triggers WARNING alert |
| BR-03 | RUL below 3 days triggers URGENT maintenance task |
| BR-04 | Sensor reading gap > 5 minutes marks machine as OFFLINE |
| BR-05 | Every prediction must include an AI explanation |
| BR-06 | Alerts must be acknowledged before being closed |
| BR-07 | Maintenance tasks created from critical alerts cannot be deleted, only completed |
| BR-08 | Each machine must have a unique API key for IoT authentication |
