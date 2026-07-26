"""Request/response logging middleware."""
import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("twinforge.api")

class LoggingMiddleware(BaseHTTPMiddleware):
    """Logs every request with method, path, status, and latency."""

    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start) * 1000

        logger.info(
            f"{request.method} {request.url.path} "
            f"→ {response.status_code} "
            f"({duration_ms:.1f}ms)"
        )
        return response
