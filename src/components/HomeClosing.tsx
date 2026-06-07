import { buildPieGradient, PROTOCOL_PILLS } from '../assets/images'
import { Pill } from './Pill'
import './HomeClosing.css'

export function HomeClosing() {
  const pills = [...PROTOCOL_PILLS, ...PROTOCOL_PILLS]

  return (
    <section id="insights" className="home-closing section">
      <span className="s-label rv font-label">Your protocol profile</span>
      <h2 className="s-h2 rv d1 font-display">
        Build upon your data.
        <br />
        <em>Every year.</em>
      </h2>

      <div className="home-closing__pill-wrap rv d2">
        <div className="home-closing__pill-track">
          {pills.map((pill, i) => (
            <article key={`${pill.label}-${i}`} className="pill-card-h">
              <div className="pill-card-h__pill">
                <Pill theme={pill.theme} fillHeight={pill.fill} size="full" />
              </div>
              <figure className="pill-card-h__figure">
                <img src={pill.image} alt="" loading="lazy" decoding="async" />
              </figure>
              <div className="pill-card-h__copy">
                <span className="pill-card-h__tag font-label">{pill.label}</span>
                <h3 className="pill-card-h__title font-display">{pill.title}</h3>
                <p className="pill-card-h__desc font-body">{pill.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="home-closing__chart rv d3">
        <div className="home-closing__pie-wrap">
          <div
            className="home-closing__pie"
            style={{ background: buildPieGradient(PROTOCOL_PILLS.length) }}
            role="img"
            aria-label="Protocol coverage breakdown across five clinical domains"
          >
            <div className="home-closing__pie-center font-display">100%</div>
          </div>
        </div>

        <ul className="home-closing__legend">
          {PROTOCOL_PILLS.map((pill) => (
            <li key={pill.label} className="home-closing__legend-item">
              <figure className="home-closing__legend-thumb">
                <img src={pill.image} alt="" loading="lazy" />
              </figure>
              <div className="home-closing__legend-copy">
                <span className="home-closing__legend-swatch" style={{ background: pill.color }} />
                <span className="home-closing__legend-label font-label">{pill.label}</span>
                <span className="home-closing__legend-pct font-display">{pill.share}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
