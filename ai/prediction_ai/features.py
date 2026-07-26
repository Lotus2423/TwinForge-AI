"""
TwinForge AI — Feature Engineering Pipeline

Transforms raw sensor time-series into ML-ready feature vectors.
Called before both training and inference.
"""
import numpy as np
import pandas as pd
from scipy import stats

SENSOR_COLS = ['temperature_c', 'vibration_mms', 'current_a', 'rpm']

def extract_features(df: pd.DataFrame) -> np.ndarray:
    """
    Extract a fixed-length feature vector from a sensor history DataFrame.

    Input: DataFrame with columns [temperature_c, vibration_mms, current_a, rpm, recorded_at]
           Must contain >= 24 hours of readings.

    Features extracted per sensor (4 sensors × 7 features = 28 base features):
      1. Mean (7-day rolling)
      2. Standard deviation (7-day rolling)
      3. Linear trend slope (deg/hour, mm/s/hour, etc.)
      4. Rate of change: last 24h mean vs previous 24h mean
      5. Min value in window
      6. Max value in window
      7. Coefficient of variation (std / mean)

    Cross-sensor features (4):
      8.  temp × vibration correlation
      9.  temp trend direction (1 = rising, -1 = falling)
      10. vibration trend direction
      11. combined risk index = temp_slope × vib_slope

    Total: 32 features
    """
    if df.empty or len(df) < 10:
        raise ValueError("Insufficient sensor data: need at least 10 readings")

    df = df.copy()
    df['recorded_at'] = pd.to_datetime(df['recorded_at'])
    df = df.sort_values('recorded_at').reset_index(drop=True)

    features = []

    # Per-sensor features
    for col in SENSOR_COLS:
        vals = df[col].dropna().values
        if len(vals) == 0:
            features.extend([0.0] * 7)
            continue

        mean_val = float(np.mean(vals))
        std_val  = float(np.std(vals))
        min_val  = float(np.min(vals))
        max_val  = float(np.max(vals))
        cv       = std_val / mean_val if mean_val != 0 else 0.0

        # Linear trend slope
        x = np.arange(len(vals), dtype=float)
        slope, *_ = stats.linregress(x, vals)

        # Rate of change: last 25% vs first 25%
        q = max(1, len(vals) // 4)
        recent  = float(np.mean(vals[-q:]))
        earlier = float(np.mean(vals[:q]))
        roc = (recent - earlier) / (earlier + 1e-9)

        features.extend([mean_val, std_val, float(slope), roc, min_val, max_val, cv])

    # Cross-sensor features
    temp = df['temperature_c'].dropna().values
    vib  = df['vibration_mms'].dropna().values
    min_len = min(len(temp), len(vib))

    if min_len >= 2:
        corr, _ = stats.pearsonr(temp[:min_len], vib[:min_len])
        temp_x = np.arange(len(temp), dtype=float)
        vib_x  = np.arange(len(vib), dtype=float)
        temp_slope, *_ = stats.linregress(temp_x, temp)
        vib_slope, *_  = stats.linregress(vib_x, vib)
        temp_dir  = 1.0 if temp_slope > 0 else -1.0
        vib_dir   = 1.0 if vib_slope > 0 else -1.0
        risk_idx  = float(temp_slope * vib_slope)
    else:
        corr, temp_dir, vib_dir, risk_idx = 0.0, 0.0, 0.0, 0.0

    features.extend([float(corr), temp_dir, vib_dir, risk_idx])
    return np.array(features, dtype=np.float32)


def features_to_dataframe(feature_vec: np.ndarray) -> pd.DataFrame:
    """Convert feature vector back to named DataFrame for SHAP explainability."""
    names = []
    for col in SENSOR_COLS:
        names.extend([f'{col}_mean', f'{col}_std', f'{col}_slope', f'{col}_roc',
                      f'{col}_min', f'{col}_max', f'{col}_cv'])
    names.extend(['temp_vib_corr', 'temp_trend_dir', 'vib_trend_dir', 'combined_risk'])
    return pd.DataFrame([feature_vec], columns=names)
