import { NEWS_SITE_URL } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { BrandCTA, GhostCTA, GradText, type HeroProps } from '../primitives'

/** Motorsport — dark HUD / telemetry, centered. */
export function HeroTech({ theme, sport }: HeroProps) {
  const readouts = theme.about.pillars
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="h-full w-full opacity-40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 60% at 50% 40%,transparent,var(--c-bg))' }} />
      </div>
      {/* grid lines */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(var(--c-line) 1px,transparent 1px),linear-gradient(90deg,var(--c-line) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="relative mx-auto flex min-h-[74vh] w-full max-w-[1080px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="rounded-xl border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--c-brand)] border-[color:var(--c-line)]">{theme.kicker}</span>
        <h1 className="mt-6 font-mega text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
          {theme.heroTitle.map((line, i) => (
            <span key={i} className="block">{i === 2 ? <GradText>{line}</GradText> : line}</span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BrandCTA href="#events">Enter the Grid</BrandCTA>
          <GhostCTA href={NEWS_SITE_URL} external>Latest News</GhostCTA>
        </div>
        <div className="mt-12 grid w-full max-w-2xl grid-cols-3 divide-x rounded-[var(--radius-card)] border divide-[color:var(--c-line)] border-[color:var(--c-line)]">
          {readouts.map((r) => (
            <div key={r.label} className="px-3 py-4">
              <p className="font-mega text-3xl leading-none"><GradText>{r.value}</GradText></p>
              <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">{r.label} · {r.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
