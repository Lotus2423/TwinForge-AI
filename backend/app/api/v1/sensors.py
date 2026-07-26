"""Sensor data ingestion and query endpoints."""
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.sensor import SensorPayload, IngestResponse, SensorReadingResponse

router = APIRouter()

@router.post("/ingest", response_model=IngestResponse, status_code=201)
async def ingest_sensor_data(
    payload: SensorPayload,
    x_device_key: str = Header(..., alias="X-Device-Key"),
    db: AsyncSession = Depends(get_db),
):
    """
    Primary endpoint for ESP32 sensor data.
    Validates device key, stores reading, triggers prediction pipeline.
    """
    # TODO: validate device key, store reading, trigger AI
    return IngestResponse(reading_id=0, prediction_triggered=False, message="Stub — implement in Phase 3")

@router.get("/{machine_id}/history", response_model=list[SensorReadingResponse])
async def get_sensor_history(machine_id: str, hours: int = 168, db: AsyncSession = Depends(get_db)):
    """Get time-series sensor history for a machine."""
    return []

@router.get("/{machine_id}/latest", response_model=SensorReadingResponse | None)
async def get_latest_reading(machine_id: str, db: AsyncSession = Depends(get_db)):
    """Get the most recent sensor reading for a machine."""
    return None
