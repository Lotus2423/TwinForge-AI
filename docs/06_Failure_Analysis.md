# Failure Analysis — Causal Chains

## Philosophy

TwinForge AI understands failure **chains**, not isolated readings.
A single high temperature reading may be ambient.
Temperature + vibration rising together = bearing failure in progress.

## Failure Chain 1: Cooling Fan Damage

```
Fan blade damaged / debris blockage
        ↓
Airflow over motor reduces
        ↓
Stator temperature rises (detectable: +5–10°C above baseline)
        ↓
Rotor temperature rises
        ↓
Bearing lubricant viscosity decreases
        ↓
Bearing friction increases
        ↓
Vibration increases (early: +10–20%)
        ↓
Bearing wear accelerates
        ↓
Failure (without intervention)
```

**AI Detection:** Temperature trend + Vibration trend together, neither alone sufficient.

## Failure Chain 2: Shaft Misalignment

```
Misalignment at coupling (angular / parallel)
        ↓
Asymmetric forces on bearing
        ↓
Vibration signature: 2× running frequency dominant
        ↓
Bearing load exceeds design rating
        ↓
Accelerated bearing wear
        ↓
Shaft seal damage
        ↓
Failure
```

## Failure Chain 3: Rotor Bar Breakage

```
Rotor bar crack (fatigue, thermal stress)
        ↓
Electromagnetic asymmetry
        ↓
Current draws uneven across phases
        ↓
Motor speed fluctuates (visible in RPM readings)
        ↓
Increased vibration at slip frequency sidebands
        ↓
Heat generation in rotor
        ↓
Progressive bar breakage
        ↓
Motor locked rotor / failure
```

**AI Detection:** Current pattern analysis + RPM irregularity + vibration sidebands.

## Failure Chain 4: Electrical Overload

```
Overloaded mechanical load
        ↓
Current exceeds Full Load Amps (FLA)
        ↓
Stator winding heats above rated temperature
        ↓
Winding insulation degrades
        ↓
Insulation resistance drops
        ↓
Inter-turn short circuit
        ↓
Winding burnout
```

## AI Decision Logic

```python
# Pseudo-code — actual implementation in ai/prediction_ai/
def assess_failure_chain(sensor_history: pd.DataFrame) -> FailureAssessment:
    temp_trend = calculate_trend(sensor_history['temperature'], days=7)
    vib_trend = calculate_trend(sensor_history['vibration'], days=7)
    current_pattern = analyze_current_pattern(sensor_history['current'])
    
    if temp_trend > 0.5 and vib_trend > 0.3:
        return FailureAssessment(
            type=FailureType.BEARING_WEAR,
            probability=0.91,
            chain="Fan → Cooling → Temperature → Bearing",
            rul_days=5,
            action="Inspect bearing immediately"
        )
```
