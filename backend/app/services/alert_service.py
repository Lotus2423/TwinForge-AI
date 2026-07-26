"""Business logic for alert creation and management."""
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.alert import Alert
from app.core.config import settings

class AlertService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_active(self) -> list[Alert]:
        result = await self.db.execute(
            select(Alert).where(Alert.is_acknowledged == False).order_by(Alert.created_at.desc())
        )
        return list(result.scalars().all())

    async def create_from_prediction(self, machine_id: str, health_score: float,
                                      failure_type: str, failure_prob: float) -> Alert | None:
        """
        Create an alert if the health score crosses a threshold.
        Returns None if no alert is needed.
        """
        if health_score <= settings.HEALTH_CRITICAL_THRESHOLD:
            severity = "critical"
            title = f"Critical health: {health_score:.0f}%"
            message = f"Machine health is critically low. {failure_type.replace('_',' ').title()} detected with {failure_prob*100:.0f}% probability."
        elif health_score <= settings.HEALTH_WARNING_THRESHOLD:
            severity = "warning"
            title = f"Health warning: {health_score:.0f}%"
            message = f"Machine health declining. {failure_type.replace('_',' ').title()} risk at {failure_prob*100:.0f}%."
        else:
            return None

        alert = Alert(machine_id=UUID(machine_id), severity=severity,
                      alert_type=failure_type, title=title, message=message)
        self.db.add(alert)
        await self.db.flush()
        return alert

    async def acknowledge(self, alert_id: str) -> bool:
        result = await self.db.execute(select(Alert).where(Alert.id == UUID(alert_id)))
        alert = result.scalar_one_or_none()
        if not alert:
            return False
        alert.is_acknowledged = True
        return True
