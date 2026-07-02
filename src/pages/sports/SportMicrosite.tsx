import { useEffect, type CSSProperties } from 'react'
import { getSport, sports, sportGalleries, events, getStandings, getSportTheme } from '@/data'
import { news } from '@/data/news'
import type { SportId } from '@/types'
import {
  MicroNav,
  SportHero,
  AboutSection,
  EventsSection,
  StandingsSection,
  GallerySection,
  NewsSection,
  MicroFooter,
  cnJoin,
} from '@/components/sport'
import { NotFoundPage } from '../NotFoundPage'

/**
 * Shared layout for a single sport micro-site. Each sport has its own page
 * entry (`src/pages/sports/<sport>/index.tsx`) that renders this scaffold with
 * its `sportId`; the sport's theme drives palette, fonts and hero personality,
 * so every page reads like a standalone site. Rendered outside the global
 * Layout (see App.tsx) — it brings its own nav/footer.
 */
export function SportMicrosite({ sportId }: { sportId: SportId }) {
  // Reset scroll when switching between sport micro-sites.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [sportId])

  const sport = getSport(sportId)
  if (!sport) return <NotFoundPage />

  const theme = getSportTheme(sport.id)
  const p = theme.palette
  const sportEvents = events.filter((e) => e.sport === sport.id)
  const standings = getStandings(sport.id)
  const gallery = sportGalleries[sport.id] ?? []
  const sportNews = news.filter((n) => theme.newsCategories.includes(n.category))
  const otherSports = sports.filter((s) => s.id !== sport.id)
  const nextEvent = sportEvents.find((e) => e.kind === 'upcoming')

  const cssVars = {
    '--c-bg': p.bg,
    '--c-panel': p.panel,
    '--c-line': p.line,
    '--c-brand': p.brand,
    '--c-brand2': p.brand2,
    '--c-accent': p.accent,
    '--c-ink': p.ink,
    '--c-muted': p.muted,
    '--c-on': p.onBrand,
    '--c-grad': theme.gradient,
    // F1-style tight radius for rallycross; softer elsewhere.
    '--radius-card': theme.heroVariant === 'f1' ? '0.625rem' : '1rem',
  } as CSSProperties

  return (
    <div
      style={cssVars}
      className={cnJoin(
        'min-h-screen scroll-smooth bg-[var(--c-bg)] text-[color:var(--c-ink)] antialiased',
        sport.id === 'horse-racing' && 'sport-site--horse',
        sport.id === 'rallycross' && 'sport-site--rally',
      )}
    >
      <MicroNav theme={theme} sport={sport} nextEvent={nextEvent} />
      <SportHero theme={theme} sport={sport} gallery={gallery} />
      <AboutSection theme={theme} sport={sport} />
      <EventsSection sport={sport} sportEvents={sportEvents} />
      {standings && <StandingsSection sport={sport} standings={standings} />}
      {gallery.length > 0 && <GallerySection sport={sport} gallery={gallery} />}
      <NewsSection sportNews={sportNews} />
      <MicroFooter theme={theme} sport={sport} otherSports={otherSports} />
    </div>
  )
}
