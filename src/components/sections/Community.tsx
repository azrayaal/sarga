import { useState } from 'react'
import { communityChannels, ecosystemStats } from '@/data'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Community() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setDone(true) // dummy — wire to newsletter API later
  }

  return (
    <section id="community" className="bg-night py-14 text-white sm:py-20">
      <div className="container-page">
        {/* Ecosystem stat band */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/10 lg:grid-cols-4">
          {ecosystemStats.map((s) => (
            <div key={s.label} className="bg-night px-5 py-7 text-center">
              <p className="font-mega text-3xl leading-none text-white sm:text-4xl">{s.value}</p>
              <p className="byline mt-2 text-white/45">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Join community */}
          <div>
            <SectionHeading kicker="Community" title="Join The Movement" dark />
            <p className="mt-4 max-w-md text-sm text-white/60">
              Be where the fans are. Live race chat, exclusive drops, early registration and
              meet-ups across the SARGA ecosystem.
            </p>
            <div className="mt-6 space-y-2.5">
              {communityChannels.map((c) => (
                <a key={c.label} href={c.href} className="group flex items-center justify-between rounded-md border border-white/12 bg-night-800 px-5 py-4 transition hover:border-race">
                  <div>
                    <p className="font-display text-base font-bold uppercase">{c.label}</p>
                    <p className="byline text-white/45">{c.detail}</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-race"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter (Sport-News style) */}
          <div className="rounded-md border border-white/12 bg-night-800 p-7 sm:p-9">
            <p className="kicker"><span className="h-3 w-1 bg-race" />Newsletter</p>
            <h3 className="mt-2 font-mega text-3xl uppercase leading-[0.95] sm:text-4xl">
              Never Miss<br /><span className="text-ink-300">A Lights-Out</span>
            </h3>
            <p className="mt-3 text-sm text-white/60">Event drops, ticket alerts and exclusive SARGA content, straight to your inbox.</p>

            {done ? (
              <div className="mt-6 rounded-md border border-emerald-500/40 bg-emerald-500/10 p-5">
                <p className="font-display text-lg font-bold uppercase text-emerald-400">You’re in.</p>
                <p className="mt-1 text-sm text-white/60">Watch your inbox for the next big event.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 flex items-center gap-0 rounded-md border border-white/20 bg-night p-1.5 focus-within:border-race">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-10 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                <Button type="submit" size="sm" className="shrink-0">Subscribe</Button>
              </form>
            )}
            <p className="byline mt-4 text-white/35">Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
