# UI/UX Design System

## Design Language

**Inspired by:** Tesla, Linear, GitHub, Siemens, Vercel  
**Theme:** Dark mode first. Premium. Industrial. Minimal.

## Color Tokens

```css
:root {
  /* Background */
  --bg-base: #0a0b0d;
  --bg-surface: #111318;
  --bg-surface-2: #181c23;
  --bg-overlay: #1e2330;

  /* Borders */
  --border-subtle: #1e2330;
  --border-default: #2a3040;
  --border-strong: #3a4255;

  /* Text */
  --text-primary: #e8eaf0;
  --text-secondary: #8892a4;
  --text-muted: #4a5568;

  /* Semantic */
  --color-healthy: #10b981;
  --color-warning: #f59e0b;
  --color-risk: #f97316;
  --color-critical: #ef4444;
  --color-accent: #3b82f6;
  --color-ai: #8b5cf6;

  /* Backgrounds (semantic) */
  --bg-healthy: #052e1c;
  --bg-warning: #2d1f00;
  --bg-critical: #2d0e0e;
  --bg-accent: #1d3a6b;
  --bg-ai: #1e1040;
}
```

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / KPI | Inter | 700 | 28–36px |
| Heading | Inter | 600 | 16–20px |
| Body | Inter | 400 | 13–14px |
| Caption / Label | Inter | 400 | 10–12px |
| Data numbers | Inter (tabular-nums) | 700 | varies |

## Component Library

### Health Badge
```tsx
<HealthBadge score={34} />
// Renders: "Critical" badge in red
```

### Sensor Card
```tsx
<SensorCard label="Temperature" value={78.4} unit="°C" trend="up" status="warning" />
```

### Prediction Panel
```tsx
<PredictionPanel
  healthScore={34}
  failureProbability={0.91}
  failureType="bearing_wear"
  rulDays={5}
  confidence={0.87}
/>
```

## Dashboard Layout

```
┌─────────────────────────────────────────────┐
│ TOPBAR: Logo | Nav | Alerts | Clock | User  │
├──────────┬──────────────────────────────────┤
│          │  PAGE HEADER                     │
│ SIDEBAR  │  KPI CARDS (4 col)               │
│          │  ──────────────────────────────  │
│  Nav     │  MAIN GRID (2/3 + 1/3)           │
│  items   │  ┌─────────────┐ ┌─────────┐    │
│          │  │ Sensor data  │ │ Health  │    │
│          │  │ Trends       │ │ Ring    │    │
│          │  │ Fleet list   │ │ AI Chat │    │
│          │  └─────────────┘ └─────────┘    │
└──────────┴──────────────────────────────────┘
```
