"""Alert management endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.alert import AlertResponse

router = APIRouter()

@router.get("/", response_model=list[AlertResponse])
async def list_alerts(db: AsyncSession = Depends(get_db)):
    return []

@router.patch("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str, db: AsyncSession = Depends(get_db)):
    return {"acknowledged": True}
