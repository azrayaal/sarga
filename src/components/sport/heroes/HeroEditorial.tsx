import { NEWS_SITE_URL } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'
import { BrandCTA, GhostCTA, GradText, type HeroProps } from '../primitives'

/** Horse Racing — light editorial "magazine cover". */
export function HeroEditorial({ theme, sport }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--c-brand)]">
            <span className="h-3 w-1" style={{ background: 'var(--c-grad)' }} />
            {theme.kicker}
          </span>
          <h1 className="mt-4 font-mega text-6xl uppercase leading-[0.9] sm:text-7xl">
            {theme.heroTitle.map((line, i) => (
              <span key={i} className="block">{i === 1 ? <GradText>{line}</GradText> : line}</span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BrandCTA href="#events">View Events</BrandCTA>
            <GhostCTA href={NEWS_SITE_URL} external>Latest News</GhostCTA>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[var(--radius-card)] opacity-30 blur-2xl" style={{ backgroundImage: 'var(--c-grad)' }} />
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--c-line)] shadow-2xl">
            <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="aspect-[4/5] w-full" />
            <div className="absolute left-0 top-6 flex items-center gap-2 rounded-r-xl px-3 py-2 text-[color:var(--c-on)]" style={{ backgroundImage: 'var(--c-grad)' }}>
              <SportIcon sport={sport.id} className="h-5 w-5" /><span className="font-display text-sm font-bold uppercase tracking-[0.1em]">{sport.name}</span>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-[var(--radius-card)] border bg-[var(--c-bg)] px-5 py-3 shadow-xl border-[color:var(--c-line)]">
            <p className="font-mega text-3xl leading-none"><GradText>{sport.stat.value}</GradText></p>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">{sport.stat.label}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
