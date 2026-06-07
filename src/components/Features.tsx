import { DATA_POINT_IMAGES, PROTOCOL_IMAGES } from '../assets/images'
import { useEffect, useRef, useState } from 'react'
import { GlassButton } from './GlassButton'
import './Features.css'

const PREVENTION_DOTS = [
  { x: 28, y: 22, delay: 0 },
  { x: 52, y: 18, delay: 0.4 },
  { x: 68, y: 35, delay: 0.8 },
  { x: 38, y: 48, delay: 1.2 },
  { x: 58, y: 62, delay: 0.6 },
  { x: 72, y: 78, delay: 1.4 },
  { x: 42, y: 72, delay: 1.0 },
]

const BENCHMARK_ORBS = [
  { src: DATA_POINT_IMAGES.diabetes, x: 12, y: 18, z: 36, delay: 0 },
  { src: DATA_POINT_IMAGES.bloodVessels, x: 58, y: 8, z: 52, delay: 0.3 },
  { src: DATA_POINT_IMAGES.skin, x: 68, y: 42, z: 44, delay: 0.6 },
]

const LONGITUDINAL_BARS = [
  { src: PROTOCOL_IMAGES.metabolic, h: 38, delay: 0.05 },
  { src: PROTOCOL_IMAGES.neural, h: 52, delay: 0.12 },
  { src: PROTOCOL_IMAGES.vascular, h: 68, delay: 0.19 },
  { src: DATA_POINT_IMAGES.heart, h: 48, delay: 0.26 },
  { src: DATA_POINT_IMAGES.cellular, h: 82, delay: 0.33 },
]

const FEATURES = [
  {
    id: 1,
    num: '01 — Prevention',
    title: <>Stay <em>ahead</em> of your health</>,
    body: 'Most disease announces itself years after it begins. Preventive medicine intercepts the conversation early — when intervention costs least and gains most. Dr. Arul\u2019s protocol begins where conventional medicine hasn\u2019t yet looked.',
    label: 'Prevention',
    scene: 'prevention' as const,
    image: DATA_POINT_IMAGES.body,
    alt: 'Full-body preventive health screening',
  },
  {
    id: 2,
    num: '02 — Benchmark',
    title: <>Compare with your <em>peers</em></>,
    body: 'Biomarkers only become meaningful against reference populations. Every result is calibrated against age, sex, and lifestyle cohorts — giving you a precise picture of where you stand, not just whether you\u2019re "normal."',
    label: 'Benchmark',
    scene: 'benchmark' as const,
    image: DATA_POINT_IMAGES.heart,
    alt: 'Heart rhythm and peer benchmark analysis',
  },
  {
    id: 3,
    num: '03 — Longitudinal',
    title: <>Improve your values over <em>time</em></>,
    body: 'A single scan is a photograph. Annual tracking is a film. The insight lies not in the snapshot but in the direction and rate of change. Dr. Arul\u2019s model is built for longitudinal care, not one-time consultations.',
    label: 'Longitudinal',
    scene: 'longitudinal' as const,
    image: DATA_POINT_IMAGES.cellular,
    alt: 'Cellular markers tracked over time',
  },
]

function PreventionScene({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  return (
    <div className={`feat-scene feat-scene--prevention ${active ? 'feat-scene--on' : ''}`}>
      <figure className="feat-scene__photo">
        <img src={src} alt={alt} />
      </figure>
      <div className="feat-scene__scan-grid" aria-hidden="true" />
      <div className="feat-scene__points" aria-hidden="true">
        {PREVENTION_DOTS.map((dot, i) => (
          <span
            key={i}
            className="feat-scene__point"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="feat-scene__hud font-label">Scan active</div>
    </div>
  )
}

function BenchmarkScene({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  return (
    <div className={`feat-scene feat-scene--benchmark ${active ? 'feat-scene--on' : ''}`}>
      <figure className="feat-scene__photo">
        <img src={src} alt={alt} />
      </figure>
      <div className="feat-scene__peer-ring" aria-hidden="true">
        <div className="feat-scene__peer-core font-display">94%</div>
      </div>
      <div className="feat-scene__orbs" aria-hidden="true">
        {BENCHMARK_ORBS.map((orb, i) => (
          <figure
            key={i}
            className="feat-scene__orb"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              ['--orb-z' as string]: `${orb.z}px`,
              animationDelay: `${orb.delay}s`,
            }}
          >
            <img src={orb.src} alt="" />
          </figure>
        ))}
      </div>
    </div>
  )
}

function LongitudinalScene({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  return (
    <div className={`feat-scene feat-scene--longitudinal ${active ? 'feat-scene--on' : ''}`}>
      <figure className="feat-scene__photo">
        <img src={src} alt={alt} />
      </figure>
      <div className="feat-scene__chart" aria-hidden="true">
        {LONGITUDINAL_BARS.map((bar, i) => (
          <figure
            key={i}
            className="feat-scene__bar"
            style={{ ['--bar-h' as string]: `${bar.h}%`, animationDelay: `${bar.delay}s` }}
          >
            <img src={bar.src} alt="" />
            <span className="feat-scene__bar-cap" />
          </figure>
        ))}
      </div>
    </div>
  )
}

function FeaturePanel({
  scene,
  label,
  active,
  image,
  alt,
}: {
  scene: 'prevention' | 'benchmark' | 'longitudinal'
  label: string
  active: boolean
  image: string
  alt: string
}) {
  return (
    <div className={`feat-panel ${active ? 'feat-panel--on' : ''}`}>
      <div className="feat-visual">
        {scene === 'prevention' && <PreventionScene src={image} alt={alt} active={active} />}
        {scene === 'benchmark' && <BenchmarkScene src={image} alt={alt} active={active} />}
        {scene === 'longitudinal' && <LongitudinalScene src={image} alt={alt} active={active} />}
        <span className="feat-visual__label font-label">{label}</span>
      </div>
    </div>
  )
}

export function Features() {
  const [activePanel, setActivePanel] = useState(1)
  const itemsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.45) {
            const id = parseInt((e.target as HTMLElement).dataset.fp ?? '1', 10)
            setActivePanel(id)
          }
        })
      },
      { threshold: 0.45 },
    )

    itemsRef.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="features" className="features">
      <div className="feat-sticky">
        {FEATURES.map((f) => (
          <FeaturePanel
            key={f.id}
            scene={f.scene}
            label={f.label}
            active={activePanel === f.id}
            image={f.image}
            alt={f.alt}
          />
        ))}
      </div>

      <div className="feat-scroll-side">
        {FEATURES.map((f, i) => (
          <article
            key={f.id}
            ref={(el) => { itemsRef.current[i] = el }}
            className="feat-item"
            data-fp={f.id}
          >
            <span className="fi-n font-display">{f.num}</span>
            <h3 className="fi-h font-display">{f.title}</h3>
            <p className="fi-body font-body">{f.body}</p>
            <GlassButton variant="ghost" href="#under" className="feat-cta">
              Join the protocol
            </GlassButton>
          </article>
        ))}
      </div>
    </section>
  )
}
