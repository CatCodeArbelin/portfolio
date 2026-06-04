export type HealthResponse = {
  status: string;
  app: string;
  version: string;
};

const HEALTH_ENDPOINT = '/api/v1/health';

export async function getBackendHealth(): Promise<HealthResponse> {
  const response = await fetch(HEALTH_ENDPOINT, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Backend health endpoint вернул HTTP ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}
