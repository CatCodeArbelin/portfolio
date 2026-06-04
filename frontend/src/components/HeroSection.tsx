const terminalLines = [
  '$ whoami',
  'catcode / arbelin',
  '$ stack --focus',
  'FastAPI · React · Bots · AI',
  '$ deploy --style=clean',
  'production-looking portfolio online',
];

export function HeroSection() {
  return (
    <section className="hero sectionCard" aria-labelledby="page-title">
      <div className="heroContent">
        <p className="eyebrow">Independent Developer</p>
        <h1 id="page-title">CatCode / Arbelin</h1>
        <p className="heroSubtitle">AI Backend · Telegram Bots · Automation</p>
        <p className="lead">
          Проектирую и собираю понятные backend-сервисы, Telegram-ботов и AI-автоматизации:
          от аккуратного API до внутренних инструментов, которые снимают ручную рутину.
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

      <aside className="heroTerminal" aria-label="Декоративный terminal cat developer pattern">
        <div className="terminalChrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <pre>{terminalLines.join('\n')}</pre>
        <div className="catPattern" aria-hidden="true">
          <span className="catEar left" />
          <span className="catEar right" />
          <span className="catFace">&lt;/ᓚᘏᗢ&gt;</span>
          <span className="codeGlyph">{'{ api: "clean" }'}</span>
        </div>
      </aside>
    </section>
  );
}
