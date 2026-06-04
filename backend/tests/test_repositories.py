import pytest
import pytest_asyncio
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.db.base import Base
from app.db.models import ARCHITECTURE_JOB_STATUSES, ArchitectureJob
from app.db.repositories import (
    create_architecture_job,
    create_contact,
    get_architecture_job_by_id,
    get_contact_by_id,
    update_architecture_job_result,
)


@pytest_asyncio.fixture
async def session() -> AsyncSession:
    """Создаёт изолированную SQLite-сессию для repository-тестов."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    async with factory() as db_session:
        yield db_session

    await engine.dispose()


@pytest.mark.asyncio
async def test_create_contact(session: AsyncSession) -> None:
    """Проверяет создание контактной заявки."""
    contact = await create_contact(
        session,
        name="Иван",
        contact="ivan@example.com",
        message="Нужна консультация",
        source="tests",
    )

    saved_contact = await get_contact_by_id(session, contact.id)

    assert saved_contact is not None
    assert saved_contact.name == "Иван"
    assert saved_contact.contact == "ivan@example.com"
    assert saved_contact.message == "Нужна консультация"
    assert saved_contact.source == "tests"


@pytest.mark.asyncio
async def test_create_architecture_job(session: AsyncSession) -> None:
    """Проверяет создание задачи генерации архитектуры."""
    job = await create_architecture_job(
        session,
        input_text="Сервис записи клиентов",
        channel="web",
        complexity="medium",
        ai_enabled=False,
    )

    saved_job = await get_architecture_job_by_id(session, job.id)

    assert saved_job is not None
    assert saved_job.input_text == "Сервис записи клиентов"
    assert saved_job.channel == "web"
    assert saved_job.complexity == "medium"
    assert saved_job.ai_enabled is False
    assert saved_job.status == "pending"


@pytest.mark.asyncio
async def test_update_architecture_job_status_result_and_error(session: AsyncSession) -> None:
    """Проверяет обновление результата и статуса задачи."""
    job = await create_architecture_job(
        session,
        input_text="CRM для малого бизнеса",
        channel="api",
        complexity="high",
        ai_enabled=True,
    )

    updated_job = await update_architecture_job_result(
        session,
        job_id=job.id,
        status="done",
        result_json={"modules": ["api", "db"]},
        error_message=None,
    )

    assert updated_job is not None
    assert updated_job.status == "done"
    assert updated_job.result_json == {"modules": ["api", "db"]}
    assert updated_job.error_message is None


@pytest.mark.asyncio
async def test_architecture_job_status_values_are_limited(session: AsyncSession) -> None:
    """Проверяет ограничение набора статусов задачи."""
    assert ARCHITECTURE_JOB_STATUSES == ("pending", "processing", "done", "failed")

    invalid_job = ArchitectureJob(
        input_text="Некорректный статус",
        channel="web",
        complexity="low",
        ai_enabled=False,
        status="unknown",
    )
    session.add(invalid_job)

    with pytest.raises(IntegrityError):
        await session.commit()
