import { useEffect, useState } from 'react';
import { getProjects, type Project } from '../api/portfolio';

type ProjectsState =
  | { status: 'loading' }
  | { status: 'ready'; data: Project[] }
  | { status: 'error'; message: string };

const statusLabels: Record<Project['status'], string> = {
  demo: 'Demo',
  'pet-project': 'Pet project',
  'client-prototype': 'Client prototype',
  production: 'Production',
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить проекты.';
}

export function ProjectsSection() {
  const [projectsState, setProjectsState] = useState<ProjectsState>({ status: 'loading' });

  useEffect(() => {
    let isMounted = true;

    getProjects()
      .then((data) => {
        if (isMounted) {
          setProjectsState({ status: 'ready', data });
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setProjectsState({ status: 'error', message: getErrorMessage(error) });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

      {projectsState.status === 'loading' && <p className="stateMessage">Загружаем проекты…</p>}
      {projectsState.status === 'error' && (
        <p className="stateMessage stateMessageError">{projectsState.message}</p>
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
