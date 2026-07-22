# Coding Standards

> Engineering Standards for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Coding Standards |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the coding standards used throughout TwinForge AI.

The objectives are:

- Maintain high code quality
- Improve readability
- Reduce bugs
- Ensure consistency
- Support scalability
- Enable team collaboration

These standards apply to:

- Frontend
- Backend
- AI Services
- ESP32 Firmware
- Infrastructure Scripts

---

# Engineering Principles

Every piece of code should be:

- Readable
- Modular
- Testable
- Reusable
- Documented
- Secure
- Production Ready

---

# General Rules

✔ Prefer clarity over cleverness.

✔ Write self-explanatory code.

✔ Avoid duplicated logic.

✔ Keep functions small.

✔ Separate business logic from presentation.

✔ Never hardcode configuration values.

---

# Naming Conventions

## Variables

Use meaningful names.

Good

temperatureReading

machineHealthScore

predictionConfidence

Bad

temp

x

abc

---

## Functions

Use verbs.

Examples

calculateHealthScore()

generatePrediction()

fetchSensorData()

createMaintenanceTask()

---

## Classes

Use PascalCase.

Examples

MachineService

PredictionEngine

SensorRepository

---

## Files

Use kebab-case.

Examples

machine-card.tsx

health-gauge.tsx

sensor-service.py

---

## Constants

Use UPPER_SNAKE_CASE.

Examples

MAX_TEMPERATURE

API_TIMEOUT

DEFAULT_RPM

---

# TypeScript Standards

Always enable strict mode.

Avoid using:

any

Prefer:

unknown

interfaces

types

Use interfaces for object contracts.

Use enums only when necessary.

---

# React Standards

Use Functional Components.

Prefer Hooks.

Avoid Class Components.

Component Structure

Component

↓

Hooks

↓

Handlers

↓

Rendering

---

# Component Rules

Each component should have a single responsibility.

Example

MachineCard

Displays machine information only.

HealthGauge

Displays health score only.

PredictionCard

Displays AI prediction only.

---

# Folder Structure

```
components/

features/

hooks/

pages/

layouts/

services/

types/

utils/

```

Never mix unrelated code.

---

# Backend Standards

Framework

FastAPI

Architecture

Router

↓

Service

↓

Repository

↓

Database

Business logic never belongs inside routers.

---

# Python Standards

Follow PEP 8.

Maximum line length

100 Characters

Use:

Type Hints

Docstrings

Meaningful variable names

Avoid global variables.

---

# Database Standards

Never write raw SQL unless necessary.

Use SQLAlchemy ORM.

Always use migrations.

Never delete production data manually.

---

# API Standards

REST Naming

Good

GET /machines

POST /machines

GET /machines/{id}

Bad

/getMachines

/createMachine

---

# Error Handling

Always return structured errors.

Example

```
{
  "success": false,
  "error_code": "MACHINE_NOT_FOUND",
  "message": "Machine does not exist."
}
```

Never expose internal stack traces.

---

# Logging

Log:

Errors

Warnings

Important Events

Do not log:

Passwords

Tokens

Secrets

Sensitive User Data

---

# Documentation

Every important function should include:

Purpose

Parameters

Return Value

Exceptions

Example

```python
def calculate_health_score():
    """
    Calculates overall machine health score.
    """
```

---

# Comments

Write comments only when necessary.

Explain **why**, not **what**.

Bad

```python
# Increment i

i += 1
```

Good

```python
# Retry because sensor packets may arrive out of order

retry_count += 1
```

---

# Git Standards

One feature per branch.

Meaningful commit messages.

Examples

feat(ai): add prediction pipeline

fix(api): validate machine id

docs: update architecture

---

# Code Reviews

Every Pull Request should verify:

Readability

Performance

Security

Testing

Documentation

No duplicated code

---

# Performance

Avoid unnecessary re-renders.

Lazy load heavy components.

Use pagination.

Optimize database queries.

Cache when appropriate.

---

# Security

Never trust user input.

Always validate requests.

Escape output when necessary.

Store secrets in environment variables.

---

# Testing

Every feature should include tests.

Unit Tests

Integration Tests

API Tests

Coverage Target

Minimum 85%

---

# Formatting

Frontend

Prettier

Backend

Black

Linting

ESLint

Ruff (Python)

---

# Dependencies

Only add dependencies when necessary.

Evaluate:

Maintenance

Community

Security

Performance

License

---

# Code Quality Checklist

Before merging:

✔ Builds Successfully

✔ Lint Passes

✔ Tests Pass

✔ Documentation Updated

✔ No Secrets

✔ No Dead Code

✔ No Console Logs

---

# Future Standards

Monorepo Tooling

Nx or Turborepo

Architecture Decision Records (ADR)

Automated Dependency Scanning

Static Code Analysis

AI-assisted Code Review

---

# Related Documents

18_Testing_Strategy.md

21_Git_Workflow.md

17_Security_Model.md

---

# Summary

TwinForge AI follows strict engineering standards to ensure long-term maintainability, scalability, and reliability.

By enforcing consistent coding practices across frontend, backend, AI, and infrastructure, the project remains production-ready as it evolves from a college MVP into an Industry 4.0 SaaS platform.

---