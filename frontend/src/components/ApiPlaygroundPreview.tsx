const previewEndpoints = [
  { method: 'GET', path: '/api/v1/health', tone: 'ok' },
  { method: 'GET', path: '/api/v1/projects', tone: 'preview' },
  { method: 'POST', path: '/api/v1/playground/preset', tone: 'locked' },
] as const;

const mockResponseLines = [
  '{',
  '  "mode": "visual demo",',
  '  "preset": "portfolio-summary",',
  '  "safeRequestsOnly": true',
  '}',
] as const;

export function ApiPlaygroundPreview() {
  return (
    <section
      className="sectionCard previewPanel"
      id="api-playground-preview"
      aria-labelledby="api-playground-preview-title"
    >
      <div className="sectionHeader previewHeader">
        <p className="eyebrow">Preview · visual demo</p>
        <h2 id="api-playground-preview-title">API Playground preview</h2>
        <p>
          Mock dashboard будущего playground: без отправки запросов, без произвольных URL и без связи
          с backend до отдельного этапа API Playground.
        </p>
      </div>

      <div className="apiPreviewGrid" aria-label="Визуальный макет API Playground">
        <div className="apiEndpointList">
          {previewEndpoints.map((endpoint) => (
            <div className={`apiEndpointRow apiEndpointRow-${endpoint.tone}`} key={endpoint.path}>
              <strong>{endpoint.method}</strong>
              <span>{endpoint.path}</span>
              <em>{endpoint.tone === 'ok' ? 'health preview' : 'preview'}</em>
            </div>
          ))}
        </div>

        <div className="previewCodeWindow" aria-label="Mock JSON response">
          <div className="terminalChrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <pre>{mockResponseLines.join('\n')}</pre>
        </div>
      </div>
    </section>
  );
}
