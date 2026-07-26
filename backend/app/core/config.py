"""
TwinForge AI — Application Configuration

All configuration is read from environment variables.
Never hardcode values here — use .env file or environment.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    Pydantic validates types and provides defaults.
    """

    # ── App ──────────────────────────────────────────────
    APP_NAME: str = "TwinForge AI"
    APP_ENV: str = "development"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True

    # ── Backend ──────────────────────────────────────────
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ── Database ─────────────────────────────────────────
    DATABASE_URL: str = "postgresql://twinforge:password@localhost:5432/twinforge_db"

    # ── AI ───────────────────────────────────────────────
    AI_MODEL_PATH: str = "ai/models/prediction_model.pkl"
    FACTORY_ASSISTANT_MODEL: str = "claude-sonnet-4-6"
    ANTHROPIC_API_KEY: str = ""

    # ── Thresholds ───────────────────────────────────────
    TEMP_WARNING_C: float = 75.0
    TEMP_CRITICAL_C: float = 90.0
    VIBRATION_WARNING_MMS: float = 5.0
    VIBRATION_CRITICAL_MMS: float = 8.0
    HEALTH_WARNING_THRESHOLD: float = 60.0
    HEALTH_CRITICAL_THRESHOLD: float = 30.0

    # ── MQTT ─────────────────────────────────────────────
    MQTT_BROKER_HOST: str = "localhost"
    MQTT_BROKER_PORT: int = 1883
    MQTT_TOPIC_PREFIX: str = "twinforge"

    # ── CORS ─────────────────────────────────────────────
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True


# Singleton instance — import this everywhere
settings = Settings()
