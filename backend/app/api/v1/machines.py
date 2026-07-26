"""Machine management API endpoints."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.machine import MachineCreate, MachineResponse

router = APIRouter()

@router.get("/", response_model=list[MachineResponse])
async def list_machines(db: AsyncSession = Depends(get_db)):
    """List all machines for the authenticated user's factory."""
    # TODO: implement with SQLAlchemy query + auth
    return []

@router.post("/", response_model=MachineResponse, status_code=status.HTTP_201_CREATED)
async def create_machine(payload: MachineCreate, db: AsyncSession = Depends(get_db)):
    """Register a new machine."""
    # TODO: implement
    raise HTTPException(status_code=501, detail="Not yet implemented")

@router.get("/{machine_id}", response_model=MachineResponse)
async def get_machine(machine_id: str, db: AsyncSession = Depends(get_db)):
    """Get a single machine by ID."""
    raise HTTPException(status_code=501, detail="Not yet implemented")
