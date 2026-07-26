# Glossary

<<<<<<< HEAD
| Term | Definition |
|---|---|
| Digital Twin | A real-time virtual replica of a physical machine, synchronized with sensor data |
| Predictive Maintenance | Maintenance performed based on AI predictions, before failure occurs |
| Reactive Maintenance | Maintenance performed after a machine has already failed |
| RUL | Remaining Useful Life — estimated time until a machine component fails |
| Health Score | A 0–100 score representing machine condition (100 = perfect, 0 = failed) |
| Feature Engineering | Transforming raw sensor data into meaningful inputs for AI models |
| SHAP | SHapley Additive exPlanations — technique for explaining AI model decisions |
| XAI | Explainable Artificial Intelligence — AI that explains its own decisions |
| IoT | Internet of Things — physical devices connected to the internet |
| ESP32 | A low-cost microcontroller with built-in WiFi used for sensor reading |
| MQTT | Message Queuing Telemetry Transport — lightweight IoT messaging protocol |
| FLA | Full Load Amperes — rated current at full mechanical load |
| RMS | Root Mean Square — mathematical measure used for vibration and current |
| ISO 10816 | International standard for machine vibration severity zones |
| Industry 4.0 | The fourth industrial revolution: automation, data exchange, AI in manufacturing |
| Induction Motor | An AC electric motor where rotor current is induced by the stator magnetic field |
| Bearing | A machine element that constrains relative motion between machine parts |
| Stator | The stationary part of a motor that generates the rotating magnetic field |
| Rotor | The rotating part of a motor driven by electromagnetic induction |
=======
> Technical Reference Dictionary for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Glossary |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This glossary defines the technical terms, abbreviations, and concepts used throughout TwinForge AI.

It serves as a common reference for developers, engineers, researchers, and contributors.

---

# A

## AI (Artificial Intelligence)

Computer systems that perform tasks requiring human intelligence such as prediction, reasoning, and decision support.

---

## API (Application Programming Interface)

A set of rules that allows software systems to communicate.

Example:

Frontend → Backend

---

## Authentication

Verifying the identity of a user or device.

---

## Authorization

Determining what an authenticated user is allowed to access.

---

# B

## Bearing

A mechanical component that supports rotating shafts while reducing friction.

---

## Backend

The server-side application responsible for business logic, APIs, database access, and AI integration.

---

## Bug

An error or defect in software.

---

# C

## CI/CD

Continuous Integration and Continuous Deployment.

Automates testing and deployment.

---

## Cloud Computing

Running applications on remote servers instead of local machines.

---

## Confidence Score

A value representing how certain the AI model is about a prediction.

---

# D

## Dashboard

The main interface where users monitor machine status, predictions, alerts, and analytics.

---

## Database

Structured storage for application data.

TwinForge AI uses PostgreSQL.

---

## Digital Twin

A virtual representation of a physical machine that updates using real-time sensor data.

---

## Docker

A containerization platform used to package and deploy applications consistently.

---

# E

## Edge Device

A computing device located near the machine.

Example:

ESP32

---

## Explainable AI (XAI)

AI that explains how and why it reached a prediction.

---

## ESP32

A microcontroller used to collect sensor data and transmit it to the backend.

---

# F

## Factory Assistant AI

The conversational AI agent that explains predictions and answers engineering questions.

---

## Failure Probability

The likelihood that a machine will fail within a specific period.

---

## FastAPI

A modern Python framework used to build REST APIs.

---

# G

## Git

Version control system for source code.

---

## GitHub Actions

Automation platform used for testing and deployment.

---

# H

## Health Score

A numerical indicator of machine condition.

100

Perfect Health

0

Complete Failure

---

## HTTP

HyperText Transfer Protocol.

Used for communication between systems.

---

# I

## Industry 4.0

The integration of IoT, AI, automation, cloud computing, and analytics into manufacturing.

---

## IoT

Internet of Things.

Network of connected devices exchanging data.

---

# J

## JWT

JSON Web Token.

Used for secure authentication.

---

# K

## KPI

Key Performance Indicator.

Measures system or business performance.

---

# L

## Latency

Time taken for a request or response.

Lower latency means faster communication.

---

## LLM

Large Language Model.

Used for Factory Assistant AI.

