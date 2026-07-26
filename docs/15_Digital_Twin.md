# Digital Twin Architecture

## Concept

The Digital Twin is a real-time 3D representation of the physical machine. It reflects the machine's health state visually. Color, animations, and highlighted components communicate failure risk at a glance.

## Health State Mapping

| Health Score | Color | Animation | Description |
|---|---|---|---|
| 80–100 | 🟢 Green (#10b981) | Smooth rotation | Healthy |
| 60–79 | 🟡 Yellow (#f59e0b) | Normal rotation | Warning |
| 30–59 | 🟠 Amber (#f97316) | Slight vibration | High Risk |
| 0–29 | 🔴 Red (#ef4444) | Shake animation | Critical |
| Offline | ⚫ Gray (#374151) | Stopped | No data |

## Technology Stack

- **Three.js** — 3D rendering engine
- **React Three Fiber** — React wrapper for Three.js
- **@react-three/drei** — Helpers (OrbitControls, Environment, Text)
- **GSAP** — Smooth animation transitions

## 3D Model Structure

```
MotorScene
├── Environment (HDRI lighting)
├── MotorBody (main cylindrical housing)
│   ├── StatorHousing (outer case)
│   ├── CoolingFins (ribs on housing)
│   ├── TerminalBox (connection box)
│   └── HealthEmissive (color overlay driven by health score)
├── Shaft (protruding shaft + coupling)
├── EndShields (front and rear bearing caps)
│   └── BearingIndicator (highlighted when bearing fault)
├── CoolingFan (rear fan with rotation animation)
│   └── FanFaultIndicator
├── SensorOverlays
│   ├── TemperatureHeatmap
│   └── VibrationParticles
└── InfoPanel (floating health data overlay)
```

## WebSocket Synchronization

```typescript
// Every time backend sends prediction_update event:
onPredictionUpdate(data => {
  twinStore.setHealthScore(data.health_score);
  twinStore.setFailureType(data.failure_type);
  twinStore.setFaultComponents(data.faulty_components);
  // Three.js material colors update automatically via store
});
```

## 3D Model Source

MVP: Parametrically generated motor model using Three.js primitives.  
Phase 2: Import from Blender GLTF export.  
Phase 3: Import from CAD (SolidWorks → GLTF pipeline).
