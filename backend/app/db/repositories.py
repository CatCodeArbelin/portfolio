from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import ARCHITECTURE_JOB_STATUSES, ArchitectureJob, Contact


async def create_contact(
    session: AsyncSession,
    *,
    name: str,
    contact: str,
    message: str,
    source: str = "website",
) -> Contact:
    """Создаёт контактную заявку и сохраняет её в базе."""
    db_contact = Contact(name=name, contact=contact, message=message, source=source)
    session.add(db_contact)
    await session.commit()
    await session.refresh(db_contact)
    return db_contact


async def get_contact_by_id(session: AsyncSession, contact_id: int) -> Contact | None:
    """Возвращает контактную заявку по идентификатору."""
    return await session.get(Contact, contact_id)


async def create_architecture_job(
    session: AsyncSession,
    *,
    input_text: str,
    channel: str,
    complexity: str,
    ai_enabled: bool,
    status: str = "pending",
) -> ArchitectureJob:
    """Создаёт задачу генерации архитектуры."""
    validate_architecture_job_status(status)
    job = ArchitectureJob(
        input_text=input_text,
        channel=channel,
        complexity=complexity,
        ai_enabled=ai_enabled,
        status=status,
    )
    session.add(job)
    await session.commit()
    await session.refresh(job)
    return job


async def get_architecture_job_by_id(
    session: AsyncSession,
    job_id: int,
) -> ArchitectureJob | None:
    """Возвращает задачу генерации архитектуры по идентификатору."""
    return await session.get(ArchitectureJob, job_id)


async def update_architecture_job_result(
    session: AsyncSession,
    *,
    job_id: int,
    status: str,
    result_json: dict[str, Any] | None = None,
    error_message: str | None = None,
) -> ArchitectureJob | None:
    """Обновляет статус, результат и ошибку задачи генерации архитектуры."""
    validate_architecture_job_status(status)
    job = await session.get(ArchitectureJob, job_id)
    if job is None:
        return None

    job.status = status
    job.result_json = result_json
    job.error_message = error_message
    await session.commit()
    await session.refresh(job)
    return job


def validate_architecture_job_status(status: str) -> None:
    """Проверяет, что статус задачи входит в разрешённый набор."""
    if status not in ARCHITECTURE_JOB_STATUSES:
        expected = ", ".join(ARCHITECTURE_JOB_STATUSES)
        message = f"Unknown architecture job status: {status}. Expected: {expected}"
        raise ValueError(message)

