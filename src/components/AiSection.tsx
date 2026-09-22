export default function AiSection() {
  const pillars = [
    {
      title: 'Knowledge',
      desc: 'Turn scattered expertise into usable guidance.',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,104a88,88,0,0,1-88,88v24a8,8,0,0,1-16,0V192A88,88,0,0,1,128,16a88,88,0,0,1,88,88Zm-16,0a72,72,0,1,0-72,72A72.08,72.08,0,0,0,200,104Z" opacity="0.3"/>
          <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Z"/>
        </svg>
      ),
    },
    {
      title: 'Data',
      desc: 'Move from information to decisions and measurable outcomes.',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
          <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z"/>
        </svg>
      ),
    },
    {
      title: 'Technology',
      desc: 'Connect solutions to the systems people already use.',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
          <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="ai" className="ai-section section-shell">
      <div className="ai-panel card-glass">
        <div>
          <p className="eyebrow">AI &amp; Digital Transformation</p>
          <h2>AI should make specialist knowledge easier to access, repetitive work easier to handle and good ideas easier to scale.</h2>
        </div>
        <div className="ai-pillars">
          {pillars.map((p, idx) => (
            <div key={idx} className="ai-pillar">
              {p.icon}
              <strong>{p.title}</strong>
              <span>{p.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
