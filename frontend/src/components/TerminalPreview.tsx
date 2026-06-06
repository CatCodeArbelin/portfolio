const terminalPreviewLines = [
  '$ catcode status --visual-demo',
  'frontend: mock dashboard rendered',
  'backend: no terminal commands wired yet',
  'mode: preview / visual-only',
] as const;

const terminalPreviewStats = [
  { label: 'Shell', value: 'locked' },
  { label: 'Commands', value: 'mock' },
  { label: 'Stage', value: 'preview' },
] as const;

export function TerminalPreview() {
  return (
    <section
      className="sectionCard previewPanel terminalPreview"
      id="terminal-preview"
      aria-labelledby="terminal-preview-title"
    >
      <div className="sectionHeader previewHeader">
        <p className="eyebrow">Preview · visual-only</p>
        <h2 id="terminal-preview-title">Live Terminal preview</h2>
        <p>
          Visual demo терминального блока. Команды не выполняются, backend-интеграция и безопасные
          preset-команды остаются для отдельного этапа Live Terminal.
        </p>
      </div>

      <div className="terminalPreviewBody" aria-label="Визуальный макет терминала">
        <div className="terminalChrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <pre>{terminalPreviewLines.join('\n')}</pre>
        <div className="previewStatGrid" aria-label="Mock terminal status">
          {terminalPreviewStats.map((stat) => (
            <span className="previewStat" key={stat.label}>
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
