import './Ticker.css'

const TICKER_DATA: [string, string][] = [
  ['200+', 'Biomarkers tracked'],
  ['15+', 'Years practice'],
  ['Annual', 'Protocol reviews'],
  ['Evidence-led', 'Protocols'],
  ['Preventive', 'Philosophy'],
  ['Precision', 'Personalised care'],
  ['Cellular', 'Longevity'],
  ['Metabolic', 'Benchmarking'],
]

export function Ticker() {
  const items = [...TICKER_DATA, ...TICKER_DATA]

  return (
    <div id="ticker" className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        {items.map(([value, label], i) => (
          <div key={i} className="tick-item font-label">
            <strong>{value}</strong>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
