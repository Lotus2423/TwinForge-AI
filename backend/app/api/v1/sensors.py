"""Sensor data ingestion and query endpoints."""

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.schemas.sensor import IngestResponse, SensorPayload, SensorReadingResponse
from app.services.machine_service import MachineService
from app.services.sensor_service import SensorService

router = APIRouter()


@router.post("/ingest", response_model=IngestResponse, status_code=201)
async def ingest_sensor_data(
    payload: SensorPayload,
    x_device_key: str = Header(..., alias="X-Device-Key"),
    db: AsyncSession = Depends(get_db),
):
    """Validate and store one reading sent by an edge device."""
    machines = MachineService(db)
    if not await machines.verify_device_key(payload.machine_id, x_device_key):
        raise HTTPException(status_code=401, detail="Invalid machine ID or device key")

    reading = await SensorService(db).ingest(
        machine_id=payload.machine_id,
        device_id=x_device_key[:16],
        sensors=payload.sensors,
        timestamp=payload.timestamp,
    )
    return IngestResponse(
        reading_id=reading.id,
        prediction_triggered=False,
        message="Sensor reading stored. Prediction pipeline is not configured.",
    )


@router.get("/{machine_id}/history", response_model=list[SensorReadingResponse])
async def get_sensor_history(
    machine_id: str, hours: int = 168, db: AsyncSession = Depends(get_db)
):
    """Return time-series readings for the requested lookback period."""
    if not 1 <= hours <= 24 * 365:
        raise HTTPException(status_code=422, detail="hours must be between 1 and 8760")
    return await SensorService(db).get_history(machine_id, hours)


@router.get("/{machine_id}/latest", response_model=SensorReadingResponse | None)
async def get_latest_reading(machine_id: str, db: AsyncSession = Depends(get_db)):
    """Return the most recent reading for a machine."""
    return await SensorService(db).get_latest(machine_id)
