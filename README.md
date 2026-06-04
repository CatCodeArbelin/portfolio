# CatCode Portfolio

Минимальный fullstack skeleton для портфолио CatCode / Arbelin Lab.

## Этап 1: базовый запуск

На первом этапе проект поднимает только инфраструктурный skeleton:

- FastAPI backend с `/api/v1/health`;
- React + Vite frontend;
- PostgreSQL в `docker-compose.yml`;
- Redis в `docker-compose.yml`;
- передачу `DATABASE_URL` в backend через environment.

Полная database-архитектура намеренно не добавляется на этом этапе: SQLAlchemy models,
Alembic config и repositories относятся к Этапу 2.

Health endpoint сейчас проверяет готовность самого backend. Доступность PostgreSQL и Redis
для базового запуска контролируется healthcheck'ами Docker Compose; полноценный runtime-check
из API будет добавлен на этапе системного статуса/Database без преждевременного ORM-слоя.

## Локальный запуск

```bash
cp .env.example .env
docker compose up --build
```

После запуска:

- frontend: <http://localhost:5173>
- backend health: <http://localhost:8000/api/v1/health>
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
