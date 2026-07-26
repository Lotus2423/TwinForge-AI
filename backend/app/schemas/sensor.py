"""Pydantic schemas for sensor ingestion and query."""
from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class SensorPayload(BaseModel):
    """Payload sent by ESP32 firmware."""
    machine_id: str = Field(..., description="Machine UUID or readable ID")
    timestamp: datetime
    sensors: dict = Field(..., description="Sensor key-value readings")

class SensorReadingResponse(BaseModel):
    id: int
    machine_id: UUID
    temperature_c: Optional[float]
    vibration_mms: Optional[float]
    current_a: Optional[float]
    rpm: Optional[int]
    recorded_at: datetime

    model_config = {"from_attributes": True}

class IngestResponse(BaseModel):
    reading_id: int
    prediction_triggered: bool
    message: str
