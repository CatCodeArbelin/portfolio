type DesignCard = {
  slug: string;
  title: string;
  task: string;
  scheme: string;
  stack: string[];
  keyDecisions: string[];
};

const designCards: DesignCard[] = [
  {
    slug: 'telegram-shop-bot',
    title: 'Telegram Shop Bot',
    task: 'Спроектировать понятный Telegram-сценарий для витрины товаров, оформления заявки и уведомления администратора.',
    scheme: 'Пользователь → Telegram Bot → Backend API → PostgreSQL\n                              ↘ уведомление администратору',
    stack: ['Python', 'Telegram Bot API', 'FastAPI', 'PostgreSQL', 'Docker'],
    keyDecisions: [
      'Разделить обработчики Telegram-команд и бизнес-логику заявок.',
      'Хранить заявки и их статусы в базе, а не в памяти процесса бота.',
      'Показывать пользователю простые статусы без внутренних технических ошибок.',
    ],
  },
  {
    slug: 'ai-assistant',
    title: 'AI Assistant',
    task: 'Собрать API-сценарий для подготовки черновиков ответов и автоматизации повторяющихся текстовых задач.',
    scheme: 'Запрос пользователя → API validation → AI service → проверяемый черновик',
    stack: ['Python', 'FastAPI', 'OpenAI API', 'Redis', 'Docker'],
    keyDecisions: [
      'Валидировать входные данные до обращения к AI-провайдеру.',
      'Оставлять человеку финальную проверку там, где результат влияет на ответственность.',
      'Не сохранять секреты и служебные ключи во frontend-коде или тексте ответа.',
    ],
  },
  {
    slug: 'catcode-portfolio-architecture',
    title: 'CatCode Portfolio Architecture',
    task: 'Показать портфолио как небольшой fullstack-проект с frontend, backend API и проверяемым health endpoint.',
    scheme: 'React UI → Nginx/API proxy → FastAPI → portfolio content\n                                  ↘ /api/v1/health',
    stack: ['React', 'TypeScript', 'FastAPI', 'Docker Compose', 'Linux'],
    keyDecisions: [
      'Держать portfolio-контент отдельно от визуального слоя компонента.',
      'Не добавлять будущие интерактивные модули до соответствующих этапов проекта.',
      'Формулировать карточки без выдуманных метрик, SLA и production-нагрузки.',
    ],
  },
];

export function DesignCardsSection() {
  return (
    <section className="sectionCard" id="design-cards" aria-labelledby="design-cards-title">
      <div className="sectionHeader">
        <p className="eyebrow">System Design</p>
        <h2 id="design-cards-title">System design cards</h2>
        <p>Три короткие архитектурные карточки: задача, текстовая схема, стек и ключевые решения.</p>
      </div>

      <div className="designGrid">
        {designCards.map((card) => (
          <article className="designCard" key={card.slug}>
            <h3>{card.title}</h3>
            <div className="designBlock">
              <h4>Задача</h4>
              <p>{card.task}</p>
            </div>
            <div className="designBlock">
              <h4>Схема</h4>
              <pre className="schemeBox" aria-label={`Короткая текстовая схема ${card.title}`}>
                {card.scheme}
              </pre>
            </div>
            <div className="designBlock">
              <h4>Стек</h4>
              <ul className="inlineList" aria-label={`Стек карточки ${card.title}`}>
                {card.stack.map((stackItem) => (
                  <li key={stackItem}>{stackItem}</li>
                ))}
              </ul>
            </div>
            <div className="designBlock">
              <h4>Ключевые решения</h4>
              <ul>
                {card.keyDecisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
