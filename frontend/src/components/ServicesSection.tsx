import { getServices, type ServiceCard } from '../api/portfolio';
import { useSectionData } from './useSectionData';

const serviceFallbacks: ServiceCard[] = [
  {
    title: 'Telegram Bots',
    features: ['Каталоги, заявки и уведомления', 'Админ-сценарии без лишней сложности', 'Интеграция с backend API'],
  },
  {
    title: 'AI Automation',
    features: ['AI-помощники для рутины', 'Обработка входящих запросов', 'Интеграция с OpenAI API'],
  },
  {
    title: 'Backend API',
    features: ['FastAPI и REST endpoints', 'PostgreSQL / Redis по необходимости', 'Docker-ready структура'],
  },
  {
    title: 'Internal Tools',
    features: ['Мини-CRM и панели процессов', 'Служебные интеграции', 'Простые интерфейсы для команды'],
  },
];

export function ServicesSection() {
  const [servicesState] = useSectionData({
    loadData: getServices,
    fallbackData: serviceFallbacks,
    emptyMessage: 'Список услуг пока не опубликован.',
    logContext: 'ServicesSection',
  });

  const services = servicesState.status === 'ready' ? servicesState.data : serviceFallbacks;

  return (
    <section className="sectionCard" id="services" aria-labelledby="services-title">
      <div className="sectionHeader">
        <p className="eyebrow">Services</p>
        <h2 id="services-title">Чем могу быть полезен</h2>
        <p>Четыре практичных направления: боты, AI-сценарии, backend API и внутренние инструменты.</p>
      </div>

      <div className="cardGrid servicesGrid">
        {services.slice(0, 4).map((service) => (
          <article className="contentCard serviceCard" key={service.title}>
            <h3>{service.title}</h3>
            <ul>
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
