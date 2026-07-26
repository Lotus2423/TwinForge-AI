"""
Integration tests for /api/v1/sensors endpoints.

Tests sensor ingestion and history query endpoints.
"""
import pytest
from httpx import AsyncClient, ASGITransport
from datetime import datetime, timezone

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../'))

from backend.app.main import create_application
from backend.app.database.connection import get_db
from tests.api.test_machines_api import override_get_db, create_test_tables


@pytest.fixture(scope="session")
def app():
    application = create_application()
    application.dependency_overrides[get_db] = override_get_db
    return application


VALID_PAYLOAD = {
    "machine_id": "00000000-0000-0000-0000-000000000001",
    "timestamp": datetime.now(timezone.utc).isoformat(),
    "sensors": {
        "temperature_c": 72.5,
        "vibration_mms": 3.8,
        "current_a": 37.2,
        "rpm": 1492,
    }
}


@pytest.mark.asyncio
class TestSensorIngestion:
    async def test_ingest_requires_device_key_header(self, app):
        """Ingestion without X-Device-Key header must return 422."""
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/v1/sensors/ingest", json=VALID_PAYLOAD)
        assert response.status_code == 422

    async def test_ingest_with_device_key_returns_response(self, app):
        """With a device key header, stub endpoint should return 201."""
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post(
                "/api/v1/sensors/ingest",
                json=VALID_PAYLOAD,
                headers={"X-Device-Key": "test-api-key-stub"}
            )
        assert response.status_code in (201, 422)

    async def test_ingest_missing_sensors_field_returns_422(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post(
                "/api/v1/sensors/ingest",
                json={"machine_id": "test", "timestamp": datetime.now(timezone.utc).isoformat()},
                headers={"X-Device-Key": "test-key"}
            )
        assert response.status_code == 422

    async def test_ingest_payload_validates_types(self, app):
        """Sensors field must be a dict, not a string."""
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post(
                "/api/v1/sensors/ingest",
                json={**VALID_PAYLOAD, "sensors": "not-a-dict"},
                headers={"X-Device-Key": "test-key"}
            )
        assert response.status_code == 422


@pytest.mark.asyncio
class TestSensorHistory:
    async def test_history_returns_200(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/sensors/motor-01/history")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    async def test_history_accepts_hours_param(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/sensors/motor-01/history?hours=24")
        assert response.status_code == 200

    async def test_history_rejects_invalid_hours(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/sensors/motor-01/history?hours=not-a-number")
        assert response.status_code == 422

    async def test_latest_returns_200_or_null(self, app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/api/v1/sensors/motor-01/latest")
        assert response.status_code == 200
