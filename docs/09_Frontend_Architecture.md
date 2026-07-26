# Frontend Architecture

<<<<<<< HEAD
## Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool (HMR, fast builds)
- **TailwindCSS** — Utility-first styling
- **React Router v6** — Client-side routing
- **React Query (TanStack)** — Server state, caching, refetching
- **Zustand** — Global UI state (alerts, WebSocket state)
- **Three.js + React Three Fiber** — 3D Digital Twin
- **Recharts** — Sensor trend charts

## Folder Structure

```
frontend/src/
├── app/
│   └── App.tsx            # Root component, router setup
├── components/
│   ├── ui/                # Reusable: Button, Card, Badge, Modal
│   ├── charts/            # SensorChart, TrendChart, SparkLine
│   ├── twin/              # MotorTwin3D, TwinScene, TwinControls
│   └── layout/            # Sidebar, Topbar, PageHeader
├── features/
│   ├── dashboard/         # Fleet overview, KPI cards
│   ├── machines/          # Machine list, detail page
│   ├── sensors/           # Live sensor panel, history
│   ├── predictions/       # Health score, RUL display
│   ├── alerts/            # Alert list, notification center
│   ├── maintenance/       # Schedule view, work orders
│   ├── analytics/         # Historical trends, reports
│   ├── energy/            # Power consumption, anomalies
│   ├── assistant/         # Factory Assistant chat UI
│   └── auth/              # Login, session management
├── services/
│   ├── api.ts             # Axios instance, interceptors
│   ├── websocket.ts       # WS connection manager
│   └── endpoints/         # Per-resource API functions
├── hooks/
│   ├── useMachine.ts
│   ├── useSensorData.ts
│   ├── usePrediction.ts
│   ├── useWebSocket.ts
│   └── useAlerts.ts
├── store/
│   ├── alertStore.ts      # Zustand: active alerts
│   └── wsStore.ts         # Zustand: WebSocket connection state
├── types/
│   ├── machine.types.ts
│   ├── sensor.types.ts
│   ├── prediction.types.ts
│   └── alert.types.ts
└── styles/
    ├── globals.css        # TailwindCSS base
    └── design-tokens.css  # CSS custom properties
```

## Design System

**Colors (dark theme):**
- Background: `#0a0b0d`
- Surface: `#111318`
- Border: `#1e2330`
- Text primary: `#e8eaf0`
- Text muted: `#8892a4`
- Accent blue: `#3b82f6`
- Health green: `#10b981`
- Warning amber: `#f59e0b`
- Critical red: `#ef4444`
- AI purple: `#8b5cf6`

**Typography:**
- UI: Inter (system-ui fallback)
- Data/numbers: tabular-nums variant
- Code: JetBrains Mono

## State Management Strategy

| Data type | Tool | Why |
|---|---|---|
| Server data (machines, predictions) | React Query | Caching, auto-refetch, loading states |
| Real-time sensor data | React Query + WS | WS updates React Query cache |
| UI state (modals, alerts) | Zustand | Simple, no boilerplate |
| Form state | React Hook Form | Validation, performance |
| Auth state | Zustand + localStorage | Persist token |
=======
> Enterprise Frontend Blueprint for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Frontend Architecture |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the frontend architecture of TwinForge AI.

It explains:

- Folder structure
- Component architecture
- State management
- Routing
- Theme system
- Dashboard layout
- Digital Twin integration
- WebSocket architecture
- Performance optimization
- Design principles

This document serves as the implementation guide for the frontend.

---

# Frontend Goals

The frontend should feel like modern enterprise software.

Users should immediately understand:

- Machine Health
- Current Alerts
- AI Predictions
- Digital Twin Status

without feeling overwhelmed.

---

# Technology Stack

Framework

React

Language

TypeScript

Bundler

Vite

Styling

TailwindCSS

Routing

React Router

Server State

TanStack Query

Charts

Recharts

3D

Three.js

React Three Fiber

Icons

Lucide React

Animations

Framer Motion

Forms

React Hook Form

Validation

Zod

---

# Frontend Architecture

```

Pages

↓

Layouts

↓

Features

↓

Components

↓

Hooks

↓

Services

↓

API

```

---

# Folder Structure

