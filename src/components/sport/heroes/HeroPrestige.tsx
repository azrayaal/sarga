import { NEWS_SITE_URL } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { BrandCTA, GhostCTA, GradText, type HeroProps } from '../primitives'

/** Championship — dark luxe, centered, ornamental gold. */
export function HeroPrestige({ theme, sport }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="h-full w-full opacity-25" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 70% at 50% 30%,transparent,var(--c-bg))' }} />
      </div>
      <div className="relative mx-auto flex min-h-[74vh] w-full max-w-[900px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-10 w-10 text-[color:var(--c-brand)]">
          <path d="M8 4h8v3a4 4 0 0 1-8 0V4zM8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3M10 13.5V16M9 20h6M10 16h4l.5 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Ornament />
        <span className="font-display text-xs font-bold uppercase tracking-[0.34em] text-[color:var(--c-brand)]">{theme.kicker}</span>
        <h1 className="mt-5 font-mega text-6xl uppercase leading-[0.9] sm:text-8xl">
          {theme.heroTitle.map((line, i) => (
            <span key={i} className="block">{i === 1 ? <GradText>{line}</GradText> : line}</span>
          ))}
        </h1>
        <Ornament />
        <p className="mt-2 max-w-xl text-base leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BrandCTA href="#events">The Road to the Crown</BrandCTA>
          <GhostCTA href={NEWS_SITE_URL} external>Latest News</GhostCTA>
        </div>
      </div>
    </section>
  )
}

function Ornament() {
  return (
    <div className="my-4 flex items-center gap-3">
      <span className="h-px w-16" style={{ backgroundImage: 'var(--c-grad)' }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundImage: 'var(--c-grad)' }} />
      <span className="h-px w-16" style={{ backgroundImage: 'var(--c-grad)' }} />
    </div>
  )
}
