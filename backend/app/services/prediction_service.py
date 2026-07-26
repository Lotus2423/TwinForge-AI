"""Business logic for AI prediction pipeline."""
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.models.prediction import Prediction

class PredictionService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_latest(self, machine_id: str) -> Prediction | None:
        result = await self.db.execute(
            select(Prediction)
            .where(Prediction.machine_id == UUID(machine_id))
            .order_by(desc(Prediction.predicted_at))
            .limit(1)
        )
        return result.scalar_one_or_none()

    async def get_history(self, machine_id: str, limit: int = 30) -> list[Prediction]:
        result = await self.db.execute(
            select(Prediction)
            .where(Prediction.machine_id == UUID(machine_id))
            .order_by(desc(Prediction.predicted_at))
            .limit(limit)
        )
        return list(result.scalars().all())

    async def save(self, machine_id: str, result_data: dict) -> Prediction:
        """Persist a new prediction result from the AI engine."""
        pred = Prediction(machine_id=UUID(machine_id), **result_data)
        self.db.add(pred)
        await self.db.flush()
        return pred
