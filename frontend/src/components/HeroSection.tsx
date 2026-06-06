const terminalLines = [
  'whoami  catcode',
  'stack   py · react',
  'focus   bots · AI',
  'status  open',
];

const heroLinks = [
  { label: 'Telegram', note: 'visual only' },
  { href: 'https://github.com/CatCodeArbelin', label: 'GitHub', primary: true },
  { label: 'AI Generator', note: 'preview' },
  { label: 'API Playground', note: 'preview' },
] as const;

export function HeroSection() {
  return (
    <section className="hero sectionCard" aria-labelledby="page-title">
      <div className="heroContent">
        <p className="eyebrow">Independent Developer</p>
        <h1 id="page-title">CatCode / Arbelin</h1>
        <p className="heroSubtitle">AI Backend · Telegram Bots · Automation</p>
        <p className="lead">
          Разрабатываю backend-сервисы, Telegram-ботов и AI-автоматизации для бизнеса:
          проектирую API, связываю внешние сервисы и превращаю повторяющиеся процессы в
          надёжные внутренние инструменты.
        </p>
        <div className="heroActions" aria-label="Основные ссылки и будущие интерактивные блоки">
          {heroLinks.map((link) =>
            'href' in link ? (
              <a
                className={link.primary ? 'primaryLink' : 'secondaryLink'}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ) : (
              <span
                className="secondaryLink visualOnlyLink"
                aria-disabled="true"
                key={link.label}
                title={link.note}
              >
                {link.label}
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
