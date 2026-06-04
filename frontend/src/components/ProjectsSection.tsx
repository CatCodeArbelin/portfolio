import { getProjects, type Project } from '../api/portfolio';
import { useSectionData } from './useSectionData';

const statusLabels: Record<Project['status'], string> = {
  demo: 'Demo',
  'pet-project': 'Pet project',
  'client-prototype': 'Client prototype',
  production: 'Production',
};

const projectFallbacks: Project[] = [
  {
    slug: 'jewelry-telegram-bot',
    title: 'Jewelry Telegram Bot',
    description:
      'Telegram-бот для витрины украшений: каталог, оформление заявки и админ-уведомления без выдуманных production-метрик.',
    stack: ['Python', 'Telegram Bot API', 'FastAPI', 'PostgreSQL'],
    status: 'client-prototype',
  },
  {
    slug: 'ai-assistant-automation',
    title: 'AI Assistant / Automation',
    description:
      'AI-сценарии для обработки повторяющихся запросов, подготовки ответов и интеграции с существующими рабочими процессами.',
    stack: ['Python', 'OpenAI API', 'FastAPI', 'Docker'],
    status: 'demo',
  },
  {
    slug: 'dota-auto-chess-tournament-platform',
    title: 'Dota Auto Chess Tournament Platform',
    description:
      'Платформа для турнирных сценариев Dota Auto Chess: структура матчей, участники и базовая автоматизация процесса.',
    stack: ['React', 'TypeScript', 'Python', 'Docker'],
    status: 'pet-project',
    github_url: 'https://github.com/CatCodeArbelin/dacarbelin',
  },
];

export function ProjectsSection() {
  const [projectsState] = useSectionData({
    loadData: getProjects,
    fallbackData: projectFallbacks,
    emptyMessage: 'Проекты пока не опубликованы.',
    logContext: 'ProjectsSection',
  });

  const projects = projectsState.status === 'ready' ? projectsState.data : projectFallbacks;

  return (
    <section className="sectionCard" id="projects" aria-labelledby="projects-title">
      <div className="sectionHeader">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-title">Проекты и демонстрационные кейсы</h2>
        <p>
          Реалистичные карточки без выдуманных метрик: что делает проект, на каком стеке собран и
          в каком статусе находится.
        </p>
      </div>

      <div className="cardGrid projectsGrid">
        {projects.map((project) => (
          <article className="contentCard projectCard" key={project.slug}>
            <div className="cardTitleRow">
              <h3>{project.title}</h3>
              <span className="statusPill">{statusLabels[project.status]}</span>
            </div>
            <p>{project.description}</p>
            <ul className="inlineList" aria-label={`Стек проекта ${project.title}`}>
              {project.stack.map((stackItem) => (
                <li key={stackItem}>{stackItem}</li>
              ))}
            </ul>
            {project.github_url && (
              <a className="cardLink" href={project.github_url}>
                GitHub
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
