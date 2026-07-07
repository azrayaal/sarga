import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { techIntro, techStats, techProducts, techStack } from '@/data'
import type { TechProduct } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/utils'

/** SARGA Tech — the platform that powers ticketing, timing, streaming & venue ops. */
export function SargaTechPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative bg-night text-white">
        <div className="absolute inset-0">
          <SmartImage src={techIntro.hero} alt="SARGA Tech" fallbackLabel="Sarga Tech" className="h-full w-full opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/85 to-night/60" />
        </div>
        <div className="container-page relative py-16 sm:py-24">
          <nav className="byline mb-5 flex items-center gap-2 text-white/55">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Sarga Tech</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />{techIntro.tagline}</span>
          <h1 className="font-mega text-6xl uppercase leading-[0.9] sm:text-8xl">
            SARGA <span className="text-race">Tech</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-white/70 sm:text-base">{techIntro.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChildHref="#products" size="lg" rightIcon={<ArrowRight />}>Explore the Platform</Button>
            <Button asChildHref="#stack" variant="outline-light" size="lg">The Stack</Button>
          </div>
        </div>
      </header>

      {/* Stats strip */}
      <div className="border-b border-line bg-panel">
        <div className="container-page grid grid-cols-2 divide-line py-5 sm:grid-cols-4 sm:divide-x">
          {techStats.map((s) => (
            <div key={s.label} className="px-2 py-1 text-center sm:px-4">
              <p className="font-mega text-3xl leading-none text-race">{s.value}</p>
              <p className="byline mt-1 text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section id="products" className="container-page py-12 sm:py-16">
        <div className="border-b-2 border-ink/10 pb-4">
          <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />One connected platform</span>
          <h2 className="h-section">The Platform</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techProducts.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="bg-night py-12 text-white sm:py-16">
        <div className="container-page">
          <div className="border-b-2 border-white/15 pb-4">
            <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />Under the hood</span>
            <h2 className="h-section text-white">The SARGA Stack</h2>
          </div>
          <div className="mt-8 space-y-3">
            {techStack.map((layer, i) => (
              <div
                key={layer.layer}
                className="flex flex-col gap-2 rounded-md border border-white/10 bg-night-800 p-5 sm:flex-row sm:items-center sm:gap-6"
                style={{ marginInline: `${i * 6}%`, marginRight: 0 }}
              >
                <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                  <span className="font-mega text-2xl leading-none text-race/70">L{techStack.length - i}</span>
                  <h3 className="font-display text-lg font-bold uppercase leading-tight">{layer.layer}</h3>
                </div>
                <p className="text-sm text-white/60">{layer.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-flame-gradient">
        <div className="container-page flex flex-col items-center gap-5 py-14 text-center text-white sm:py-20">
          <h2 className="font-mega text-4xl uppercase leading-none sm:text-6xl">Power your event with SARGA</h2>
          <p className="max-w-xl text-sm text-white/90">Ticketing, timing, streaming and ops — one platform, built to scale. Talk to our team about running your next event on SARGA Tech.</p>
          <Button asChildHref="/venues" variant="light" size="lg" rightIcon={<ArrowRight />}>Talk to Sales</Button>
        </div>
      </section>
    </>
  )
}

function ProductCard({ p }: { p: TechProduct }) {
  return (
    <article className={cn(
      'group flex flex-col rounded-md border bg-paper p-6 transition hover:-translate-y-0.5 hover:border-race',
      p.highlight ? 'border-race/40' : 'border-line',
    )}>
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-sm bg-race text-white">
          <TechIcon name={p.icon} />
        </span>
        <Badge tone="light" className="border border-line">{p.category}</Badge>
      </div>
      <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight transition group-hover:text-race">{p.name}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-500">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
        {p.features.map((f) => (
          <li key={f} className="rounded-sm bg-panel px-2 py-1 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-ink-700">{f}</li>
        ))}
      </ul>
    </article>
  )
}

/** Compact inline icon set for the tech products. */
function TechIcon({ name }: { name: string }): ReactNode {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'h-5 w-5' }
  switch (name) {
    case 'ticket': return <svg {...common}><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" /><path d="M14 7v10" strokeDasharray="1 3" /></svg>
    case 'timing': return <svg {...common}><circle cx="12" cy="13" r="8" /><path d="M12 13V9M12 5V3M9 3h6" /></svg>
    case 'stream': return <svg {...common}><path d="M2 8a13 13 0 0 1 18 0M5 12a8 8 0 0 1 12 0" /><circle cx="11" cy="17" r="1.5" /><path d="M20 6l2 12-4-2" /></svg>
    case 'app': return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
    case 'chart': return <svg {...common}><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></svg>
    case 'ops': return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>
    default: return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>
  }
}
