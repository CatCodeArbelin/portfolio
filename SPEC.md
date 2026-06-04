# Техническое задание: CatCode Portfolio / Arbelin Lab

## 1. Цель проекта

Создать личный сайт-визитку разработчика под псевдонимом **CatCode**.
Никнейм автора: **Arbelin**.

Сайт должен выполнять две задачи:

1. Кратко и понятно презентовать услуги и проекты.
2. Демонстрировать реальные навыки разработки через работающие интерактивные функции.

Это не маркетинговый лендинг с пустыми словами. Это небольшой production-looking fullstack-проект, который можно показывать заказчикам, HR и техническим специалистам.

Основное позиционирование:

**CatCode — AI Backend / Telegram Bots / Automation Developer**

Основные направления:

* Python backend;
* FastAPI;
* Telegram-боты;
* AI-интеграции;
* автоматизация бизнес-процессов;
* REST API;
* Docker deployment;
* PostgreSQL;
* Redis;
* background jobs.

---

## 2. Основные принципы реализации

### 2.1. Архитектурный подход

Использовать **модульный монолит**.

Не создавать микросервисы ради микросервисов.
Не усложнять проект без реальной необходимости.

Приложение должно быть разделено на логические модули:

* portfolio;
* contacts;
* Telegram integration;
* AI architecture generator;
* API playground;
* system status;
* system design cards;
* bot.

### 2.2. Требования к качеству кода

Код должен быть:

* человекочитаемым;
* простым для изучения;
* без мёртвого кода;
* без неработающих заглушек;
* без дублирования логики;
* без огромных файлов;
* без избыточных абстракций;
* без бессмысленных паттернов;
* без лишних зависимостей;
* без скрытых магических значений.

Соблюдать:

* DRY;
* KISS;
* YAGNI;
* separation of concerns.

Не добавлять архитектурные слои, если они не решают реальную задачу.

### 2.3. Комментарии и документация в коде

Backend-функции, сервисы и классы должны иметь короткие русскоязычные docstring.

Комментарии на русском языке добавлять только там, где логика неочевидна.

Не писать комментарии, которые просто пересказывают строку кода.

Плохо:

```python
# Получаем пользователя
user = get_user()
```

Хорошо:

```python
# Повторный webhook может прийти после таймаута провайдера,
# поэтому проверяем idempotency_key до создания заявки.
```

### 2.4. Безопасность

Обязательно:

* не коммитить `.env`;
* не хранить токены в коде;
* валидировать входящие данные через Pydantic;
* ограничивать длину пользовательского ввода;
* добавить rate limit;
* не позволять пользователю выполнять произвольный код;
* не позволять API Playground обращаться к произвольным URL;
* не показывать секреты и внутренние exception trace пользователю;
* логировать ошибки без утечки токенов.

---

## 3. Стек

### Frontend

* React;
* TypeScript;
* Vite;
* React Router;
* обычный CSS или CSS Modules;
* минимальное количество зависимостей;
* lazy loading для тяжёлых интерактивных блоков.

Не использовать тяжёлые UI-фреймворки без необходимости.

### Backend

* Python 3.11+;
* FastAPI;
* Pydantic;
* SQLAlchemy 2.x;
* Alembic;
* PostgreSQL;
* Redis;
* HTTPX;
* ARQ для фоновых задач;
* aiogram 3 для Telegram-бота;
* pytest;
* Ruff.

### Infrastructure

* Docker;
* Docker Compose;
* Nginx;
* healthchecks;
* `.env.example`;
* GitHub Actions для lint, test и build.

---

## 4. Общая архитектура

```text
Пользователь
     |
     v
Frontend: React + TypeScript
     |
     v
Nginx
     |
     v
FastAPI backend
     |
     +--------------------+
     |                    |
     v                    v
PostgreSQL             Redis
заявки, история        cache, rate limit,
генераций              ARQ queue
                           |
                           v
                       ARQ Worker
                           |
                           v
                  OpenAI / Claude API
                  или локальный mock-mode

FastAPI backend
     |
     v
Telegram Bot API
     |
     v
Админ-чат CatCode

Telegram Bot
     |
     v
Aiogram service
```

---

## 5. Структура репозитория

