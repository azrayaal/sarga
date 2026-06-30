import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { standings } from '@/data'
import type { DriverStanding, EventStanding, SportStandings, SportId, TeamStanding } from '@/types'
import { cn } from '@/lib/utils'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'
import { Tabs } from '@/components/ui/Tabs'

type View = 'riders' | 'teams'
const SEASON = 'season' // sentinel for the "Season Standings" event option

export function LeaderboardPage() {
  const [params, setParams] = useSearchParams()
  const sportParam = params.get('sport') as SportId | null
  const initialSport = standings.some((s) => s.sport === sportParam) ? (sportParam as SportId) : standings[0].sport

  const [sport, setSport] = useState<SportId>(initialSport)
  const [eventId, setEventId] = useState<string>(SEASON)
  const [view, setView] = useState<View>('riders')
  const [season, setSeason] = useState('2026')

  // Keep ?sport= in sync and reset the event level when the sport changes.
  useEffect(() => {
    setEventId(SEASON)
    setParams((p) => {
      p.set('sport', sport)
      return p
    }, { replace: true })
  }, [sport, setParams])

  const classTabs = useMemo(() => standings.map((c) => ({ value: c.sport, label: c.label })), [])
  const category = standings.find((c) => c.sport === sport) ?? standings[0]
  const selectedEvent = category.events.find((e) => e.id === eventId)

  return (
    <>
      {/* Header */}
      <header className="bg-night text-white">
        <div className="container-page py-12 sm:py-16">
          <nav className="byline mb-4 flex items-center gap-2 text-white/45">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">World Standing</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />Championship</span>
              <h1 className="font-mega text-5xl uppercase leading-none sm:text-7xl">World Standing</h1>
            </div>
            <div className="flex items-center gap-2">
              {['2026', '2025'].map((y) => (
                <button
                  key={y}
                  onClick={() => setSeason(y)}
                  className={cn('rounded-sm border px-4 py-2 font-mega text-lg leading-none transition', season === y ? 'border-race bg-race text-white' : 'border-white/20 text-white/60 hover:text-white')}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Level 1 — sport (cabang olahraga) */}
          <div className="mt-8 border-b border-white/15">
            <Tabs options={classTabs} value={sport} onChange={setSport} dark />
          </div>
        </div>
      </header>

      {season === '2025' && (
        <div className="border-b border-line bg-amber-50">
          <div className="container-page py-2.5"><p className="byline text-amber-700">Showing archived final standings · Season 2025 (demo data mirrors 2026)</p></div>
        </div>
      )}

      {/* Level 2 — event (sport → event) */}
      <div className="sticky top-[6.75rem] z-20 border-b border-line bg-paper/95 backdrop-blur">
        <div className="container-page flex items-center gap-3 overflow-x-auto py-3">
          <span className="byline shrink-0 text-ink-500">{category.label} ·</span>
          <EventChip active={eventId === SEASON} onClick={() => setEventId(SEASON)}>Season Standings</EventChip>
          {category.events.map((ev) => (
            <EventChip key={ev.id} active={eventId === ev.id} onClick={() => setEventId(ev.id)}>
              <span className="text-race">{ev.round}</span> {ev.name}
            </EventChip>
          ))}
        </div>
      </div>

      <section className="container-page py-10 sm:py-14">
        {selectedEvent ? (
          <EventResult event={selectedEvent} category={category} />
        ) : (
          <SeasonStandings category={category} view={view} setView={setView} />
        )}
      </section>
    </>
  )
}

function EventChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-sm border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.06em] transition',
        active ? 'border-ink bg-ink text-white' : 'border-line text-ink-500 hover:border-ink hover:text-ink',
      )}
    >
      {children}
    </button>
  )
}

/* ---------- Season (aggregate) view ---------- */

function SeasonStandings({ category, view, setView }: { category: SportStandings; view: View; setView: (v: View) => void }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="byline text-ink-500">{category.round}</p>
        <div className="inline-flex rounded-sm border border-line p-1">
          {(['riders', 'teams'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={cn('rounded-sm px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.1em] transition', view === v ? 'bg-ink text-white' : 'text-ink-500 hover:text-ink')}>{v}</button>
          ))}
        </div>
      </div>
      {view === 'riders' ? <RiderTable category={category} /> : <TeamTable teams={category.teams} />}
    </>
  )
}

function Podium({ drivers }: { drivers: DriverStanding[] }) {
  const top3 = drivers.slice(0, 3)
  const order = [1, 0, 2]
  return (
    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
      {order.map((idx) => {
        const d = top3[idx]
        if (!d) return <div key={idx} />
        const first = d.position === 1
        return (
          <div key={d.position} className={cn('flex flex-col items-center rounded-md border bg-paper p-4 text-center', first ? 'border-race sm:-mt-4' : 'border-line sm:mt-4')}>
            <span className={cn('font-mega leading-none', first ? 'text-4xl text-race sm:text-5xl' : 'text-3xl text-ink-300')}>{d.position}</span>
            <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className={cn('mt-3 rounded-full object-cover ring-2', first ? 'h-20 w-20 ring-race' : 'h-16 w-16 ring-line')} />
            <p className="mt-3 font-display text-sm font-bold uppercase leading-tight">{d.name}</p>
            <p className="byline text-ink-500">{d.team}</p>
            <p className={cn('mt-2 font-mega', first ? 'text-3xl text-race' : 'text-2xl')}>{d.points}<span className="ml-1 text-xs text-ink-500">pts</span></p>
          </div>
        )
      })}
    </div>
  )
}

