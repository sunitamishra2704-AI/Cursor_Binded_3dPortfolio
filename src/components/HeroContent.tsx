import React from 'react'

interface Props {
  visible: boolean
}

export default function HeroContent({ visible }: Props) {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`hero-content ${visible ? 'hero-content--visible' : ''}`}>
      <div className="hero-kicker">
        <span className="pulse-dot" /> Turning healthcare knowledge into impact
      </div>
      <p className="hero-eyebrow">Healthcare Technology · AI · Digital Transformation</p>
      <p className="hero-greeting">Hi, I'm</p>
      <h1 className="hero-name">Sunita Mishra</h1>
      <p className="hero-bio">
        Full Stack Developer &amp; Healthcare AI Engineer crafting high-performance web applications and intelligent data systems with 13+ years of impact.
      </p>

      <div className="hero-stats">
        <div className="stat-item">
          <strong>13+</strong>
          <span>Years in IT</span>
        </div>
        <div className="stat-item">
          <strong>8+</strong>
          <span>Product-company</span>
        </div>
        <div className="stat-item">
          <strong>Healthcare</strong>
          <span>Domain depth</span>
        </div>
        <div className="stat-item">
          <strong>AI</strong>
          <span>Transformation focus</span>
        </div>
      </div>

      <div className="hero-actions">
        <a href="#projects" onClick={scrollTo('projects')} className="btn btn-solid">
          Explore my work
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8.5H12.5M12.5 8.5L8.5 4.5M12.5 8.5L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="#contact" onClick={scrollTo('contact')} className="btn btn-glass">
          Let's Talk
        </a>
      </div>

      <div className="hero-cursor-note">
        <span className="cursor-indicator-ring" />
        <span>Move your cursor — Eyes follow your pointer</span>
      </div>
    </div>
  )
}
