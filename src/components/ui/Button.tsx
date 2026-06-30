import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'dark' | 'light' | 'outline' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChildHref?: string
  rightIcon?: ReactNode
}

const variants: Record<Variant, string> = {
  // SARGA race-red primary CTA (MotoGP-style)
  primary: 'bg-race text-white hover:bg-[#c2121f]',
  dark: 'bg-ink text-white hover:bg-night-700',
  light: 'bg-white text-ink hover:bg-panel',
  outline: 'border border-ink/20 text-ink hover:border-race hover:text-race',
  'outline-light': 'border border-white/30 text-white hover:border-white hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-sm',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-display font-bold uppercase tracking-[0.1em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-race focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

/** Editorial button — sharp corners, condensed uppercase. Renders <a> when href is given. */
export function Button({
  variant = 'primary',
  size = 'md',
  asChildHref,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {rightIcon}
    </>
  )

  if (asChildHref) {
    // Internal route (e.g. /events, /leaderboard) → SPA Link; hash / external → <a>.
    if (asChildHref.startsWith('/') && !asChildHref.startsWith('//')) {
      return (
        <Link to={asChildHref} className={classes}>
          {content}
        </Link>
      )
    }
    return (
      <a href={asChildHref} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}

/** Small right-arrow used inside CTAs / "view more". */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={cn('h-4 w-4', className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
