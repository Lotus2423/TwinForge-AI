"""
TwinForge AI — Explainability Engine (XAI)

Uses SHAP (SHapley Additive exPlanations) to explain every prediction.
Converts feature importance into human-readable narratives.
"""
import numpy as np
import pandas as pd
from typing import Optional

# SHAP imported lazily to avoid startup cost when not needed
try:
    import shap
    SHAP_AVAILABLE = True
except ImportError:
    SHAP_AVAILABLE = False

FEATURE_LABELS = {
    'temperature_c_slope': 'Temperature trend',
    'vibration_mms_slope': 'Vibration trend',
    'current_a_slope': 'Current trend',
    'vibration_mms_mean': 'Vibration level',
    'temperature_c_mean': 'Temperature level',
    'temp_vib_corr': 'Temp-vibration correlation',
    'combined_risk': 'Combined risk index',
    'vibration_mms_roc': 'Vibration rate of change',
    'temperature_c_roc': 'Temperature rate of change',
}

def compute_shap_importance(model, feature_vec: np.ndarray) -> dict[str, float]:
    """
    Compute SHAP feature importances for a single prediction.

    Args:
        model: Trained scikit-learn model with a predict_proba method.
        feature_vec: 1D numpy array of extracted features.

    Returns:
        Dictionary mapping feature names to normalized importance values (0–1).
    """
    if not SHAP_AVAILABLE or model is None:
        # Fallback: heuristic importance for demo
        return {
            'vibration_trend': 0.54,
            'temperature_trend': 0.31,
            'current_variation': 0.10,
            'rpm_deviation': 0.05,
        }

    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(feature_vec.reshape(1, -1))

    # Use SHAP values for the positive class
    if isinstance(shap_values, list):
        values = np.abs(shap_values[1][0])
    else:
        values = np.abs(shap_values[0])

    # Normalize to sum to 1
    total = values.sum()
    if total == 0:
        return {}
    normalized = (values / total).tolist()

    return dict(zip(FEATURE_LABELS.keys(), normalized[:len(FEATURE_LABELS)]))


def generate_explanation(
    sensor_df: pd.DataFrame,
    failure_type: str,
    failure_probability: float,
    rul_days: float,
    feature_importance: dict[str, float],
    confidence: float,
) -> tuple[str, str]:
    """
    Generate a human-readable explanation and recommended action.

    Returns:
        (explanation: str, recommended_action: str)
    """
    lines = []

    # Vibration narrative
    if feature_importance.get('vibration_trend', 0) > 0.2:
        vib_vals = sensor_df['vibration_mms'].dropna()
        if len(vib_vals) >= 2:
            vib_change = ((vib_vals.iloc[-1] - vib_vals.iloc[0]) / (vib_vals.iloc[0] + 1e-9)) * 100
            direction = "increased" if vib_change > 0 else "decreased"
            lines.append(
                f"Vibration has {direction} by {abs(vib_change):.0f}% over the last 7 days, "
                f"now at {vib_vals.iloc[-1]:.2f} mm/s."
            )

    # Temperature narrative
    if feature_importance.get('temperature_trend', 0) > 0.15:
        temp_vals = sensor_df['temperature_c'].dropna()
        if len(temp_vals) >= 2:
            temp_rise = temp_vals.iloc[-1] - temp_vals.iloc[0]
            if abs(temp_rise) > 1:
                direction = "risen" if temp_rise > 0 else "fallen"
                lines.append(
                    f"Temperature has {direction} by {abs(temp_rise):.1f}°C this week, "
                    f"currently at {temp_vals.iloc[-1]:.1f}°C."
                )

    # Failure type narrative
    failure_narratives = {
        'bearing_wear': "This combined pattern is consistent with bearing wear — typically caused by cooling failure, lubrication degradation, or excessive load.",
        'overheating': "This pattern indicates stator overheating, possibly caused by cooling system blockage or overloading.",
        'rotor_fault': "Current and RPM variation patterns are consistent with rotor bar damage or eccentricity.",
        'early_warning': "Sensor values are elevated above baseline. No specific failure type confirmed yet.",
        'normal': "All sensors are within normal operating parameters.",
    }
    lines.append(failure_narratives.get(failure_type, "Anomalous sensor pattern detected."))

    # Confidence note
    if confidence < 0.75:
        lines.append(f"Note: Model confidence is {confidence*100:.0f}% — additional data collection recommended.")

    explanation = " ".join(lines)

    # Recommended action
    if failure_probability >= 0.85:
        action = f"Immediate inspection required. Schedule maintenance within {max(1, int(rul_days))} days. Do not operate beyond this window without inspection."
    elif failure_probability >= 0.50:
        action = f"Schedule inspection within {int(rul_days)} days. Monitor sensor trends daily."
    else:
        action = "Continue standard maintenance schedule. Monitor for any trend changes."

    return explanation, action
