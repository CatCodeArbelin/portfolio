export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  status: 'demo' | 'pet-project' | 'client-prototype' | 'production';
  github_url?: string | null;
};

export type DesignCard = {
  slug: string;
  title: string;
  task: string;
  scheme: string;
  stack: string[];
  key_decisions: string[];
  common_mistakes: string[];
  scaling_notes: string[];
};

export type ServiceCard = {
  title: 'Telegram Bots' | 'AI Automation' | 'Backend API' | 'Internal Tools';
  features: string[];
};

const PROJECTS_ENDPOINT = '/api/v1/projects';
const DESIGN_CARDS_ENDPOINT = '/api/v1/design-cards';
const SERVICES_ENDPOINT = '/api/v1/services';

async function fetchJson<T>(endpoint: string, errorContext: string): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const statusDescription = response.statusText
      ? `${response.status} ${response.statusText}`
      : `${response.status}`;

    throw new Error(`${errorContext} returned HTTP ${statusDescription}`);
  }

  return response.json() as Promise<T>;
}

export function getProjects(): Promise<Project[]> {
  return fetchJson<Project[]>(PROJECTS_ENDPOINT, 'Endpoint проектов');
}

export function getDesignCards(): Promise<DesignCard[]> {
  return fetchJson<DesignCard[]>(DESIGN_CARDS_ENDPOINT, 'Endpoint design cards');
}

export function getServices(): Promise<ServiceCard[]> {
  return fetchJson<ServiceCard[]>(SERVICES_ENDPOINT, 'Endpoint услуг');
}