function RiderTable({ category }: { category: SportStandings }) {
  const rounds = category.rounds ?? []
  return (
    <>
      <Podium drivers={category.drivers} />
      <div className="mt-8 overflow-x-auto rounded-md border border-line">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-ink text-white">
            <tr className="byline">
              <th className="px-3 py-3 font-bold">Pos</th>
              <th className="px-3 py-3 font-bold">Rider</th>
              <th className="px-2 py-3 text-center font-bold">Nat</th>
              {rounds.map((r) => <th key={r} className="px-2 py-3 text-center font-bold text-white/60">{r}</th>)}
              <th className="px-2 py-3 text-center font-bold" title="Wins">W</th>
              <th className="px-2 py-3 text-center font-bold" title="Poles">P</th>
              <th className="px-3 py-3 text-right font-bold">Points</th>
            </tr>
          </thead>
          <tbody>
            {category.drivers.map((d) => (
              <tr key={d.position} className={cn('border-t border-line transition hover:bg-panel', d.position === 1 && 'bg-race/[0.04]')}>
                <td className="px-3 py-3"><span className={cn('font-mega text-xl leading-none', d.position === 1 ? 'text-race' : 'text-ink')}>{d.position}</span></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-line" />
                    <div className="min-w-0"><p className="truncate font-display text-sm font-bold uppercase leading-tight">{d.name}</p><p className="byline truncate text-ink-500">{d.team}</p></div>
                  </div>
                </td>
                <td className="px-2 py-3 text-center byline text-ink-500">{d.nationality}</td>
                {(d.pointsByRound ?? []).map((p, i) => <td key={i} className={cn('px-2 py-3 text-center tabular-nums', p === 25 ? 'font-bold text-race' : 'text-ink-700')}>{p}</td>)}
                <td className="px-2 py-3 text-center tabular-nums font-semibold">{d.wins ?? 0}</td>
                <td className="px-2 py-3 text-center tabular-nums text-ink-700">{d.poles ?? 0}</td>
                <td className="px-3 py-3 text-right"><span className="font-mega text-xl tabular-nums">{d.points}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="byline mt-3 text-ink-500">W = wins · P = poles · per-round columns show points scored. Bold = race win (25 pts).</p>
    </>
  )
}

function TeamTable({ teams }: { teams: TeamStanding[] }) {
  const leader = Math.max(...teams.map((t) => t.points))
  return (
    <div className="mt-8 overflow-hidden rounded-md border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink text-white">
          <tr className="byline">
            <th className="px-4 py-3 font-bold">Pos</th>
            <th className="px-4 py-3 font-bold">Team</th>
            <th className="px-3 py-3 text-center font-bold">Wins</th>
            <th className="px-3 py-3 text-center font-bold">Podiums</th>
            <th className="px-4 py-3 text-right font-bold">Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t.position} className={cn('border-t border-line hover:bg-panel', t.position === 1 && 'bg-race/[0.04]')}>
              <td className="px-4 py-3"><span className={cn('font-mega text-xl leading-none', t.position === 1 ? 'text-race' : 'text-ink')}>{t.position}</span></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <SmartImage src={t.image} alt={t.team} fallbackLabel={t.team} className="h-9 w-9 shrink-0 rounded-sm object-cover ring-1 ring-line" />
                  <div className="min-w-0"><p className="truncate font-display text-sm font-bold uppercase">{t.team}</p>
                    <div className="mt-1 h-1 w-28 overflow-hidden rounded-full bg-line"><div className="h-full bg-race" style={{ width: `${(t.points / leader) * 100}%` }} /></div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 text-center tabular-nums font-semibold">{t.wins ?? 0}</td>
              <td className="px-3 py-3 text-center tabular-nums text-ink-700">{t.podiums ?? 0}</td>
              <td className="px-4 py-3 text-right"><span className="font-mega text-xl tabular-nums">{t.points}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- Single-event result view ---------- */

function EventResult({ event, category }: { event: EventStanding; category: SportStandings }) {
  const winnerPts = event.drivers[0]?.points ?? 0
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-line bg-panel p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-sm bg-ink text-white"><SportIcon sport={category.sport} /></span>
          <div>
            <p className="byline text-race">{category.label} · {event.round}</p>
            <h2 className="font-display text-2xl font-extrabold uppercase leading-none">{event.name}</h2>
            <p className="byline mt-1 text-ink-500">{event.dateLabel} · {event.venue}</p>
          </div>
        </div>
        <Link to="/events" className="view-more">Event details →</Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-md border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-ink text-white">
            <tr className="byline">
              <th className="px-4 py-3 font-bold">Pos</th>
              <th className="px-4 py-3 font-bold">Rider</th>
              <th className="px-3 py-3 text-center font-bold">Nat</th>
              <th className="px-3 py-3 text-right font-bold">Gap</th>
              <th className="px-4 py-3 text-right font-bold">Points</th>
            </tr>
          </thead>
          <tbody>
            {event.drivers.map((d) => (
              <tr key={d.position} className={cn('border-t border-line hover:bg-panel', d.position === 1 && 'bg-race/[0.04]')}>
                <td className="px-4 py-3"><span className={cn('font-mega text-xl leading-none', d.position === 1 ? 'text-race' : 'text-ink')}>{d.position}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-line" />
                    <div className="min-w-0"><p className="truncate font-display text-sm font-bold uppercase leading-tight">{d.name}</p><p className="byline truncate text-ink-500">{d.team}</p></div>
                  </div>
                </td>
                <td className="px-3 py-3 text-center byline text-ink-500">{d.nationality}</td>
                <td className="px-3 py-3 text-right tabular-nums text-ink-500">{d.position === 1 ? '—' : `-${winnerPts - d.points}`}</td>
                <td className="px-4 py-3 text-right"><span className="font-mega text-xl tabular-nums">{d.points}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="byline mt-3 text-ink-500">Result for {event.name}. Points contribute to the {category.label} season standings.</p>
    </>
  )
}
