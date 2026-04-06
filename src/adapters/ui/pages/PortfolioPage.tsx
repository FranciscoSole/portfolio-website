import { useEffect, useRef, useState } from 'react';
import type { PortfolioPageController } from '@/adapters/controllers/PortfolioPageController';
import { CertificatesGrid } from '@/adapters/ui/components/CertificatesGrid';
import { ErrorState } from '@/adapters/ui/components/ErrorState';
import { ExpandableJobTimeline } from '@/adapters/ui/components/ExpandableJobTimeline';
import { LanguageSelector } from '@/adapters/ui/components/LanguageSelector';
import { LoadingState } from '@/adapters/ui/components/LoadingState';
import { ProjectsGrid } from '@/adapters/ui/components/ProjectsGrid';
import { SectionHeader } from '@/adapters/ui/components/SectionHeader';
import { StudiesTimeline } from '@/adapters/ui/components/StudiesTimeline';
import { TechnologyMatrix } from '@/adapters/ui/components/TechnologyMatrix';
import { usePortfolioPage } from '@/adapters/ui/hooks/usePortfolioPage';
import { translations } from '@/adapters/ui/i18n/translations';

interface PortfolioPageProps {
  readonly controller: PortfolioPageController;
}

const LINKEDIN_URL = 'https://ar.linkedin.com/in/franciscosole';
const GITHUB_URL = 'https://github.com/FranciscoSole';

export function PortfolioPage({ controller }: PortfolioPageProps): JSX.Element {
  const state = usePortfolioPage(controller);
  const headerRef = useRef<HTMLElement | null>(null);
  const [showFloatingNavbar, setShowFloatingNavbar] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;
        setShowFloatingNavbar(shouldShow);
        if (!shouldShow) {
          setShowBackToTop(false);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(headerElement);

    const onScroll = () => {
      const threshold = headerElement.offsetHeight * 0.9;
      setShowBackToTop(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleBackToTop = () => {
    setShowBackToTop(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-shell">
      <a id="page-top" className="anchor-top" aria-hidden="true" />

      <nav className={`floating-navbar ${showFloatingNavbar ? 'is-visible' : ''}`} aria-label="Navegación principal">
        <span className="floating-navbar-name">Francisco Solé</span>
        <div className="floating-navbar-links">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </nav>

      <header ref={headerRef} className="topbar">
        <div className="topbar-copy">
          <h1>Francisco Solé</h1>
        </div>
        <LanguageSelector
          languages={state.languages}
          selectedLanguageCode={state.selectedLanguageCode}
          onChange={state.onLanguageChange}
          disabled={state.isLoadingLanguages || state.isLoadingPortfolio || state.languages.length === 0}
        />
      </header>

      <main className="content-stack">
        

        {state.errorMessage ? <ErrorState message={state.errorMessage} onRetry={state.reload} /> : null}

        {state.isLoadingPortfolio || !state.portfolio ? (
          <LoadingState label="Cargando portfolio..." />
        ) : (
          <>
            <section className="content-section">
              <SectionHeader
                title={translations[state.selectedLanguageCode].experience}
              />
              <ExpandableJobTimeline 
                jobs={state.portfolio.jobs}
                formatDateStructure={state.selectedLanguageCode} />
            </section>

            <section className="content-section">
              <SectionHeader
                title={translations[state.selectedLanguageCode].projects}
              />
              <ProjectsGrid 
                projects={state.portfolio.projects} 
                buttonText={translations[state.selectedLanguageCode].repositories} />
            </section>

            <section className="content-section">
              <SectionHeader
                title={translations[state.selectedLanguageCode].studies}
              />
              <StudiesTimeline studies={state.portfolio.studies} />
            </section>

            <section className="content-section stack-section-wide">
              <SectionHeader
                title={translations[state.selectedLanguageCode].technologies}
              />
              <TechnologyMatrix technologies={state.portfolio.technologies} />
            </section>

            <section className="content-section">
              <SectionHeader
                title={translations[state.selectedLanguageCode].certifies}
              />
              <CertificatesGrid 
                certifications={state.portfolio.certifications} 
                buttonText={translations[state.selectedLanguageCode].credentials}
                formatDateStructure={state.selectedLanguageCode} />
            </section>
          </>
        )}
      </main>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        aria-label="Volver arriba"
        onClick={handleBackToTop}
      >
        ↑
      </button>
    </div>
  );
}
