import { PROTOCOL_IMAGES } from '../assets/images'
import './Protocols.css'

const PROTOCOLS = [
  {
    num: '01',
    title: 'Cellular Longevity',
    desc: 'Telomere tracking, mitochondrial function, oxidative stress markers. The cellular clock, measured.',
    image: PROTOCOL_IMAGES.cellular,
    alt: 'Cellular microscopy and longevity markers',
    delay: 'd1',
  },
  {
    num: '02',
    title: 'Metabolic Health',
    desc: 'Insulin sensitivity, visceral adiposity, lipid particle analysis. Metabolic age versus chronological age.',
    image: PROTOCOL_IMAGES.metabolic,
    alt: 'Metabolic blood analysis and glucose monitoring',
    delay: 'd2',
  },
  {
    num: '03',
    title: 'Neural Vitality',
    desc: 'Cognitive performance benchmarking, neuroinflammation markers, sleep architecture analysis.',
    image: PROTOCOL_IMAGES.neural,
    alt: 'Neural brain scan and cognitive health',
    delay: 'd3',
  },
  {
    num: '04',
    title: 'Hormonal Balance',
    desc: 'Full endocrine panel, thyroid cascade, sex hormone optimisation. Hormones as levers, not afterthoughts.',
    image: PROTOCOL_IMAGES.hormonal,
    alt: 'Hormonal endocrine health consultation',
    delay: 'd4',
  },
  {
    num: '05',
    title: 'Vascular Integrity',
    desc: 'Arterial stiffness, endothelial function, coronary calcium score. Cardiovascular risk, years before symptoms.',
    image: PROTOCOL_IMAGES.vascular,
    alt: 'Cardiovascular and vascular health imaging',
    delay: 'd4',
  },
]

export function Protocols() {
  return (
    <section id="protocols" className="protocols section">
      <span className="s-label rv font-label">Clinical Protocols</span>
      <h2 className="s-h2 rv d1 font-display">
        Track what matters.
        <br />
        <em>Act before it matters more.</em>
      </h2>
      <div className="proto-grid">
        {PROTOCOLS.map((p) => (
          <article key={p.num} className={`proto-card rv ${p.delay}`}>
            <figure className="proto-card__figure">
              <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              <div className="proto-card__figure-edge" aria-hidden="true" />
            </figure>
            <span className="pc-n font-display">{p.num}</span>
            <h3 className="pc-title font-display">{p.title}</h3>
            <p className="pc-desc font-body">{p.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
