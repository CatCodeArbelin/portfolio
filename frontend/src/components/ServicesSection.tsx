import { useCallback } from 'react';
import { getServices } from '../api/portfolio';
import { useSectionData } from './useSectionData';

export function ServicesSection() {
  const getFallbackError = useCallback(() => 'Не удалось загрузить услуги.', []);
  const [servicesState, retryLoadServices] = useSectionData({
    loadData: getServices,
    getFallbackError,
  });

  return (
    <section className="sectionCard" id="services" aria-labelledby="services-title">
      <div className="sectionHeader">
        <p className="eyebrow">Services</p>
        <h2 id="services-title">Чем могу быть полезен</h2>
        <p>Фокус на понятных backend-сервисах, Telegram-сценариях и автоматизации процессов.</p>
      </div>

      {servicesState.status === 'loading' && (
        <p className="stateMessage" aria-live="polite">
          Загружаем услуги…
        </p>
      )}
      {servicesState.status === 'error' && (
        <div className="stateMessage stateMessageError" role="status">
          <p>Услуги временно недоступны, остальные секции сайта продолжают работать.</p>
          <p className="stateDetails">{servicesState.message}</p>
          <button className="stateRetryButton" type="button" onClick={retryLoadServices}>
            Повторить загрузку услуг
          </button>
        </div>
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
