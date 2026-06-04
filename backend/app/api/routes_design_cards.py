from fastapi import APIRouter

from app.schemas.portfolio import DesignCard
from app.services.content_service import load_design_cards

router = APIRouter(tags=["portfolio"])


@router.get("/design-cards", response_model=list[DesignCard])
async def get_design_cards() -> list[DesignCard]:
    """Возвращает карточки системного дизайна."""
    return load_design_cards()
