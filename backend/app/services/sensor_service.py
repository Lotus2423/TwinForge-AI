"""Business logic for sensor data ingestion and querying."""
from datetime import datetime, timedelta, timezone
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.models.sensor_reading import SensorReading

class SensorService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def ingest(self, machine_id: str, device_id: str, sensors: dict, timestamp: datetime) -> SensorReading:
        """Store a new sensor reading from ESP32 payload."""
        reading = SensorReading(
            machine_id=UUID(machine_id),
            device_id=device_id,
            temperature_c=sensors.get("temperature_c"),
            vibration_mms=sensors.get("vibration_mms"),
            current_a=sensors.get("current_a"),
            rpm=sensors.get("rpm"),
            raw_payload=sensors,
            recorded_at=timestamp,
        )
        self.db.add(reading)
        await self.db.flush()
        return reading

    async def get_history(self, machine_id: str, hours: int = 168) -> list[SensorReading]:
        """Get sensor history for a machine within the last N hours."""
        since = datetime.now(timezone.utc) - timedelta(hours=hours)
        result = await self.db.execute(
            select(SensorReading)
            .where(SensorReading.machine_id == UUID(machine_id))
            .where(SensorReading.recorded_at >= since)
            .order_by(SensorReading.recorded_at.asc())
        )
        return list(result.scalars().all())

    async def get_latest(self, machine_id: str) -> SensorReading | None:
        """Get the most recent reading for a machine."""
        result = await self.db.execute(
            select(SensorReading)
            .where(SensorReading.machine_id == UUID(machine_id))
            .order_by(desc(SensorReading.recorded_at))
            .limit(1)
        )
        return result.scalar_one_or_none()
