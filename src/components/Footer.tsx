import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="f-brand font-display">Make India Safe</div>
        <div className="f-sub font-label">Dr. Yokesh Arul &nbsp;&middot;&nbsp; Longevity Medicine</div>
        <p className="f-note font-body">
          Precision care built on evidence, delivered with compassion. A clinic for patients who
          believe that health is not merely the absence of disease — it is the fullness of life.
        </p>
      </div>
      <div>
        <div className="f-col-h font-label">Clinic</div>
        <a className="f-link font-body" href="#intro">About Dr. Arul</a>
        <a className="f-link font-body" href="#protocols">Protocols</a>
        <a className="f-link font-body" href="#features">Approach</a>
        <a className="f-link font-body" href="#press">Press</a>
      </div>
      <div>
        <div className="f-col-h font-label">Patients</div>
        <a className="f-link font-body" href="#under">Join the waitlist</a>
        <a className="f-link font-body" href="#under">FAQ</a>
        <a className="f-link font-body" href="#under">Contact</a>
      </div>
      <div>
        <div className="f-col-h font-label">Connect</div>
        <a className="f-link font-body" href="#under">LinkedIn</a>
        <a className="f-link font-body" href="#under">Instagram</a>
        <a className="f-link font-body" href="#under">Publications</a>
      </div>
      <div className="f-base">
        <div className="f-copy font-body">
          &copy; {new Date().getFullYear()} Dr. Yokesh Arul &nbsp;&middot;&nbsp; All rights reserved
        </div>
        <div className="f-copy font-body">Privacy &nbsp;&middot;&nbsp; Terms</div>
      </div>
    </footer>
  )
}
