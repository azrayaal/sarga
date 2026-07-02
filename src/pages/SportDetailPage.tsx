import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSport, sports, sportGalleries, events, getStandings, getSportTheme, NEWS_SITE_URL } from '@/data'
import { news } from '@/data/news'
import type { SportTheme } from '@/data'
import type { EventDetail, Sport } from '@/types'
import { asset } from '@/lib/utils'
import { statusMeta } from '@/lib/eventStatus'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'
import { NotFoundPage } from './NotFoundPage'

const MARK = asset('logos/sarga-mark.png')

/**
 * Standalone, per-sport micro-site. Each sport renders as its own themed
 * landing page (`/sports/horse-racing`) — distinct palette, hero personality
 * and chrome — so it reads like a dedicated site rather than a shared template.
 * Rendered outside the global Layout (see App.tsx), it brings its own nav/footer.
 */
export function SportDetailPage() {
  const { id } = useParams()
  const sport = id ? getSport(id) : undefined

  // Reset scroll when switching between sport micro-sites.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!sport) return <NotFoundPage />

  const theme = getSportTheme(sport.id)
  const p = theme.palette
  const sportEvents = events.filter((e) => e.sport === sport.id)
  const standings = getStandings(sport.id)
  const gallery = sportGalleries[sport.id] ?? []
  const sportNews = news.filter((n) => theme.newsCategories.includes(n.category))
  const otherSports = sports.filter((s) => s.id !== sport.id)

  const cssVars = {
    '--c-bg': p.bg,
    '--c-panel': p.panel,
    '--c-line': p.line,
    '--c-brand': p.brand,
    '--c-brand2': p.brand2,
    '--c-accent': p.accent,
    '--c-ink': p.ink,
    '--c-muted': p.muted,
    '--c-on': p.onBrand,
    '--c-grad': theme.gradient,
  } as CSSProperties

  return (
    <div
      style={cssVars}
      className={cnJoin(
        'min-h-screen scroll-smooth bg-[var(--c-bg)] text-[color:var(--c-ink)] antialiased',
        sport.id === 'horse-racing' && 'sport-site--horse',
      )}
    >
      <MicroNav theme={theme} sport={sport} />
      <SportHero theme={theme} sport={sport} gallery={gallery} />
      <AboutSection theme={theme} sport={sport} />
      <EventsSection theme={theme} sport={sport} sportEvents={sportEvents} />
      {standings && <StandingsSection theme={theme} sport={sport} standings={standings} />}
      {gallery.length > 0 && <GallerySection theme={theme} sport={sport} gallery={gallery} />}
      <NewsSection theme={theme} sportNews={sportNews} />
      <MicroFooter theme={theme} sport={sport} otherSports={otherSports} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Shared themed primitives                                            */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'News', href: '#news' },
]

/** Gradient-filled text using the sport's signature gradient. */
function GradText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cnJoin('bg-clip-text text-transparent', className)} style={{ backgroundImage: 'var(--c-grad)' }}>
      {children}
    </span>
  )
}

/** Primary CTA filled with the sport gradient. Internal → SPA link, else <a>. */
function BrandCTA({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls =
    'inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 font-display text-sm font-bold uppercase tracking-[0.12em] text-[color:var(--c-on)] shadow-sm transition hover:brightness-110'
  const style = { backgroundImage: 'var(--c-grad)' }
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={cls} style={style}>{children}<Arrow /></a>
  if (href.startsWith('#')) return <a href={href} className={cls} style={style}>{children}<Arrow /></a>
  return <Link to={href} className={cls} style={style}>{children}<Arrow /></Link>
}

/** Outline CTA in the current palette. */
function GhostCTA({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls =
    'inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-7 font-display text-sm font-bold uppercase tracking-[0.12em] text-[color:var(--c-ink)] transition hover:border-[color:var(--c-brand)] hover:text-[color:var(--c-brand)] border-[color:var(--c-line)]'
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>
  if (href.startsWith('#')) return <a href={href} className={cls}>{children}</a>
  return <Link to={href} className={cls}>{children}</Link>
}

/** Section eyebrow + condensed title. */
function SectionHead({ kicker, title }: { kicker: string; title: ReactNode }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--c-brand)]">
        <span className="h-3 w-1" style={{ background: 'var(--c-grad)' }} />
        {kicker}
      </span>
      <h2 className="mt-2 font-mega text-4xl uppercase leading-[0.95] sm:text-5xl">{title}</h2>
    </div>
  )
}

