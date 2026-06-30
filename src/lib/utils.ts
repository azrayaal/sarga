import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind class names with conditional support. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Resolve a path inside the public assets dir. Keeps all asset references in one place. */
export function asset(p: string): string {
  const clean = p.startsWith('/') ? p.slice(1) : p
  return `/assets/${clean}`
}

/**
 * A neutral, on-brand SVG placeholder data-URI used as a graceful fallback when
 * an image asset is missing. Keeps the experience cohesive instead of a broken icon.
 */
export function placeholder(label = 'SARGA'): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
    <rect width='800' height='500' fill='#0B0B0C'/>
    <rect x='0' y='0' width='800' height='6' fill='#E11D2A'/>
    <text x='50%' y='50%' fill='#3A3B40' font-family='Arial' font-size='40'
      font-weight='800' text-anchor='middle' dominant-baseline='middle'
      letter-spacing='10'>${label.toUpperCase()}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/** Format a number with thousands separators (locale-stable). */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}