```
frontend/

├── public/

├── src/

│
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx
│   └── providers.tsx
│
├── assets/
│
├── components/
│   ├── common/
│   ├── ui/
│   ├── charts/
│   ├── forms/
│   └── layout/
│
├── features/
│   ├── dashboard/
│   ├── machines/
│   ├── sensors/
│   ├── alerts/
│   ├── maintenance/
│   ├── analytics/
│   ├── digital-twin/
│   ├── ai-assistant/
│   └── settings/
│
├── hooks/
│
├── services/
│
├── api/
│
├── store/
│
├── styles/
│
├── types/
│
├── utils/
│
└── config/

```

---

# Feature Modules

Each feature owns its own:

Pages

Components

Hooks

API

Types

Tests

Example

```
features/

machines/

├── pages/

├── components/

├── hooks/

├── api/

├── types/

└── tests/

```

---

# Routing

```
/

↓

Dashboard

↓

Machines

↓

Machine Details

↓

Analytics

↓

Maintenance

↓

Digital Twin

↓

AI Assistant

↓

Settings

```

Example Routes

```
/

/dashboard

/machines

/machines/:id

/analytics

/maintenance

/digital-twin

/settings

```

---

# Layout Structure

```
+------------------------------------+

Sidebar

|

Top Navigation

|

Main Content

|

Footer

+------------------------------------+

```

---

# Sidebar Navigation

Dashboard

Machines

Sensors

Predictions

Alerts

Maintenance

Analytics

Energy

Digital Twin

AI Assistant

Settings

---

# Dashboard Widgets

Health Score

Machine Status

Live Sensors

Alerts

Predictions

Maintenance

Energy

Digital Twin Preview

Recent Activity

AI Summary

---

# State Management

Server State

TanStack Query

Client State

React Context

Future

Zustand

---

# API Communication

REST APIs

↓

TanStack Query

↓

React Components

Caching

Retry

Loading

Error Handling

---

# WebSocket

Purpose

Live updates.

Receives

Sensor updates

Health updates

Alerts

Predictions

Digital Twin updates

---

# Theme

Dark Mode First

Primary Colors

Background

#0F172A

Cards

#111827

Accent

Blue

Success

Green

Warning

Orange

Danger

Red

---

# Design Principles

Minimal

High Information Density

Fast

Accessible

Responsive

Consistent

Enterprise Quality

---

# Component Categories

UI Components

Button

Card

Input

Dialog

Badge

Tabs

Dropdown

Feature Components

Machine Card

Health Gauge

Alert Panel

Prediction Card

Maintenance Timeline

Digital Twin Viewer

Sensor Chart

---

# Charts

Use

Recharts

Charts

Temperature

Vibration

Current

RPM

Health Trend

Failure Probability

Maintenance Timeline

---

# Digital Twin

Technology

Three.js

React Three Fiber

Features

3D Motor

Health Color

Animation

Live Synchronization

Component Highlighting

---

# Authentication Flow

User Login

↓

JWT Token

↓

Protected Routes

↓

Dashboard

↓

API Requests

---

# Error Handling

Global Error Boundary

Network Retry

Offline Message

Empty States

Loading Skeletons

---

# Performance

Lazy Loading

Code Splitting

Memoization

Image Optimization

Virtualized Lists

Query Caching

WebSocket Reuse

---

# Accessibility

Keyboard Navigation

Screen Reader Support

Focus Indicators

ARIA Labels

Color Contrast

---

# Responsive Design

Desktop

Primary Experience

Tablet

Supported

Mobile

Monitoring Only

Future

Native Mobile App

---

# Testing

Unit Tests

Component Tests

Integration Tests

End-to-End Tests

---

# Future Improvements

Command Palette

Multi-language Support

Custom Dashboards

Plugin System

White-label Themes

Offline Mode

PWA Support

---

# Related Documents

08_Backend_Architecture.md

10_Database_Design.md

11_API_Specification.md

15_Digital_Twin.md

16_UI_UX_System.md

---

# Summary

The TwinForge AI frontend is designed as a modular, scalable, and high-performance enterprise application.

Its architecture emphasizes maintainability, real-time interaction, and an intuitive user experience while supporting Digital Twin visualization, Explainable AI, and industrial analytics.

The frontend is built to evolve from a college prototype into a production-ready SaaS platform without major architectural changes.

---
>>>>>>> e4fea739018aef91fb91a75cd8174f3e53823c57
