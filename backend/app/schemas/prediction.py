"""Pydantic schemas for AI prediction responses."""
from pydantic import BaseModel
from typing import Optional, Dict
from uuid import UUID
from datetime import datetime

class PredictionResponse(BaseModel):
    id: UUID
    machine_id: UUID
    health_score: float
    failure_probability: float
    failure_type: Optional[str]
    rul_days: Optional[float]
    confidence: Optional[float]
    explanation: Optional[str]
    feature_importance: Optional[Dict[str, float]]
    recommended_action: Optional[str]
    predicted_at: datetime

    model_config = {"from_attributes": True}
