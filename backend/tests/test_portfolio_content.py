import asyncio
import json
from typing import Any

from app.main import create_app
from app.schemas.portfolio import ProjectStatus


async def get_json(path: str) -> tuple[int, Any]:
    """Выполняет GET-запрос к ASGI-приложению без внешнего HTTP-клиента."""
    app = create_app()
    messages: list[dict[str, Any]] = []

    async def receive() -> dict[str, Any]:
        return {"type": "http.request", "body": b"", "more_body": False}

    async def send(message: dict[str, Any]) -> None:
        messages.append(message)

    scope = {
        "type": "http",
        "asgi": {"version": "3.0", "spec_version": "2.3"},
        "http_version": "1.1",
        "method": "GET",
        "scheme": "http",
        "path": path,
        "raw_path": path.encode(),
        "query_string": b"",
        "headers": [(b"host", b"testserver")],
        "client": ("testclient", 50000),
        "server": ("testserver", 80),
    }

    await app(scope, receive, send)

    status = next(
        message["status"]
        for message in messages
        if message["type"] == "http.response.start"
    )
    body = b"".join(
        message.get("body", b"")
        for message in messages
        if message["type"] == "http.response.body"
    )
    return status, json.loads(body)


def request_json(path: str) -> tuple[int, Any]:
    """Синхронно запускает тестовый GET-запрос к ASGI-приложению."""
    return asyncio.run(get_json(path))


def test_projects_endpoint_returns_expected_portfolio_content() -> None:
    """Проверяет публичный endpoint проектов портфолио."""
    status_code, projects = request_json("/api/v1/projects")

    assert status_code == 200
    assert len(projects) == 3

    valid_statuses = {status.value for status in ProjectStatus}
    assert all(project["status"] in valid_statuses for project in projects)

    dota_project = next(
        project
        for project in projects
        if project["title"] == "Dota Auto Chess Tournament Platform"
    )
    assert dota_project["github_url"] == "https://github.com/CatCodeArbelin/dacarbelin"


def test_design_cards_endpoint_returns_expected_content_shape() -> None:
    """Проверяет публичный endpoint карточек системного дизайна."""
    status_code, design_cards = request_json("/api/v1/design-cards")

    assert status_code == 200
    assert len(design_cards) == 3

    required_fields = {
        "task",
        "scheme",
        "stack",
        "key_decisions",
        "common_mistakes",
        "scaling_notes",
    }
    assert all(required_fields <= card.keys() for card in design_cards)


def test_services_endpoint_returns_expected_services_count() -> None:
    """Проверяет публичный endpoint услуг портфолио."""
    status_code, services = request_json("/api/v1/services")

    assert status_code == 200
    assert len(services) == 4