/** Small sport tag pill in brand colour. */
function BrandTag({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-on)]"
      style={{ backgroundImage: 'var(--c-grad)' }}
    >
      {children}
    </span>
  )
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={cnJoin('h-4 w-4', className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Tiny local class joiner (avoids pulling twMerge into every leaf). */
function cnJoin(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

/* ------------------------------------------------------------------ */
/* Chrome                                                              */
/* ------------------------------------------------------------------ */

function MicroNav({ theme }: { theme: SportTheme; sport: Sport }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-[var(--c-bg)]/90 backdrop-blur border-[color:var(--c-line)]">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundImage: 'var(--c-grad)' }}>
            <SmartImage src={MARK} alt="SARGA" fallbackLabel="S" className="h-6 w-6 object-contain" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mega text-lg uppercase tracking-tight">{theme.brand}</span>
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--c-muted)]">{theme.domain}</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
              {l.label}
            </a>
          ))}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--c-muted)] transition hover:text-[color:var(--c-ink)] border-[color:var(--c-line)]"
        >
          SARGA Ecosystem
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3.5 w-3.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
        </Link>
      </nav>
      {/* signature gradient rule */}
      <div className="h-0.5 w-full" style={{ backgroundImage: 'var(--c-grad)' }} />
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Hero — one layout per sport personality                             */
/* ------------------------------------------------------------------ */

function SportHero({ theme, sport, gallery }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
  const shared = { theme, sport, gallery }
  switch (theme.heroVariant) {
    case 'kinetic':
      return <HeroKinetic {...shared} />
    case 'tech':
      return <HeroTech {...shared} />
    case 'prestige':
      return <HeroPrestige {...shared} />
    case 'festival':
      return <HeroFestival {...shared} />
    default:
      return <HeroEditorial {...shared} />
  }
}

/** Horse Racing — light editorial "magazine cover". */
function HeroEditorial({ theme, sport }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
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
            <GhostCTA href={NEWS_SITE_URL} external>Latest News ↗</GhostCTA>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl opacity-30 blur-2xl" style={{ backgroundImage: 'var(--c-grad)' }} />
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--c-line)] shadow-2xl">
            <SmartImage src={sport.image} alt={sport.name} fallbackLabel={sport.name} className="aspect-[4/5] w-full" />
            <div className="absolute left-0 top-6 flex items-center gap-2 rounded-r-xl px-3 py-2 text-[color:var(--c-on)]" style={{ backgroundImage: 'var(--c-grad)' }}>
              <SportIcon sport={sport.id} className="h-5 w-5" /><span className="font-display text-sm font-bold uppercase tracking-[0.1em]">{sport.name}</span>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border bg-[var(--c-bg)] px-5 py-3 shadow-xl border-[color:var(--c-line)]">
            <p className="font-mega text-3xl leading-none"><GradText>{sport.stat.value}</GradText></p>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">{sport.stat.label}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Rallycross — dark, kinetic, diagonal energy. */
function HeroKinetic({ theme, sport }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
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
          <GhostCTA href={NEWS_SITE_URL} external>Latest News ↗</GhostCTA>
        </div>
      </div>
    </section>
  )
}

