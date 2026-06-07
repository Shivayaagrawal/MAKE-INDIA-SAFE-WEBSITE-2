import './Pill.css'

export type PillTheme = 'navy' | 'blue' | 'cream' | 'mid' | 'pale'
export type PillSize = 'full' | 'mini'

interface PillProps {
  theme: PillTheme
  fillHeight?: number | string
  size?: PillSize
  className?: string
}

export function Pill({ theme, fillHeight = '64%', size = 'full', className = '' }: PillProps) {
  const isMini = size === 'mini'
  const height = typeof fillHeight === 'number' ? `${fillHeight}%` : fillHeight

  if (isMini) {
    return (
      <div className={`mini-pill ${className}`.trim()} aria-hidden="true">
        <div className={`mp-shell mp-shell--${theme}`} />
        <div className={`mp-cap mp-cap--${theme}`} />
        <div className={`mp-fill mp-fill--${theme}`} />
        <div className="mp-gloss" />
      </div>
    )
  }

  return (
    <div className={`pill p-${theme} ${className}`.trim()} aria-hidden="true">
      <div className="p-shell" />
      <div className="p-cap" />
      <div className="p-fill" style={{ height }} />
      <div className="p-seam" />
      <div className="p-gloss" />
    </div>
  )
}
