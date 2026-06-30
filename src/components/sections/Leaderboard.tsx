import { useMemo, useState } from 'react'
import { leaderboard } from '@/data'
import type { SportId } from '@/types'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'
import { Tabs } from '@/components/ui/Tabs'

const SEASON = 'season'

export function Leaderboard() {
  const [sport, setSport] = useState<SportId>(leaderboard[0].sport)
  const [eventId, setEventId] = useState<string>(SEASON)
  const tabs = useMemo(() => leaderboard.map((c) => ({ value: c.sport, label: c.label })), [])
  const category = leaderboard.find((c) => c.sport === sport) ?? leaderboard[0]

  const onSport = (s: SportId) => { setSport(s); setEventId(SEASON) }
  const selectedEvent = category.events.find((e) => e.id === eventId)
  const isSeason = !selectedEvent
  const drivers = selectedEvent ? selectedEvent.drivers : category.drivers
  const teams = selectedEvent ? selectedEvent.teams : category.teams
  const leader = Math.max(...drivers.map((d) => d.points), 1)

  return (
    <section id="leaderboard" className="bg-paper py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading kicker="Standings" title="Championship Standings" moreLabel="Full Table" moreHref="/leaderboard" />

        {/* Level 1 — sport */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-line">
          <Tabs options={tabs} value={sport} onChange={onSport} />
          <span className="byline pb-3">{isSeason ? category.round : `${selectedEvent!.round} · ${selectedEvent!.dateLabel}`}</span>
        </div>

        {/* Level 2 — event (sport → event) */}
        <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto">
          <EventChip active={isSeason} onClick={() => setEventId(SEASON)}>Season</EventChip>
          {category.events.map((ev) => (
            <EventChip key={ev.id} active={eventId === ev.id} onClick={() => setEventId(ev.id)}>
              <span className="text-race">{ev.round}</span> {ev.name}
            </EventChip>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Driver table */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-md border border-line bg-paper">
              {/* header row */}
              <div className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-line bg-ink px-4 py-2.5 text-white sm:grid-cols-[2.5rem_1fr_4rem_5rem]">
                <span className="byline text-white/60">Pos</span>
                <span className="byline text-white/60">Rider</span>
                <span className="byline hidden text-center text-white/60 sm:block">+/-</span>
                <span className="byline text-right text-white/60">Pts</span>
              </div>
              {drivers.map((d) => (
                <div
                  key={d.position}
                  className={cn(
                    'grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-line px-4 py-3 transition last:border-0 hover:bg-panel sm:grid-cols-[2.5rem_1fr_4rem_5rem]',
                    d.position === 1 && 'bg-race/[0.04]',
                  )}
                >
                  <span className={cn('font-mega text-2xl leading-none', d.position === 1 ? 'text-race' : 'text-ink')}>
                    {d.position}
                  </span>
                  <div className="flex min-w-0 items-center gap-3">
                    <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-line" />
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-bold uppercase leading-tight">{d.name}</p>
                      <p className="byline truncate text-ink-500">{d.team}</p>
                    </div>
                  </div>
                  <div className="hidden justify-center sm:flex">{isSeason ? <Trend value={d.trend} /> : <span className="font-display text-xs font-bold text-ink-300">—</span>}</div>
                  <div className="text-right">
                    <span className="font-mega text-xl tabular-nums">{d.points}</span>
                    {/* progress vs leader */}
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-line">
                      <div className="h-full bg-race" style={{ width: `${(d.points / leader) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team table + predict CTA */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-md border border-line bg-paper">
              <div className="border-b border-line bg-ink px-4 py-2.5">
                <span className="byline text-white/70">{isSeason ? 'Team Standings' : 'Team Result'}</span>
              </div>
              {teams.map((t) => (
                <div key={t.position} className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0">
                  <span className="w-5 font-mega text-lg leading-none text-ink-500">{t.position}</span>
                  <SmartImage src={t.image} alt={t.team} fallbackLabel={t.team} className="h-9 w-9 shrink-0 rounded-sm object-cover ring-1 ring-line" />
                  <p className="min-w-0 flex-1 truncate font-display text-sm font-bold uppercase">{t.team}</p>
                  <span className="font-mega text-lg tabular-nums">{t.points}</span>
                </div>
              ))}
            </div>

            {/* <div className="rounded-md border-l-4 border-race bg-ink p-5 text-white">
              <p className="font-display text-lg font-bold uppercase leading-tight">Call the next podium</p>
              <p className="mt-1.5 text-sm text-white/60">Predict the winner and climb the fan leaderboard.</p>
              <Button asChildHref="#play" size="sm" className="mt-4 w-full" rightIcon={<ArrowRight />}>Predict Now</Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

function EventChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-sm border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.06em] transition',
        active ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink-500 hover:border-ink hover:text-ink',
      )}
    >
      {children}
    </button>
  )
}

function Trend({ value }: { value: number }) {
  if (value === 0) return <span className="font-display text-xs font-bold text-ink-300">—</span>
  const up = value > 0
  return (
    <span className={cn('inline-flex items-center gap-0.5 font-display text-xs font-bold', up ? 'text-emerald-600' : 'text-race')}>
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn('h-3 w-3', !up && 'rotate-180')}><path d="M12 4l8 10h-5v6h-6v-6H4z" /></svg>
      {Math.abs(value)}
    </span>
  )
}
