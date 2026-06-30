import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEvent, events, eventRewards, referralRewardPoints } from '@/data'
import type { EventDetail, TicketType } from '@/types'
import { statusMeta, isUrgent } from '@/lib/eventStatus'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { EventCard } from '@/components/ui/EventCard'
import { SmartImage } from '@/components/ui/SmartImage'
import { NotFoundPage } from './NotFoundPage'

export function EventDetailPage() {
  const { id } = useParams()
  const event = id ? getEvent(id) : undefined
  if (!event) return <NotFoundPage />

  const meta = statusMeta[event.status]
  const related = events.filter((e) => e.id !== event.id && e.sport === event.sport).slice(0, 3)
  const isPast = event.kind === 'past'

  return (
    <>
      {/* Hero banner */}
      <header className="relative bg-night text-white">
        <div className="absolute inset-0">
          <SmartImage src={event.banner} alt={event.title} fallbackLabel={event.sportLabel} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/40" />
        </div>
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <nav className="byline mb-5 flex items-center gap-2 text-white/55">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <Link to="/events" className="transition hover:text-white">Events</Link><span>/</span>
            <span className="text-white">{event.sportLabel}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="race">{event.sportLabel}</Badge>
            <Badge tone={meta.tone} pulse={isUrgent(event.status)}>{meta.label}</Badge>
          </div>
          <h1 className="mt-3 max-w-4xl font-mega text-4xl uppercase leading-[0.92] sm:text-6xl lg:text-7xl">{event.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white/70">
            <span>📅 {event.dateLabel}</span>
            <span>📍 {event.venue}, {event.city}</span>
            <span>🚪 Gates {event.gatesOpen}</span>
          </p>

          {!isPast && (
            <div className="mt-7">
              <p className="byline mb-2 text-white/50">Lights out in</p>
              <CountdownTimer targetIso={event.date} size="lg" variant="bar" tone="dark" />
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChildHref="#register" size="lg" rightIcon={<ArrowRight />}>
              {isPast ? 'View Results' : 'Register Now'}
            </Button>
            {!isPast && <Button asChildHref="#tickets" variant="outline-light" size="lg">Get Tickets</Button>}
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <div className="border-b border-line bg-panel">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          <Fact label={isPast ? 'Date' : 'Race Day'} value={event.dateLabel} />
          <Fact label="Venue" value={event.venue} />
          <Fact label="City" value={event.city} />
          <Fact label={isPast ? 'Attendance' : 'From'} value={isPast ? (event.attendance ?? '—') : (event.priceFrom ?? '—')} />
        </div>
      </div>

      {/* Main body */}
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
        {/* Left column */}
        <div className="min-w-0 space-y-12">
          <Overview event={event} />
          <Schedule event={event} />
          {isPast && event.results && <Results event={event} />}
          <Gallery event={event} />
          <Faqs event={event} />
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          {!isPast && <Tickets event={event} />}
          <ReferralWidget eventTitle={event.title} />
        </aside>
      </div>

      {/* Registration */}
      {!isPast && (
        <section id="register" className="bg-night py-14 text-white sm:py-20">
          <div className="container-page">
            <RegistrationForm event={event} />
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="container-page py-14 sm:py-16">
          <div className="flex items-end justify-between border-b-2 border-ink/10 pb-4">
            <h2 className="h-section">More {event.sportLabel}</h2>
            <Link to="/events" className="view-more">All Events <ArrowRight /></Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
      )}
    </>
  )
}

/* ---------- pieces ---------- */

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-1 text-center sm:px-4">
      <p className="byline text-ink-500">{label}</p>
      <p className="mt-1 font-display text-base font-bold uppercase leading-tight">{value}</p>
    </div>
  )
}

function Block({ kicker, title, children }: { kicker?: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      {kicker && <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />{kicker}</span>}
      <h2 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Overview({ event }: { event: EventDetail }) {
  return (
    <Block kicker="About" title="Event Overview">
      <div className="space-y-4 text-[15px] leading-relaxed text-ink-700">
        {event.overview.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {event.highlights.map((h) => (
          <span key={h} className="rounded-sm border border-line bg-panel px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.06em] text-ink-700">
            {h}
          </span>
        ))}
      </div>
    </Block>
  )
}

function Schedule({ event }: { event: EventDetail }) {
  return (
    <Block kicker="Agenda" title="Race-Day Schedule">
      <ol className="relative border-l-2 border-line pl-6">
        {event.schedule.map((s, i) => (
          <li key={i} className="relative pb-6 last:pb-0">
            <span className="absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full border-2 border-race bg-paper">
              <span className="h-1.5 w-1.5 rounded-full bg-race" />
            </span>
            <p className="font-mega text-lg leading-none text-race">{s.time}</p>
            <p className="mt-1 font-display text-base font-bold uppercase">{s.title}</p>
            {s.detail && <p className="text-sm text-ink-500">{s.detail}</p>}
          </li>
        ))}
      </ol>
    </Block>
  )
}

function Results({ event }: { event: EventDetail }) {
  return (
    <Block kicker="Informasi Race" title="Race Results">
      <div className="overflow-hidden rounded-md border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-white">
            <tr className="byline">
              <th className="px-4 py-2.5 font-bold">Class</th>
              <th className="px-4 py-2.5 font-bold">Distance</th>
              <th className="px-4 py-2.5 font-bold">Winner</th>
              <th className="hidden px-4 py-2.5 font-bold sm:table-cell">Region</th>
            </tr>
          </thead>
          <tbody>
            {event.results!.map((r, i) => (
              <tr key={i} className="border-t border-line odd:bg-panel/50">
                <td className="px-4 py-3 font-display font-bold uppercase">{r.className}</td>
                <td className="px-4 py-3 text-ink-700">{r.distance}</td>
                <td className="px-4 py-3 font-semibold text-race">{r.winner}</td>
                <td className="hidden px-4 py-3 text-ink-500 sm:table-cell">{r.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  )
}

function Gallery({ event }: { event: EventDetail }) {
  return (
    <Block kicker="Gallery" title="Event Gallery">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {event.gallery.map((src, i) => (
          <div key={i} className={cn('group relative overflow-hidden rounded-md', i === 0 && 'col-span-2 row-span-2 sm:col-span-2')}>
            <SmartImage src={src} alt={`${event.title} photo ${i + 1}`} className={cn('w-full transition-transform duration-700 group-hover:scale-105', i === 0 ? 'aspect-[16/10]' : 'aspect-square')} />
          </div>
        ))}
      </div>
    </Block>
  )
}

function Faqs({ event }: { event: EventDetail }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Block kicker="Need to know" title="FAQ">
      <div className="divide-y divide-line border-y border-line">
        {event.faqs.map((f, i) => {
          const active = open === i
          return (
            <div key={i}>
              <button onClick={() => setOpen(active ? null : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left">
                <span className="font-display text-base font-bold uppercase">{f.q}</span>
                <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-sm border border-line transition', active && 'bg-race text-white')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">{active ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}</svg>
                </span>
              </button>
              {active && <p className="pb-4 text-sm leading-relaxed text-ink-700">{f.a}</p>}
            </div>
          )
        })}
      </div>
    </Block>
  )
}

function Tickets({ event }: { event: EventDetail }) {
  return (
    <div id="tickets" className="rounded-md border border-line bg-paper">
      <div className="border-b border-line bg-ink px-5 py-3 text-white">
        <span className="byline text-white/70">Tickets &amp; Passes</span>
      </div>
      <div className="space-y-3 p-5">
        {event.tickets.map((t) => <TicketRow key={t.id} ticket={t} />)}
        <Button asChildHref="#register" className="w-full" size="md" rightIcon={<ArrowRight />}>Register Now</Button>
        <p className="byline text-center text-ink-500">Instant e-ticket · transferable</p>
      </div>
    </div>
  )
}

function TicketRow({ ticket }: { ticket: TicketType }) {
  return (
    <div className={cn('rounded-md border p-4', ticket.featured ? 'border-race' : 'border-line')}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-base font-bold uppercase">{ticket.name}</p>
        <p className="font-mega text-xl text-race">{ticket.price}</p>
      </div>
      <ul className="mt-2 space-y-1">
        {ticket.perks.map((p) => (
          <li key={p} className="flex items-center gap-2 text-xs text-ink-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3 text-race"><path d="M5 13l4 4L19 7" /></svg>
            {p}
          </li>
        ))}
      </ul>
      {ticket.featured && <span className="mt-3 inline-block"><Badge tone="race">Most Popular</Badge></span>}
    </div>
  )
}

function RegistrationForm({ event }: { event: EventDetail }) {
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', ticket: event.tickets[0]?.id ?? '', qty: 1 })
  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }))
  const ref = useMemo(() => `SARGA-${event.id.slice(0, 4).toUpperCase()}-${Math.abs(hashStr(event.id)) % 9000 + 1000}`, [event.id])

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-md border border-emerald-500/40 bg-night-800 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-night"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-7 w-7"><path d="M5 13l4 4L19 7" /></svg></span>
        <h3 className="mt-4 font-mega text-3xl uppercase">You’re Registered!</h3>
        <p className="mt-2 text-sm text-white/60">Your e-ticket for <span className="font-semibold text-white">{event.title}</span> is on its way to {form.email || 'your inbox'}.</p>
        <div className="mt-5 rounded-md border border-white/15 bg-night p-4">
          <p className="byline text-white/50">Your referral code</p>
          <p className="font-mega text-2xl text-race">{ref}</p>
          <p className="mt-1 text-xs text-white/50">Share it — earn {referralRewardPoints} pts per friend who registers, redeemable at the event.</p>
        </div>
        <Button onClick={() => setDone(false)} variant="outline-light" className="mt-6">Register another</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <span className="kicker"><span className="h-3 w-1 bg-race" />Secure your spot</span>
        <h2 className="mt-2 font-mega text-4xl uppercase sm:text-5xl">Register for {event.title}</h2>
        <p className="mt-3 text-sm text-white/60">No backend — this is a demo form. You’ll get an instant confirmation + referral code.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setDone(true) }}
        className="mt-8 grid gap-4 rounded-md border border-white/12 bg-night-800 p-6 sm:p-8"
      >
        <Field label="Full name"><input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" className={inputCls} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email"><input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" className={inputCls} /></Field>
          <Field label="Phone (WhatsApp)"><input required value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+62…" className={inputCls} /></Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ticket type">
            <select value={form.ticket} onChange={(e) => set('ticket', e.target.value)} className={inputCls}>
              {event.tickets.map((t) => <option key={t.id} value={t.id} className="bg-night">{t.name} — {t.price}</option>)}
            </select>
          </Field>
          <Field label="Quantity">
            <input type="number" min={1} max={10} value={form.qty} onChange={(e) => set('qty', Number(e.target.value))} className={inputCls} />
          </Field>
        </div>
        <Button type="submit" size="lg" className="mt-2 w-full" rightIcon={<ArrowRight />}>Complete Registration</Button>
        <p className="byline text-center text-white/40">By registering you agree to the SARGA event terms.</p>
      </form>
    </div>
  )
}

const inputCls = 'h-11 w-full rounded-sm border border-white/20 bg-night px-3 text-sm text-white placeholder:text-white/35 focus:border-race focus:outline-none'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="byline mb-1.5 block text-white/55">{label}</span>
      {children}
    </label>
  )
}

/** Referral & rewards — share to earn points, redeem at the event. */
function ReferralWidget({ eventTitle }: { eventTitle: string }) {
  const [points, setPoints] = useState(0)
  const [redeemed, setRedeemed] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const link = `https://sarga.co/r/${eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 20)}`

  const share = () => setPoints((p) => p + referralRewardPoints)
  const copy = () => {
    navigator.clipboard?.writeText(link).catch(() => {})
    setCopied(true); setPoints((p) => p + referralRewardPoints)
    setTimeout(() => setCopied(false), 1600)
  }
  const redeem = (id: string, cost: number) => {
    if (points < cost || redeemed.includes(id)) return
    setPoints((p) => p - cost); setRedeemed((r) => [...r, id])
  }

  const shareIcons: Record<string, JSX.Element> = {
    whatsapp: <path d="M12 2a10 10 0 0 0-8.6 15l-1 3.7 3.8-1A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.6-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.6c-.1.2-.3.3-.1.6.6 1.1 1.5 1.8 1.5 1.8 1 .9 1.8 1.1 2.1 1.3.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.8-.1 1.5Z" />,
    instagram: <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4 1 .4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6Zm0 10.5A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1Zm6.5-10.9a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z" />,
    x: <path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.2 5.6-6.2Zm-1.2 17.7h1.8L7.1 4.3H5.2l11.8 15.9Z" />,
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <div className="flex items-center justify-between bg-flame-gradient px-5 py-3 text-white">
        <span className="byline">Refer &amp; Earn</span>
        <span className="font-mega text-xl leading-none">{points.toLocaleString()} <span className="text-sm">pts</span></span>
      </div>

      <div className="space-y-4 p-5">
        <p className="text-sm text-ink-700">Share this event with friends. Every sign-up earns you <b className="text-race">{referralRewardPoints} pts</b> to redeem at the venue.</p>

        {/* Share row */}
        <div className="flex items-center gap-2">
          {(['whatsapp', 'x', 'instagram'] as const).map((k) => (
            <button key={k} onClick={share} aria-label={`Share on ${k}`} className="grid h-9 flex-1 place-items-center rounded-sm border border-ink/15 text-ink-700 transition hover:border-race hover:text-race">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">{shareIcons[k]}</svg>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <button onClick={copy} className="flex w-full items-center justify-between gap-2 rounded-sm border border-dashed border-ink/25 px-3 py-2.5 text-left transition hover:border-race">
          <span className="truncate font-mono text-xs text-ink-500">{link}</span>
          <span className="shrink-0 font-display text-xs font-bold uppercase text-race">{copied ? 'Copied ✓' : 'Copy'}</span>
        </button>

        {/* Redeem */}
        <div>
          <p className="byline mb-2 text-ink-500">Redeem at the event</p>
          <ul className="space-y-2">
            {eventRewards.map((r) => {
              const got = redeemed.includes(r.id)
              const can = points >= r.cost && !got
              return (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-sm border border-line p-2.5">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold uppercase leading-tight">{r.label}</p>
                    <p className="byline text-ink-500">{r.detail}</p>
                  </div>
                  <button
                    disabled={!can}
                    onClick={() => redeem(r.id, r.cost)}
                    className={cn(
                      'shrink-0 rounded-sm px-3 py-1.5 font-display text-xs font-bold uppercase transition',
                      got ? 'bg-emerald-600 text-white' : can ? 'bg-race text-white hover:bg-[#c2121f]' : 'cursor-not-allowed bg-panel text-ink-300',
                    )}
                  >
                    {got ? 'Redeemed' : `${r.cost.toLocaleString()} pts`}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return h
}