```text
catcode-portfolio/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes_health.py
│   │   │   ├── routes_contacts.py
│   │   │   ├── routes_projects.py
│   │   │   ├── routes_design_cards.py
│   │   │   ├── routes_architecture_jobs.py
│   │   │   └── routes_playground.py
│   │   ├── bot/
│   │   │   ├── handlers.py
│   │   │   ├── keyboards.py
│   │   │   └── runner.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── logging.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   ├── models.py
│   │   │   ├── session.py
│   │   │   └── repositories.py
│   │   ├── schemas/
│   │   │   ├── contacts.py
│   │   │   ├── architecture.py
│   │   │   └── status.py
│   │   ├── services/
│   │   │   ├── telegram_service.py
│   │   │   ├── architecture_service.py
│   │   │   ├── ai_provider.py
│   │   │   ├── cache_service.py
│   │   │   └── rate_limit_service.py
│   │   ├── content/
│   │   │   ├── projects.json
│   │   │   └── design_cards.json
│   │   ├── workers/
│   │   │   ├── tasks.py
│   │   │   └── worker.py
│   │   └── main.py
│   ├── alembic/
│   ├── tests/
│   ├── Dockerfile
│   ├── pyproject.toml
│   └── alembic.ini
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── content/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── setup.md
│   ├── architecture.md
│   └── api.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Makefile
└── README.md
```

Допускаются небольшие изменения структуры, если они делают проект проще и понятнее.

---

## 6. Дизайн сайта

### Общий стиль

Стиль должен быть тёмным, аккуратным и современным.

Ориентир:

* тёмный графитовый фон;
* нейтральные серые поверхности;
* акценты: зелёный, голубой или фиолетовый;
* терминальный/dev-вайб;
* умеренные glow-эффекты;
* хорошая читаемость;
* отсутствие визуального шума.

Не превращать сайт в тяжёлый cyberpunk-интерфейс.

### Анимации

Использовать только лёгкие CSS-анимации:

* hover;
* плавное появление секций;
* мягкая подсветка карточек;
* мигающий курсор терминала;
* небольшие переходы состояния.

Не использовать тяжёлые видеофоны, WebGL и сложные canvas-анимации.

Поддержать `prefers-reduced-motion`.

### Производительность

* mobile-first;
* lazy loading интерактивных секций;
* оптимизированные изображения;
* отсутствие тяжёлых зависимостей;
* отсутствие ненужных запросов;
* адаптация под мобильные устройства;
* хорошая скорость первой загрузки.

Целевой ориентир: Lighthouse Performance не ниже 90 на основной странице после production-сборки.

---

## 7. Страницы и блоки

## 7.1. Главная страница

### Hero-блок

Заголовок:

```text
CatCode / Arbelin
AI Backend · Telegram Bots · Automation
```

Краткий текст:

```text
Создаю Telegram-ботов, backend API, AI-интеграции
и автоматизации для бизнеса.
```

Кнопки:

* Написать в Telegram;
* Посмотреть GitHub;
* Запустить AI Architecture Generator;
* Открыть API Playground.

Использовать placeholder-переменные для ссылок:

```text
TELEGRAM_USERNAME
GITHUB_URL=https://github.com/CatCodeArbelin
```

### Краткое позиционирование

Показать 4 направления:

* Telegram Bots;
* AI Automation;
* Backend API;
* Internal Tools.

### Стек

Показать компактные badges:

* Python;
* FastAPI;
* React;
* TypeScript;
* PostgreSQL;
* Redis;
* Docker;
* Telegram Bot API;
* OpenAI API;
* Linux.

Без рейтингов уровня «эксперт на 99%».

---

## 7.2. Услуги

Карточки:

### Telegram Bots

* заявки;
* магазины;
* оплаты;
* уведомления;
* административные сценарии;
* интеграции.

### AI Automation

* AI-ассистенты;
* обработка заявок;
* генерация ответов;
* интеграции OpenAI / Claude;
* prompt workflow;
* автоматизация рутины.

### Backend API

* FastAPI;
* REST API;
* интеграции;
* PostgreSQL;
* Redis;
* Docker deployment.

### Internal Tools

* мини-CRM;
* панели управления;
* внутренние инструменты;
* автоматизация бизнес-процессов.

---

## 7.3. Проекты

Хранить данные проектов в одном месте:

```text
backend/app/content/projects.json
```

Frontend получает проекты через API.

Не дублировать список проектов в нескольких файлах.

Добавить 3 проекта.

### Проект 1. Telegram-магазин украшений

Описание:

Telegram-бот с каталогом, оформлением заказов, оплатой и административными уведомлениями.

Стек:

* Python;
* aiogram;
* Telegram Payments;
* ЮKassa;
* Docker;
* SQLite / PostgreSQL.

