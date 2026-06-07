import './Testimonials.css'

const TESTIMONIALS = [
  { i: 'H', n: 'Hilding', t: 'Protocol Patient', q: 'Superb experience from start to finish. It truly felt like the healthcare of the future — thorough, precise, and deeply respectful of my time.' },
  { i: 'B', n: 'Björn', t: 'Annual Protocol', q: 'Finally, a genuinely comprehensive approach to health. The annual benchmarking alone changed how I understand my own biology.' },
  { i: 'J', n: 'Jessica', t: 'Longevity Protocol', q: 'The most complete health examination I have ever had. Incredibly competent and unhurried. To follow my health longitudinally — this is medicine as it should be.' },
  { i: 'A', n: 'Ananya', t: 'Preventive Care', q: 'Dr. Arul sees you as a whole person, not a collection of symptoms. Precision and compassion in equal measure — rare and unforgettable.' },
  { i: 'R', n: 'Ravi', t: 'Protocol Patient', q: 'I arrived sceptical. I left with a map of my own biology I never had before. Evidence-led, genuinely unrushed. Nothing like a standard clinic.' },
  { i: 'M', n: 'Meera', t: 'Founding Patient', q: 'The difference is in what they look for before anything goes wrong. That philosophy alone sets this practice entirely apart from everything I have known.' },
]

export function Testimonials() {
  const cards = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section id="testimonials" className="testimonials section-sm">
      <span className="s-label rv font-label">Patient Voices</span>
      <div className="testi-track">
        {cards.map((c, i) => (
          <article key={i} className="testi-card">
            <p className="tc-text font-display">&ldquo;{c.q}&rdquo;</p>
            <footer className="tc-author">
              <div className="tc-av font-display" aria-hidden="true">{c.i}</div>
              <div>
                <div className="tc-name font-label">{c.n}</div>
                <div className="tc-sub font-label">{c.t}</div>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
