"""
TwinForge AI — Prediction Model Training Script

Usage:
    python -m ai.prediction_ai.train --dataset ai/datasets/motor_synthetic.csv

Outputs trained model to: ai/models/prediction_model.pkl
"""
import argparse
import json
from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, accuracy_score
import joblib

from ai.prediction_ai.features import extract_features, SENSOR_COLS

LABEL_MAP = {0: 'normal', 1: 'bearing_wear', 2: 'overheating', 3: 'rotor_fault'}
MODEL_OUTPUT = Path("ai/models/prediction_model.pkl")
SCALER_OUTPUT = Path("ai/models/scaler.pkl")
METRICS_OUTPUT = Path("ai/models/training_metrics.json")

def train(dataset_path: str) -> None:
    print(f"[Training] Loading dataset: {dataset_path}")
    df = pd.read_csv(dataset_path)

    # Group by machine_id + window to extract features
    features_list = []
    labels_list = []

    for _, group in df.groupby('window_id'):
        try:
            feat = extract_features(group[SENSOR_COLS + ['recorded_at']])
            label = group['failure_label'].iloc[-1]  # 0=normal,1=bearing,2=overheat,3=rotor
            features_list.append(feat)
            labels_list.append(int(label))
        except ValueError:
            continue

    X = np.array(features_list)
    y = np.array(labels_list)

    print(f"[Training] Extracted {len(X)} samples, {X.shape[1]} features")
    print(f"[Training] Class distribution: {dict(zip(*np.unique(y, return_counts=True)))}")

    # Scale
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42, stratify=y)

    # Train Random Forest
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    cv_scores = cross_val_score(model, X_scaled, y, cv=5, scoring='accuracy')

    print(f"\n[Training] Test accuracy: {acc*100:.1f}%")
    print(f"[Training] CV accuracy: {cv_scores.mean()*100:.1f}% ± {cv_scores.std()*100:.1f}%")
    print(f"\n[Training] Classification report:")
    print(classification_report(y_test, y_pred, target_names=list(LABEL_MAP.values())))

    if acc < 0.88:
        print(f"[Training] ⚠️  Accuracy {acc*100:.1f}% below 88% target. Consider more training data.")

    # Save
    MODEL_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_OUTPUT)
    joblib.dump(scaler, SCALER_OUTPUT)

    metrics = {
        "test_accuracy": round(acc, 4),
        "cv_mean": round(cv_scores.mean(), 4),
        "cv_std": round(cv_scores.std(), 4),
        "n_samples": len(X),
        "n_features": X.shape[1],
    }
    METRICS_OUTPUT.write_text(json.dumps(metrics, indent=2))

    print(f"\n[Training] ✅ Model saved: {MODEL_OUTPUT}")
    print(f"[Training] ✅ Metrics saved: {METRICS_OUTPUT}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", default="ai/datasets/motor_synthetic.csv")
    args = parser.parse_args()
    train(args.dataset)
