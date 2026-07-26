# Explainable AI (XAI)

## Principle

Every prediction TwinForge AI makes must be explainable in plain language. No black boxes. A maintenance engineer must understand *why* the AI made a decision.

## XAI Techniques Used

### SHAP (SHapley Additive exPlanations)
- Assigns each feature a contribution value for every prediction
- Example: vibration_trend contributed +34% to failure probability, temperature_trend contributed +22%

### Rule Extraction
- Extract top decision rules from Random Forest
- "IF vibration > 6.0 AND temp_trend > 0.8°C/day THEN bearing_wear probability = 89%"

### Trend Narration Engine
Converts feature importance + trends into human-readable text:

```python
def generate_explanation(prediction, sensor_history, feature_importance):
    narrative = []
    
    if feature_importance['vibration_trend'] > 0.3:
        vib_change = calculate_percent_change(sensor_history['vibration'], days=7)
        narrative.append(
            f"Vibration has increased by {vib_change:.0f}% over the last 7 days, "
            f"now at {sensor_history['vibration'].iloc[-1]:.1f} mm/s."
        )
    
    if feature_importance['temperature_trend'] > 0.2:
        temp_rise = sensor_history['temperature'].iloc[-1] - sensor_history['temperature'].iloc[0]
        narrative.append(
            f"Temperature has risen by {temp_rise:.1f}°C this week, "
            f"indicating reduced cooling efficiency."
        )
    
    narrative.append(
        f"This pattern is consistent with {prediction.failure_type.replace('_',' ')} "
        f"based on {len(similar_cases)} historical failure cases in the training dataset."
    )
    
    return " ".join(narrative)
```

## Output Format

Every prediction includes:
1. `explanation` — Full text explanation (200–400 words)
2. `feature_importance` — JSON with SHAP values per feature
3. `similar_cases` — Count of matching historical patterns
4. `confidence` — Model confidence in this prediction
5. `recommended_action` — Specific next step
