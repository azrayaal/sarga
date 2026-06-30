import { Link } from 'react-router-dom'
import { upcomingEvents } from '@/data'
import type { EventCard as EventCardType } from '@/types'
import { statusMeta, isUrgent } from '@/lib/eventStatus'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { SmartImage } from '@/components/ui/SmartImage'


export function UpcomingEvents() {
  const [feature, ...rest] = upcomingEvents

  return (
    <section id="events" className="bg-panel py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading kicker="Don’t miss out" title="Upcoming Events" moreLabel="Full Calendar" moreHref="/events" />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Featured */}
          <article className="group lg:col-span-7">
            <Link to={`/events/${feature.id}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                <SmartImage src={feature.banner} alt={feature.title} fallbackLabel={feature.sportLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge tone="race">{feature.sportLabel}</Badge>
                  <Badge tone={statusMeta[feature.status].tone} pulse={isUrgent(feature.status)}>{statusMeta[feature.status].label}</Badge>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="byline text-white/70">{feature.dateLabel} · {feature.venue}, {feature.city}</p>
                  <h3 className="mt-1.5 font-mega text-3xl uppercase leading-none text-white sm:text-5xl">{feature.title}</h3>
                  <div className="mt-5">
                    <CountdownTimer targetIso={feature.date} size="md" variant="bar" tone="dark" />
                  </div>
                </div>
              </div>
            </Link>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-md border border-line p-4">
              <div className="flex items-baseline gap-2">
                <span className="byline text-ink-500">From</span>
                <span className="font-mega text-2xl text-race">{feature.priceFrom}</span>
                {feature.spotsLabel && <span className="byline text-ink-500">· {feature.spotsLabel}</span>}
              </div>
              <div className="flex items-center gap-4">
                <ShareButtons label="" />
                <Button asChildHref={`/events/${feature.id}`} size="md" rightIcon={<ArrowRight />}>{feature.cta}</Button>
              </div>
            </div>
          </article>

          {/* List of next events */}
          <div className="divide-y divide-line lg:col-span-5">
            {rest.slice(0, 5).map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EventRow({ event }: { event: EventCardType }) {
  const meta = statusMeta[event.status]
  return (
    <Link to={`/events/${event.id}`} className="group flex items-center gap-4 py-4 first:pt-0">
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-36">
        <SmartImage src={event.banner} alt={event.title} fallbackLabel={event.sportLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-1 top-1"><Badge tone="race">{event.sportLabel}</Badge></span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="byline text-ink-500">{event.dateLabel} · {event.city}</p>
        <h4 className="mt-0.5 line-clamp-2 font-display text-base font-bold uppercase leading-tight transition group-hover:text-race">{event.title}</h4>
        <div className="mt-1.5 flex items-center gap-3">
          <Badge tone={meta.tone} pulse={isUrgent(event.status)}>{meta.label}</Badge>
          {event.priceFrom && <span className="byline text-ink"><span className="text-ink-500">from</span> <span className="text-race">{event.priceFrom}</span></span>}
        </div>
      </div>
      <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-ink/15 text-ink transition group-hover:border-race group-hover:bg-race group-hover:text-white">
        <ArrowRight />
      </span>
    </Link>
  )
}
