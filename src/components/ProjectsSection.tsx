export default function ProjectsSection() {
  const projects = [
    {
      number: '01',
      category: 'Healthcare Domain',
      title: 'Healthcare Imaging Product Engineering',
      description:
        'Worked on complex medical imaging software in a healthcare product environment, combining C#/.NET engineering, workflow understanding, quality and collaboration across product, development and testing teams.',
      tags: ['Healthcare', 'Medical Imaging', 'C# / .NET'],
    },
    {
      number: '02',
      category: 'Domain-Specific AI',
      title: 'Clinical Knowledge Guide',
      description:
        'An AI guide concept that turns specialist healthcare knowledge, product documentation and workflow guidance into a conversational experience for faster access to domain expertise.',
      tags: ['Healthcare AI', 'Knowledge Systems', 'Workflow'],
    },
    {
      number: '03',
      category: 'Enterprise AI',
      title: 'AI Assistant for Performance Methods',
      description:
        'A conversational assistant concept that makes a structured organizational performance methodology easier to understand, navigate and apply in day-to-day work.',
      tags: ['Enterprise AI', 'Knowledge', 'Change'],
    },
    {
      number: '04',
      category: 'AI Productivity',
      title: 'AI Usage & Cost Visibility',
      description:
        'A developer productivity concept that makes token usage, estimated AI cost and context consumption visible, helping teams build better awareness of how they use AI tools.',
      tags: ['Developer Tool', 'AI Literacy', 'Product Thinking'],
    },
    {
      number: '05',
      category: 'People & AI',
      title: 'AI Career Coach',
      description:
        'A structured career-coaching assistant that first understands background, skills, interests, motivation, goals and constraints before exploring possible career directions.',
      tags: ['People', 'AI', 'Coaching'],
    },
  ]

  return (
    <section id="projects" className="section-shell section-light">
      <div id="work" style={{ position: 'relative', top: '-80px' }} />
      <div className="section-intro project-heading">
        <div>
          <p className="eyebrow">Featured projects</p>
          <h2>Healthcare expertise and AI ideas, translated into practical solutions.</h2>
        </div>
        <p className="section-side-copy">
          I keep project stories focused on the problem, approach and value, while keeping organization-specific names and details confidential.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((p, idx) => (
          <article key={idx} className="project-card card-glass">
            <div className="project-topline">
              <span className="project-num">{p.number}</span>
              <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/>
              </svg>
            </div>
            <p className="project-category">{p.category}</p>
            <h3>{p.title}</h3>
            <p className="project-desc">{p.description}</p>
            <div className="tag-row">
              {p.tags.map((tag, tIdx) => (
                <span key={tIdx} className="tag-pill">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
