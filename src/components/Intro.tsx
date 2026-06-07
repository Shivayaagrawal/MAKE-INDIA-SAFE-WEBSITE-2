import './Intro.css'

export function Intro() {
  return (
    <section id="intro" className="intro section">
      <blockquote className="intro-quote rv">
        <p className="iq-text font-display">
          &ldquo;The body does not simply age — it accumulates insults, quietly, over decades.
          Medicine at its highest is not to manage that accumulation, but to reverse it.&rdquo;
        </p>
        <footer className="iq-attr font-label">
          Dr. Yokesh Arul &nbsp;&middot;&nbsp; MD &nbsp;&middot;&nbsp; Longevity Specialist
        </footer>
      </blockquote>

      <div className="intro-stats">
        <div className="stat rv d1">
          <div className="stat-n font-display" data-target="15">
            0
          </div>
          <div className="stat-l font-label">Years clinical practice</div>
          <div className="stat-rule" aria-hidden="true" />
        </div>
        <div className="stat rv d2">
          <div className="stat-n font-display" data-target="200">
            0
          </div>
          <div className="stat-l font-label">Biomarkers tracked per patient</div>
          <div className="stat-rule" aria-hidden="true" />
        </div>
        <div className="stat rv d3">
          <div className="stat-n font-display" data-target="94">
            0
          </div>
          <div className="stat-l font-label">Patient satisfaction score</div>
        </div>
      </div>
    </section>
  )
}
