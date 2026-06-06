const terminalLines = [
  'whoami  catcode',
  'stack   py · react',
  'focus   bots · AI',
  'status  open',
];

const heroMetrics = [
  { label: 'API', value: 'REST' },
  { label: 'Bots', value: 'TG' },
  { label: 'AI', value: 'flows' },
  { label: 'Deploy', value: 'Docker' },
] as const;

const heroTiles = [
  {
    icon: '<>',
    href: 'https://github.com/CatCodeArbelin',
    title: 'GitHub',
    caption: 'код и репозитории',
  },
  { icon: '@', title: 'Telegram', caption: 'визуальный слот контакта' },
  { icon: 'AI', title: 'AI Generator', caption: 'макет будущего блока' },
  { icon: '/v1', title: 'API Playground', caption: 'макет будущего блока' },
] as const;

export function HeroSection() {
  return (
    <section className="hero sectionCard" aria-labelledby="page-title">
      <div className="heroContent">
        <p className="eyebrow">Independent Developer</p>
        <h1 id="page-title">CatCode / Arbelin</h1>
        <p className="heroSubtitle">AI Backend · Telegram Bots · Automation</p>
        <div className="heroMetrics" aria-label="Ключевые направления">
          {heroMetrics.map((metric) => (
            <span className="heroMetric" key={metric.label}>
              <strong>{metric.label}</strong>
              <span>{metric.value}</span>
            </span>
          ))}
        </div>
        <p className="lead">
          Разрабатываю backend-сервисы, Telegram-ботов и AI-автоматизации для бизнеса:
          проектирую API, связываю внешние сервисы и превращаю повторяющиеся процессы в
          надёжные внутренние инструменты.
        </p>
        <div className="heroActions" aria-label="Основные ссылки и визуальные слоты">
          {heroTiles.map((tile) =>
            'href' in tile ? (
              <a className="heroActionTile" href={tile.href} key={tile.title}>
                <span className="heroActionIcon">{tile.icon}</span>
                <span>
                  <strong>{tile.title}</strong>
                  <small>{tile.caption}</small>
                </span>
              </a>
            ) : (
              <span
                className="heroActionTile visualOnlyTile"
                aria-disabled="true"
                key={tile.title}
                title={tile.caption}
              >
                <span className="heroActionIcon">{tile.icon}</span>
                <span>
                  <strong>{tile.title}</strong>
                  <small>{tile.caption}</small>
                </span>
              </span>
            ),
          )}
        </div>
      </div>

      <aside className="heroTerminal" aria-hidden="true">
        <div className="circuitLines">
          <span />
          <span />
          <span />
        </div>
        <div className="terminalChrome">
          <span />
          <span />
          <span />
        </div>
        <div className="terminalTitle">
          <span>catcode.dev — dashboard</span>
          <span className="terminalPrompt">&gt;_</span>
        </div>
        <div className="terminalPanel">
          <pre>{terminalLines.join('\n')}</pre>
        </div>
        <div className="terminalBadges">
          <span>API online</span>
          <span>Bot-ready</span>
          <span>AI workflow</span>
        </div>
        <div className="catOutline">
          <span className="catEar left" />
          <span className="catEar right" />
          <span className="catFace">ᓚᘏᗢ</span>
          <span className="catWhiskers">&lt; / &gt;</span>
        </div>
        <div className="devMetric">
          <span>latency mindset</span>
          <strong>clean APIs</strong>
        </div>
      </aside>
    </section>
  );
}
