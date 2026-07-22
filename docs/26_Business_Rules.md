# TwinForge AI

# Business Rules Specification

Version: 1.0
Status: Draft
Document ID: TF-BR-026

---

# 1. Purpose

This document defines the business rules that govern the behavior of TwinForge AI.

Unlike technical implementation, business rules define **how the system should make decisions**.

These rules ensure that AI, Backend, Dashboard, Digital Twin, and Hardware always behave consistently.

---

# 2. Business Rule Categories

The business rules are divided into the following categories:

• Factory Rules

• Machine Rules

• Sensor Rules

• AI Rules

• Safety Rules

• Maintenance Rules

• Alert Rules

• Dashboard Rules

• User Rules

• Future Rules

---

# 3. Factory Rules

---

## BR-001

Every machine must belong to one factory.

---

## BR-002

A factory may contain multiple production lines.

---

## BR-003

Every production line may contain multiple machines.

---

## BR-004

Every factory shall have at least one administrator.

---

## BR-005

Factory timezone shall be used for reports and scheduling.

---

# 4. Machine Rules

---

## BR-006

Every machine shall have a globally unique Machine ID.

Example

MTR-0001

---

## BR-007

Machine names are editable.

Machine IDs are permanent.

---

## BR-008

A machine cannot receive sensor data unless it is registered.

---

## BR-009

Machine states

• Healthy

• Warning

• Critical

• Offline

• Maintenance

---

## BR-010

Machine health shall always be calculated by AI.

Manual editing is prohibited.

---

# 5. Sensor Rules

---

## BR-011

Every sensor shall have a unique Sensor ID.

---

## BR-012

Sensors must belong to exactly one machine.

---

## BR-013

Sensor timestamps shall always be stored in UTC.

---

## BR-014

Invalid sensor values shall be rejected.

Examples

Negative RPM

Temperature = 9999°C

Current = NULL

---

## BR-015

Sensor calibration values must be configurable.

---

# 6. AI Rules

---

## BR-016

Prediction AI shall never generate a prediction using only one sensor.

Minimum required inputs

Temperature

Vibration

Current

RPM

---

## BR-017

Every prediction shall include:

Health Score

Failure Probability

Remaining Useful Life (RUL)

Confidence Score

Reasoning

Recommendation

---

## BR-018

If prediction confidence is below 70%

AI shall display

"Low Confidence"

---

## BR-019

Every prediction shall reference historical trends.

---

## BR-020

Black-box predictions are prohibited.

Every AI decision must be explainable.

---

# 7. Safety Guardian Rules

---

## BR-021

Safety Guardian continuously monitors all active machines.

---

## BR-022

Emergency decisions require multiple validation checks.

The AI must evaluate:

• Temperature trend

• Vibration trend

• Current trend

• RPM trend

• Historical failures

• Confidence score

---

## BR-023

Single abnormal sensor values shall never trigger an emergency shutdown.

---

## BR-024

Safety Guardian actions depend on configured factory policy.

Modes

Manual

Assisted

Autonomous

---

## BR-025

Before any autonomous shutdown, the system shall verify:

• Machine identity

• Communication status

• Prediction confidence

• Active safety policy

• PLC availability

• Human override status

---

## BR-026

Every autonomous action must generate:

Incident Report

Audit Log

AI Explanation

Notification

Maintenance Ticket

---

## BR-027

Human safety always has higher priority than equipment protection.

TwinForge AI must never replace certified industrial safety systems.

---

# 8. Maintenance Rules

---

## BR-028

Maintenance schedules shall be generated using AI recommendations.

---

## BR-029

Completed maintenance shall reset prediction history only after engineer confirmation.

---

## BR-030

Every maintenance activity must be recorded permanently.

---

## BR-031

Maintenance records cannot be deleted.

---

## BR-032

Replaced components shall be linked to Machine Passport.

---

# 9. Alert Rules

---

## BR-033

Alerts are generated from:

Prediction AI

Sensor Thresholds

Safety Guardian

Manual Reports

---

## BR-034

Alert Severity Levels

Information

Warning

Critical

Emergency

---

## BR-035

Emergency alerts bypass notification filters.

---

## BR-036

Critical alerts require acknowledgement.

---

## BR-037

Ignored critical alerts trigger escalation.

---

# 10. Dashboard Rules

---

## BR-038

Dashboard updates automatically using WebSockets.

---

## BR-039

Digital Twin colors shall always match AI Health Score.

Green

Healthy

Yellow

Warning

Orange

High Risk

Red

Critical

Gray

Offline

---

## BR-040

Historical charts cannot be modified manually.

---

# 11. User Rules

---

## BR-041

Every user shall have exactly one primary role.

---

## BR-042

Permission changes require administrator approval.

---

## BR-043

Inactive users cannot access factory data.

---

## BR-044

Every login attempt shall be logged.

---

## BR-045

Failed login attempts trigger security monitoring.

---

# 12. Machine Memory Rules (Future)

---

## BR-046

Every machine shall maintain a permanent operational memory.

Contents

Failures

Maintenance

AI Decisions

Operator Notes

Sensor History

---

# 13. Machine Passport Rules (Future)

---

## BR-047

Each machine shall have a permanent digital passport.

The passport cannot be deleted.

---

# 14. Digital Machine DNA Rules (Future)

---

## BR-048

AI continuously learns machine-specific behavior.

Each machine develops a unique operational profile.

---

# 15. Reliability AI Rules (Future)

---

## BR-049

Reliability AI shall identify recurring failures and recommend long-term improvements.

---

# 16. Business Rule Priorities

Critical

Must exist in MVP.

High

Implemented during early releases.

Medium

Planned after MVP.

Future

Long-term roadmap.

---

# 17. Rule Governance

Business rules may only be modified by:

• System Administrators

• Authorized Engineering Team

Every rule modification shall be version controlled.

---

# End of Document