import { NEWS_SITE_URL } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'
import { BrandCTA, GhostCTA, GradText, type HeroProps } from '../primitives'

/** Community — light, playful festival collage. */
export function HeroFestival({ theme, sport, gallery }: HeroProps) {
  const pics = [sport.image, ...gallery].slice(0, 3)
  return (
    <section id="top" className="relative overflow-hidden">
      {/* confetti dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'radial-gradient(var(--c-line) 1.5px,transparent 1.5px)', backgroundSize: '26px 26px' }} />
      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--c-on)]" style={{ backgroundImage: 'var(--c-grad)' }}>
            {theme.kicker}
          </span>
          <h1 className="mt-5 font-mega text-6xl uppercase leading-[0.9] sm:text-7xl">
            {theme.heroTitle.map((line, i) => (
              <span key={i} className="block">{i === 0 ? <GradText>{line}</GradText> : line}</span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BrandCTA href="#events">Join the Festival</BrandCTA>
            <GhostCTA href={NEWS_SITE_URL} external>Latest News</GhostCTA>
          </div>
        </div>

        <div className="relative h-[360px] sm:h-[440px]">
          {pics[0] && (
            <div className="absolute left-2 top-0 w-3/5 rotate-[-5deg] overflow-hidden rounded-[var(--radius-card)] border-4 border-[var(--c-bg)] shadow-xl">
              <SmartImage src={pics[0]} alt={sport.name} fallbackLabel={sport.name} className="aspect-[4/3] w-full" />
            </div>
          )}
          {pics[1] && (
            <div className="absolute right-0 top-16 w-1/2 rotate-[6deg] overflow-hidden rounded-[var(--radius-card)] border-4 border-[var(--c-bg)] shadow-xl">
              <SmartImage src={pics[1]} alt={sport.name} fallbackLabel={sport.name} className="aspect-square w-full" />
            </div>
          )}
          {pics[2] && (
            <div className="absolute bottom-0 left-10 w-1/2 rotate-[3deg] overflow-hidden rounded-[var(--radius-card)] border-4 border-[var(--c-bg)] shadow-xl">
              <SmartImage src={pics[2]} alt={sport.name} fallbackLabel={sport.name} className="aspect-[4/3] w-full" />
            </div>
          )}
          <span className="absolute -right-2 top-4 grid h-14 w-14 place-items-center rounded-full text-[color:var(--c-on)] shadow-lg" style={{ backgroundImage: 'var(--c-grad)' }}>
            <SportIcon sport={sport.id} className="h-7 w-7" />
          </span>
        </div>
      </div>
    </section>
  )
}
