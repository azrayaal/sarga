import { NEWS_SITE_URL } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { BrandCTA, GhostCTA, GradText, type HeroProps } from '../primitives'

/** Rallycross — F1-inspired: dark, bold, angular red speed marks, race-data strip. */
export function HeroF1({ theme, sport }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="h-full w-full opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,var(--c-bg) 30%,transparent 75%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,var(--c-bg) 2%,transparent 45%)' }} />
      </div>
      {/* subtle diagonal stripes — F1 signature texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(115deg,#fff 0 2px,transparent 2px 24px)' }} />
      {/* angular red edge marks (F1 speed-mark motif) */}
      <div className="absolute right-0 top-0 flex h-full items-stretch gap-2 opacity-90">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-8 -skew-x-[18deg] sm:w-14" style={{ backgroundImage: 'var(--c-grad)', opacity: 1 - i * 0.28 }} />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-[1280px] flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <SpeedMarks />
          <span className="font-display text-xs uppercase tracking-[0.28em] text-[color:var(--c-brand)]">{theme.kicker}</span>
        </div>
        <h1 className="mt-5 font-mega text-6xl uppercase leading-[0.85] tracking-tight sm:text-8xl">
          {theme.heroTitle.map((line, i) => (
            <span key={i} className="block">{i === 1 ? <GradText>{line}</GradText> : line}</span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandCTA href="#events">See the Heats</BrandCTA>
          <GhostCTA href={NEWS_SITE_URL} external>Latest News</GhostCTA>
        </div>

        {/* race-data strip — angular cards with a red spine */}
        <div className="mt-12 grid max-w-3xl grid-cols-3 gap-3">
          {theme.about.pillars.map((r) => (
            <div key={r.label} className="relative overflow-hidden rounded-xl border bg-[var(--c-panel)]/70 py-4 pl-5 pr-3 backdrop-blur border-[color:var(--c-line)]">
              <p className="font-mega text-3xl leading-none"><GradText>{r.value}</GradText></p>
              <p className="mt-1  text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">{r.label} · {r.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--c-brand)]" />
    </section>
  )
}

/** Three skewed parallelograms — the SARGA Motorsport / F1 "speed mark" glyph. */
function SpeedMarks() {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-4 w-2 -skew-x-[20deg] bg-[var(--c-brand)]" style={{ opacity: 0.5 + i * 0.25 }} />
      ))}
    </span>
  )
}
