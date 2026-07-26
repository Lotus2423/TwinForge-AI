# Factory Knowledge Graph

**Status:** Planned — Phase 3+

## Purpose

Graph database of machine relationships, failure dependencies, and causal links across the factory. Enables questions like: "If Motor-01 fails, which production lines are affected?"

## Technology

Neo4j or Apache AGE (PostgreSQL extension for graph queries).

## Node Types

- Machine, Component, ProductionLine, Sensor, FailureMode, MaintenanceAction
