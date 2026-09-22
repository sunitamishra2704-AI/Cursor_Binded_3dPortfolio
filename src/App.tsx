import { useState } from 'react'
import HeroCanvas from './components/HeroCanvas'
import Header from './components/Header'
import HeroContent from './components/HeroContent'
import CustomCursor from './components/CustomCursor'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import AiSection from './components/AiSection'
import TechnologySection from './components/TechnologySection'
import LeadershipSection from './components/LeadershipSection'
import CertificationsSection from './components/CertificationsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="portfolio-app">
        <section id="home" className="hero-viewport">
          <HeroCanvas onLoaded={() => setLoaded(true)} />
          <HeroContent visible={loaded} />
        </section>

        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <AiSection />
        <TechnologySection />
        <LeadershipSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>

      {!loaded && (
        <div className="loader">
          <div className="loader-spinner" />
        </div>
      )}
    </>
  )
}
