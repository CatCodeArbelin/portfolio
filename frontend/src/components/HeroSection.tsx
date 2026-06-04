const terminalLines = [
  '$ whoami',
  'catcode / arbelin',
  '$ focus --current',
  'AI backend · Telegram bots · automation',
  '$ build --with-care',
  'clean APIs + helpful internal tools',
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
        <div className="terminalChrome">
          <span />
          <span />
          <span />
        </div>
        <div className="terminalTitle">catcode.dev — terminal</div>
        <pre>{terminalLines.join('\n')}</pre>
        <div className="terminalBadges">
          <span>FastAPI</span>
          <span>Bots</span>
          <span>AI</span>
        </div>
        <div className="catPattern">
          <span className="catEar left" />
          <span className="catEar right" />
          <span className="catFace">&lt;/ᓚᘏᗢ&gt;</span>
          <span className="codeGlyph">{'{ api: "clean" }'}</span>
        </div>
      </aside>
    </section>
  );
}
