import { type FormEvent, useState } from 'react'
import { GlassButton } from './GlassButton'
import { showConstructionToast, showNotifyToast } from '../utils/toast'
import './UnderConstruction.css'

const PROMISES = [
  'Preventive medicine is not about living fearfully. It is about living with the full knowledge of your body — and the freedom that knowledge brings.',
  'Every patient who walks through our doors deserves unhurried time, unrushed results, and an uncompromising standard of care.',
  'The future of medicine is not reactive. It is radically, unapologetically preventive.',
]

export function UnderConstruction() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      showConstructionToast('Please enter a valid email address.')
      return
    }
    showNotifyToast()
    setEmail('')
  }

  return (
    <section id="under" className="under">
      <div className="under-inner">
        <div className="rv">
          <div className="under-badge">
            <span className="dot" aria-hidden="true" />
            <span className="ub-text font-label">
              Clinic opening &nbsp;&middot;&nbsp; Protocols in preparation
            </span>
          </div>
          <h2 className="under-h font-display">
            The first step
            <br />
            begins <em>here.</em>
          </h2>
          <p className="under-body font-body">
            Dr. Yokesh Arul&apos;s clinic is preparing to open. A limited number of founding patients
            will receive priority access to the full longevity protocol, direct consultations, and
            annual benchmarking from day one.
          </p>
          <form className="email-row" onSubmit={handleSubmit}>
            <input
              className="email-in font-body"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <GlassButton variant="dark" type="submit">
              Notify me
            </GlassButton>
          </form>
          <p className="under-note font-body">No noise. Only what matters, when it matters.</p>
        </div>

        <div className="rv d2">
          <div className="under-promises">
            {PROMISES.map((text) => (
              <blockquote key={text} className="promise">
                <div className="p-line" aria-hidden="true" />
                <p className="p-text font-display">&ldquo;{text}&rdquo;</p>
              </blockquote>
            ))}
            <p className="under-attr font-label">Dr. Yokesh Arul &nbsp;&middot;&nbsp; MD</p>
          </div>
        </div>
      </div>
    </section>
  )
}
