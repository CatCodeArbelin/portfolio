from enum import StrEnum
from typing import Literal

from pydantic import BaseModel


class ProjectStatus(StrEnum):
    """Допустимый публичный статус проекта в портфолио."""

    demo = "demo"
    pet_project = "pet-project"
    client_prototype = "client-prototype"
    production = "production"


class Project(BaseModel):
    """Проект из публичного списка портфолио."""

    slug: str
    title: str
    description: str
    stack: list[str]
    status: ProjectStatus
    github_url: str | None = None


class DesignCard(BaseModel):
    """Карточка системного дизайна с разбором решения."""

    slug: str
    title: str
    task: str
    scheme: str
    stack: list[str]
    key_decisions: list[str]
    common_mistakes: list[str]
    scaling_notes: list[str]


class ServiceCard(BaseModel):
    """Карточка услуги на главной странице портфолио."""

    title: Literal[
        "Telegram Bots",
        "AI Automation",
        "Backend API",
        "Internal Tools",
    ]
    features: list[str]
