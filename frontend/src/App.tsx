import { HealthStatus } from './components/HealthStatus';

export function App() {
  return (
    <main className="page">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">CatCode / Arbelin Lab</p>
        <h1 id="page-title">AI Backend, Telegram Bots и Automation Developer</h1>
        <p className="lead">
          Этап 1: Vite React TypeScript приложение с базовой страницей и проверкой
          подключения к backend health endpoint.
        </p>
        <HealthStatus />
      </section>
    </main>
  );
}
