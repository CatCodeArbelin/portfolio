import json
from pathlib import Path
from typing import Any

from app.schemas.portfolio import DesignCard, Project, ServiceCard

CONTENT_DIR = Path(__file__).resolve().parents[1] / "content"
PROJECTS_FILE = CONTENT_DIR / "projects.json"
DESIGN_CARDS_FILE = CONTENT_DIR / "design_cards.json"


def _read_json_list(file_path: Path) -> list[dict[str, Any]]:
    """Читает JSON-файл со списком словарей контента."""
    with file_path.open(encoding="utf-8") as content_file:
        data = json.load(content_file)

    if not isinstance(data, list):
        raise ValueError(f"Content file must contain a list: {file_path}")

    return data


def load_projects() -> list[Project]:
    """Загружает проекты портфолио из JSON-контента."""
    return [Project.model_validate(project) for project in _read_json_list(PROJECTS_FILE)]


def load_design_cards() -> list[DesignCard]:
    """Загружает карточки системного дизайна из JSON-контента."""
    return [DesignCard.model_validate(card) for card in _read_json_list(DESIGN_CARDS_FILE)]


def get_services() -> list[ServiceCard]:
    """Возвращает список публичных услуг CatCode."""
    return [
        ServiceCard(
            title="Telegram Bots",
            features=[
                "заявки",
                "магазины",
                "оплаты",
                "уведомления",
                "административные сценарии",
                "интеграции",
            ],
        ),
        ServiceCard(
            title="AI Automation",
            features=[
                "AI-ассистенты",
                "обработка заявок",
                "генерация ответов",
                "интеграции OpenAI / Claude",
                "prompt workflow",
                "автоматизация рутины",
            ],
        ),
        ServiceCard(
            title="Backend API",
            features=[
                "FastAPI",
                "REST API",
                "интеграции",
                "PostgreSQL",
                "Redis",
                "Docker deployment",
            ],
        ),
        ServiceCard(
            title="Internal Tools",
            features=[
                "мини-CRM",
                "панели управления",
                "внутренние инструменты",
                "автоматизация бизнес-процессов",
            ],
        ),
    ]
