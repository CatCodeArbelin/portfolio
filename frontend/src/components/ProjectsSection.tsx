import { useCallback } from 'react';
import { getProjects, type Project } from '../api/portfolio';
import { useSectionData } from './useSectionData';

const statusLabels: Record<Project['status'], string> = {
  demo: 'Demo',
  'pet-project': 'Pet project',
  'client-prototype': 'Client prototype',
  production: 'Production',
};

export function ProjectsSection() {
  const getFallbackError = useCallback(() => 'Не удалось загрузить проекты.', []);
  const [projectsState, retryLoadProjects] = useSectionData({
    loadData: getProjects,
    getFallbackError,
  });

  return (
    <section className="sectionCard" id="projects" aria-labelledby="projects-title">
      <div className="sectionHeader">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-title">Проекты и демонстрационные кейсы</h2>
        <p>
          Список приходит из backend API. Для технической проверки доступна документация
          FastAPI по адресу <a href="/api/docs">/api/docs</a>.
        </p>
      </div>

      {projectsState.status === 'loading' && (
        <p className="stateMessage" aria-live="polite">
          Загружаем проекты…
        </p>
      )}
      {projectsState.status === 'error' && (
        <div className="stateMessage stateMessageError" role="status">
          <p>Проекты временно недоступны, остальные секции сайта продолжают работать.</p>
          <p className="stateDetails">{projectsState.message}</p>
          <button className="stateRetryButton" type="button" onClick={retryLoadProjects}>
            Повторить загрузку проектов
          </button>
        </div>
      )}
      {projectsState.status === 'ready' && (
        <div className="cardGrid">
          {projectsState.data.map((project) => (
            <article className="contentCard" key={project.slug}>
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
                  GitHub репозиторий
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
