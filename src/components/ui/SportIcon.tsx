import type { SportId } from '@/types'
import { asset, cn } from '@/lib/utils'

/** Simple line glyphs that give each sport category a distinct identity. */
const paths: Partial<Record<SportId, JSX.Element>> = {
  'horse-racing': (
    <path d="M3 18c2-6 5-8 9-8 1.5 0 2.5-.5 3.5-1.5L18 6l3 1-1.5 2.5c-.7 1-1 2-1 3.2 0 1.8.5 3 1.5 5.3M7 18l1-3M14 18l1.5-4" />
  ),
  motorsport: (
    <path d="M5 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 13h5l2-3h2M11 10l-1 3M6.5 10 9 7h3" />
  ),
  championship: (
    <path d="M8 4h8v3a4 4 0 0 1-8 0V4zM8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3M10 13.5V16M9 20h6M10 16h4l.5 4" />
  ),
  community: (
    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a2.5 2.5 0 1 0 0-5M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M16 14h1a4 4 0 0 1 4 4v1" />
  ),
}

/** Sports whose icon is a raster logo (from public/assets/logos) instead of a glyph. */
const logos: Partial<Record<SportId, string>> = {
  rallycross: asset('logos/motorsport.png'),
}

export function SportIcon({ sport, className }: { sport: SportId; className?: string }) {
  const logo = logos[sport]
  if (logo) {
    // Wide wordmark: size by height, let width flow (w-auto) so it isn't squished short.
    return <img src={logo} alt="" className='h-40'/>
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cn('h-6 w-6', className)}>
      {paths[sport]}
    </svg>
  )
}
