# Machine Study — Three Phase Induction Motor

## Why This Machine First?

1. Present in 90%+ of industrial facilities worldwide
2. Well-documented failure modes
3. Multiple measurable physical parameters
4. Failures have clear early warning signals
5. Cost of failure is high but failure is predictable

## Failure Frequency (Industry Data)

| Failure Mode | Frequency |
|---|---|
| Bearing failures | 51% |
| Stator winding faults | 16% |
| Rotor failures | 10% |
| Other electrical | 12% |
| Other mechanical | 11% |

## Bearing Life Theory (L10)

L10 = (C/P)^3 × (10^6 / 60N) hours

Where:
- C = Basic dynamic load rating
- P = Equivalent dynamic bearing load
- N = Rotational speed (RPM)

Higher temperature → lubricant degrades → bearing life halves for every 15°C rise above rated temperature.

## Sensor Selection Rationale

| Sensor | What it detects |
|---|---|
| Temperature | Overheating, friction increase, cooling failure |
| Vibration (accelerometer) | Imbalance, bearing wear, misalignment, looseness |
| Current (CT clamp) | Overload, rotor bar break, electrical faults |
| RPM (hall effect) | Speed deviation, slip increase, rotor condition |

## Future Machine Expansion

After motor, TwinForge AI will support:
- Centrifugal pumps (cavitation, seal wear, impeller damage)
- Air compressors (valve wear, piston ring wear)
- CNC spindles (tool wear, chatter, bearing damage)
- Conveyor systems (belt wear, roller damage)
