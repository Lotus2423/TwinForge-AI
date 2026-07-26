"""Aggregate all v1 API routers."""
from fastapi import APIRouter
from app.api.v1 import machines, sensors, predictions, alerts, auth

api_v1_router = APIRouter()
api_v1_router.include_router(auth.router,        prefix="/auth",        tags=["Authentication"])
api_v1_router.include_router(machines.router,    prefix="/machines",    tags=["Machines"])
api_v1_router.include_router(sensors.router,     prefix="/sensors",     tags=["Sensors"])
api_v1_router.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
api_v1_router.include_router(alerts.router,      prefix="/alerts",      tags=["Alerts"])
