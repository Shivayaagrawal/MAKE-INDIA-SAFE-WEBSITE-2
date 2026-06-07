import { DOCTOR_IMAGES } from '../assets/images'
import { GlassButton } from './GlassButton'
import './Hero.css'

const DOCTOR_PANELS = [
  {
    src: DOCTOR_IMAGES.scrubs,
    alt: 'Dr. Yokesh Arul in clinical scrubs',
    variant: 'primary' as const,
  },
  {
    src: DOCTOR_IMAGES.desk,
    alt: 'Dr. Yokesh Arul at consultation desk',
    variant: 'secondary' as const,
  },
]

interface HeroProps {
  active: boolean
}

export function Hero({ active }: HeroProps) {
  return (
    <section id="hero" className={`hero ${active ? 'hero--on' : ''}`} aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero-content">
          <p className="hero-eyebrow font-label">
            Precision longevity &nbsp;&middot;&nbsp; Evidence-led protocols
          </p>
          <h1 id="hero-heading" className="hero-h1 font-display">
            A better
            <br />
            health check.
            <br />
            <em>Finally.</em>
          </h1>
          <p className="hero-sub font-body">
            Get a thorough preventive health experience, like you&apos;ve never encountered before.
            Clinically rigorous. Deeply unhurried. Built around you — not around throughput.
          </p>
          <div className="hero-cta">
            <GlassButton variant="light" href="#under">
              Join the waitlist
            </GlassButton>
            <GlassButton variant="ghost" href="#protocols" className="btn-ghost--hero">
              See protocols
            </GlassButton>
          </div>
        </div>

        <div className={`hero-visual ${active ? 'hero-visual--on' : ''}`} aria-hidden="true">
          <div className="hero-visual__glow" />
          {DOCTOR_PANELS.map((panel) => (
            <figure key={panel.src} className={`hero-panel hero-panel--${panel.variant}`}>
              <img src={panel.src} alt={panel.alt} loading="eager" decoding="async" />
              <div className="hero-panel__overlay" />
              <div className="hero-panel__edge" />
            </figure>
          ))}
          <span className="hero-visual__caption font-label">Dr. Yokesh Arul &nbsp;&middot;&nbsp; MD</span>
        </div>
      </div>

      <div className="hero-scroll font-label" aria-hidden="true">
        <span className="scroll-line" />
        Scroll
      </div>
    </section>
  )
}
