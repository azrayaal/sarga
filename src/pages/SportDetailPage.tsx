import { Link, useParams } from 'react-router-dom'
import { getSport, sports, sportGalleries, events, getStandings } from '@/data'
import { Button, ArrowRight } from '@/components/ui/Button'
import { EventCard } from '@/components/ui/EventCard'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'
import { NotFoundPage } from './NotFoundPage'

export function SportDetailPage() {
  const { id } = useParams()
  const sport = id ? getSport(id) : undefined
  if (!sport) return <NotFoundPage />

  const sportEvents = events.filter((e) => e.sport === sport.id)
  const upcoming = sportEvents.filter((e) => e.kind === 'upcoming')
  const past = sportEvents.filter((e) => e.kind === 'past')
  const standings = getStandings(sport.id)
  const gallery = sportGalleries[sport.id] ?? []
  const others = sports.filter((s) => s.id !== sport.id)

  return (
    <>
      {/* Hero */}
      <header className="relative bg-night text-white">
        <div className="absolute inset-0">
          <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/40" />
        </div>
        <div className="container-page relative py-14 sm:py-20">
          <nav className="byline mb-5 flex items-center gap-2 text-white/55">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <Link to="/sports" className="transition hover:text-white">Sports</Link><span>/</span>
            <span className="text-white">{sport.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-sm bg-race text-white"><SportIcon sport={sport.id} /></span>
            <p className="byline text-race">{sport.tagline}</p>
          </div>
          <h1 className="mt-3 font-mega text-5xl uppercase leading-[0.92] sm:text-7xl">{sport.name}</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">{sport.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChildHref="#sport-events" size="lg" rightIcon={<ArrowRight />}>View Events</Button>
            {standings && <Button asChildHref={`/leaderboard?sport=${sport.id}`} variant="outline-light" size="lg">View Standings</Button>}
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <div className="border-b border-line bg-panel">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          <Fact label="Headline stat" value={`${sport.stat.value}`} sub={sport.stat.label} />
          <Fact label="Upcoming" value={`${upcoming.length}`} sub="events" />
          <Fact label="Past" value={`${past.length}`} sub="events" />
          <Fact label="Riders" value={standings ? `${standings.drivers.length}` : '—'} sub="ranked" />
        </div>
      </div>

      {/* Events in this category */}
      <section id="sport-events" className="container-page py-12 sm:py-16">
        <div className="flex items-end justify-between border-b-2 border-ink/10 pb-4">
          <div>
            <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />In this category</span>
            <h2 className="h-section">{sport.name} Events</h2>
          </div>
          <Link to="/events" className="view-more">All Events <ArrowRight /></Link>
        </div>

        {sportEvents.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...upcoming, ...past].map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <p className="mt-8 text-sm text-ink-500">No events scheduled in this category yet — check back soon.</p>
        )}
      </section>

      {/* Standings preview */}
      {standings && (
        <section className="bg-panel py-12 sm:py-16">
          <div className="container-page">
            <div className="flex items-end justify-between border-b-2 border-ink/10 pb-4">
              <div>
                <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />Standings</span>
                <h2 className="h-section">{sport.name} Leaders</h2>
              </div>
              <Link to={`/leaderboard?sport=${sport.id}`} className="view-more">Full Table <ArrowRight /></Link>
            </div>
            <div className="mt-8 overflow-hidden rounded-md border border-line bg-paper">
              {standings.drivers.slice(0, 5).map((d) => (
                <div key={d.position} className="flex items-center gap-4 border-b border-line px-4 py-3 last:border-0">
                  <span className={`font-mega text-2xl leading-none ${d.position === 1 ? 'text-race' : 'text-ink'}`}>{d.position}</span>
                  <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-line" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base font-bold uppercase leading-tight">{d.name}</p>
                    <p className="byline truncate text-ink-500">{d.team}</p>
                  </div>
                  <span className="font-mega text-xl tabular-nums">{d.points}<span className="ml-1 text-xs text-ink-500">pts</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="container-page py-12 sm:py-16">
          <div className="flex items-end justify-between border-b-2 border-ink/10 pb-4">
            <h2 className="h-section">Gallery</h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-md">
                <SmartImage src={src} alt={`${sport.name} ${i + 1}`} className="aspect-[4/3] w-full transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other sports */}
      <section className="bg-night py-12 text-white sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between border-b-2 border-white/15 pb-4">
            <h2 className="h-section text-white">Other Sports</h2>
            <Link to="/sports" className="view-more text-white hover:text-race">All Sports <ArrowRight /></Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {others.map((s) => (
              <Link key={s.id} to={`/sports/${s.id}`} className="group relative overflow-hidden rounded-md">
                <div className="aspect-[4/3]">
                  <SmartImage src={s.image} alt={s.name} fallbackLabel={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                  <SportIcon sport={s.id} className="h-5 w-5 text-race" />
                  <span className="font-display text-sm font-bold uppercase leading-tight">{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Fact({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-2 py-1 text-center sm:px-4">
      <p className="byline text-ink-500">{label}</p>
      <p className="mt-1 font-mega text-2xl leading-none">{value}</p>
      <p className="byline mt-0.5 text-ink-500">{sub}</p>
    </div>
  )
}
