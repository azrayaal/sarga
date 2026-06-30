import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { events } from '@/data'
import { useCountdown } from '@/hooks/useCountdown'
import { partners } from '@/data'
import { SmartImage } from '../ui/SmartImage'
import { asset } from '@/lib/utils'

const pad = (n: number) => n.toString().padStart(2, '0')

/**
 * MotoGP-style fixed event bar: next event + dates on the left, presenting
 * sponsor in the center, live countdown on the right.
 */
export function EventBar() {
  const next = useMemo(() => {
    const now = Date.now()
    const upcoming = [...events]
      .filter((e) => new Date(e.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return upcoming[0] ?? events[0]
  }, [])

  const t = useCountdown(next.date)
  const sponsor = partners[0]

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-night text-white">
      <div className="container-page flex h-11 items-center justify-between gap-4">
        {/* Next event */}
        <Link to={`/events/${next.id}`} className="flex min-w-0 items-center gap-2.5">
           <SmartImage src={asset('logos/sarga-mark.png')} alt="SARGA" fallbackLabel="S" className="h-4 w-auto lg:h-5" />
          <span className="truncate font-display text-xs font-bold uppercase tracking-[0.12em]">
            {next.title}
          </span>
          <span className="hidden font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/45 md:inline">
            {next.dateLabel} · {next.city}
          </span>
        </Link>

        {/* Presenting sponsor */}
        <span className="hidden items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 lg:flex">
          Presented by
          <span className="text-white/80">{sponsor?.name ?? 'SARGA'}</span>
        </span>

        {/* Countdown */}
        <div className="flex shrink-0 items-center gap-2.5">
          {[
            { v: t.days, l: 'Days' },
            { v: t.hours, l: 'Hrs' },
            { v: t.minutes, l: 'Min' },
            { v: t.seconds, l: 'Sec' },
          ].map((u) => (
            <div key={u.l} className="flex items-baseline gap-1">
              <span className="font-mega text-base leading-none tabular-nums">{pad(u.v)}</span>
              <span className="font-display text-[9px] font-bold uppercase tracking-widest text-white/45">{u.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
