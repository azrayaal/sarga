import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '@/data'
import type { SportId } from '@/types'
import { EventCard } from '@/components/ui/EventCard'
import { Tabs } from '@/components/ui/Tabs'
import { cn } from '@/lib/utils'

type Kind = 'upcoming' | 'past'

const sportFilters: { value: SportId | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'horse-racing', label: 'Horse Racing' },
  { value: 'rallycross', label: 'Rallycross' },
  { value: 'motorsport', label: 'Motorsport' },
  { value: 'championship', label: 'Championship' },
  { value: 'community', label: 'Community' },
]

export function EventsPage() {
  const [kind, setKind] = useState<Kind>('upcoming')
  const [sport, setSport] = useState<SportId | 'all'>('all')

  const list = useMemo(
    () => events.filter((e) => e.kind === kind && (sport === 'all' || e.sport === sport)),
    [kind, sport],
  )

  return (
    <>
      {/* Page header */}
      <header className="bg-night text-white">
        <div className="container-page py-12 sm:py-16">
          <nav className="byline mb-4 flex items-center gap-2 text-white/45">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Events</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />Race &amp; Events</span>
          <h1 className="font-mega text-5xl uppercase leading-none sm:text-7xl">Events Calendar</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/60">
            Every SARGA event in one place — register, get tickets and relive past highlights across
            the whole ecosystem.
          </p>
        </div>
      </header>

      <section className="container-page py-10 sm:py-14">
        {/* Controls */}
        <div className="flex flex-col gap-5 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            options={[{ value: 'upcoming', label: 'Upcoming' }, { value: 'past', label: 'Past Events' }] as const}
            value={kind}
            onChange={(v) => setKind(v as Kind)}
          />
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {sportFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSport(f.value)}
                className={cn(
                  'shrink-0 rounded-sm border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] transition',
                  sport === f.value ? 'border-race bg-race text-white' : 'border-line text-ink-500 hover:border-ink hover:text-ink',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {list.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="font-display text-xl font-bold uppercase text-ink">No events here yet</p>
            <p className="mt-2 text-sm text-ink-500">Try another category or check the other tab.</p>
          </div>
        )}
      </section>
    </>
  )
}
