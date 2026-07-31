"""Alert management endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.alert import AlertResponse
from app.services.alert_service import AlertService

router = APIRouter()

@router.get("/", response_model=list[AlertResponse])
async def list_alerts(db: AsyncSession = Depends(get_db)):
    return await AlertService(db).list_active()

@router.patch("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str, db: AsyncSession = Depends(get_db)):
    if not await AlertService(db).acknowledge(alert_id):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"acknowledged": True}
