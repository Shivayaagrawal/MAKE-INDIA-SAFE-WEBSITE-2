import { DATA_POINT_IMAGES } from '../assets/images'
import { GlassButton } from './GlassButton'
import './BodyFuture.css'

export function BodyFuture() {
  return (
    <>
      <section className="body-future body-future--body section">
        <div className="body-future__inner">
          <div className="body-future__copy rv">
            <span className="body-future__label font-label">Your body</span>
            <h2 className="body-future__h font-display">
              Regular inspections are mandatory for cars on our roads — why not for your health?
            </h2>
            <p className="body-future__p font-body">
              We often wait until our bodies break down before taking action. Dr. Arul&apos;s protocol
              prioritises prevention the same way — intercepting risk years before symptoms appear.
            </p>
            <GlassButton variant="dark" href="#under">
              Join the waitlist
            </GlassButton>
          </div>
          <figure className="body-future__photo rv d1">
            <img
              src={DATA_POINT_IMAGES.body}
              alt="Full-body health measurements and preventive screening"
              loading="lazy"
            />
            <div className="body-future__photo-edge" aria-hidden="true" />
          </figure>
        </div>
      </section>

      <section className="body-future body-future--future section">
        <div className="body-future__inner body-future__inner--reverse">
          <figure className="body-future__photo rv">
            <img
              src={DATA_POINT_IMAGES.heart}
              alt="Heart rhythm analysis and cardiovascular risk profiling"
              loading="lazy"
            />
            <div className="body-future__photo-edge" aria-hidden="true" />
          </figure>
          <div className="body-future__copy rv d1">
            <span className="body-future__label font-label">Your future</span>
            <h2 className="body-future__h font-display">
              Equipping doctors with the best tools to track your health — for everyone.
            </h2>
            <p className="body-future__p font-body">
              A doctor-led model of care, built on evidence and longitudinal data. Unhurried
              consultations. Measurable outcomes. A better experience for patients and physicians alike.
            </p>
            <GlassButton variant="ghost" href="#features">
              Our approach
            </GlassButton>
          </div>
        </div>
      </section>
    </>
  )
}
