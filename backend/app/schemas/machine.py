"""Pydantic schemas for Machine API request/response."""
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import date, datetime

class MachineCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    machine_type: str = Field(..., min_length=1)
    model_number: Optional[str] = None
    manufacturer: Optional[str] = None
    rated_power_kw: Optional[float] = None
    rated_voltage_v: Optional[float] = None
    rated_current_a: Optional[float] = None
    rated_rpm: Optional[int] = None
    installation_date: Optional[date] = None
    location_bay: Optional[str] = None

class MachineResponse(BaseModel):
    id: UUID
    name: str
    machine_type: str
    model_number: Optional[str]
    manufacturer: Optional[str]
    rated_power_kw: Optional[float]
    rated_voltage_v: Optional[float]
    rated_current_a: Optional[float]
    rated_rpm: Optional[int]
    location_bay: Optional[str]
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}

class MachineListItem(BaseModel):
    id: UUID
    name: str
    machine_type: str
    location_bay: Optional[str]
    is_active: bool
    last_seen: Optional[datetime] = None

    model_config = {"from_attributes": True}
