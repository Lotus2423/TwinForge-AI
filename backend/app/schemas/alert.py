"""Pydantic schemas for Alert entity."""
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class AlertResponse(BaseModel):
    id: UUID
    machine_id: UUID
    severity: str
    alert_type: Optional[str]
    title: Optional[str]
    message: Optional[str]
    is_acknowledged: bool
    created_at: datetime

    model_config = {"from_attributes": True}
