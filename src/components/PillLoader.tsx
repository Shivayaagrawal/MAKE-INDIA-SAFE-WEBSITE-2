import { useCallback, useEffect, useRef, useState } from 'react'
import { Pill, type PillTheme } from './Pill'
import './PillLoader.css'

const PILL_COUNT = 5
const MIN_FILL = 12
const MAX_FILL = 82
const SETTLE_FILL = 64
const OSCILLATION_INTERVAL = 540
const SPRING_FACTOR = 0.052

const PILL_DATA: { theme: PillTheme; label: string }[] = [
  { theme: 'navy', label: 'Cellular' },
  { theme: 'blue', label: 'Metabolic' },
  { theme: 'cream', label: 'Neural' },
  { theme: 'mid', label: 'Hormonal' },
  { theme: 'pale', label: 'Vascular' },
]

const EXIT_TRANSFORMS = [
  { x: -130, y: -70, r: -25 },
  { x: -60, y: -100, r: -15 },
  { x: 0, y: -90, r: 0 },
  { x: 60, y: -100, r: 15 },
  { x: 130, y: -70, r: 25 },
]

interface PillLoaderProps {
  onComplete: () => void
}

export function PillLoader({ onComplete }: PillLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'settling' | 'exiting' | 'done'>('loading')
  const [fills, setFills] = useState<number[]>(() => Array(PILL_COUNT).fill(0))
  const [progress, setProgress] = useState(0)
  const [tagsVisible, setTagsVisible] = useState(false)

  const curRef = useRef<number[]>(Array(PILL_COUNT).fill(0))
  const targetsRef = useRef<number[]>(Array(PILL_COUNT).fill(28))
  const rafRef = useRef(0)
  const lastOscRef = useRef(0)
  const completeCalledRef = useRef(false)

  useEffect(() => {
    const timers = PILL_DATA.map((_, i) =>
      setTimeout(() => setTagsVisible(true), 480 + i * 120),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const oscillate = useCallback(() => {
    targetsRef.current = targetsRef.current.map((v) =>
      Math.max(MIN_FILL, Math.min(MAX_FILL, v + (Math.random() - 0.5) * 22)),
    )
  }, [])

  const tick = useCallback(
    (timestamp: number) => {
      if (phase !== 'loading') return

      if (timestamp - lastOscRef.current >= OSCILLATION_INTERVAL) {
        lastOscRef.current = timestamp
        oscillate()
      }

      curRef.current = curRef.current.map((c, i) => c + (targetsRef.current[i] - c) * SPRING_FACTOR)
      setFills([...curRef.current])
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 2.4)
        if (next >= 100) setPhase('settling')
        return next
      })

      rafRef.current = requestAnimationFrame(tick)
    },
    [phase, oscillate],
  )

  useEffect(() => {
    oscillate()
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick, oscillate])

  useEffect(() => {
    if (phase !== 'settling') return

    setProgress(100)
    const start = [...curRef.current]
    const startTime = performance.now()
    const duration = 1000

    const settleFrame = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      curRef.current = start.map((s) => s + (SETTLE_FILL - s) * eased)
      setFills([...curRef.current])

      if (t < 1) {
        rafRef.current = requestAnimationFrame(settleFrame)
      } else {
        setTimeout(() => setPhase('exiting'), 900)
      }
    }

    rafRef.current = requestAnimationFrame(settleFrame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exiting') return

    const exitTimer = setTimeout(() => {
      setPhase('done')
      if (!completeCalledRef.current) {
        completeCalledRef.current = true
        onComplete()
      }
    }, 1400)

    return () => clearTimeout(exitTimer)
  }, [phase, onComplete])

  if (phase === 'done') return null

  return (
    <div
      className={`pill-loader ${phase === 'exiting' ? 'pill-loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={phase !== 'exiting'}
    >
      <header className="pill-loader__wordmark">
        <h1 className="pill-loader__brand font-display">Make India Safe</h1>
        <p className="pill-loader__sub font-label">Dr. Yokesh Arul &nbsp;&middot;&nbsp; Longevity Medicine</p>
      </header>

      <div className="pill-loader__stage">
        {fills.map((fill, i) => (
          <div
            key={i}
            className="pill-loader__wrap"
            style={
              phase === 'exiting'
                ? {
                    ['--exit-x' as string]: `${EXIT_TRANSFORMS[i].x}px`,
                    ['--exit-y' as string]: `${EXIT_TRANSFORMS[i].y}px`,
                    ['--exit-r' as string]: `${EXIT_TRANSFORMS[i].r}deg`,
                    animationDelay: `${i * 70}ms`,
                  }
                : undefined
            }
          >
            <Pill theme={PILL_DATA[i].theme} fillHeight={fill} />
            <span className="pill-tag font-label" style={{ opacity: tagsVisible ? 1 : 0 }}>
              {PILL_DATA[i].label}
            </span>
          </div>
        ))}
      </div>

      <div className="pill-loader__progress">
        <div className="prog-bar">
          <div className="prog-fill" style={{ width: `${Math.floor(progress)}%` }} />
        </div>
        <span className="prog-num font-display">{Math.floor(progress)}%</span>
      </div>

      <span className="sr-only">Loading Make India Safe</span>
    </div>
  )
}
