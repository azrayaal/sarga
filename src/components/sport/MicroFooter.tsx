import { Link } from 'react-router-dom'
import type { SportTheme } from '@/data'
import { NEWS_SITE_URL } from '@/data'
import type { Sport } from '@/types'
import { SportIcon } from '@/components/ui/SportIcon'
import { Arrow, BrandMark, ExtArrow, NAV_LINKS } from './primitives'

/** Themed footer: gradient CTA band, brand block, this-site links and a rail
 *  back into the wider SARGA ecosystem / other sports. */
export function MicroFooter({ theme, sport, otherSports }: { theme: SportTheme; sport: Sport; otherSports: Sport[] }) {
  return (
    <footer className="bg-[var(--c-bg)]">
      {/* CTA band */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-90" style={{ backgroundImage: 'var(--c-grad)' }} />
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-5 px-4 py-14 text-center text-[color:var(--c-on)] sm:px-6 lg:px-8">
          <h2 className="font-mega text-4xl uppercase leading-[0.95] sm:text-5xl">Don’t miss the next {sport.name.split(' ')[0]} event</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/events" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--c-bg)] px-7  text-sm font-bold uppercase tracking-[0.12em] text-[color:var(--c-ink)] transition hover:brightness-95">
              Browse Events
            </Link>
            <a href={NEWS_SITE_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-xl border border-current px-7  text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/10">
              Read the News <ExtArrow />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--c-line)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <BrandMark sport={sport} />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
            <Link to="/" className="mt-5 inline-flex items-center gap-1.5  text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-brand)]">
              <Arrow className="h-3.5 w-3.5 rotate-180" /> Back to the SARGA ecosystem
            </Link>
          </div>

          <div className="lg:col-span-3">
            <p className=" text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-muted)]">This Site</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className=" text-sm uppercase tracking-[0.06em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className=" text-[11px] uppercase tracking-[0.18em] text-[color:var(--c-muted)]">Other SARGA Sports</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherSports.map((s) => (
                <Link
                  key={s.id}
                  to={`/sports/${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5  text-[11px] font-bold uppercase tracking-[0.1em] text-[color:var(--c-ink)] transition hover:border-[color:var(--c-brand)] hover:text-[color:var(--c-brand)] border-[color:var(--c-line)]"
                >
                  <SportIcon sport={s.id} className="h-4 w-4" />
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[color:var(--c-line)]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
            <p className=" text-[11px]  uppercase tracking-[0.14em] text-[color:var(--c-muted)]">© 2026 SARGA · {theme.brand}</p>
            <p className=" text-[11px]  uppercase tracking-[0.14em] text-[color:var(--c-muted)]">{theme.domain}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
