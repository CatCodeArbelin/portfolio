import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">CatCode / Arbelin Lab</p>
        <h1>AI Backend, Telegram Bots и Automation Developer</h1>
        <p className="lead">
          Минимальный первый этап портфолио: frontend, backend, Docker Compose,
          PostgreSQL, Redis и проверка доступности API.
        </p>
        <a className="healthLink" href="/api/v1/health">
          Проверить /api/v1/health
        </a>
      </section>
    </main>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