### Проект 2. AI Assistant / Automation

Описание:

AI-ассистент для автоматизации обработки пользовательских запросов и бизнес-сценариев.

Стек:

* Python;
* FastAPI;
* OpenAI API;
* Redis;
* Docker.

### Проект 3. Dota Auto Chess Tournament Platform

Описание:

Платформа для проведения турниров по Dota Auto Chess.

GitHub:

```text
https://github.com/CatCodeArbelin/dacarbelin
```

Стек:

* Python;
* FastAPI;
* PostgreSQL;
* SQLAlchemy;
* Docker;
* Redis.

Не добавлять выдуманные метрики, пользователей, выручку и production-нагрузку.

Для каждого проекта предусмотреть поле:

```text
status: demo | pet-project | client-prototype | production
```

---

## 7.4. AI Architecture Generator

Это главный интерактивный элемент сайта.

### Пользовательский сценарий

Пользователь вводит задачу бизнеса:

```text
Нужен Telegram-бот для записи клиентов в салон.
```

Дополнительно выбирает:

* канал: Telegram / Web / CRM / Mixed;
* сложность: MVP / Standard;
* нужна ли AI-интеграция.

После отправки пользователь получает:

* краткое описание решения;
* список модулей;
* рекомендуемый стек;
* текстовую архитектурную схему;
* основные этапы разработки;
* потенциальные bottleneck;
* сложность проекта.

### Backend flow

```text
POST /api/v1/architecture-jobs
        |
        v
Создание job в PostgreSQL
        |
        v
Постановка задачи в Redis / ARQ
        |
        v
Worker
        |
        v
AI provider или mock provider
        |
        v
Сохранение результата в PostgreSQL
        |
        v
Frontend polling:
GET /api/v1/architecture-jobs/{job_id}
```

### Почему использовать background job

Не держать HTTP-запрос открытым во время долгой генерации.

При создании job возвращать:

```json
{
  "job_id": "uuid",
  "status": "pending",
  "status_url": "/api/v1/architecture-jobs/{job_id}"
}
```

HTTP status:

```text
202 Accepted
```

### Режимы AI

Поддержать:

```text
AI_PROVIDER=mock
AI_PROVIDER=openai
AI_PROVIDER=anthropic
```

По умолчанию:

```text
AI_PROVIDER=mock
```

В mock-mode приложение должно полностью работать без внешнего API-ключа.

Если внешний AI-provider недоступен:

* использовать timeout;
* выполнить ограниченное количество retry;
* применить exponential backoff;
* вернуть понятную ошибку или fallback mock response;
* не ронять backend.

### Кэширование

Использовать Redis.

Ключ:

```text
hash(normalized_input + channel + complexity + ai_enabled + provider + prompt_version)
```

TTL:

```text
3600 секунд
```

### Rate limit

Ограничить количество генераций:

```text
5 запросов в минуту с одного IP
```

Значения вынести в env.

---

## 7.5. API Playground

Добавить отдельную страницу `/playground`.

Цель: показать работу FastAPI backend и REST API без необходимости открывать Swagger.

Пользователь выбирает безопасный preset-запрос:

* Health check;
* Список проектов;
* System Design Cards;
* Echo demo;
* Создание Architecture Job;
* Проверка статуса Architecture Job.

Показывать:

* HTTP method;
* endpoint;
* request body;
* response status;
* JSON response;
* время ответа.

Не разрешать ввод произвольного URL.

Не выполнять произвольный код.

Добавить ссылку на Swagger:

```text
/api/docs
```

---

## 7.6. Live Terminal

Добавить лёгкий frontend-компонент терминала.

Терминал не должен иметь доступ к shell или серверной командной строке.

Это только безопасная интерактивная frontend-демонстрация.

Команды:

```text
help
whoami
skills
services
projects
status
github
contact
clear
```

Команда:

```text
status
```

должна вызывать:

```text
GET /api/v1/health
```

и отображать реальный ответ backend.

Пример:

```text
$ whoami
CatCode / Arbelin
AI Backend · Telegram Bots · Automation

$ status
API: online
PostgreSQL: online
Redis: online
Telegram: dev_mode
AI provider: mock
```

---

## 7.7. System Design Cards

Добавить секцию «Как я проектирую системы».

Хранить карточки в:

```text
backend/app/content/design_cards.json
```

Frontend получает данные через API.

Карточки:

### Telegram Shop Bot

