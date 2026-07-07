import { Link } from 'react-router-dom'
import { risingStarIntro, risingStars, risingStarProgram } from '@/data'
import type { RisingStar } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'

/** SARGA Rising Star — the talent pipeline spotlighting the next generation. */
export function RisingStarPage() {
  const [lead, ...rest] = risingStars

  return (
    <>
      {/* Hero */}
      <header className="relative bg-night text-white">
        <div className="absolute inset-0">
          <SmartImage src={risingStarIntro.hero} alt="Rising Star" fallbackLabel="Rising Star" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/40" />
        </div>
        <div className="container-page relative py-16 sm:py-24">
          <nav className="byline mb-5 flex items-center gap-2 text-white/55">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Rising Star</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />{risingStarIntro.tagline}</span>
          <h1 className="font-mega text-6xl uppercase leading-[0.9] sm:text-8xl">Rising Star</h1>
          <p className="mt-5 max-w-2xl text-sm text-white/70 sm:text-base">{risingStarIntro.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChildHref="#prospects" size="lg" rightIcon={<ArrowRight />}>Meet the Prospects</Button>
            <Button asChildHref="#program" variant="outline-light" size="lg">How it works</Button>
          </div>
        </div>
      </header>

      {/* Quick stats */}
      <div className="border-b border-line bg-panel">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {risingStarIntro.stats.map((s) => (
            <div key={s.label} className="px-2 py-1 text-center sm:px-4">
              <p className="font-mega text-3xl leading-none text-race">{s.value}</p>
              <p className="byline mt-1 text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prospect of the season (lead) */}
      <section id="prospects" className="container-page py-12 sm:py-16">
        <div className="border-b-2 border-ink/10 pb-4">
          <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />Top prospect</span>
          <h2 className="h-section">Star of the Season</h2>
        </div>
        <article className="mt-8 grid overflow-hidden rounded-md border border-line bg-night text-white md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <SmartImage src={lead.image} alt={lead.name} fallbackLabel={lead.name} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent md:bg-gradient-to-r" />
            <span className="absolute left-4 top-4"><Badge tone="race">#{lead.rank} Prospect</Badge></span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="byline text-race">{lead.sportLabel}</p>
            <h3 className="mt-2 font-mega text-4xl uppercase leading-none sm:text-5xl">{lead.name}</h3>
            <p className="mt-3 text-sm text-white/70">{lead.achievement}</p>
            <div className="mt-6 flex gap-8">
              <div>
                <p className="font-mega text-3xl leading-none text-race">{lead.stat.value}</p>
                <p className="byline mt-1 text-white/50">{lead.stat.label}</p>
              </div>
              <div>
                <p className="font-mega text-3xl leading-none">{lead.age}</p>
                <p className="byline mt-1 text-white/50">Years old</p>
              </div>
              <div>
                <p className="font-mega text-3xl leading-none">{lead.region}</p>
                <p className="byline mt-1 text-white/50">Region</p>
              </div>
            </div>
          </div>
        </article>

        {/* Prospect grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => <StarCard key={s.id} s={s} />)}
        </div>
      </section>

      {/* Program */}
      <section id="program" className="bg-night py-12 text-white sm:py-16">
        <div className="container-page">
          <div className="border-b-2 border-white/15 pb-4">
            <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />The pathway</span>
            <h2 className="h-section text-white">Grassroots to the Grid</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {risingStarProgram.map((p) => (
              <div key={p.step} className="rounded-md border border-white/10 bg-night-800 p-6">
                <p className="font-mega text-5xl leading-none text-race/80">{p.step}</p>
                <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-white/60">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-flame-gradient">
        <div className="container-page flex flex-col items-center gap-5 py-14 text-center text-white sm:py-20">
          <h2 className="font-mega text-4xl uppercase leading-none sm:text-6xl">Think you've got it?</h2>
          <p className="max-w-xl text-sm text-white/90">Regional trials open year-round. Register your interest and get scouted by the SARGA Academy.</p>
          <Button asChildHref="/events" variant="light" size="lg" rightIcon={<ArrowRight />}>Register Interest</Button>
        </div>
      </section>
    </>
  )
}

function StarCard({ s }: { s: RisingStar }) {
  return (
    <article className="group overflow-hidden rounded-md border border-line bg-paper transition hover:-translate-y-0.5 hover:border-race">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage src={s.image} alt={s.name} fallbackLabel={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
        <span className="absolute left-3 top-3"><Badge tone="dark">#{s.rank}</Badge></span>
        <span className="absolute right-3 top-3"><Badge tone="race">{s.sportLabel}</Badge></span>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-mega text-2xl uppercase leading-none">{s.name}</h3>
          <p className="byline mt-1 text-white/70">{s.age} · {s.region}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="line-clamp-2 text-sm text-ink-500">{s.achievement}</p>
        <div className="shrink-0 text-right">
          <p className="font-mega text-xl leading-none text-race">{s.stat.value}</p>
          <p className="byline text-ink-500">{s.stat.label}</p>
        </div>
      </div>
    </article>
  )
}
