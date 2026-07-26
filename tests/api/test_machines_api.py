"""
Integration tests for /api/v1/machines endpoints.

Tests against a real FastAPI test client with an in-memory SQLite database.
"""
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../'))

from backend.app.main import create_application
from backend.app.database.base import Base
from backend.app.database.connection import get_db

# ── Test database (SQLite in-memory) ─────────────────────────────────────

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(TEST_DB_URL, echo=False)
TestSession = async_sessionmaker(test_engine, expire_on_commit=False, class_=AsyncSession)


async def override_get_db():
    async with TestSession() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


@pytest.fixture(scope="session")
def app():
    application = create_application()
    application.dependency_overrides[get_db] = override_get_db
    return application


@pytest.fixture(autouse=True, scope="session")
async def create_test_tables():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


# ── Tests ─────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
class TestHealthEndpoint:
    async def test_health_check_returns_200(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/health")
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "healthy"
        assert body["service"] == "TwinForge AI Backend"

    async def test_health_check_has_version(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/health")
        assert "version" in response.json()


@pytest.mark.asyncio
class TestMachinesEndpoint:
    async def test_list_machines_returns_200(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/machines/")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    async def test_create_machine_returns_501_stub(self, app):
        """Create endpoint is stubbed until Phase 3 services are wired."""
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/v1/machines/", json={
                "name": "Motor-Test-01",
                "machine_type": "induction_motor",
                "rated_power_kw": 11.0,
                "location_bay": "Bay 1",
            })
        assert response.status_code in (201, 501)  # 501 until Phase 3 implemented

    async def test_get_nonexistent_machine_returns_404_or_501(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/machines/00000000-0000-0000-0000-000000000000")
        assert response.status_code in (404, 501)

    async def test_unknown_route_returns_404(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/nonexistent")
        assert response.status_code == 404


@pytest.mark.asyncio
class TestAuthEndpoint:
    async def test_login_returns_token(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/v1/auth/login", json={
                "email": "engineer@factory.com",
                "password": "test1234"
            })
        assert response.status_code == 200
        body = response.json()
        assert "access_token" in body
        assert body["token_type"] == "bearer"

    async def test_login_response_structure(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/v1/auth/login", json={
                "email": "test@test.com", "password": "password"
            })
        body = response.json()
        assert "expires_in" in body
        assert isinstance(body["expires_in"], int)
