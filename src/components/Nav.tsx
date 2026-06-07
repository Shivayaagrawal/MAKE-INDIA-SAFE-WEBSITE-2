import { GlassButton } from './GlassButton'
import './Nav.css'

export function Nav() {
  return (
    <nav id="nav" className="nav">
      <a href="/" className="nav-logo">
        Make India Safe
        <span className="nav-logo-sub font-label">
          Dr. Yokesh Arul &nbsp;&middot;&nbsp; Longevity Medicine
        </span>
      </a>
      <div className="nav-right">
        <a className="nav-link font-label" href="#protocols">
          Protocols
        </a>
        <a className="nav-link font-label" href="#features">
          Approach
        </a>
        <a className="nav-link font-label" href="#testimonials">
          Voices
        </a>
        <div className="nav-dot font-label">
          <span className="dot" aria-hidden="true" />
          Clinic opening soon
        </div>
        <GlassButton variant="ghost" href="#under">
          Get Notified
        </GlassButton>
      </div>
    </nav>
  )
}