Показывать:

* задача;
* схема;
* стек;
* ключевые решения;
* возможные ошибки;
* как масштабировать.

Пример схемы:

```text
Telegram User
      |
      v
Aiogram Bot
      |
      v
Backend Service
      |
      +------> PostgreSQL
      |
      +------> Payment Provider
      |
      +------> Admin Notifications
```

### AI Assistant

```text
Client
  |
  v
FastAPI
  |
  +------> Redis cache
  |
  +------> ARQ queue
  |
  v
AI Worker
  |
  v
OpenAI / Claude API
  |
  v
PostgreSQL
```

### CatCode Portfolio

```text
React
  |
  v
Nginx
  |
  v
FastAPI
  |
  +------> PostgreSQL
  |
  +------> Redis
  |
  +------> Telegram Bot API
```

Не писать выдуманные production-истории.

---

## 7.8. Telegram-интеграция

### Форма заявки на сайте

Поля:

* имя;
* Telegram username;
* описание задачи;
* бюджет опционально;
* тип услуги;
* согласие на обработку данных.

Endpoint:

```text
POST /api/v1/contacts
```

Backend должен:

1. Провалидировать данные.
2. Сохранить заявку в PostgreSQL.
3. Отправить уведомление в Telegram admin chat.
4. Вернуть понятный ответ.

Добавить защиту:

* rate limit;
* honeypot-поле;
* ограничение длины текста;
* логирование без утечки приватных данных.

Если Telegram не настроен:

* заявку сохранить в PostgreSQL;
* не ронять backend;
* вернуть успешный ответ;
* записать warning в лог.

### Telegram-бот

Добавить отдельный aiogram-сервис.

Команды:

```text
/start
/services
/projects
/status
/contact
```

Локально бот должен запускаться в polling-mode.

Если токен не задан:

* сервис не должен падать;
* вывести понятный warning;
* перейти в disabled mode.

Webhook-mode оставить как документированное расширение, но не усложнять MVP.

---

## 7.9. System Status

Добавить блок «Live System Status».

Endpoint:

```text
GET /api/v1/health
```

Ответ:

```json
{
  "api": "online",
  "postgres": "online",
  "redis": "online",
  "telegram": "configured",
  "ai_provider": "mock",
  "worker": "online"
}
```

Не показывать секреты, хосты и токены.

Реально проверять PostgreSQL и Redis.

Telegram и AI-provider показывать как:

```text
configured
dev_mode
disabled
```

---

## 8. API endpoints

```text
GET  /api/v1/health
GET  /api/v1/projects
GET  /api/v1/design-cards
GET  /api/v1/playground/examples

POST /api/v1/contacts

POST /api/v1/architecture-jobs
GET  /api/v1/architecture-jobs/{job_id}

POST /api/v1/playground/echo
```

Swagger:

```text
/api/docs
```

OpenAPI JSON:

```text
/api/openapi.json
```

---

## 9. PostgreSQL

Использовать PostgreSQL для:

* заявок;
* architecture jobs;
* истории генераций;
* статусов задач;
* временных ошибок обработки.

Минимальные таблицы:

```text
contacts
architecture_jobs
```

Для `architecture_jobs` предусмотреть:

```text
id
input_text
channel
complexity
ai_enabled
status
result_json
error_message
created_at
updated_at
```

Статусы:

```text
pending
processing
done
failed
```

Использовать Alembic migrations.

---

## 10. Redis

Использовать Redis для:

* ARQ queue;
* кэширования AI Architecture Generator;
* rate limit;
* хранения короткоживущих служебных данных.

Не использовать Redis как основную БД.

---

## 11. Docker Compose

Проект должен запускаться одной командой:

```bash
docker compose up --build
```

Сервисы Этапа 1:

```text
backend
frontend
postgres
redis
```

На Этапе 1 не добавлять worker, bot, certbot, отдельные production profiles
или CI-related сервисы. Эти компоненты относятся к последующим этапам.

Добавить Docker Compose healthchecks для:

* postgres;
* redis;
* backend.

Backend должен ждать готовности PostgreSQL и Redis через healthcheck-зависимости.

Для локального режима проект должен работать без OpenAI API и Telegram token.

---

## 12. Environment variables

Создать `.env.example`.