---

# M

## Machine Health

Overall condition of an industrial machine based on sensor data and AI predictions.

---

## MQTT

A lightweight messaging protocol commonly used in IoT systems.

---

## MTBF

Mean Time Between Failures.

Measures system reliability.

---

## MTTR

Mean Time To Repair.

Measures maintainability.

---

# N

## Nginx

Reverse proxy and web server used in deployment.

---

## Normalization

Organizing database tables to reduce redundancy.

---

# O

## OPC-UA

Industrial communication protocol used by PLCs and SCADA systems.

---

## ORM

Object Relational Mapper.

SQLAlchemy is the ORM used in TwinForge AI.

---

# P

## PLC

Programmable Logic Controller.

Industrial computer used to automate machines.

---

## Prediction AI

AI model responsible for failure prediction and health estimation.

---

## PostgreSQL

Relational database used by TwinForge AI.

---

## Predictive Maintenance

Maintenance performed before failures occur using AI predictions.

---

## Precision

Percentage of positive predictions that are correct.

---

# Q

## Query

A request sent to a database.

---

# R

## RAG

Retrieval-Augmented Generation.

Technique allowing LLMs to answer using external knowledge.

---

## React

Frontend library used to build the TwinForge AI dashboard.

---

## REST API

Architectural style for communication between frontend and backend.

---

## RPM

Revolutions Per Minute.

Measures rotational speed.

---

## RUL

Remaining Useful Life.

Estimated time before machine failure.

---

# S

## SaaS

Software as a Service.

Cloud-based software delivered through subscriptions.

---

## SCADA

Supervisory Control and Data Acquisition.

Industrial monitoring and control system.

---

## Sensor

Hardware device that measures physical parameters.

Examples

Temperature

Vibration

Current

RPM

---

## SQLAlchemy

Python ORM used by the backend.

---

## Startup MVP

Minimum Viable Product built to validate the business idea.

---

# T

## Tailwind CSS

Utility-first CSS framework used by the frontend.

---

## TensorFlow

Machine Learning framework.

---

## Three.js

JavaScript library for 3D graphics.

---

## TypeScript

Strongly typed superset of JavaScript.

---

# U

## Uvicorn

ASGI server used to run FastAPI.

---

# V

## Vibration Sensor

Sensor measuring machine vibration to detect faults.

---

## Vite

Frontend build tool used by React.

---

# W

## WebSocket

Protocol enabling real-time communication.

---

## Workflow

Sequence of development or business processes.

---

# X

## XAI

Explainable Artificial Intelligence.

Ensures AI decisions are understandable.

---

# Y

Currently no project-specific terms.

---

# Z

## Zero Trust

Security model where every request must be authenticated and authorized.

---

# Common Acronyms

| Acronym | Meaning |
|----------|---------|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| CI/CD | Continuous Integration / Continuous Deployment |
| CPU | Central Processing Unit |
| GPU | Graphics Processing Unit |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HyperText Transfer Protocol Secure |
| IoT | Internet of Things |
| JWT | JSON Web Token |
| KPI | Key Performance Indicator |
| LLM | Large Language Model |
| MQTT | Message Queuing Telemetry Transport |
| MTBF | Mean Time Between Failures |
| MTTR | Mean Time To Repair |
| OPC-UA | Open Platform Communications Unified Architecture |
| PLC | Programmable Logic Controller |
| REST | Representational State Transfer |
| RPM | Revolutions Per Minute |
| RUL | Remaining Useful Life |
| SaaS | Software as a Service |
| SCADA | Supervisory Control and Data Acquisition |
| TLS | Transport Layer Security |
| UI | User Interface |
| UX | User Experience |
| XAI | Explainable Artificial Intelligence |

---

# Related Documents

01_Project_Bible.md

02_System_Architecture.md

12_AI_Architecture.md

15_Digital_Twin.md

23_Future_AI_Agents.md

---

# Summary

The TwinForge AI Glossary provides a unified vocabulary for the entire project.

By standardizing terminology across software engineering, AI, IoT, mechanical engineering, Industry 4.0, and cloud infrastructure, the glossary improves communication, onboarding, documentation quality, and long-term maintainability.

---
>>>>>>> e4fea739018aef91fb91a75cd8174f3e53823c57
