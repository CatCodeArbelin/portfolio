import { useEffect, useState } from 'react';
import { getBackendHealth, type HealthResponse } from '../api/health';

type HealthState =
  | { status: 'loading' }
  | { status: 'ready'; data: HealthResponse }
  | { status: 'error'; message: string };

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось получить ответ backend.';
}

export function HealthStatus() {
  const [healthState, setHealthState] = useState<HealthState>({ status: 'loading' });

  async function loadHealth() {
    setHealthState({ status: 'loading' });

    try {
      const data = await getBackendHealth();
      setHealthState({ status: 'ready', data });
    } catch (error) {
      setHealthState({ status: 'error', message: getErrorMessage(error) });
    }
  }

  useEffect(() => {
    void loadHealth();
  }, []);

  if (healthState.status === 'loading') {
    return (
      <section className="healthCard" aria-live="polite">
        <p className="healthLabel">Backend health</p>
        <p className="healthMessage">Проверяем /api/v1/health…</p>
      </section>
    );
  }

  if (healthState.status === 'error') {
    return (
      <section className="healthCard healthCardError" aria-live="polite">
        <p className="healthLabel">Backend health</p>
        <p className="healthMessage">Backend недоступен.</p>
        <p className="healthDetails">{healthState.message}</p>
        <button className="healthButton" type="button" onClick={loadHealth}>
          Повторить проверку
        </button>
      </section>
    );
  }

  return (
    <section className="healthCard healthCardOk" aria-live="polite">
      <p className="healthLabel">Backend health</p>
      <p className="healthMessage">Backend отвечает: {healthState.data.status}</p>
      <dl className="healthMeta">
        <div>
          <dt>App</dt>
          <dd>{healthState.data.app}</dd>
        </div>
        <div>
          <dt>Version</dt>
          <dd>{healthState.data.version}</dd>
        </div>
      </dl>
      <button className="healthButton" type="button" onClick={loadHealth}>
        Обновить статус
      </button>
    </section>
  );
}
