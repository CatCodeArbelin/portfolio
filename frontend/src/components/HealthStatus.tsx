import { useEffect, useState } from 'react';
import { getBackendHealth, type HealthResponse } from '../api/health';

type HealthState =
  | { status: 'loading' }
  | { status: 'online'; data: HealthResponse }
  | { status: 'unavailable' };

export function HealthStatus() {
  const [healthState, setHealthState] = useState<HealthState>({ status: 'loading' });

  async function loadHealth() {
    setHealthState({ status: 'loading' });

    try {
      const data = await getBackendHealth();
      console.info('HealthStatus: backend online.', data);
      setHealthState({ status: 'online', data });
    } catch (error) {
      console.error('HealthStatus: backend health недоступен, показываем мягкий dev state.', error);
      setHealthState({ status: 'unavailable' });
    }
  }

  useEffect(() => {
    void loadHealth();
  }, []);

  if (healthState.status === 'loading') {
    return (
      <section className="healthCard healthCardNeutral" aria-live="polite">
        <p className="healthLabel">System status</p>
        <p className="healthMessage">Проверяем backend health…</p>
      </section>
    );
  }

  if (healthState.status === 'unavailable') {
    return (
      <section className="healthCard healthCardNeutral" aria-live="polite">
        <p className="healthLabel">System status</p>
        <p className="healthMessage">dev mode / unavailable</p>
        <p className="healthHint">
          Портфолио остаётся доступным на fallback-данных. Технические детали сохранены в console.
        </p>
        <button className="healthButton" type="button" onClick={loadHealth}>
          Проверить снова
        </button>
      </section>
    );
  }

  return (
    <section className="healthCard healthCardOk" aria-live="polite">
      <p className="healthLabel">System status</p>
      <p className="healthMessage">online</p>
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
