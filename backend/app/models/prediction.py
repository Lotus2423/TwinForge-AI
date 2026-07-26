"""SQLAlchemy ORM model for AI Prediction entity."""
from sqlalchemy import Column, String, Numeric, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base
import uuid

class Prediction(Base):
    __tablename__ = "predictions"

    id                  = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    machine_id          = Column(UUID(as_uuid=True), ForeignKey("machines.id", ondelete="CASCADE"), nullable=False)
    health_score        = Column(Numeric(5, 2))
    failure_probability = Column(Numeric(5, 4))
    failure_type        = Column(String(100))
    rul_days            = Column(Numeric(8, 1))
    confidence          = Column(Numeric(5, 4))
    explanation         = Column(Text)
    feature_importance  = Column(JSONB)
    recommended_action  = Column(Text)
    model_version       = Column(String(50))
    predicted_at        = Column(DateTime(timezone=True), server_default=func.now())

    machine = relationship("Machine", back_populates="predictions")
