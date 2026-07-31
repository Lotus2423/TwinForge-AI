"""
TwinForge AI — FastAPI Application Entry Point

This is the main FastAPI application factory. It:
- Creates the FastAPI app with metadata
- Registers all API routers
- Configures middleware (CORS, logging, rate limiting)
- Sets up lifespan events (DB connection, AI model loading)
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_v1_router
from app.api.ws.gateway import router as websocket_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Runs startup logic before yield, teardown logic after.
    """
    # Startup
    print("🚀 TwinForge AI starting up...")
    # await create_tables()
    # await load_prediction_model()
    print("✅ TwinForge AI ready.")
    
    yield
    
    # Teardown
    print("🛑 TwinForge AI shutting down...")


def create_application() -> FastAPI:
    """
    Application factory. Creates and configures the FastAPI app.
    Using a factory pattern allows easier testing.
    """
    app = FastAPI(
        title="TwinForge AI",
        description="Intelligent Digital Twins for Industrial Machines",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # ── CORS ──────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routes ────────────────────────────────────────────
    app.include_router(api_v1_router, prefix="/api/v1")
    app.include_router(websocket_router)

    # ── Health Check ──────────────────────────────────────
    @app.get("/health", tags=["Health"])
    async def health_check():
        return {
            "status": "healthy",
            "service": "TwinForge AI Backend",
            "version": "0.1.0",
        }

    return app


app = create_application()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
