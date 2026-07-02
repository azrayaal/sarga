import { NEWS_SITE_URL } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { BrandCTA, GhostCTA, GradText, type HeroProps } from '../primitives'

/** Kinetic — dark, diagonal energy (spare variant for future disciplines). */
export function HeroKinetic({ theme, sport }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="h-full w-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,var(--c-bg) 10%,transparent 90%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,var(--c-bg) 5%,transparent 55%)' }} />
      </div>
      {/* skewed gradient slash */}
      <div className="absolute -right-24 top-0 h-full w-64 -skew-x-12 opacity-80" style={{ backgroundImage: 'var(--c-grad)' }} />
      <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1280px] flex-col justify-end px-4 py-16 sm:px-6 lg:px-8">
        <span className="inline-flex w-fit items-center gap-2 -skew-x-6 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--c-on)]" style={{ backgroundImage: 'var(--c-grad)' }}>
          {theme.kicker}
        </span>
        <h1 className="mt-5 font-mega text-6xl uppercase italic leading-[0.85] sm:text-8xl">
          {theme.heroTitle.map((line, i) => (
            <span key={i} className="block">{i === 2 ? <GradText>{line}</GradText> : line}</span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandCTA href="#events">See the Heats</BrandCTA>
          <GhostCTA href={NEWS_SITE_URL} external>Latest News</GhostCTA>
        </div>
      </div>
    </section>
  )
}
