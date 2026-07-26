"""Custom exception handlers and HTTP exception classes."""
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

class TwinForgeException(Exception):
    """Base exception for TwinForge AI errors."""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class MachineNotFound(TwinForgeException):
    def __init__(self, machine_id: str):
        super().__init__(f"Machine '{machine_id}' not found", 404)

class InvalidDeviceKey(TwinForgeException):
    def __init__(self):
        super().__init__("Invalid or missing device API key", 401)

class SensorValidationError(TwinForgeException):
    def __init__(self, detail: str):
        super().__init__(f"Sensor data validation failed: {detail}", 422)

def register_exception_handlers(app: FastAPI) -> None:
    """Register all custom exception handlers on the FastAPI app."""

    @app.exception_handler(TwinForgeException)
    async def twinforge_exception_handler(request: Request, exc: TwinForgeException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": exc.message, "path": str(request.url)},
        )

    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc):
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "Resource not found", "path": str(request.url)},
        )
