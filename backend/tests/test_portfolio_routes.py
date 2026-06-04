import asyncio

import pytest

from app.api import routes_design_cards, routes_projects, routes_services
from app.schemas.portfolio import DesignCard, Project, ProjectStatus, ServiceCard


def test_get_projects_uses_content_service(monkeypatch: pytest.MonkeyPatch) -> None:
    """Проверяет, что endpoint проектов возвращает данные content service."""
    expected_projects = [
        Project(
            slug="test-project",
            title="Test Project",
            description="Проверочный проект",
            stack=["FastAPI"],
            status=ProjectStatus.demo,
        )
    ]

    monkeypatch.setattr(routes_projects, "load_projects", lambda: expected_projects)

    assert asyncio.run(routes_projects.get_projects()) == expected_projects


def test_get_design_cards_uses_content_service(monkeypatch: pytest.MonkeyPatch) -> None:
    """Проверяет, что endpoint design cards возвращает данные content service."""
    expected_cards = [
        DesignCard(
            slug="test-card",
            title="Test Card",
            task="Проверочная задача",
            scheme="client -> api",
            stack=["FastAPI"],
            key_decisions=["простая схема"],
            common_mistakes=["лишняя сложность"],
            scaling_notes=["горизонтальное масштабирование"],
        )
    ]

    monkeypatch.setattr(routes_design_cards, "load_design_cards", lambda: expected_cards)

    assert asyncio.run(routes_design_cards.get_design_cards()) == expected_cards


def test_get_service_cards_uses_content_service(monkeypatch: pytest.MonkeyPatch) -> None:
    """Проверяет, что endpoint услуг возвращает данные content service."""
    expected_services = [
        ServiceCard(
            title="Backend API",
            features=["FastAPI", "REST API"],
        )
    ]

    monkeypatch.setattr(routes_services, "get_services", lambda: expected_services)

    assert asyncio.run(routes_services.get_service_cards()) == expected_services