/** Motorsport — dark HUD / telemetry, centered. */
function HeroTech({ theme, sport }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
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
          <GhostCTA href={NEWS_SITE_URL} external>Latest News ↗</GhostCTA>
        </div>
        <div className="mt-12 grid w-full max-w-2xl grid-cols-3 divide-x rounded-2xl border divide-[color:var(--c-line)] border-[color:var(--c-line)]">
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

/** Championship — dark luxe, centered, ornamental gold. */
function HeroPrestige({ theme, sport }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
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
          <GhostCTA href={NEWS_SITE_URL} external>Latest News ↗</GhostCTA>
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

/** Community — light, playful festival collage. */
function HeroFestival({ theme, sport, gallery }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
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
            <GhostCTA href={NEWS_SITE_URL} external>Latest News ↗</GhostCTA>
          </div>
        </div>

        <div className="relative h-[360px] sm:h-[440px]">
          {pics[0] && (
            <div className="absolute left-2 top-0 w-3/5 rotate-[-5deg] overflow-hidden rounded-2xl border-4 border-[var(--c-bg)] shadow-xl">
              <SmartImage src={pics[0]} alt={sport.name} fallbackLabel={sport.name} className="aspect-[4/3] w-full" />
            </div>
          )}
          {pics[1] && (
            <div className="absolute right-0 top-16 w-1/2 rotate-[6deg] overflow-hidden rounded-2xl border-4 border-[var(--c-bg)] shadow-xl">
              <SmartImage src={pics[1]} alt={sport.name} fallbackLabel={sport.name} className="aspect-square w-full" />
            </div>
          )}
          {pics[2] && (
            <div className="absolute bottom-0 left-10 w-1/2 rotate-[3deg] overflow-hidden rounded-2xl border-4 border-[var(--c-bg)] shadow-xl">
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

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function AboutSection({ theme, sport }: { theme: SportTheme; sport: Sport }) {
  return (
    <section id="about" className="scroll-mt-20 border-y border-[color:var(--c-line)] bg-[var(--c-panel)]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <SectionHead kicker="About" title={theme.about.heading} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[color:var(--c-muted)]">
            {theme.about.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {theme.about.pillars.map((pillar) => (
              <div key={pillar.label} className="rounded-2xl border bg-[var(--c-bg)] p-4 border-[color:var(--c-line)]">
                <p className="font-mega text-3xl leading-none"><GradText>{pillar.value}</GradText></p>
                <p className="mt-1.5 font-display text-sm font-bold uppercase leading-tight">{pillar.label}</p>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--c-muted)]">{pillar.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* brand-guide-style identity card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border bg-[var(--c-bg)] p-6 border-[color:var(--c-line)]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl text-[color:var(--c-on)]" style={{ backgroundImage: 'var(--c-grad)' }}>
                <SportIcon sport={sport.id} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-mega text-xl uppercase leading-none">{theme.brand}</p>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--c-muted)]">{theme.domain}</p>
              </div>
            </div>
            {sport.id !== 'horse-racing' && (
              <>
                <p className="mt-5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-muted)]">Brand Colours</p>
                <div className="mt-2 grid grid-cols-5 overflow-hidden rounded-xl border border-[color:var(--c-line)]">
                  {theme.swatches.map((s) => (
                    <div key={s.hex} className="group relative h-16" style={{ background: s.hex }} title={`${s.name} · ${s.hex}`}>
                      <span className="absolute inset-x-0 bottom-0 hidden bg-black/55 py-1 text-center font-display text-[8px] font-bold uppercase tracking-wider text-white group-hover:block">{s.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className="mt-5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-muted)]">Signature Gradient</p>
            <div className="mt-2 h-12 rounded-xl" style={{ backgroundImage: 'var(--c-grad)' }} />
            <p className="mt-5 border-t pt-4 text-sm leading-relaxed text-[color:var(--c-muted)] border-[color:var(--c-line)]">{sport.tagline}.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function EventsSection({ sport, sportEvents }: { theme: SportTheme; sport: Sport; sportEvents: EventDetail[] }) {
  return (
    <section id="events" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="What's On" title={`${sport.name} Events`} />
          <Link to="/events" className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
            All Events <Arrow />
          </Link>
        </div>

        {sportEvents.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sportEvents.map((e) => <MicroEventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <p className="mt-10 text-sm text-[color:var(--c-muted)]">No events scheduled yet — check back soon.</p>
        )}
      </div>
    </section>
  )
}

function MicroEventCard({ event }: { event: EventDetail }) {
  const meta = statusMeta[event.status]
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-[var(--c-panel)] transition hover:-translate-y-0.5 border-[color:var(--c-line)] hover:border-[color:var(--c-brand)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage src={event.banner} alt={event.title} fallbackLabel={event.sportLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-3 top-3"><BrandTag>{event.sportLabel}</BrandTag></span>
        <span className="absolute bottom-3 left-3 rounded-xl bg-black/70 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white">{event.dateLabel}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight transition group-hover:text-[color:var(--c-brand)]">{event.title}</h3>
        <p className="mt-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--c-muted)]">{event.venue}, {event.city}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4 border-[color:var(--c-line)]">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--c-brand)]">{meta.label}</span>
          <span aria-hidden className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border text-[color:var(--c-ink)] transition group-hover:border-transparent group-hover:text-[color:var(--c-on)] border-[color:var(--c-line)]">
            <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ backgroundImage: 'var(--c-grad)' }} />
            <Arrow className="relative" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function StandingsSection({
  sport,
  standings,
}: {
  theme: SportTheme
  sport: Sport
  standings: NonNullable<ReturnType<typeof getStandings>>
}) {
  return (
    <section className="border-y border-[color:var(--c-line)] bg-[var(--c-panel)]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="Standings" title={`${sport.name} Leaders`} />
          <Link to={`/leaderboard?sport=${sport.id}`} className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
            Full Table <Arrow />
          </Link>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border bg-[var(--c-bg)] border-[color:var(--c-line)]">
          {standings.drivers.slice(0, 5).map((d) => (
            <div key={d.position} className="flex items-center gap-4 border-b px-4 py-3.5 last:border-0 border-[color:var(--c-line)]">
              <span className="w-6 text-center font-mega text-2xl leading-none">{d.position === 1 ? <GradText>{d.position}</GradText> : d.position}</span>
              <SmartImage src={d.image} alt={d.name} fallbackLabel={d.name.split(' ')[0]} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[color:var(--c-line)]" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-bold uppercase leading-tight">{d.name}</p>
                <p className="truncate font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--c-muted)]">{d.team}</p>
              </div>
              <span className="font-mega text-xl tabular-nums">{d.points}<span className="ml-1 text-xs text-[color:var(--c-muted)]">pts</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection({ sport, gallery }: { theme: SportTheme; sport: Sport; gallery: string[] }) {
  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHead kicker="Gallery" title="From the Track" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <div key={i} className={cnJoin('overflow-hidden rounded-2xl border border-[color:var(--c-line)]', i === 0 && 'col-span-2 sm:col-span-1 sm:row-span-2')}>
              <SmartImage src={src} alt={`${sport.name} ${i + 1}`} className={cnJoin('w-full transition-transform duration-700 hover:scale-105', i === 0 ? 'aspect-[4/3] sm:h-full sm:aspect-auto' : 'aspect-[4/3]')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsSection({ sportNews }: { theme: SportTheme; sportNews: typeof news }) {
  const items = sportNews.length > 0 ? sportNews : news.slice(0, 3)
  return (
    <section id="news" className="scroll-mt-20 border-t border-[color:var(--c-line)] bg-[var(--c-panel)]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="Latest" title="News & Stories" />
          <a href={NEWS_SITE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
            All News ↗
          </a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <a
              key={n.id}
              href={NEWS_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border bg-[var(--c-bg)] transition hover:-translate-y-0.5 border-[color:var(--c-line)] hover:border-[color:var(--c-brand)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage src={n.image} alt={n.title} fallbackLabel={n.category} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3"><BrandTag>{n.category}</BrandTag></span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold uppercase leading-tight transition group-hover:text-[color:var(--c-brand)]">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--c-muted)]">{n.excerpt}</p>
                <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--c-muted)]">{n.date} · {n.source}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-8 text-center font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">
          Full coverage on{' '}
          <a href={NEWS_SITE_URL} target="_blank" rel="noreferrer" className="text-[color:var(--c-brand)] underline-offset-2 hover:underline">news.sarga.co</a>
        </p>
      </div>
    </section>
  )
}

function MicroFooter({ theme, sport, otherSports }: { theme: SportTheme; sport: Sport; otherSports: Sport[] }) {
  return (
    <footer className="bg-[var(--c-bg)]">
      {/* CTA band */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-90" style={{ backgroundImage: 'var(--c-grad)' }} />
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-5 px-4 py-14 text-center text-[color:var(--c-on)] sm:px-6 lg:px-8">
          <h2 className="font-mega text-4xl uppercase leading-[0.95] sm:text-5xl">Don’t miss the next {sport.name.split(' ')[0]} event</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/events" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--c-bg)] px-7 font-display text-sm font-bold uppercase tracking-[0.12em] text-[color:var(--c-ink)] transition hover:brightness-95">
              Browse Events
            </Link>
            <a href={NEWS_SITE_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-xl border border-current px-7 font-display text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/10">
              Read the News ↗
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--c-line)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundImage: 'var(--c-grad)' }}>
                <SmartImage src={MARK} alt="SARGA" fallbackLabel="S" className="h-6 w-6 object-contain" />
              </span>
              <span className="font-mega text-lg uppercase leading-none">{theme.brand}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--c-muted)]">{theme.heroLede}</p>
            <Link to="/" className="mt-5 inline-flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-brand)]">
              ← Back to the SARGA ecosystem
            </Link>
          </div>

          <div className="lg:col-span-3">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-muted)]">This Site</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-muted)]">Other SARGA Sports</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherSports.map((s) => (
                <Link
                  key={s.id}
                  to={`/sports/${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-[color:var(--c-ink)] transition hover:border-[color:var(--c-brand)] hover:text-[color:var(--c-brand)] border-[color:var(--c-line)]"
                >
                  <SportIcon sport={s.id} className="h-4 w-4" />
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[color:var(--c-line)]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">© 2026 SARGA · {theme.brand}</p>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--c-muted)]">{theme.domain}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
