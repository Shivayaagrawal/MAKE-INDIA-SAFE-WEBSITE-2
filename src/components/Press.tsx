import './Press.css'

const PRESS = [
  'The Guardian',
  'Bloomberg Health',
  'Vogue',
  'The Washington Post',
  'The New York Times',
]

export function Press() {
  return (
    <section id="press" className="press">
      <p className="press-s rv font-label">As seen in</p>
      <div className="press-row rv d1">
        {PRESS.map((name) => (
          <div key={name} className="press-item font-display">
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}
