export default function ContactSection() {
  return (
    <section id="contact" className="contact section-shell">
      <div className="contact-main">
        <p className="eyebrow">Contact</p>
        <h2>Let's talk about healthcare, AI, transformation or leadership.</h2>
        <p>
          Open to conversations around digital consulting, AI strategy, product thinking and people leadership.
        </p>
      </div>
      <div className="contact-actions">
        <a
          className="contact-card card-glass"
          href="https://www.linkedin.com/in/sunita-mishra-34a19868/"
          target="_blank"
          rel="noreferrer"
        >
          <svg width="25" height="25" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"/>
          </svg>
          <span>Connect on LinkedIn</span>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
            <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/>
          </svg>
        </a>

        <div className="contact-card static-card card-glass">
          <svg width="25" height="25" fill="currentColor" viewBox="0 0 256 256">
            <path d="M72,144H32a8,8,0,0,1,0-16H67.72l13.62-20.44a8,8,0,0,1,13.32,0l25.34,38,9.34-14A8,8,0,0,1,136,128h24a8,8,0,0,1,0,16H140.28l-13.62,20.44a8,8,0,0,1-13.32,0L88,126.42l-9.34,14A8,8,0,0,1,72,144ZM178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,.75,0,1.5,0,2.25a8,8,0,1,0,16-.5c0-.58,0-1.17,0-1.75A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46c0,53.61-77.76,102.15-96,112.8-10.83-6.31-42.63-26-66.68-52.21a8,8,0,1,0-11.8,10.82c31.17,34,72.93,56.68,74.69,57.63a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40Z"/>
          </svg>
          <span>Healthcare × AI × Data × Leadership</span>
        </div>
      </div>
    </section>
  )
}