```env
APP_ENV=development
APP_NAME=catcode-portfolio
APP_PORT=8000

POSTGRES_DB=catcode
POSTGRES_USER=catcode
POSTGRES_PASSWORD=change_me
DATABASE_URL=postgresql+asyncpg://catcode:change_me@postgres:5432/catcode

REDIS_URL=redis://redis:6379/0

AI_PROVIDER=mock
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AI_REQUEST_TIMEOUT_SECONDS=15
AI_CACHE_TTL_SECONDS=3600
AI_RATE_LIMIT_PER_MINUTE=5
PROMPT_VERSION=v1

TELEGRAM_ENABLED=false
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
TELEGRAM_USERNAME=

GITHUB_URL=https://github.com/CatCodeArbelin
```

---

## 13. Логирование и обработка ошибок

Использовать стандартный logging.

Логировать:

* startup;
* ошибки внешних API;
* architecture job lifecycle;
* Telegram warnings;
* request_id;
* latency основных запросов;
* ошибки worker.

Не логировать:

* API keys;
* Telegram tokens;
* приватные данные полностью;
* stack trace пользователю.

Добавить единый формат ошибок API:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Некорректные параметры запроса",
    "request_id": "uuid"
  }
}
```

---

## 14. Тесты

Backend:

* health endpoint;
* projects endpoint;
* contact form validation;
* contact form сохранение в БД;
* Telegram disabled mode;
* Architecture Generator mock-mode;
* job creation;
* job status;
* cache;
* rate limit.

Frontend:

* production build;
* type checking;
* минимальные component tests для критичных компонентов опционально.

---

## 15. CI

GitHub Actions workflow:

1. Backend:

   * Ruff;
   * pytest.

2. Frontend:

   * npm ci;
   * type check;
   * npm run build.

3. Docker:

   * проверить docker build.

Не добавлять сложный deployment pipeline без необходимости.

---

## 16. Makefile

Добавить команды:

```bash
make up
make down
make logs
make test
make lint
make migrate
make format
```

---

## 17. Требования к README.md

README.md должен быть написан для человека, который впервые открыл GitHub автора:

* HR;
* технического специалиста;
* потенциального заказчика.

README должен за 15–30 секунд объяснять:

1. Что это за проект.
2. Что он демонстрирует.
3. Какой стек используется.
4. Какие функции реально работают.
5. Где посмотреть демо.
6. Где посмотреть подробную документацию.

### Ограничения README

README должен быть компактным:

```text
300–500 слов
```

Не превращать README в документацию проекта.

Не писать:

* длинные инструкции;
* описание каждой папки;
* описание каждой переменной окружения;
* маркетинговые лозунги;
* «революционный»;
* «cutting-edge»;
* «enterprise-grade»;
* «ultra scalable»;
* «инновационная экосистема»;
* десятки эмодзи;
* выдуманные метрики;
* выдуманные production-кейсы;
* огромные таблицы;
* бессмысленные badges;
* нейросгенерированное многословие.

README должен выглядеть так, будто его написал практикующий разработчик.

### Структура README

```md
# CatCode Portfolio

Личный fullstack-сайт backend-разработчика CatCode / Arbelin.

Проект демонстрирует React frontend, FastAPI backend, Telegram-интеграцию,
AI Architecture Generator, API Playground, PostgreSQL, Redis и Docker Compose.

## Demo

- Website: [добавить после деплоя]
- API Docs: [добавить после деплоя]/api/docs
- GitHub: https://github.com/CatCodeArbelin

## Stack

- React + TypeScript
- FastAPI + Python
- PostgreSQL
- Redis + ARQ
- Telegram Bot API
- Docker Compose

## Features

- AI Architecture Generator
- Telegram contact integration
- API Playground
- Live Terminal
- System Design Cards
- Live System Status

## Architecture

React → Nginx → FastAPI → PostgreSQL / Redis / Telegram Bot API

Long-running AI tasks:
FastAPI → Redis Queue → ARQ Worker → OpenAI / Claude API

## Documentation

