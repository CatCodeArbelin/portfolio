from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Настройки приложения из переменных окружения."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "CatCode Portfolio API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api/v1"
    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173"])

    postgres_db: str = "catcode"
    postgres_user: str = "catcode"
    postgres_password: str = "catcode"
    database_url: str = "postgresql+asyncpg://catcode:catcode@postgres:5432/catcode"
    redis_url: str = "redis://redis:6379/0"


settings = Settings()
