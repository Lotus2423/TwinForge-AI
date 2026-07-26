# Testing Strategy

## Test Pyramid

```
        ┌─────┐
        │ E2E │  (5%) — Critical user flows
        ├─────┴──────┐
        │Integration │  (25%) — API + DB
        ├────────────┴────────┐
        │      Unit Tests      │  (70%) — Business logic
        └─────────────────────┘
```

## Backend Tests (pytest)

```bash
tests/
├── unit/
│   ├── test_prediction_ai.py    # AI model output validation
│   ├── test_health_score.py     # Health calculation
│   ├── test_sensor_validation.py
│   └── test_alert_engine.py
├── integration/
│   ├── test_sensor_ingestion.py # Full ingest pipeline
│   ├── test_auth_flow.py
│   └── test_websocket.py
└── api/
    ├── test_machines_api.py
    ├── test_sensors_api.py
    └── test_predictions_api.py
```

## Frontend Tests (Vitest + React Testing Library)

```bash
tests/frontend/
├── components/
│   ├── SensorCard.test.tsx
│   ├── HealthBadge.test.tsx
│   └── PredictionPanel.test.tsx
└── hooks/
    ├── useSensorData.test.ts
    └── useWebSocket.test.ts
```

## AI Tests

```bash
tests/ai/
├── test_model_accuracy.py       # Minimum 90% accuracy on test set
├── test_rul_estimation.py       # RUL within ±10% of actual
├── test_explanation_generation.py
└── test_feature_importance.py
```

## CI Checks (GitHub Actions)

1. Lint: ruff (Python), ESLint (TypeScript)
2. Type check: mypy (Python), tsc (TypeScript)
3. Unit tests: pytest + vitest
4. Integration tests: pytest with test DB
5. Build check: Docker build

Coverage minimum: 80%