- Setup: docs/setup.md
- Architecture: docs/architecture.md
- API: docs/api.md
```

Допустимо добавить один актуальный screenshot сайта после завершения frontend.

### Отдельная документация

Подробные инструкции вынести в:

```text
docs/setup.md
docs/architecture.md
docs/api.md
```

---

## 18. Документация

### docs/setup.md

Описать:

* требования;
* копирование `.env.example`;
* запуск через Docker Compose;
* миграции;
* остановку проекта;
* запуск тестов;
* dev-mode;
* подключение Telegram;
* подключение OpenAI / Claude.

### docs/architecture.md

Описать:

* схему компонентов;
* назначение Redis;
* назначение PostgreSQL;
* background job flow;
* mock-mode;
* Telegram integration;
* решения по безопасности.

### docs/api.md

Кратко описать endpoints и примеры запросов.

Не дублировать Swagger полностью.

---

## 19. Критерии готовности

Проект считается готовым, если:

1. Запускается командой:

```bash
docker compose up --build
```

2. Работает без внешних API-ключей в mock-mode.
3. Frontend открывается в браузере.
4. Backend отвечает на `/api/v1/health`.
5. PostgreSQL и Redis проходят healthcheck.
6. Форма заявки сохраняет данные в PostgreSQL.
7. Telegram integration работает при наличии токена.
8. AI Architecture Generator создаёт job.
9. Worker обрабатывает job.
10. Frontend показывает статус и результат.
11. Redis-кэш работает.
12. Rate limit работает.
13. API Playground выполняет только безопасные preset-запросы.
14. Live Terminal выполняет только безопасные команды.
15. System Design Cards отображаются.
16. Swagger доступен по `/api/docs`.
17. Backend-тесты проходят.
18. Frontend production build проходит.
19. README компактный и не содержит нейрохрючева.
20. В репозитории нет секретов, лишних файлов и неработающих кусков кода.

---

## 20. Порядок работы для Codex

Не генерировать весь проект одним огромным коммитом.

Работать итерациями.

После каждого этапа:

1. Показать список изменённых файлов.
2. Кратко описать, что реализовано.
3. Запустить проверки.
4. Исправить ошибки.
5. Только после этого переходить дальше.

Этапы:

### Этап 1. Skeleton

* создать структуру репозитория;
* backend skeleton;
* frontend skeleton;
* docker-compose;
* PostgreSQL;
* Redis;
* health endpoint.

На Этапе 1 PostgreSQL нужно поднять в `docker-compose.yml` и передать `DATABASE_URL`
в backend через переменные окружения. Redis нужно поднять отдельным сервисом
`docker-compose.yml` с Docker Compose healthcheck и передать `REDIS_URL` в backend
через переменные окружения. Не создавать SQLAlchemy models, Alembic config
и repositories до Этапа 2. Не создавать `cache_service.py`, `rate_limit_service.py`,
ARQ worker и queue logic до этапов AI Generator и security/rate limit. Если health endpoint
остаётся частью базового skeleton, он может проверять только готовность backend; проверку
PostgreSQL и Redis можно оставить на healthcheck Docker Compose или реализовать
минимальным lightweight-запросом без ORM/cache/queue-слоёв.

### Этап 2. Database

* SQLAlchemy;
* Alembic;
* contacts;
* architecture_jobs;
* repositories;
* тесты.

### Этап 3. Portfolio content

* projects;
* services;
* design cards;
* API endpoints;
* frontend sections.

### Этап 4. Telegram integration

* contact form;
* сохранение заявки;
* уведомление в Telegram;
* aiogram bot;
* disabled mode;
* тесты.

### Этап 5. AI Architecture Generator

* job endpoint;
* ARQ queue;
* worker;
* mock provider;
* OpenAI / Claude provider abstraction;
* caching;
* polling;
* тесты.

### Этап 6. API Playground

* безопасные preset-запросы;
* отображение JSON;
* latency;
* Swagger link.

### Этап 7. Live Terminal

* безопасные команды;
* status через backend;
* lazy loading.

### Этап 8. UI polishing

* адаптивность;
* accessibility;
* лёгкие анимации;
* оптимизация загрузки.

### Этап 9. CI и документация

* GitHub Actions;
* Makefile;
* README;
* docs/setup.md;
* docs/architecture.md;
* docs/api.md.

### Этап 10. Финальная проверка

* docker compose up --build;
* миграции;
* тесты;
* lint;
* frontend build;
* ручная проверка основных сценариев;
* проверка отсутствия секретов;
* удаление мёртвого кода.

---

## 21. Обязательное правило для Codex

Перед началом каждого этапа:

1. Оценить текущую структуру проекта.
2. Не ломать уже работающий функционал.
3. Не создавать новые зависимости без необходимости.
4. Не оставлять TODO вместо работающего кода.
5. Не добавлять фиктивные функции ради красивого README.
6. Не заявлять о функционале, который не реализован.
7. Не генерировать маркетинговый текст вместо инженерной документации.
8. Не переходить к следующему этапу, пока текущий этап не запускается и не проходит проверки.
