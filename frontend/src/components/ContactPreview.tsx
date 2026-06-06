const contactPreviewItems = [
  { label: 'Telegram', value: '@ preview contact slot' },
  { label: 'Brief', value: 'visual demo card' },
  { label: 'Response', value: 'mock dashboard only' },
] as const;

export function ContactPreview() {
  return (
    <section
      className="sectionCard previewPanel contactPreview"
      id="contact-preview"
      aria-labelledby="contact-preview-title"
    >
      <div className="sectionHeader previewHeader">
        <p className="eyebrow">Preview · mock dashboard</p>
        <h2 id="contact-preview-title">Contact preview</h2>
        <p>
          Визуальный слот будущего contact form. Полей ввода и отправки нет, потому что Telegram
          integration и сохранение заявок ещё не подключены на текущем этапе.
        </p>
      </div>

      <div className="contactPreviewCard" aria-label="Визуальный макет контактов">
        {contactPreviewItems.map((item) => (
          <div className="contactPreviewRow" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
        <div className="contactPreviewNotice" role="note">
          visual-only · no submit · no API call
        </div>
      </div>
    </section>
  );
}
