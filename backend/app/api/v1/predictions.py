"""AI prediction result endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.prediction import PredictionResponse
from app.services.prediction_service import PredictionService

router = APIRouter()

@router.get("/{machine_id}/latest", response_model=PredictionResponse | None)
async def get_latest_prediction(machine_id: str, db: AsyncSession = Depends(get_db)):
    """Get the latest AI prediction for a machine."""
    return await PredictionService(db).get_latest(machine_id)

@router.get("/{machine_id}/history", response_model=list[PredictionResponse])
async def get_prediction_history(machine_id: str, limit: int = 30, db: AsyncSession = Depends(get_db)):
    if not 1 <= limit <= 500:
        from fastapi import HTTPException
        raise HTTPException(status_code=422, detail="limit must be between 1 and 500")
    return await PredictionService(db).get_history(machine_id, limit)
