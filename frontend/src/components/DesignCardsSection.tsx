type DesignCard = {
  slug: string;
  title: string;
  task: string;
  schemeNodes: string[];
  stack: string[];
  keyDecisions: string[];
};

const designCards: DesignCard[] = [
  {
    slug: 'telegram-shop-bot',
    title: 'Telegram Shop Bot',
    task: 'Витрина, заявка и уведомление администратора в Telegram.',
    schemeNodes: ['Telegram', 'API', 'DB'],
    stack: ['Python', 'Telegram Bot API', 'FastAPI', 'PostgreSQL', 'Docker'],
    keyDecisions: [
      'Команды отдельно от логики заявок.',
      'Статусы заявок хранит база.',
      'Пользователь видит простые статусы.',
    ],
  },
  {
    slug: 'ai-assistant',
    title: 'AI Assistant',
    task: 'API для черновиков ответов и типовых текстовых задач.',
    schemeNodes: ['Client', 'API', 'AI'],
    stack: ['Python', 'FastAPI', 'OpenAI API', 'Redis', 'Docker'],
    keyDecisions: [
      'Валидация до AI-запроса.',
      'Финальная проверка остаётся за человеком.',
      'Секреты не попадают во frontend.',
    ],
  },
  {
    slug: 'catcode-portfolio-architecture',
    title: 'CatCode Portfolio Architecture',
    task: 'Небольшой fullstack-сайт с API и health check.',
    schemeNodes: ['React', 'Proxy', 'FastAPI'],
    stack: ['React', 'TypeScript', 'FastAPI', 'Docker Compose', 'Linux'],
    keyDecisions: [
      'Контент отделён от UI.',
      'Только реализованные модули.',
      'Без выдуманных SLA и метрик.',
    ],
  },
];

export function DesignCardsSection() {
  return (
    <section className="sectionCard" id="design-cards" aria-labelledby="design-cards-title">
      <div className="sectionHeader">
        <p className="eyebrow">System Design</p>
        <h2 id="design-cards-title">System design cards</h2>
        <p>Три компактные архитектурные карточки: задача, mini-flow, стек и ключевые решения.</p>
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
              <div className="schemePanel" role="img" aria-label={`Mini-flow ${card.title}: ${card.schemeNodes.join(' → ')}`}>
                <div className="schemePanelBar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <strong>mini-flow</strong>
                </div>
                <div className="schemeFlowLabels">
                  {card.schemeNodes.map((node, index) => (
                    <span className="schemeFlowStep" key={`${card.slug}-${node}`}>
                      <span className="schemeFlowNode">{node}</span>
                      {index < card.schemeNodes.length - 1 ? (
                        <i className="schemeConnector" aria-hidden="true" />
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
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
