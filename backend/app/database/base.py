"""SQLAlchemy declarative base — import this everywhere models are defined."""
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
