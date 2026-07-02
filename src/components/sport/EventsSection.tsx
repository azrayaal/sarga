import { Link } from 'react-router-dom'
import type { EventDetail, Sport } from '@/types'
import { statusMeta } from '@/lib/eventStatus'
import { SmartImage } from '@/components/ui/SmartImage'
import { Arrow, BrandTag, SectionHead } from './primitives'

/** Events in this sport's category, rendered as flat F1-style cards. */
export function EventsSection({ sport, sportEvents }: { sport: Sport; sportEvents: EventDetail[] }) {
  return (
    <section id="events" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="What's On" title={`${sport.name} Events`} />
          <Link to="/events" className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
            All Events <Arrow />
          </Link>
        </div>

        {sportEvents.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sportEvents.map((e) => <MicroEventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <p className="mt-10 text-sm text-[color:var(--c-muted)]">No events scheduled yet — check back soon.</p>
        )}
      </div>
    </section>
  )
}

function MicroEventCard({ event }: { event: EventDetail }) {
  const meta = statusMeta[event.status]
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-[var(--c-panel)] transition-colors border-[color:var(--c-line)] hover:border-[color:var(--c-brand)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage src={event.banner} alt={event.title} fallbackLabel={event.sportLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-3 top-3"><BrandTag>{event.sportLabel}</BrandTag></span>
        <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white">{event.dateLabel}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight transition group-hover:text-[color:var(--c-brand)]">{event.title}</h3>
        <p className="mt-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--c-muted)]">{event.venue}, {event.city}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4 border-[color:var(--c-line)]">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--c-brand)]">{meta.label}</span>
          <Arrow className="text-[color:var(--c-muted)] transition-colors group-hover:text-[color:var(--c-brand)]" />
        </div>
      </div>
    </Link>
  )
}
