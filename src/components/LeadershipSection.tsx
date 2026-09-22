export default function LeadershipSection() {
  const items = [
    { num: '01', title: 'Strategic thinking' },
    { num: '02', title: 'People development' },
    { num: '03', title: 'Stakeholder management' },
    { num: '04', title: 'Coaching and mentoring' },
    { num: '05', title: 'Process improvement' },
    { num: '06', title: 'Change management' },
  ]

  return (
    <section id="leadership" className="leadership section-shell">
      <div className="leadership-statement">
        <p className="eyebrow">Leadership</p>
        <h2>I am growing toward people leadership with a strong technology foundation.</h2>
        <p>
          My leadership focus is on creating clarity, developing people, improving how teams work and taking responsibility for outcomes, not just assigned tasks.
        </p>
      </div>
      <div className="leadership-list">
        {items.map((item, idx) => (
          <div key={idx} className="leadership-card card-glass">
            <span className="leadership-num">{item.num}</span>
            <strong>{item.title}</strong>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/>
            </svg>
          </div>
        ))}
      </div>
    </section>
  )
}
