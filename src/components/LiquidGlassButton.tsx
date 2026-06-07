import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './LiquidGlassButton.css'

type ButtonVariant = 'dark' | 'amber' | 'ghost'

interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

export function LiquidGlassButton({
  children,
  variant = 'dark',
  className = '',
  type = 'button',
  ...props
}: LiquidGlassButtonProps) {
  return (
    <button
      type={type}
      className={`btn-glass btn-${variant} ${className}`.trim()}
      {...props}
    >
      <span className="btn-glass-ring" aria-hidden="true" />
      <span className="btn-glass-label">{children}</span>
    </button>
  )
}
