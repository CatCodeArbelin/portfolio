const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#design-cards', label: 'Design cards' },
  { href: '#status', label: 'Status' },
] as const;

export function HeaderNav() {
  return (
    <header className="topNav" aria-label="Основная навигация">
      <a className="topNavBrand" href="#page-title" aria-label="CatCode / Arbelin — к началу страницы">
        <span className="topNavCat" aria-hidden="true">
          ᓚᘏᗢ
        </span>
        <span>CatCode / Arbelin</span>
      </a>

      <nav className="topNavLinks" aria-label="Секции страницы">
        {navLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="topNavActions" aria-label="Быстрые действия">
        <a href="#status">API status</a>
      </div>
    </header>
  );
}
