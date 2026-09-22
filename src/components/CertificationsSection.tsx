export default function CertificationsSection() {
  const certs = [
    { title: 'Data Science & Business Analytics', issuer: 'University of Texas at Austin' },
    { title: 'Business Analysis', issuer: 'Great Learning · UT Austin' },
    { title: 'Advanced Design Patterns', issuer: 'Professional certification' },
    { title: 'CSSLP', issuer: 'Certified Secure Software Lifecycle Professional' },
    { title: 'Prototyping & Design Thinking', issuer: 'Professional learning' },
    { title: 'Full Stack Engineering', issuer: 'Professional learning' },
  ]

  return (
    <section id="certifications" className="certifications section-shell section-light">
      <div className="section-intro">
        <p className="eyebrow">Certifications &amp; learning</p>
        <h2>Continuous learning across technology, data and business.</h2>
      </div>
      <div className="cert-grid">
        {certs.map((c, idx) => (
          <article key={idx} className="cert-card card-glass">
            <strong>{c.title}</strong>
            <span>{c.issuer}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
