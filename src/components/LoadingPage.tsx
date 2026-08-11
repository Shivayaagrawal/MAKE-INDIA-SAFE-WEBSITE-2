import { useEffect, useState } from 'react'
import { CrowdCanvas } from './CrowdCanvas'
import { HomePage } from './HomePage'
import { ReservePage } from './ReservePage'
import { MorphText } from './ui/morph-text'
import './LoadingPage.css'

type Stage = 'crowd' | 'content' | 'reserve'

export function LoadingPage() {
  const [stage, setStage] = useState<Stage>('crowd')

  useEffect(() => {
    if (stage !== 'crowd') return

    const timer = window.setTimeout(() => {
      setStage('content')
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [stage])

  useEffect(() => {
    if (stage === 'reserve') {
      window.scrollTo({ top: 0 })
    }
  }, [stage])

  if (stage === 'reserve') {
    return (
      <div className="loading-page loading-page--content">
        <ReservePage onBack={() => setStage('content')} />
      </div>
    )
  }

  if (stage === 'content') {
    return (
      <div className="loading-page loading-page--content">
        <HomePage onReserve={() => setStage('reserve')} />
      </div>
    )
  }

  return (
    <div
      className="loading-page loading-page--crowd"
      role="main"
      aria-label="Make India Safe"
    >
      <div className="loading-page__canvas-wrap" aria-hidden="true">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>

      <div className="loading-page__hero">
        <h1 className="loading-page__brand" aria-label="Make India Safe">
          <MorphText
            words={['MAKE', 'INDIA', 'SAFE']}
            interval={1600}
            fontSize="clamp(1.75rem, 5.5vw, 3.5rem)"
            fontFamily="var(--font-brand)"
            className="loading-page__morph"
            textClassName="loading-page__morph-text"
          />
        </h1>
      </div>
    </div>
  )
}
