import { Link } from 'react-router-dom'
import type { SportTheme } from '@/data'
import type { EventDetail, Sport } from '@/types'
import { BrandMark, NAV_LINKS } from './primitives'

/** Standalone top chrome for a sport micro-site: brand mark, anchor nav, and
 *  an F1-style "next round" info strip when an upcoming event exists. */
export function MicroNav({ theme, sport, nextEvent }: { theme: SportTheme; sport: Sport; nextEvent?: EventDetail }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-[var(--c-bg)]/95 backdrop-blur border-[color:var(--c-line)]">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 pr-4 sm:pr-6 lg:pr-8">
        <a href="#top" className="pt-5 gap-2.5">
          <BrandMark sport={sport} />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-display text-sm uppercase tracking-[0.08em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
              {l.label}
            </a>
          ))}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 font-display text-[11px] uppercase tracking-[0.14em] text-[color:var(--c-muted)] transition hover:text-[color:var(--c-ink)] border-[color:var(--c-line)]"
        >
          SARGA Ecosystem
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3.5 w-3.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
        </Link>
      </nav>
      {/* brand rule */}
      <div className="h-0.5 w-full bg-[var(--c-brand)]" />

      {/* next-round info strip (F1-style) */}
   {nextEvent && (
        <div className="border-b bg-[var(--c-panel)] border-[color:var(--c-line)]">
          <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <Link
              to={`/events/${nextEvent.id}`}
              className="flex min-w-0 items-center gap-2.5 font-masifa text-[11px] font-light uppercase tracking-[0.08em]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-brand)]" />
              
              <span className="text-[color:var(--c-brand)]">
                Next Round
              </span>

              <span className="truncate text-[color:var(--c-ink)]">
                {nextEvent.title}
              </span>

              <span className="hidden text-[color:var(--c-muted)] sm:inline">
                · {nextEvent.city}
              </span>
            </Link>

            <span className="shrink-0 font-masifa text-[11px] font-light uppercase tracking-[0.08em] text-[color:var(--c-muted)] tabular-nums">
              {nextEvent.dateLabel}
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
