const stackItems = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Telegram Bot API',
  'OpenAI API',
  'Linux',
];

export function StackBadges() {
  return (
    <section className="sectionCard" aria-labelledby="stack-title">
      <div className="sectionHeader">
        <p className="eyebrow">Stack</p>
        <h2 id="stack-title">Технологии для backend, ботов и автоматизации</h2>
        <p>
          Компактный набор инструментов без рейтингов и декоративных процентов — только то,
          что используется в проектировании и разработке.
        </p>
      </div>
      <ul className="badgeList" aria-label="Технологический стек">
        {stackItems.map((item) => (
          <li className="stackBadge" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
