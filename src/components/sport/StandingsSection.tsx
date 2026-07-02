import { Link } from 'react-router-dom'
import type { Sport, SportStandings } from '@/types'
import { SmartImage } from '@/components/ui/SmartImage'
import { Arrow, GradText, SectionHead } from './primitives'

/** Top-5 standings preview for the sport, linking to the full leaderboard. */
export function StandingsSection({ sport, standings }: { sport: Sport; standings: SportStandings }) {
  return (
    <section className="border-y border-[color:var(--c-line)] bg-[var(--c-panel)]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="Standings" title={`${sport.name} Leaders`} />
          <Link to={`/leaderboard?sport=${sport.id}`} className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
            Full Table <Arrow />
          </Link>
        </div>
        <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border bg-[var(--c-bg)] border-[color:var(--c-line)]">
          {standings.drivers.slice(0, 5).map((d) => (
            <div key={d.position} className="flex items-center gap-4 border-b px-4 py-3.5 last:border-0 border-[color:var(--c-line)]">
              <span className="w-6 text-center font-mega text-2xl leading-none">{d.position === 1 ? <GradText>{d.position}</GradText> : d.position}</span>
              <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[color:var(--c-line)]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold uppercase leading-tight">{d.name}</p>
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--c-muted)]">{d.team}</p>
              </div>
              <span className="font-mega text-xl tabular-nums">{d.points}<span className="ml-1 text-xs text-[color:var(--c-muted)]">pts</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
