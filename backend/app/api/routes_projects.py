from fastapi import APIRouter

from app.schemas.portfolio import Project
from app.services.content_service import load_projects

router = APIRouter(tags=["portfolio"])


@router.get("/projects", response_model=list[Project])
async def get_projects() -> list[Project]:
    """Возвращает список проектов портфолио."""
    return load_projects()
