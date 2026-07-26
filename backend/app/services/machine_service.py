"""
Business logic for machine management.
All database operations for machines go through this service.
API routes call services — never query the DB directly in routes.
"""
from typing import Optional
from uuid import UUID, uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.machine import Machine
from app.schemas.machine import MachineCreate
import secrets

class MachineService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_machines(self) -> list[Machine]:
        """Return all active machines."""
        result = await self.db.execute(select(Machine).where(Machine.is_active == True))
        return list(result.scalars().all())

    async def get_machine(self, machine_id: str) -> Optional[Machine]:
        """Get a single machine by UUID string."""
        try:
            uid = UUID(machine_id)
        except ValueError:
            return None
        result = await self.db.execute(select(Machine).where(Machine.id == uid))
        return result.scalar_one_or_none()

    async def create_machine(self, payload: MachineCreate) -> Machine:
        """Register a new machine and generate its device API key."""
        machine = Machine(
            id=uuid4(),
            name=payload.name,
            machine_type=payload.machine_type,
            model_number=payload.model_number,
            manufacturer=payload.manufacturer,
            rated_power_kw=payload.rated_power_kw,
            rated_voltage_v=payload.rated_voltage_v,
            rated_current_a=payload.rated_current_a,
            rated_rpm=payload.rated_rpm,
            installation_date=payload.installation_date,
            location_bay=payload.location_bay,
            api_key=f"tf_{secrets.token_urlsafe(32)}",
            is_active=True,
        )
        self.db.add(machine)
        await self.db.flush()
        return machine

    async def verify_device_key(self, machine_id: str, api_key: str) -> bool:
        """Verify that the device API key matches the machine's registered key."""
        machine = await self.get_machine(machine_id)
        if not machine:
            return False
        # Phase 3: store hashed keys and use bcrypt.verify()
        return machine.api_key == api_key
