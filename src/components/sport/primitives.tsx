import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { SportTheme } from '@/data'
import type { Sport } from '@/types'
import { asset } from '@/lib/utils'
import { SportIcon } from '@/components/ui/SportIcon'

/**
 * Shared building blocks for the per-sport micro-sites. Everything here is
 * palette-agnostic: it reads the `--c-*` / `--radius-card` CSS variables set on
 * the page root, so the same primitive renders in each sport's theme.
 */

export const MARK = asset('logos/sarga-mark.png')

/** In-page anchor nav shared by the micro-nav and footer. */
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'News', href: '#news' },
]

/** Common hero props — each hero uses the subset it needs. */
export interface HeroProps {
  theme: SportTheme
  sport: Sport
  gallery: string[]
}

/** Tiny local class joiner (avoids pulling twMerge into every leaf). */
export function cnJoin(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

/** Gradient-filled text using the sport's signature gradient. */
export function GradText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cnJoin('bg-clip-text text-transparent', className)} style={{ backgroundImage: 'var(--c-grad)' }}>
      {children}
    </span>
  )
}

/** Primary CTA filled with the sport gradient. Internal → SPA link, else <a>. */
export function BrandCTA({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls =
    'inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 font-display text-sm uppercase tracking-[0.12em] text-[color:var(--c-on)] shadow-sm transition hover:brightness-110'
  const style = { backgroundImage: 'var(--c-grad)' }
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={cls} style={style}>{children}<Arrow /></a>
  if (href.startsWith('#')) return <a href={href} className={cls} style={style}>{children}<Arrow /></a>
  return <Link to={href} className={cls} style={style}>{children}<Arrow /></Link>
}

/** Outline CTA in the current palette. */
export function GhostCTA({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls =
    'inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-7 font-display text-sm uppercase tracking-[0.12em] text-[color:var(--c-ink)] transition hover:border-[color:var(--c-brand)] hover:text-[color:var(--c-brand)] border-[color:var(--c-line)]'
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}<ExtArrow /></a>
  if (href.startsWith('#')) return <a href={href} className={cls}>{children}</a>
  return <Link to={href} className={cls}>{children}</Link>
}

/** Section eyebrow + condensed title. */
export function SectionHead({ kicker, title }: { kicker: string; title: ReactNode }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-[color:var(--c-brand)]">
        <span className="h-3 w-1 bg-[var(--c-brand)]" />
        {kicker}
      </span>
      <h2 className="mt-2 font-mega text-4xl uppercase leading-[0.95] sm:text-5xl">{title}</h2>
    </div>
  )
}

/** Small solid sport tag (F1-style flat label, no gradient). */
export function BrandTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--c-brand)] px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.16em] text-[color:var(--c-on)]">
      {children}
    </span>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={cnJoin('h-4 w-4', className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Diagonal up-right arrow for external links (replaces the ↗ glyph). */
export function ExtArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={cnJoin('h-3.5 w-3.5', className)}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

/** Brand badge — the real SARGA mark for horse-racing, the sport glyph otherwise. */
export function BrandMark({ sport }: { sport: Sport }) {
  return (
        <SportIcon sport={sport.id} className="h-36" />
  )
}
