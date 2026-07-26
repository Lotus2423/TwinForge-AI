# AI Architecture

<<<<<<< HEAD
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
=======
> Explainable Artificial Intelligence Architecture for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | AI Architecture |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the Artificial Intelligence architecture of TwinForge AI.

It explains:

- Prediction AI
- Factory Assistant AI
- Explainable AI (XAI)
- AI pipeline
- Feature engineering
- Model lifecycle
- Remaining Useful Life (RUL)
- Confidence scoring
- Future AI agents

The goal is to transform raw sensor data into actionable industrial intelligence.

---

# AI Vision

TwinForge AI is not designed to simply display sensor values.

Instead, it should:

- Predict failures before they occur
- Explain why a prediction was made
- Estimate remaining machine life
- Recommend maintenance actions
- Learn from historical data
- Continuously improve model performance

---

# AI Architecture Overview

```
Industrial Machine
        │
        ▼
Sensors
        │
        ▼
ESP32 Edge Device
        │
        ▼
Backend API
        │
        ▼
Data Processing
        │
        ▼
Feature Engineering
        │
        ▼
Prediction AI
        │
        ▼
Explainable AI
        │
        ▼
Factory Assistant AI
        │
        ▼
Dashboard + Digital Twin
```

---

# AI Components

TwinForge AI MVP consists of two AI systems.

## 1. Prediction AI

Purpose

Predict machine health and future failures.

Inputs

- Temperature
- Vibration
- Current
- RPM
- Historical Sensor Data
- Machine Metadata

Outputs

- Health Score
- Failure Probability
- Failure Type
- Remaining Useful Life
- Confidence Score

---

## 2. Factory Assistant AI

Purpose

Explain predictions using natural language.

Example

Question

Why is Motor-01 unhealthy?

Response

Motor-01 has experienced a continuous increase in vibration and bearing temperature over the last six days. This pattern closely matches historical bearing wear. Remaining Useful Life is estimated at five days. An inspection of the drive-end bearing is recommended immediately.

---

# AI Processing Pipeline

```
Raw Sensor Data

↓

Validation

↓

Cleaning

↓

Feature Engineering

↓

Prediction Model

↓

Explainability Engine

↓

Recommendation Engine

↓

Dashboard
```

---

# Data Validation

Every reading must pass validation.

Checks

- Missing values
- Invalid ranges
- Duplicate timestamps
- Sensor offline detection
- Outlier filtering

Invalid data is excluded from AI inference.

---

# Feature Engineering

Example Features

Temperature Average

Temperature Trend

Temperature Rate of Change

Maximum Temperature

Minimum Temperature

Vibration RMS

Current Mean

RPM Stability

Operating Hours

Previous Failures

Maintenance History

Environmental Conditions

---

# Machine Health Score

Health Score Range

| Score | Status |
|--------|--------|
| 90–100 | Excellent |
| 75–89 | Good |
| 60–74 | Warning |
| 40–59 | High Risk |
| 0–39 | Critical |

Health score is calculated using multiple weighted features rather than a single sensor.

---

# Failure Probability

Output

0–100%

Example

Bearing Wear

91%

Rotor Damage

12%

Stator Fault

6%

Cooling Fan Failure

18%

The highest probability determines the primary predicted fault.

---

# Remaining Useful Life (RUL)

Purpose

Estimate how long the machine can continue operating safely.

Example

Machine

Motor-01

Predicted RUL

5 Days

Confidence

94%

---

# Explainable AI (XAI)

TwinForge AI never returns unexplained predictions.

Every prediction must include:

Reason

Evidence

Sensor Trends

Confidence

Recommended Action

Example

Prediction

Bearing Wear

Reason

Temperature increased by 18%.

Vibration increased by 42%.

Pattern matches previous bearing failures.

---

# Recommendation Engine

Examples

Inspect Bearing

Replace Cooling Fan

Check Lubrication

Reduce Machine Load

Schedule Maintenance

Monitor for 24 Hours

Recommendations should be prioritized based on risk.

---

# AI Model Lifecycle

```
Collect Data

↓

Clean Data

↓

Train Model

↓

Validate

↓

Deploy

↓

Monitor

↓

Retrain

↓

Deploy New Version
```

---

# Initial Machine Learning Models

Prototype

Random Forest

Future

XGBoost

LightGBM

LSTM

Temporal CNN

Transformer Models

The architecture should allow model replacement without changing APIs.

---

# Model Evaluation

Metrics

Accuracy

Precision

Recall

F1 Score

ROC-AUC

Mean Absolute Error (RUL)

Confusion Matrix

---

# Confidence Score

Every prediction includes a confidence score.

Example

Prediction

Bearing Wear

Confidence

94%

Low-confidence predictions should be clearly marked.

---

# AI Training Data

Sources

Sensor Readings

Maintenance History

Failure Logs

Synthetic Data (Prototype)

Public Datasets

Future Industrial Partners

---

# AI Model Versioning

Each deployed model should store:

Model ID

Version

Training Date

Training Dataset

Performance Metrics

Deployment Date

Rollback Capability

---

# Factory Assistant Workflow

```
User Question

↓

Retrieve Machine Context

↓

Retrieve Latest Prediction

↓

Retrieve Sensor Trends

↓

LLM Prompt Builder

↓

Factory Assistant

↓

Explainable Response
```

---

# Future AI Agents

Prediction AI

Factory Assistant AI

Maintenance AI

Energy AI

Digital Twin AI

Future agents communicate through internal APIs rather than direct database access.

---

# Ethical AI Principles

Predictions must be:

Explainable

Auditable

Reliable

Transparent

Traceable

No black-box decisions should be presented to users.

---

# Related Documents

06_Failure_Analysis.md

10_Database_Design.md

13_Explainable_AI.md

14_Factory_Assistant.md

15_Digital_Twin.md

---

# Summary

The AI architecture transforms TwinForge AI from a monitoring platform into an intelligent industrial assistant.

By combining predictive models, explainable reasoning, and natural language interaction, the platform enables engineers to understand not only what is happening but why it is happening and what action should be taken next.

The architecture is modular, scalable, and designed to support future AI agents without fundamental redesign.

---
>>>>>>> e4fea739018aef91fb91a75cd8174f3e53823c57
