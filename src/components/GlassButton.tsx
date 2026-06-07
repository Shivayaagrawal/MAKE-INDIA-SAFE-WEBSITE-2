import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import './GlassButton.css'

type Variant = 'dark' | 'ghost' | 'light'

type BaseProps = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function GlassButton(props: ButtonProps | LinkProps) {
  const { children, variant = 'dark', className = '', ...rest } = props
  const cls = `btn btn-${variant} ${className}`.trim()

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest as LinkProps
    return (
      <a href={href} className={cls} {...linkRest}>
        <span className="btn-span">{children}</span>
      </a>
    )
  }

  const { type = 'button', ...btnRest } = rest as ButtonProps
  return (
    <button type={type} className={cls} {...btnRest}>
      <span className="btn-span">{children}</span>
    </button>
  )
}
