"""
Simple in-memory rate limiter middleware.
Production: replace with Redis-backed rate limiting (slowapi + redis).
"""
import time
from collections import defaultdict
from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Sliding window rate limiter.
    Default: 100 requests/minute per IP address.
    Sensor ingestion endpoint: 12 requests/minute per device key.
    """

    def __init__(self, app, requests_per_minute: int = 100):
        super().__init__(app)
        self.rpm = requests_per_minute
        self._store: dict[str, list[float]] = defaultdict(list)

    def _is_allowed(self, key: str) -> bool:
        now = time.time()
        window = 60.0
        self._store[key] = [t for t in self._store[key] if now - t < window]
        if len(self._store[key]) >= self.rpm:
            return False
        self._store[key].append(now)
        return True

    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for health check
        if request.url.path == "/health":
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        if not self._is_allowed(client_ip):
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"error": "Rate limit exceeded. Max 100 requests/minute."},
            )
        return await call_next(request)
