import { useEffect, useRef, useState } from 'react'
import './NekoLoader.css'

const TITLE = 'MAKE INDIA SAFE'

interface NekoLoaderProps {
  onComplete: () => void
}

export function NekoLoader({ onComplete }: NekoLoaderProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit' | 'done'>('enter')
  const completeCalled = useRef(false)

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase('hold'), 300)
    return () => clearTimeout(enterTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'hold') return
    const holdTimer = setTimeout(() => setPhase('exit'), 1800)
    return () => clearTimeout(holdTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exit') return
    const exitTimer = setTimeout(() => {
      setPhase('done')
      if (!completeCalled.current) {
        completeCalled.current = true
        onComplete()
      }
    }, 1150)
    return () => clearTimeout(exitTimer)
  }, [phase, onComplete])

  if (phase === 'done') return null

  return (
    <div
      className={`neko-loader ${phase === 'exit' ? 'neko-loader--exit' : ''} ${phase !== 'enter' ? 'neko-loader--visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={phase !== 'exit'}
    >
      <div className="neko-loader__panel neko-loader__panel--light" aria-hidden="true" />
      <div className="neko-loader__panel neko-loader__panel--dark" aria-hidden="true" />

      <div className="neko-loader__wordmark" aria-hidden="true">
        <p className="neko-loader__title">
          <span className="neko-loader__title-spacer">{TITLE}</span>
          <span className="neko-loader__title-half neko-loader__title-half--left">{TITLE}</span>
          <span className="neko-loader__title-half neko-loader__title-half--right">{TITLE}</span>
        </p>
      </div>

      <h1 className="sr-only">{TITLE}</h1>
      <span className="sr-only">Loading Make India Safe</span>
    </div>
  )
}
