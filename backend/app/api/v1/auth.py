"""Authentication endpoints — JWT login/register."""
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = 3600

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest):
    """Login and receive JWT token. Stub — full implementation in Phase 3."""
    # TODO: verify credentials, return real JWT
    return TokenResponse(access_token="stub-token-replace-in-phase3", expires_in=3600)
