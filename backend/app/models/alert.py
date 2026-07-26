"""SQLAlchemy ORM model for Alert entity."""
from sqlalchemy import Column, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base
import uuid

class Alert(Base):
    __tablename__ = "alerts"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    machine_id      = Column(UUID(as_uuid=True), ForeignKey("machines.id", ondelete="CASCADE"), nullable=False)
    severity        = Column(String(20), nullable=False)   # info | warning | critical
    alert_type      = Column(String(100))
    title           = Column(String(255))
    message         = Column(Text)
    is_acknowledged = Column(Boolean, default=False)
    acknowledged_at = Column(DateTime(timezone=True))
    created_at      = Column(DateTime(timezone=True), server_default=func.now())

    machine = relationship("Machine", back_populates="alerts")
