from app.schemas.portfolio import DesignCard, Project, ServiceCard
from app.services.content_service import get_services, load_design_cards, load_projects


def test_load_projects_returns_project_models() -> None:
    """Проверяет загрузку проектов из JSON-контента."""
    projects = load_projects()

    assert projects
    assert all(isinstance(project, Project) for project in projects)
    assert {project.slug for project in projects} == {
        "telegram-jewelry-shop",
        "ai-assistant-automation",
        "dota-auto-chess-tournament-platform",
    }


def test_load_design_cards_returns_design_card_models() -> None:
    """Проверяет загрузку design cards из JSON-контента."""
    design_cards = load_design_cards()

    assert design_cards
    assert all(isinstance(card, DesignCard) for card in design_cards)
    assert {card.slug for card in design_cards} == {
        "telegram-shop-bot",
        "ai-assistant",
        "catcode-portfolio",
    }


def test_get_services_returns_spec_services() -> None:
    """Проверяет список услуг из спецификации."""
    services = get_services()

    assert all(isinstance(service, ServiceCard) for service in services)
    assert [service.title for service in services] == [
        "Telegram Bots",
        "AI Automation",
        "Backend API",
        "Internal Tools",
    ]
    assert services[0].features == [
        "заявки",
        "магазины",
        "оплаты",
        "уведомления",
        "административные сценарии",
        "интеграции",
    ]
