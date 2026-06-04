import { getDesignCards, type DesignCard } from '../api/portfolio';
import { useSectionData } from './useSectionData';

const designCardFallbacks: DesignCard[] = [
  {
    slug: 'telegram-shop-bot',
    title: 'Telegram Shop Bot',
    task: 'Собрать Telegram-бота для каталога, заявки и уведомлений администратора.',
    scheme: 'User → Telegram Bot → Backend API → PostgreSQL\n                         ↘ Admin notification',
    stack: ['Python', 'Telegram Bot API', 'FastAPI', 'PostgreSQL', 'Docker'],
    key_decisions: [
      'Отделить сценарии бота от бизнес-логики backend.',
      'Хранить заявки и статусы в базе, а не в памяти процесса.',
      'Не раскрывать служебные ошибки пользователю Telegram.',
    ],
    common_mistakes: [],
    scaling_notes: [],
  },
  {
    slug: 'ai-assistant',
    title: 'AI Assistant',
    task: 'Автоматизировать повторяющиеся текстовые задачи и подготовку черновиков ответов.',
    scheme: 'User request → API validation → AI service → Reviewable response',
    stack: ['Python', 'FastAPI', 'OpenAI API', 'Redis', 'Docker'],
    key_decisions: [
      'Валидировать входные данные до обращения к AI API.',
      'Оставлять человеку контроль над результатом там, где нужна ответственность.',
      'Логировать технические ошибки без утечки содержимого секретов.',
    ],
    common_mistakes: [],
    scaling_notes: [],
  },
  {
    slug: 'catcode-portfolio-architecture',
    title: 'CatCode Portfolio Architecture',
    task: 'Показать портфолио как небольшой fullstack-проект, а не статичный набор обещаний.',
    scheme: 'React → Nginx/API proxy → FastAPI → Portfolio content\n                         ↘ Health endpoint',
    stack: ['React', 'TypeScript', 'FastAPI', 'Docker', 'Linux'],
    key_decisions: [
      'Frontend остаётся полезным даже при недоступном backend.',
      'Portfolio content отображается через fallback без красных HTTP-блоков.',
      'Интерактивные будущие модули не добавляются до своего этапа.',
    ],
    common_mistakes: [],
    scaling_notes: [],
  },
];

export function DesignCardsSection() {
  const [designCardsState] = useSectionData({
    loadData: getDesignCards,
    fallbackData: designCardFallbacks,
    emptyMessage: 'Карточки системного дизайна пока не опубликованы.',
    logContext: 'DesignCardsSection',
  });

  const cards =
    designCardsState.status === 'ready' && designCardsState.source === 'fallback'
      ? designCardsState.data
      : designCardFallbacks;

  return (
    <section className="sectionCard" aria-labelledby="design-cards-title">
      <div className="sectionHeader">
        <p className="eyebrow">System Design</p>
        <h2 id="design-cards-title">System design cards</h2>
        <p>Короткие архитектурные карточки: задача, схема, стек и ключевые решения без production-легенд.</p>
      </div>

      <div className="designGrid">
        {cards.map((card) => (
          <article className="designCard" key={card.slug}>
            <h3>{card.title}</h3>
            <div className="designBlock">
              <h4>Задача</h4>
              <p>{card.task}</p>
            </div>
            <div className="designBlock">
              <h4>Схема</h4>
              <pre className="schemeBox" aria-label={`Схема ${card.title}`}>
                {card.scheme}
              </pre>
            </div>
            <div className="designBlock">
              <h4>Ключевые решения</h4>
              <ul>
                {card.key_decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </div>
            <ul className="inlineList" aria-label={`Стек карточки ${card.title}`}>
              {card.stack.map((stackItem) => (
                <li key={stackItem}>{stackItem}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
