# Frontend Architecture

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
