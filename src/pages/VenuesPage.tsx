import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { venues, venueIntro } from '@/data'
import type { Venue, VenueType } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/utils'

const filters: { value: VenueType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'racetrack', label: 'Racetracks' },
  { value: 'circuit', label: 'Circuits' },
  { value: 'arena', label: 'Arenas' },
  { value: 'festival-ground', label: 'Festival Grounds' },
]

/** SARGA Venues — the circuits, tracks and grounds that host the ecosystem. */
export function VenuesPage() {
  const [type, setType] = useState<VenueType | 'all'>('all')
  const featured = venues.find((v) => v.featured) ?? venues[0]

  const list = useMemo(
    () => (type === 'all' ? venues : venues.filter((v) => v.type === type)),
    [type],
  )

  return (
    <>
      {/* Header */}
      <header className="bg-night text-white">
        <div className="container-page py-12 sm:py-16">
          <nav className="byline mb-4 flex items-center gap-2 text-white/45">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Venues</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />{venueIntro.tagline}</span>
          <h1 className="font-mega text-5xl uppercase leading-none sm:text-7xl">SARGA Venues</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/60">{venueIntro.description}</p>
        </div>
      </header>

      {/* Quick stats */}
      <div className="border-b border-line bg-panel">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {venueIntro.stats.map((s) => (
            <div key={s.label} className="px-2 py-1 text-center sm:px-4">
              <p className="font-mega text-3xl leading-none text-race">{s.value}</p>
              <p className="byline mt-1 text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured venue */}
      <section className="container-page pt-12 sm:pt-16">
        <article className="group grid overflow-hidden rounded-md border border-line bg-night text-white lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto">
            <SmartImage src={featured.image} alt={featured.name} fallbackLabel={featured.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent lg:bg-gradient-to-r" />
            <span className="absolute left-4 top-4"><Badge tone="race">Flagship Venue</Badge></span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="byline text-race">{featured.typeLabel} · {featured.city}</p>
            <h2 className="mt-2 font-mega text-4xl uppercase leading-none sm:text-5xl">{featured.name}</h2>
            <p className="mt-3 max-w-md text-sm text-white/70">{featured.description}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <Spec label="Capacity" value={featured.capacity} />
              <Spec label="Track" value={featured.surface} />
              <Spec label="Hosts" value={featured.events} />
            </div>
          </div>
        </article>
      </section>

      {/* Directory */}
      <section className="container-page py-12 sm:py-16">
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto border-b border-line pb-5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setType(f.value)}
              className={cn(
                'shrink-0 rounded-sm border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] transition',
                type === f.value ? 'border-race bg-race text-white' : 'border-line text-ink-500 hover:border-ink hover:text-ink',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {list.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => <VenueCard key={v.id} v={v} />)}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-display text-xl font-bold uppercase text-ink">No venues in this category</p>
            <p className="mt-2 text-sm text-ink-500">Try another filter.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-panel">
        <div className="container-page flex flex-col items-center gap-5 py-14 text-center sm:py-20">
          <h2 className="font-mega text-4xl uppercase leading-none text-ink sm:text-5xl">Host with SARGA</h2>
          <p className="max-w-xl text-sm text-ink-500">Own a track, circuit or ground? Partner with SARGA to bring the ecosystem to your city.</p>
          <Button asChildHref="/sarga-tech" size="lg" rightIcon={<ArrowRight />}>Partner With Us</Button>
        </div>
      </section>
    </>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mega text-lg leading-none">{value}</p>
      <p className="byline mt-1 text-white/50">{label}</p>
    </div>
  )
}

function VenueCard({ v }: { v: Venue }) {
  return (
    <article className="group overflow-hidden rounded-md border border-line bg-paper transition hover:-translate-y-0.5 hover:border-race">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage src={v.image} alt={v.name} fallbackLabel={v.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
        <span className="absolute left-3 top-3"><Badge tone="dark">{v.typeLabel}</Badge></span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white">
          <div>
            <h3 className="font-mega text-2xl uppercase leading-none">{v.name}</h3>
            <p className="byline mt-1 text-white/70">📍 {v.city}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="line-clamp-2 text-sm text-ink-500">{v.description}</p>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
          <Meta label="Capacity" value={v.capacity} />
          <Meta label="Surface" value={v.surface} />
          <Meta label="Hosts" value={v.events} />
        </div>
      </div>
    </article>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-sm font-bold uppercase leading-tight text-ink">{value}</p>
      <p className="byline mt-0.5 text-ink-500">{label}</p>
    </div>
  )
}
