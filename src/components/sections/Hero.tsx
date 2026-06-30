import { useCallback, useEffect, useRef, useState } from 'react'
import { heroSlides } from '@/data'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button, ArrowRight } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'

const ROTATE_MS = 7000

export function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)
  const count = heroSlides.length

  const go = useCallback((next: number) => setActive((next + count) % count), [count])

  useEffect(() => {
    if (paused) return
    timer.current = window.setTimeout(() => go(active + 1), ROTATE_MS)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [active, paused, go])

  const slide = heroSlides[active]

  return (
    <section
      id="home"
      className="bg-night"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={cn('absolute inset-0 transition-opacity duration-700', i === active ? 'opacity-100' : 'opacity-0')}
            aria-hidden={i !== active}
          >
            {s.video && i === active ? (
              <video className="h-full w-full object-cover" src={s.video} poster={s.image} autoPlay muted loop playsInline />
            ) : (
              <SmartImage src={s.image} alt={s.title} fallbackLabel={s.sportLabel} className="h-full w-full" />
            )}
          </div>
        ))}

        {/* Cinematic darken */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/20 to-transparent" />

        {/* Content */}
        <div className="container-page relative flex h-full items-end pb-14 sm:pb-20">
          <div key={slide.id} className="max-w-3xl animate-fade-up">
            <div className="mb-4 flex items-center gap-2.5">
              <Badge tone="race">{slide.sportLabel}</Badge>
              <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                {slide.venue}
              </span>
            </div>

            <p className="font-display text-lg font-semibold uppercase italic tracking-wide text-white/70">
              #{slide.sportLabel.replace(/\s+/g, '')}
            </p>
            <h1 className="font-mega text-5xl uppercase leading-[0.92] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base">{slide.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChildHref={slide.ctaPrimary.href} size="lg" rightIcon={<ArrowRight />}>
                {slide.ctaPrimary.label}
              </Button>
              <Button asChildHref={slide.ctaSecondary.href} variant="outline-light" size="lg">
                {slide.ctaSecondary.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-5 z-10">
          <div className="container-page flex items-center justify-between">
            <div className="flex items-center gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Go to ${s.sportLabel}`}
                  onClick={() => go(i)}
                  className="h-1 overflow-hidden bg-white/25 transition-all"
                  style={{ width: i === active ? 40 : 16 }}
                >
                  {i === active && (
                    <span
                      key={active + (paused ? 'p' : '')}
                      className="block h-full bg-race"
                      style={{ animation: paused ? 'none' : `grow ${ROTATE_MS}ms linear forwards`, width: paused ? '100%' : 0 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="font-mega text-sm tabular-nums text-white/50">
              {String(active + 1).padStart(2, '0')}<span className="text-white/25"> / {String(count).padStart(2, '0')}</span>
            </span>
          </div>
        </div>
        <style>{`@keyframes grow { from { width: 0 } to { width: 100% } }`}</style>
      </div>

      {/* Teaser strip (MotoGP-style row beneath hero) */}
      <div className="border-t border-white/10">
        <div className="container-page grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {heroSlides.slice(0, 3).map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={cn(
                'group flex items-center gap-4 py-5 text-left transition sm:px-6 sm:first:pl-0',
                i === active ? 'opacity-100' : 'opacity-60 hover:opacity-100',
              )}
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden">
                <SmartImage src={s.image} alt="" fallbackLabel={s.sportLabel} className="h-full w-full" />
                <span className="absolute left-1 top-1"><Badge tone="race">{s.sportLabel}</Badge></span>
              </div>
              <div className="min-w-0">
                <p className="byline text-white/45">Next up</p>
                <p className="line-clamp-2 font-display text-sm font-bold uppercase leading-tight text-white">{s.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
