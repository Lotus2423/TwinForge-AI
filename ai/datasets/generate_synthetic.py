"""
TwinForge AI — Synthetic Dataset Generator

Generates realistic motor sensor data with labeled failure modes for training.

Usage:
    python ai/datasets/generate_synthetic.py --output ai/datasets/motor_synthetic.csv

Output columns:
    window_id, recorded_at, temperature_c, vibration_mms, current_a, rpm, failure_label

Labels:
    0 = normal
    1 = bearing_wear
    2 = overheating
    3 = rotor_fault
"""
import argparse
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

RNG = np.random.default_rng(seed=42)

def _timestamps(n: int, start: datetime) -> list:
    return [start + timedelta(seconds=i * 5) for i in range(n)]


def generate_normal(n_windows: int = 2000) -> pd.DataFrame:
    """Healthy motor — all sensors within rated range."""
    rows = []
    for wid in range(n_windows):
        start = datetime(2025, 1, 1) + timedelta(hours=wid * 3)
        n = 36  # 3 hours @ 5s intervals = ~2160 but we sample 36 evenly
        for t in _timestamps(n, start):
            rows.append({
                'window_id': wid,
                'recorded_at': t,
                'temperature_c': RNG.normal(58, 2.5),
                'vibration_mms': RNG.normal(2.1, 0.3),
                'current_a': RNG.normal(36.5, 1.2),
                'rpm': int(RNG.normal(1495, 8)),
                'failure_label': 0,
            })
    return pd.DataFrame(rows)


def generate_bearing_wear(n_windows: int = 1000) -> pd.DataFrame:
    """Bearing wear: temperature and vibration both rise progressively."""
    rows = []
    for wid in range(n_windows):
        start = datetime(2025, 4, 1) + timedelta(hours=wid * 3)
        n = 36
        for i, t in enumerate(_timestamps(n, start)):
            progress = i / n
            rows.append({
                'window_id': 10000 + wid,
                'recorded_at': t,
                'temperature_c': RNG.normal(60 + progress * 20, 2.0),
                'vibration_mms': RNG.normal(3.0 + progress * 5.5, 0.4),
                'current_a': RNG.normal(37.0 + progress * 1.5, 1.0),
                'rpm': int(RNG.normal(1490 - progress * 20, 10)),
                'failure_label': 1,
            })
    return pd.DataFrame(rows)


def generate_overheating(n_windows: int = 800) -> pd.DataFrame:
    """Stator overheating: temperature rises sharply, vibration stable."""
    rows = []
    for wid in range(n_windows):
        start = datetime(2025, 6, 1) + timedelta(hours=wid * 3)
        n = 36
        for i, t in enumerate(_timestamps(n, start)):
            progress = i / n
            rows.append({
                'window_id': 20000 + wid,
                'recorded_at': t,
                'temperature_c': RNG.normal(68 + progress * 28, 3.0),
                'vibration_mms': RNG.normal(2.4 + progress * 0.8, 0.35),
                'current_a': RNG.normal(39.0 + progress * 4.0, 1.5),
                'rpm': int(RNG.normal(1488, 12)),
                'failure_label': 2,
            })
    return pd.DataFrame(rows)


def generate_rotor_fault(n_windows: int = 600) -> pd.DataFrame:
    """Rotor bar fault: current irregular, RPM fluctuates, vibration rises."""
    rows = []
    for wid in range(n_windows):
        start = datetime(2025, 8, 1) + timedelta(hours=wid * 3)
        n = 36
        for i, t in enumerate(_timestamps(n, start)):
            progress = i / n
            rows.append({
                'window_id': 30000 + wid,
                'recorded_at': t,
                'temperature_c': RNG.normal(63 + progress * 10, 2.5),
                'vibration_mms': RNG.normal(2.5 + progress * 2.5, 0.6),
                'current_a': RNG.normal(37.0, 2.5 + progress * 3.0),  # high variance
                'rpm': int(RNG.normal(1480 - progress * 40, 25 + progress * 20)),
                'failure_label': 3,
            })
    return pd.DataFrame(rows)


def main(output: str) -> None:
    print("[DataGen] Generating synthetic motor dataset...")
    dfs = [
        generate_normal(2000),
        generate_bearing_wear(1000),
        generate_overheating(800),
        generate_rotor_fault(600),
    ]
    df = pd.concat(dfs, ignore_index=True)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    df.to_csv(output, index=False)

    total = len(df['window_id'].unique())
    label_counts = df.drop_duplicates('window_id')['failure_label'].value_counts().sort_index()
    labels = {0: 'normal', 1: 'bearing_wear', 2: 'overheating', 3: 'rotor_fault'}
    print(f"[DataGen] Total windows: {total}")
    for k, v in label_counts.items():
        print(f"  {labels[k]}: {v} ({v/total*100:.1f}%)")
    print(f"[DataGen] Saved to: {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="ai/datasets/motor_synthetic.csv")
    args = parser.parse_args()
    main(args.output)
