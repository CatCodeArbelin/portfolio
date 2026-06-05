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

const serviceTitles = new Set<string>(serviceFallbacks.map((service) => service.title));

const serviceMarkers: Record<ServiceCard['title'], string> = {
  'Telegram Bots': '✈',
  'AI Automation': '✦',
  'Backend API': '{}',
  'Internal Tools': '▣',
};

const serviceAccentClasses: Record<ServiceCard['title'], string> = {
  'Telegram Bots': 'accentCyan',
  'AI Automation': 'accentViolet',
  'Backend API': 'accentGreen',
  'Internal Tools': 'accentCyan',
};

function getCompatibleFeatures(service: unknown, title: ServiceCard['title']): string[] | undefined {
  if (!service || typeof service !== 'object' || !('title' in service) || !('features' in service)) {
    return undefined;
  }

  const serviceTitle = service.title;
  const serviceFeatures = service.features;

  if (typeof serviceTitle !== 'string' || serviceTitle !== title || !serviceTitles.has(serviceTitle)) {
    return undefined;
  }

  if (!Array.isArray(serviceFeatures)) {
    return undefined;
  }

  const features = serviceFeatures.filter(
    (feature): feature is string => typeof feature === 'string' && feature.trim().length > 0,
  );

  return features.length > 0 ? features : undefined;
}

function getStableServices(servicesStateData: ServiceCard[] | undefined): ServiceCard[] {
  if (!Array.isArray(servicesStateData)) {
    return serviceFallbacks;
  }

  return serviceFallbacks.map((fallbackService) => {
    const apiService = servicesStateData.find((service) => service.title === fallbackService.title);
    const apiFeatures = getCompatibleFeatures(apiService, fallbackService.title);

    if (!apiFeatures) {
      return fallbackService;
    }

    return {
      title: fallbackService.title,
      features: apiFeatures,
    };
  });
}

export function ServicesSection() {
  const [servicesState] = useSectionData({
    loadData: getServices,
    fallbackData: serviceFallbacks,
    emptyMessage: 'Список услуг пока не опубликован.',
    logContext: 'ServicesSection',
  });

  const services = getStableServices(servicesState.status === 'ready' ? servicesState.data : undefined);

  return (
    <section className="sectionCard" id="services" aria-labelledby="services-title">
      <div className="sectionHeader">
        <p className="eyebrow">Services</p>
        <h2 id="services-title">Чем могу быть полезен</h2>
        <p>Четыре практичных направления: боты, AI-сценарии, backend API и внутренние инструменты.</p>
      </div>

      <div className="cardGrid servicesGrid">
        {services.map((service) => (
          <article className={`contentCard serviceCard ${serviceAccentClasses[service.title]}`} key={service.title}>
            <div className="serviceCardHeader">
              <span className="iconBox" aria-hidden="true">
                {serviceMarkers[service.title]}
              </span>
              <h3>{service.title}</h3>
            </div>
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
