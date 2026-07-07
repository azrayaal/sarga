import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { festivalIntro, festivalExperiences, festivalLineup, festivalEditions } from '@/data'
import type { FestivalAct, FestivalExperience } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'

/** SARGA Festival — the live entertainment layer around every Grand Final weekend. */
export function FestivalPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative bg-night text-white">
        <div className="absolute inset-0">
          <SmartImage src={festivalIntro.hero} alt={festivalIntro.edition} fallbackLabel="Festival" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/40" />
        </div>
        <div className="container-page relative py-16 sm:py-24">
          <nav className="byline mb-5 flex items-center gap-2 text-white/55">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Festival</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />{festivalIntro.tagline}</span>
          <h1 className="font-mega text-6xl uppercase leading-[0.9] sm:text-8xl">{festivalIntro.edition}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <Badge tone="race">{festivalIntro.dateLabel}</Badge>
            <span>📍 {festivalIntro.venue}, {festivalIntro.city}</span>
          </div>
          <p className="mt-5 max-w-2xl text-sm text-white/70 sm:text-base">{festivalIntro.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChildHref="/events" size="lg" rightIcon={<ArrowRight />}>Get Festival Pass</Button>
            <Button asChildHref="#lineup" variant="outline-light" size="lg">See Line-up</Button>
          </div>
        </div>
      </header>

      {/* Quick stats */}
      <div className="border-b border-line bg-panel">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {festivalIntro.stats.map((s) => (
            <div key={s.label} className="px-2 py-1 text-center sm:px-4">
              <p className="font-mega text-3xl leading-none text-race">{s.value}</p>
              <p className="byline mt-1 text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experiences */}
      <section className="container-page py-12 sm:py-16">
        <div className="border-b-2 border-ink/10 pb-4">
          <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />What's on</span>
          <h2 className="h-section">Festival Experiences</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {festivalExperiences.map((x) => <ExperienceCard key={x.id} x={x} />)}
        </div>
      </section>

      {/* Line-up */}
      <section id="lineup" className="bg-night py-12 text-white sm:py-16">
        <div className="container-page">
          <div className="border-b-2 border-white/15 pb-4">
            <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />On stage</span>
            <h2 className="h-section text-white">2026 Line-up</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {festivalLineup.map((a) => <ActCard key={a.id} a={a} />)}
          </div>
        </div>
      </section>

      {/* Past editions */}
      <section className="container-page py-12 sm:py-16">
        <div className="border-b-2 border-ink/10 pb-4">
          <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />Throwback</span>
          <h2 className="h-section">Past Editions</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {festivalEditions.map((e) => (
            <article key={e.year} className="group relative overflow-hidden rounded-md border border-line">
              <div className="aspect-[4/3]">
                <SmartImage src={e.image} alt={e.name} fallbackLabel={e.city} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-night to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-mega text-3xl leading-none">{e.year}</p>
                <p className="mt-1 font-display text-sm font-bold uppercase leading-tight">{e.name}</p>
                <p className="byline mt-1 text-white/70">{e.attendance} attendance</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-flame-gradient">
        <div className="container-page flex flex-col items-center gap-5 py-14 text-center text-white sm:py-20">
          <h2 className="font-mega text-4xl uppercase leading-none sm:text-6xl">Be there in 2026</h2>
          <p className="max-w-xl text-sm text-white/90">Passes go on sale soon. Secure yours and be part of the biggest weekend in Indonesian racing.</p>
          <Button asChildHref="/events" variant="light" size="lg" rightIcon={<ArrowRight />}>Get Festival Pass</Button>
        </div>
      </section>
    </>
  )
}

function ExperienceCard({ x }: { x: FestivalExperience }) {
  return (
    <article className="group overflow-hidden rounded-md border border-line bg-paper transition hover:-translate-y-0.5 hover:border-race">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage src={x.image} alt={x.title} fallbackLabel={x.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
        <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-sm bg-race text-white">
          <FestivalIcon name={x.icon} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight transition group-hover:text-race">{x.title}</h3>
        <p className="mt-2 text-sm text-ink-500">{x.description}</p>
      </div>
    </article>
  )
}

function ActCard({ a }: { a: FestivalAct }) {
  return (
    <article className="group flex items-center gap-4 rounded-md border border-white/10 bg-night-800 p-3 transition hover:border-race">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm">
        <SmartImage src={a.image} alt={a.name} fallbackLabel={a.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="min-w-0 flex-1">
        {a.headliner && <span className="mb-1 inline-block"><Badge tone="race">Headliner</Badge></span>}
        <h3 className="truncate font-display text-lg font-bold uppercase leading-tight">{a.name}</h3>
        <p className="byline mt-0.5 text-white/50">{a.genre}</p>
        <p className="byline mt-1 text-race">{a.time}</p>
      </div>
    </article>
  )
}

/** Compact inline icon set for festival experiences. */
function FestivalIcon({ name }: { name: string }): ReactNode {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'h-5 w-5' }
  switch (name) {
    case 'flag': return <svg {...common}><path d="M4 21V4M4 4h13l-2 4 2 4H4" /></svg>
    case 'music': return <svg {...common}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
    case 'food': return <svg {...common}><path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M17 2c-1.5 0-3 2-3 6s1.5 6 3 6v8" /></svg>
    case 'game': return <svg {...common}><path d="M6 12h4M8 10v4" /><circle cx="16" cy="11" r="0.6" fill="currentColor" /><circle cx="18" cy="13" r="0.6" fill="currentColor" /><rect x="2" y="6" width="20" height="12" rx="4" /></svg>
    case 'family': return <svg {...common}><circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M15 21v-1a3 3 0 0 1 3-3h1" /></svg>
    case 'shop': return <svg {...common}><path d="M6 2 3 6v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
    default: return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>
  }
}
