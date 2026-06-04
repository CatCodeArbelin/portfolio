const positioningItems = [
  {
    title: 'Telegram Bots',
    text: 'Сценарии заявок, каталогов, уведомлений и административных процессов.',
  },
  {
    title: 'AI Automation',
    text: 'AI-ассистенты, обработка входящих запросов и автоматизация рутины.',
  },
  {
    title: 'Backend API',
    text: 'FastAPI-сервисы, REST API, интеграции, PostgreSQL и Redis.',
  },
  {
    title: 'Internal Tools',
    text: 'Мини-CRM, панели управления и инструменты для внутренних процессов.',
  },
];

export function HeroSection() {
  return (
    <section className="hero sectionCard" aria-labelledby="page-title">
      <div className="heroContent">
        <p className="eyebrow">CatCode / Arbelin</p>
        <h1 id="page-title">AI Backend · Telegram Bots · Automation</h1>
        <p className="lead">
          Создаю Telegram-ботов, backend API, AI-интеграции и автоматизации для бизнеса.
        </p>
        <div className="heroActions" aria-label="Основные ссылки">
          <a className="primaryLink" href="https://github.com/CatCodeArbelin">
            Посмотреть GitHub
          </a>
          <a className="secondaryLink" href="#services">
            Услуги
          </a>
          <a className="secondaryLink" href="#projects">
            Проекты
          </a>
        </div>
      </div>

      <div className="positioningGrid" aria-label="Краткое позиционирование">
        {positioningItems.map((item) => (
          <article className="miniCard" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
