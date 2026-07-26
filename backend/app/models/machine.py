"""SQLAlchemy ORM model for Machine entity."""
from sqlalchemy import Column, String, Boolean, Numeric, Integer, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base
import uuid

class Machine(Base):
    __tablename__ = "machines"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    factory_id      = Column(UUID(as_uuid=True), ForeignKey("factories.id", ondelete="CASCADE"))
    name            = Column(String(255), nullable=False)
    machine_type    = Column(String(100), nullable=False)
    model_number    = Column(String(100))
    manufacturer    = Column(String(100))
    rated_power_kw  = Column(Numeric(10, 2))
    rated_voltage_v = Column(Numeric(10, 2))
    rated_current_a = Column(Numeric(10, 2))
    rated_rpm       = Column(Integer)
    installation_date = Column(Date)
    location_bay    = Column(String(100))
    api_key         = Column(String(255), unique=True)
    is_active       = Column(Boolean, default=True)

    sensor_readings = relationship("SensorReading", back_populates="machine", cascade="all, delete")
    predictions     = relationship("Prediction", back_populates="machine", cascade="all, delete")
    alerts          = relationship("Alert", back_populates="machine", cascade="all, delete")
