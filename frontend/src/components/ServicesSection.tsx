import { useEffect, useState } from 'react';
import { getServices, type ServiceCard } from '../api/portfolio';

type ServicesState =
  | { status: 'loading' }
  | { status: 'ready'; data: ServiceCard[] }
  | { status: 'error'; message: string };

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить услуги.';
}

export function ServicesSection() {
  const [servicesState, setServicesState] = useState<ServicesState>({ status: 'loading' });

  useEffect(() => {
    let isMounted = true;

    getServices()
      .then((data) => {
        if (isMounted) {
          setServicesState({ status: 'ready', data });
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setServicesState({ status: 'error', message: getErrorMessage(error) });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="sectionCard" id="services" aria-labelledby="services-title">
      <div className="sectionHeader">
        <p className="eyebrow">Services</p>
        <h2 id="services-title">Чем могу быть полезен</h2>
        <p>Фокус на понятных backend-сервисах, Telegram-сценариях и автоматизации процессов.</p>
      </div>

      {servicesState.status === 'loading' && <p className="stateMessage">Загружаем услуги…</p>}
      {servicesState.status === 'error' && (
        <p className="stateMessage stateMessageError">{servicesState.message}</p>
      )}
      {servicesState.status === 'ready' && (
        <div className="cardGrid">
          {servicesState.data.map((service) => (
            <article className="contentCard" key={service.title}>
              <h3>{service.title}</h3>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
