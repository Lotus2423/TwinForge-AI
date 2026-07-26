"""SQLAlchemy ORM model for SensorReading time-series entity."""
from sqlalchemy import Column, BigInteger, String, Numeric, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id            = Column(BigInteger, primary_key=True, autoincrement=True)
    machine_id    = Column(UUID(as_uuid=True), ForeignKey("machines.id", ondelete="CASCADE"), nullable=False, index=True)
    device_id     = Column(String(100))
    temperature_c = Column(Numeric(6, 2))
    vibration_mms = Column(Numeric(8, 4))
    current_a     = Column(Numeric(8, 3))
    rpm           = Column(Integer)
    raw_payload   = Column(JSONB)
    recorded_at   = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), index=True)

    machine = relationship("Machine", back_populates="sensor_readings")
