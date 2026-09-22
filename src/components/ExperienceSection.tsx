export default function ExperienceSection() {
  const experiences = [
    {
      period: '13+ years',
      title: 'Healthcare Technology',
      description:
        'Long-term experience in product-based healthcare technology, primarily at Siemens Healthineers, working close to complex medical imaging products and workflows.',
    },
    {
      period: '6+ years',
      title: 'Data & Analytics',
      description:
        'Experience across SQL, Power BI, Power Query, DAX, ETL, data warehousing, analytics and machine learning, connecting technical analysis to business questions.',
    },
    {
      period: '6+ years',
      title: 'Full-Stack Engineering',
      description:
        'Hands-on C# and .NET experience across WPF, ASP.NET, MVC, application architecture, testing and product engineering.',
    },
    {
      period: 'Emerging focus',
      title: 'AI & Transformation',
      description:
        'Building practical AI concepts that turn specialist knowledge, organizational methods and data into accessible experiences.',
    },
  ]

  return (
    <section id="experience" className="section-shell">
      <div className="section-intro">
        <p className="eyebrow">Experience</p>
        <h2>A career built across four connected layers.</h2>
      </div>
      <div className="experience-grid">
        {experiences.map((item, idx) => (
          <article key={idx} className="experience-item card-glass">
            <span className="experience-period">{item.period}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
