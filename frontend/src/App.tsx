import { DesignCardsSection } from './components/DesignCardsSection';
import { HeaderNav } from './components/HeaderNav';
import { HealthStatus } from './components/HealthStatus';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { StackBadges } from './components/StackBadges';

export function App() {
  return (
    <main className="page">
      <HeaderNav />
      <HeroSection />
      <StackBadges />
      <ServicesSection />
      <ProjectsSection />
      <DesignCardsSection />
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
    </main>
  );
}
