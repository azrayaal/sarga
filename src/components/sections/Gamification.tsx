import { fanLeaderboard, gameModes, rewards } from '@/data'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ShareButtons } from '@/components/ui/ShareButtons'

/** Simple line icons keyed by game-mode id (no emoji slop). */
const icons: Record<string, JSX.Element> = {
  predict: <path d="M3 17l6-6 4 4 8-8M21 7v5M21 7h-5" />,
  trivia: <path d="M9.1 9a3 3 0 1 1 4.6 3c-.8.6-1.7 1.2-1.7 2.5M12 18h.01" />,
  weekly: <path d="M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />,
  referral: <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM3 21v-2a4 4 0 0 1 4-4h4M17 14l2 2 4-4" />,
}

export function Gamification() {
  return (
    <section id="play" className="bg-panel py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading kicker="Play & Win" title="Don’t Just Watch. Play." />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Game modes */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {gameModes.map((g) => (
                <div
                  key={g.id}
                  className={cn(
                    'flex flex-col rounded-md border bg-paper p-5 transition hover:-translate-y-0.5',
                    g.highlight ? 'border-race' : 'border-line',
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className={cn('grid h-11 w-11 place-items-center rounded-sm', g.highlight ? 'bg-race text-white' : 'bg-ink text-white')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">{icons[g.id]}</svg>
                    </span>
                    {g.highlight && <Badge tone="race" pulse>Hot</Badge>}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight">{g.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-500">{g.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="byline text-race">{g.reward}</span>
                    <Button size="sm" variant={g.highlight ? 'primary' : 'outline'} asChildHref="#play" rightIcon={<ArrowRight />}>{g.cta}</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
              {rewards.map((r) => (
                <div key={r.label} className="bg-paper p-4 text-center">
                  <p className="font-display text-sm font-bold uppercase">{r.label}</p>
                  <p className="mt-1 text-xs text-ink-500">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fan leaderboard */}
          <div className="flex flex-col rounded-md border border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-2.5 text-white">
              <span className="byline text-white/70">Fan Leaderboard</span>
              <Badge tone="race" pulse>This week</Badge>
            </div>
            <ul>
              {fanLeaderboard.map((f) => (
                <li key={f.position} className={cn('flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0', f.position === 1 && 'bg-race/[0.04]')}>
                  <span className={cn('w-6 font-mega text-lg leading-none', f.position === 1 ? 'text-race' : 'text-ink-300')}>{f.position}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold uppercase">{f.handle}</p>
                    <p className="byline text-race">{f.badge}</p>
                  </div>
                  <span className="font-mega text-base tabular-nums">{f.points.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-line p-4">
              <Button asChildHref="#events" size="sm" className="w-full" rightIcon={<ArrowRight />}>Join &amp; Play</Button>
              <div className="mt-4"><ShareButtons label="Invite" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
