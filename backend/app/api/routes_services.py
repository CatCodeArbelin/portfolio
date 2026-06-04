from fastapi import APIRouter

from app.schemas.portfolio import ServiceCard
from app.services.content_service import get_services

router = APIRouter(tags=["portfolio"])


@router.get("/services", response_model=list[ServiceCard])
async def get_service_cards() -> list[ServiceCard]:
    """Возвращает список публичных услуг."""
    return get_services()
