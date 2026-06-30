import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { featuredEvent } from '@/data'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { SmartImage } from '@/components/ui/SmartImage'

const SEEN_KEY = 'sarga_featured_seen'
const SHOW_DELAY = 1400

/**
 * Marquee-event popup (MotoGP-style). Appears once per session a beat after load,
 * highlighting the starred event. Dismissible via X, backdrop click or Escape.
 */
export function FeaturedEventModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return
    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY)
    return () => window.clearTimeout(t)
  }, [])

  // Lock scroll + Escape-to-close while open.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem(SEEN_KEY, '1')
  }

  if (!open) return null
  const ev = featuredEvent

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Featured event: ${ev.title}`}
    >
      {/* Backdrop */}
      <button aria-label="Close" onClick={close} className="absolute inset-0 bg-night/80 backdrop-blur-sm animate-fade-up" style={{ animationDuration: '0.3s' }} />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-night text-white shadow-2xl ring-1 ring-white/10 animate-fade-up">
        {/* Close */}
        <button
          aria-label="Close"
          onClick={close}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-night/70 text-white/80 backdrop-blur transition hover:bg-race hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {/* Image */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <SmartImage src={ev.banner} alt={ev.title} fallbackLabel={ev.sportLabel} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge tone="race" pulse>Featured Event</Badge>
            <Badge tone="dark" className="ring-1 ring-white/20">{ev.sportLabel}</Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="byline text-white/70">{ev.dateLabel} · {ev.venue}, {ev.city}</p>
            <h2 className="mt-1 font-mega text-3xl uppercase leading-none sm:text-4xl">{ev.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5 sm:p-6">
          {ev.promo && (
            <p className="text-sm text-white/70">
              <span className="font-display font-bold uppercase tracking-wide text-race">Don’t miss out — </span>
              {ev.promo}
            </p>
          )}

          <div>
            <p className="byline mb-2 text-white/45">Lights out in</p>
            <CountdownTimer targetIso={ev.date} size="md" variant="bar" tone="dark" />
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              to={`/events/${ev.id}`}
              onClick={close}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-race px-8 font-display text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#c2121f]"
            >
              Register Now <ArrowRight />
            </Link>
            <Button onClick={close} variant="outline-light" size="lg" className="sm:w-auto">
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
