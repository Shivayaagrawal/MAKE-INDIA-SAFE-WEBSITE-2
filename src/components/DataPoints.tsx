import { DATA_POINT_IMAGES } from '../assets/images'
import './DataPoints.css'

const DATA_POINTS = [
  {
    title: 'Body Measurements',
    desc: 'Composition, posture, and structural markers tracked longitudinally.',
    image: DATA_POINT_IMAGES.body,
  },
  {
    title: 'Blood Vessels',
    desc: 'Arterial stiffness and endothelial function — years before symptoms.',
    image: DATA_POINT_IMAGES.bloodVessels,
  },
  {
    title: 'Heart Rhythm',
    desc: 'Continuous rhythm analysis and cardiovascular risk profiling.',
    image: DATA_POINT_IMAGES.heart,
  },
  {
    title: 'Diabetes Factors',
    desc: 'Insulin sensitivity, HbA1c trajectory, and metabolic age benchmarking.',
    image: DATA_POINT_IMAGES.diabetes,
  },
  {
    title: 'Skin Mapping',
    desc: 'Full-surface dermatological screening with change detection over time.',
    image: DATA_POINT_IMAGES.skin,
  },
  {
    title: 'Cellular Markers',
    desc: 'Telomere length, oxidative stress, and mitochondrial function panels.',
    image: DATA_POINT_IMAGES.cellular,
  },
]

export function DataPoints() {
  const items = [...DATA_POINTS, ...DATA_POINTS]

  return (
    <section className="data-points" aria-labelledby="data-points-heading">
      <div className="data-points__header section">
        <span className="s-label rv font-label">Full-body protocol</span>
        <h2 id="data-points-heading" className="s-h2 rv d1 font-display">
          Track millions of data points.
          <br />
          <em>In just a few minutes.</em>
        </h2>
      </div>

      <div className="data-points__track-wrap">
        <div className="data-points__track">
          {items.map((item, i) => (
            <article key={i} className="dp-card">
              <figure className="dp-card__figure">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </figure>
              <h3 className="dp-card__title font-display">{item.title}</h3>
              <p className="dp-card__desc font-body">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
