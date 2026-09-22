export default function TechnologySection() {
  const capabilities = [
    { num: '01', tags: ['C#', '.NET', 'WPF', 'ASP.NET', 'MVC'] },
    { num: '02', tags: ['SQL', 'Power BI', 'Power Query', 'DAX', 'ETL'] },
    { num: '03', tags: ['Azure', 'Azure DevOps', 'System Design', 'Event-Driven Architecture'] },
    { num: '04', tags: ['Python', 'pandas', 'Machine Learning', 'TensorFlow', 'Keras'] },
    { num: '05', tags: ['BigQuery', 'Snowflake', 'Redshift', 'DBT', 'Data Warehousing'] },
  ]

  return (
    <section id="technology" className="technology section-shell section-light">
      <div className="section-intro">
        <p className="eyebrow">Data &amp; Technology</p>
        <h2>A broad technical foundation with a business lens.</h2>
      </div>
      <div className="capability-grid">
        {capabilities.map((c, idx) => (
          <div key={idx} className="capability card-glass">
            <span className="capability-number">{c.num}</span>
            <div className="capability-tags">
              {c.tags.map((t, tIdx) => (
                <span key={tIdx}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="technology-note card-glass">
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"/>
        </svg>
        <p>My strength is not one tool. It is connecting engineering, data, domain context and business intent.</p>
      </div>
    </section>
  )
}
