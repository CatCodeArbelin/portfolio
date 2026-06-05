import { useEffect, useState } from 'react';
import { getBackendHealth, type HealthResponse } from '../api/health';

type HealthState = 'loading' | 'online' | 'unavailable';
type StatusTone = 'pending' | 'ok' | 'neutral';

type DashboardRow = {
  label: string;
  value: string;
  detail: string;
  tone: StatusTone;
};

function buildStatusRows(healthState: HealthState, health?: HealthResponse): DashboardRow[] {
  const backendDetail = health
    ? `${health.app} · ${health.version}`
    : 'Проверка выполняется через /api/v1/health.';

  if (healthState === 'online') {
    return [
      {
        label: 'Backend API',
        value: health?.status ?? 'online',
        detail: backendDetail,
        tone: 'ok',
      },
      {
        label: 'Portfolio content',
        value: 'loaded',
        detail: 'Статичные секции портфолио отображаются без дополнительных API-запросов.',
        tone: 'ok',
      },
      {
        label: 'Fallback mode',
        value: 'standby',
        detail: 'Fallback UI готов, но сейчас не используется.',
        tone: 'neutral',
      },
    ];
  }

  if (healthState === 'unavailable') {
    return [
      {
        label: 'Backend API',
        value: 'unavailable',
        detail: 'Health endpoint временно недоступен.',
        tone: 'neutral',
      },
      {
        label: 'Portfolio content',
        value: 'visible',
        detail: 'Контент портфолио остаётся доступным в интерфейсе.',
        tone: 'ok',
      },
      {
        label: 'Fallback mode',
        value: 'active',
        detail: 'Показываем нейтральное состояние без технических деталей ошибки.',
        tone: 'neutral',
      },
    ];
  }

  return [
    {
      label: 'Backend API',
      value: 'checking',
      detail: backendDetail,
      tone: 'pending',
    },
    {
      label: 'Portfolio content',
      value: 'ready',
      detail: 'UI-секции уже готовы к отображению.',
      tone: 'neutral',
    },
    {
      label: 'Fallback mode',
      value: 'standby',
      detail: 'Будет включён только если health endpoint не ответит.',
      tone: 'neutral',
    },
  ];
}

export function HealthStatus() {
  const [healthState, setHealthState] = useState<HealthState>('loading');
  const [health, setHealth] = useState<HealthResponse | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    async function loadHealth() {
      try {
        const backendHealth = await getBackendHealth();

        if (isMounted) {
          setHealth(backendHealth);
          setHealthState('online');
        }
      } catch (error) {
        console.error('HealthStatus: backend health недоступен.', error);

        if (isMounted) {
          setHealth(undefined);
          setHealthState('unavailable');
        }
      }
    }

    void loadHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  const statusRows = buildStatusRows(healthState, health);
  const cardClassName = healthState === 'online' ? 'healthCardOk' : 'healthCardNeutral';

  return (
    <section className={`healthCard apiPanel ${cardClassName}`} aria-live="polite">
      <div className="apiPanelHeader">
        <div>
          <p className="healthLabel">System status</p>
          <p className="healthMessage">Portfolio dashboard</p>
        </div>
        <span className="apiPanelBadge">/api/v1/health</span>
      </div>

      <div className="dashboardGrid">
        {statusRows.map((row) => (
          <div className="statusRow" key={row.label}>
            <span className={`statusDot statusDot-${row.tone}`} aria-hidden="true" />
            <div>
              <strong>{row.label}</strong>
              <span>{row.detail}</span>
            </div>
            <em>{row.value}</em>
          </div>
        ))}
      </div>
    </section>
  );
}
