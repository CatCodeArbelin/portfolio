import { getProjects, type Project } from '../api/portfolio';
import { useSectionData } from './useSectionData';

const statusLabels: Partial<Record<Project['status'], string>> = {
  demo: 'Demo',
  'pet-project': 'Pet project',
  'client-prototype': 'Client prototype',
};

const projectFallbacks: Project[] = [
  {
    slug: 'jewelry-telegram-bot',
    title: 'Jewelry Telegram Bot',
    description:
      'Telegram-бот для витрины украшений: каталог, оформление заявки, платежный сценарий и админ-уведомления.',
    stack: ['Python', 'aiogram', 'Telegram Payments', 'ЮKassa', 'Docker', 'SQLite / PostgreSQL'],
    status: 'client-prototype',
  },
  {
    slug: 'ai-assistant-automation',
    title: 'AI Assistant / Automation',
    description:
      'AI-ассистент для обработки пользовательских запросов и автоматизации повторяющихся бизнес-сценариев.',
    stack: ['Python', 'FastAPI', 'OpenAI API', 'Redis', 'Docker'],
    status: 'demo',
  },
  {
    slug: 'dota-auto-chess-tournament-platform',
    title: 'Dota Auto Chess Tournament Platform',
    description:
      'Платформа для проведения турниров по Dota Auto Chess: участники, структура матчей и базовая автоматизация процесса.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Redis'],
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

  const getProjectAvatarLabel = (title: string) => title.trim().slice(0, 1).toUpperCase();

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
          <article className="contentCard projectCard accentGlow" key={project.slug}>
            <header className="projectCardHeader">
              <span className="projectAvatar" aria-hidden="true">
                {getProjectAvatarLabel(project.title)}
              </span>
              <div className="projectTitleGroup">
                <p className="compactLabel">{project.slug}</p>
                <h3>{project.title}</h3>
              </div>
              {statusLabels[project.status] && (
                <span className="statusPill compactChip">{statusLabels[project.status]}</span>
              )}
            </header>
            <p className="projectDescription">{project.description}</p>
            <ul className="inlineList compactChipList" aria-label={`Стек проекта ${project.title}`}>
              {project.stack.map((stackItem) => (
                <li className="compactChip" key={stackItem}>
                  {stackItem}
                </li>
              ))}
            </ul>
            {project.github_url && (
              <a className="cardLink projectGithubLink" href={project.github_url} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
