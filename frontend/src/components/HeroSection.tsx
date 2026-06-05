const terminalLines = [
  'whoami  catcode / arbelin',
  'stack   FastAPI · React · Docker',
  'focus   bots · AI backend · automation',
  'status  available for focused builds',
];

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
        <div className="heroActions" aria-label="Основные ссылки">
          <a className="primaryLink" href="https://github.com/CatCodeArbelin">
            GitHub
          </a>
          <a className="secondaryLink" href="#services">
            Services
          </a>
          <a className="secondaryLink" href="#projects">
            Projects
          </a>
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
