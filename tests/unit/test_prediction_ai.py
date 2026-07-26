"""
Unit tests for TwinForge Prediction AI engine.

Covers:
- Health score calculation
- Heuristic prediction fallback
- Feature vector shape
- Explanation generation
"""
import pytest
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# Adjust path so imports work from repo root
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../'))

from ai.prediction_ai.model import PredictionEngine, calculate_health_score
from ai.prediction_ai.features import extract_features, SENSOR_COLS


# ── Fixtures ─────────────────────────────────────────────────────────────

def make_sensor_df(
    n: int = 168,
    temp_start: float = 65.0,
    temp_end: float = 78.0,
    vib_start: float = 3.5,
    vib_end: float = 7.4,
) -> pd.DataFrame:
    """Generate a synthetic 7-day sensor history DataFrame."""
    now = datetime.utcnow()
    times = [now - timedelta(hours=n - i) for i in range(n)]
    return pd.DataFrame({
        'recorded_at': times,
        'temperature_c': np.linspace(temp_start, temp_end, n) + np.random.normal(0, 0.5, n),
        'vibration_mms': np.linspace(vib_start, vib_end, n) + np.random.normal(0, 0.1, n),
        'current_a': np.full(n, 38.0) + np.random.normal(0, 0.8, n),
        'rpm': np.full(n, 1490, dtype=int),
    })


# ── Health score tests ────────────────────────────────────────────────────

class TestHealthScore:
    def test_perfect_health(self):
        score = calculate_health_score(failure_probability=0.0, rul_days=90.0)
        assert score == pytest.approx(100.0)

    def test_total_failure(self):
        score = calculate_health_score(failure_probability=1.0, rul_days=0.0)
        assert score == pytest.approx(0.0)

    def test_high_risk(self):
        score = calculate_health_score(failure_probability=0.91, rul_days=5.0)
        assert score < 30.0, "91% failure probability should give critical health"

    def test_rul_penalty(self):
        """Low RUL should reduce health score even at low failure probability."""
        score_high_rul = calculate_health_score(0.1, 90.0)
        score_low_rul  = calculate_health_score(0.1, 2.0)
        assert score_high_rul > score_low_rul

    def test_output_bounds(self):
        for fp in [0.0, 0.25, 0.5, 0.75, 1.0]:
            for rul in [0, 5, 30, 90]:
                score = calculate_health_score(fp, rul)
                assert 0.0 <= score <= 100.0, f"Score {score} out of bounds for fp={fp}, rul={rul}"


# ── Heuristic prediction tests ────────────────────────────────────────────

class TestHeuristicPrediction:
    def setup_method(self):
        self.engine = PredictionEngine()  # No model loaded → uses heuristic

    def test_critical_bearing_detected(self):
        df = make_sensor_df(temp_end=79.0, vib_end=7.8)
        result = self.engine._heuristic_prediction(df)
        assert result.failure_type == "bearing_wear"
        assert result.failure_probability > 0.85
        assert result.health_score < 40.0

    def test_normal_operation(self):
        df = make_sensor_df(temp_start=58.0, temp_end=60.0, vib_start=2.0, vib_end=2.2)
        result = self.engine._heuristic_prediction(df)
        assert result.failure_type == "normal"
        assert result.health_score > 80.0

    def test_result_has_all_fields(self):
        df = make_sensor_df()
        result = self.engine._heuristic_prediction(df)
        assert result.health_score is not None
        assert result.failure_probability is not None
        assert result.failure_type is not None
        assert result.rul_days is not None
        assert result.confidence is not None
        assert isinstance(result.feature_importance, dict)
        assert len(result.explanation) > 10
        assert len(result.recommended_action) > 5

    def test_feature_importance_sums_to_one(self):
        df = make_sensor_df()
        result = self.engine._heuristic_prediction(df)
        total = sum(result.feature_importance.values())
        assert total == pytest.approx(1.0, abs=0.01)


# ── Feature engineering tests ─────────────────────────────────────────────

class TestFeatureEngineering:
    def test_output_shape(self):
        df = make_sensor_df(n=100)
        features = extract_features(df)
        assert features.shape == (32,), f"Expected 32 features, got {features.shape[0]}"

    def test_output_dtype(self):
        df = make_sensor_df(n=50)
        features = extract_features(df)
        assert features.dtype == np.float32

    def test_no_nan_in_features(self):
        df = make_sensor_df(n=80)
        features = extract_features(df)
        assert not np.any(np.isnan(features)), "Feature vector contains NaN values"

    def test_insufficient_data_raises(self):
        df = make_sensor_df(n=3)
        with pytest.raises(ValueError, match="Insufficient sensor data"):
            extract_features(df)

    def test_trending_data_detected(self):
        """Rising vibration should produce a positive slope feature."""
        df_rising = make_sensor_df(vib_start=2.0, vib_end=8.0, n=100)
        df_stable = make_sensor_df(vib_start=2.5, vib_end=2.5, n=100)
        feat_rising = extract_features(df_rising)
        feat_stable = extract_features(df_stable)
        # vibration_mms_slope is index 4*7+2 = index 9 (sensor index 1, feature index 2)
        vib_slope_idx = 1 * 7 + 2  # sensor_cols index 1 = vibration, feature index 2 = slope
        assert feat_rising[vib_slope_idx] > feat_stable[vib_slope_idx], \
            "Rising vibration should produce higher slope than stable"
