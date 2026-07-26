<p align="center">
  <img src="assets/logo/twinforge-logo.png" alt="TwinForge AI" width="120"/>
</p>

<h1 align="center">TwinForge AI</h1>
<p align="center"><strong>Intelligent Digital Twins for Industrial Machines</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/status-MVP%20Development-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/version-0.1.0-informational?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square"/>
  <img src="https://img.shields.io/badge/platform-Industry%204.0-orange?style=flat-square"/>
</p>

---

## What is TwinForge AI?

TwinForge AI is an **Industry 4.0 predictive maintenance platform** that creates intelligent Digital Twins of industrial machines and predicts failures before they happen using Artificial Intelligence.

The platform combines IoT, Mechanical Engineering, AI, Cloud Computing, and 3D Visualization into one unified industrial ecosystem.

---

## The Problem

Most factories operate on reactive maintenance:

```
Machine → Failure → Costly Repair → Downtime
```

TwinForge AI changes this to:

```
Machine → AI Prediction → Scheduled Maintenance → Zero Downtime
```

---

## Core Features

| Feature | Status |
|---|---|
| Live sensor monitoring (Temperature, Vibration, Current, RPM) | 🔧 In Progress |
| AI-powered failure prediction with health score | 🔧 In Progress |
| Remaining Useful Life (RUL) estimation | 🔧 In Progress |
| 3D Digital Twin visualization | 🔧 In Progress |
| Factory Assistant (natural language AI) | 🔧 In Progress |
| Real-time WebSocket dashboard | 🔧 In Progress |
| Explainable AI (no black-box) | 🔧 In Progress |
| ESP32 IoT integration | 🔧 In Progress |
| Maintenance scheduling | 📅 Planned |
| Energy AI | 📅 Planned |
| Multi-machine / multi-factory | 📅 Planned |

---

## Tech Stack

**Frontend** — React · TypeScript · Vite · TailwindCSS · Three.js · Recharts  
**Backend** — FastAPI · Python · SQLAlchemy · PostgreSQL · WebSockets  
**AI** — Scikit-Learn · TensorFlow · Pandas · NumPy  
**Hardware** — ESP32 · MQTT / HTTP  
**Infrastructure** — Docker · GitHub Actions · Nginx  

---

## Project Structure

```
TwinForge-AI/
├── docs/           # All engineering documentation (51 documents)
├── frontend/       # React + TypeScript dashboard
├── backend/        # FastAPI REST + WebSocket server
├── ai/             # Prediction AI, Factory Assistant, and future agents
├── iot/            # ESP32 firmware and sensor communication
├── digital-twin/   # Three.js 3D visualization
├── database/       # PostgreSQL schema and migrations
├── tests/          # Unit, integration, API, AI, hardware tests
├── docker/         # Container configuration
├── scripts/        # Setup, deployment, utilities
├── research/       # Papers, datasets, experiments
└── tools/          # Simulators, diagnostics, monitoring
```

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/twinforge-ai.git
cd TwinForge-AI

# 2. Copy environment variables
cp .env.example .env

# 3. Start all services
docker-compose up -d

# 4. Visit dashboard
open http://localhost:3000
```

---

## Documentation

All engineering documentation lives in [`/docs`](docs/). Start here:

1. [Project Overview](docs/00_Project_Overview.md)
2. [System Architecture](docs/02_System_Architecture.md)
3. [AI Architecture](docs/12_AI_Architecture.md)
4. [API Specification](docs/11_API_Specification.md)
5. [Database Design](docs/10_Database_Design.md)

---

## Roadmap

| Phase | Milestone | Target |
|---|---|---|
| Phase 1 | Documentation complete | Q1 2026 |
| Phase 2 | Frontend dashboard | Q1 2026 |
| Phase 3 | Backend APIs | Q2 2026 |
| Phase 4 | ESP32 + sensors | Q2 2026 |
| Phase 5 | Prediction AI | Q2 2026 |
| Phase 6 | Digital Twin | Q3 2026 |
| Phase 7 | MVP complete | Q3 2026 |
| Phase 8 | Pilot deployment | Q4 2026 |
| Phase 9 | Commercial launch | Q1 2027 |

---

## Vision

> Build an affordable Industry 4.0 predictive maintenance platform that enables factories of all sizes — competing with Siemens MindSphere, PTC ThingWorx, and Azure Digital Twins.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">Built with 🔧 by the TwinForge AI team · 2026</p>
