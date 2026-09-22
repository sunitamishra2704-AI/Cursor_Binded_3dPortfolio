import React from 'react'

export default function Header() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="nav-pill" aria-label="Main navigation">
      <a href="#projects" onClick={scrollTo('projects')} className="nav-link">
        [WORK]
      </a>
      <span className="nav-dot" />
      <a href="#about" onClick={scrollTo('about')} className="nav-link">
        [ABOUT]
      </a>
      <span className="nav-dot" />
      <a href="#experience" onClick={scrollTo('experience')} className="nav-link">
        [EXPERIENCE]
      </a>
      <span className="nav-dot" />
      <a href="#leadership" onClick={scrollTo('leadership')} className="nav-link">
        [LEADERSHIP]
      </a>
      <span className="nav-dot" />
      <a href="#contact" onClick={scrollTo('contact')} className="nav-link">
        [CONTACT]
      </a>
    </nav>
  )
}
