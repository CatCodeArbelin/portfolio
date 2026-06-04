from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import settings

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    """Ответ системной проверки доступности backend."""

    status: str
    app: str
    version: str


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Возвращает состояние backend без обращения к внешним сервисам."""
    return HealthResponse(
        status="ok",
        app=settings.app_name,
        version=settings.app_version,
    )
