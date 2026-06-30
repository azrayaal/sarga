import { Link } from 'react-router-dom'
import type { EventCard as EventCardType } from '@/types'
import { statusMeta, isUrgent } from '@/lib/eventStatus'
import { Badge } from './Badge'
import { ArrowRight } from './Button'
import { CountdownTimer } from './CountdownTimer'
import { SmartImage } from './SmartImage'

/** Reusable event card used on the Events listing and "related events" rails. */
export function EventCard({ event }: { event: EventCardType }) {
  const meta = statusMeta[event.status]
  return (
    <Link to={`/events/${event.id}`} className="group flex flex-col overflow-hidden rounded-md border border-line bg-paper transition hover:-translate-y-0.5 hover:border-race">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage src={event.banner} alt={event.title} fallbackLabel={event.sportLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
        <span className="absolute left-3 top-3"><Badge tone="race">{event.sportLabel}</Badge></span>
        <span className="absolute right-3 top-3"><Badge tone={meta.tone} pulse={isUrgent(event.status)}>{meta.label}</Badge></span>
        <span className="absolute bottom-3 left-3 rounded-sm bg-night/85 px-2 py-1 byline text-white">{event.dateLabel}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight transition group-hover:text-race">{event.title}</h3>
        <p className="byline mt-1.5 text-ink-500">📍 {event.venue}, {event.city}</p>

        {event.kind === 'upcoming' ? (
          <div className="mt-4"><CountdownTimer targetIso={event.date} size="sm" variant="bar" /></div>
        ) : (
          <p className="mt-4 byline text-ink-500">Completed</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <div className="flex items-baseline gap-1.5">
            {event.priceFrom ? (
              <>
                <span className="byline text-ink-500">From</span>
                <span className="font-mega text-lg text-race">{event.priceFrom}</span>
              </>
            ) : (
              <span className="byline text-ink-500">{event.kind === 'past' ? 'View results' : 'Details'}</span>
            )}
          </div>
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-sm border border-ink/15 text-ink transition group-hover:border-race group-hover:bg-race group-hover:text-white">
            <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  )
}
