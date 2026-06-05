import { useEffect, useState } from 'react';
import { getBackendHealth } from '../api/health';

type HealthState = 'loading' | 'online' | 'unavailable';

export function HealthStatus() {
  const [healthState, setHealthState] = useState<HealthState>('loading');

  useEffect(() => {
    let isMounted = true;

    async function loadHealth() {
      try {
        await getBackendHealth();

        if (isMounted) {
          setHealthState('online');
        }
      } catch (error) {
        console.error('HealthStatus: backend health недоступен.', error);

        if (isMounted) {
          setHealthState('unavailable');
        }
      }
    }

    void loadHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (healthState === 'loading') {
    return (
      <section className="healthCard healthCardNeutral" aria-live="polite">
        <p className="healthLabel">System status</p>
        <p className="healthMessage">Проверяем backend health…</p>
      </section>
    );
  }

  if (healthState === 'unavailable') {
    return (
      <section className="healthCard healthCardNeutral" aria-live="polite">
        <p className="healthLabel">System status</p>
        <p className="healthMessage">dev mode / unavailable</p>
        <p className="healthHint">
          Портфолио остаётся доступным на fallback-данных. Технические детали сохранены в console.
        </p>
      </section>
    );
  }

  return (
    <section className="healthCard healthCardOk" aria-live="polite">
      <p className="healthLabel">System status</p>
      <p className="healthMessage">online</p>
      <p className="healthHint">Backend отвечает успешно.</p>
    </section>
  );
}
