"""Import all models so SQLAlchemy registers them."""
from app.models.machine import Machine
from app.models.sensor_reading import SensorReading
from app.models.prediction import Prediction
from app.models.alert import Alert

__all__ = ["Machine", "SensorReading", "Prediction", "Alert"]
