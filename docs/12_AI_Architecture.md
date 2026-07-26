# AI Architecture

## Overview

TwinForge AI MVP contains two AI systems. Future roadmap adds three more agents.

## Prediction AI

### Purpose
Analyze sensor time-series data and output:
- Health Score (0–100)
- Failure Probability (0.0–1.0)
- Failure Type (bearing_wear, overheating, etc.)
- Remaining Useful Life in days
- Confidence Score
- Feature importance (XAI)

### Model Stack (Phase 1)

**Feature Engineering:**
- 7-day rolling mean for each sensor
- 7-day rolling standard deviation
- Trend slope (linear regression coefficient)
- Rate of change (derivative)
- Cross-sensor correlations

**Model Pipeline:**
```
Raw sensor readings (7-day window)
        ↓
Feature engineering (Pandas)
        ↓
Normalization (StandardScaler)
        ↓
Random Forest Classifier → Failure type + probability
        ↓
LSTM Regressor → RUL estimation
        ↓
XAI Layer (SHAP values) → Feature importance
        ↓
Health Score formula → 100 × (1 − failure_probability) × rul_factor
```

**Phase 2 (Production):**
Replace Random Forest with LSTM end-to-end.  
Add anomaly detection (Isolation Forest or Autoencoder).

### Training Data Strategy

**Phase 1:** Synthetic dataset generated from motor failure physics:
- Normal operation: 10,000 samples
- Bearing wear progression: 2,000 samples
- Overheating events: 1,500 samples
- Rotor fault patterns: 1,000 samples

**Phase 2:** Real data from pilot factories. Model continuously retrained.

## Factory Assistant AI

### Purpose
Translate technical sensor data into plain-language explanations for maintenance engineers and plant managers.

### Architecture
```
User question + Machine context
        ↓
Context builder (fetch latest sensor history, prediction, alerts)
        ↓
Structured prompt (system + context + user question)
        ↓
LLM (Claude claude-sonnet-4-6 via Anthropic API)
        ↓
Structured response with explanation + recommendation
        ↓
Store in conversation history
```

### Context Injection Template
```
You are TwinForge Factory Assistant, an expert in industrial machine maintenance.

Current machine: {machine_name} ({machine_type})
Location: {bay}
Last sensor reading: {timestamp}
  Temperature: {temp}°C (trend: {temp_trend} over 7 days)
  Vibration: {vib} mm/s (trend: {vib_trend} over 7 days)
  Current: {current} A
  RPM: {rpm}

AI Prediction:
  Health Score: {health_score}/100
  Failure Probability: {failure_prob}%
  Failure Type: {failure_type}
  Remaining Useful Life: {rul} days

Active Alerts: {alerts}

Answer the engineer's question. Be specific. Mention sensor values and trends.
Explain the failure chain. Give a clear maintenance recommendation.
```

## Future AI Agents

| Agent | Status | Purpose |
|---|---|---|
| Prediction AI | MVP | Failure prediction |
| Factory Assistant | MVP | Natural language interface |
| Maintenance AI | Phase 2 | Auto-generate maintenance schedules |
| Energy AI | Phase 2 | Power consumption optimization |
| Digital Twin AI | Phase 3 | Autonomous twin control |
