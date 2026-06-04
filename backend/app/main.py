from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_design_cards import router as design_cards_router
from app.api.routes_health import router as health_router
from app.api.routes_projects import router as projects_router
from app.api.routes_services import router as services_router
from app.core.config import settings


def create_app() -> FastAPI:
    """Создаёт FastAPI-приложение и подключает рабочие маршруты."""
    app = FastAPI(title=settings.app_name)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )
    app.include_router(health_router, prefix=settings.api_prefix)
    app.include_router(projects_router, prefix=settings.api_prefix)
    app.include_router(design_cards_router, prefix=settings.api_prefix)
    app.include_router(services_router, prefix=settings.api_prefix)

    return app


app = create_app()
