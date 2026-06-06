import { ApiPlaygroundPreview } from './components/ApiPlaygroundPreview';
import { ContactPreview } from './components/ContactPreview';
import { DesignCardsSection } from './components/DesignCardsSection';
import { HeaderNav } from './components/HeaderNav';
import { HealthStatus } from './components/HealthStatus';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { StackBadges } from './components/StackBadges';
import { TerminalPreview } from './components/TerminalPreview';

export function App() {
  return (
    <main className="page">
      <HeaderNav />
      <HeroSection />
      <StackBadges />
      <div className="dashboardLayout" aria-label="Portfolio dashboard">
        <div className="dashboardBlockWide">
          <ServicesSection />
        </div>
        <div className="dashboardBlockTall">
          <ProjectsSection />
        </div>
        <div className="dashboardBlockWide">
          <DesignCardsSection />
        </div>
        <div className="dashboardBlockCompact">
          <ApiPlaygroundPreview />
        </div>
        <div className="dashboardBlockCompact">
          <TerminalPreview />
        </div>
        <div className="dashboardBlockCompact">
          <ContactPreview />
        </div>
        <div className="dashboardBlockCompact">
          <section className="sectionCard" id="status" aria-labelledby="health-title">
            <div className="sectionHeader">
              <p className="eyebrow">Status</p>
              <h2 id="health-title">Backend health</h2>
              <p>
                Мягкая проверка системного статуса: online при доступном backend и спокойный dev mode,
                если API сейчас не запущен.
              </p>
            </div>
            <HealthStatus />
          </section>
        </div>
      </div>
    </main>
  );
}
