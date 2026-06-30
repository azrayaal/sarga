import { useRef } from 'react'
import { reels, instagramHandle, instagramUrl } from '@/data'
import type { Reel } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/utils'

const IG_GLYPH = (
  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4 1 .4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6Zm0 10.5A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1Zm6.5-10.9a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z" />
)

/**
 * "Latest Content" — SARGA reels rail modelled on @indonesiashorseracing.
 * Future-ready: swap the dummy data for the Instagram Graph API (same card shape).
 */
export function Reels() {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })

  return (
    <section id="reels" className="bg-paper py-14 sm:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/10 pb-4">
          <div>
            <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />Latest Content</span>
            <h2 className="h-section">SARGA Reels</h2>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="byline mt-1 inline-flex items-center gap-1.5 text-ink-500 transition hover:text-race">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">{IG_GLYPH}</svg>
              @{instagramHandle}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-sm bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] px-4 font-display text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">{IG_GLYPH}</svg>
              Follow
            </a>
            <div className="hidden items-center gap-2 sm:flex">
              <RailBtn dir="prev" onClick={() => scrollBy(-1)} />
              <RailBtn dir="next" onClick={() => scrollBy(1)} />
            </div>
          </div>
        </div>

        <div ref={scroller} className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2">
          {reels.map((reel) => <ReelCard key={reel.id} reel={reel} />)}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group grid w-[170px] shrink-0 place-items-center rounded-md border border-dashed border-line bg-panel transition hover:border-race"
          >
            <span className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-white transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">{IG_GLYPH}</svg>
              </span>
              <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.08em]">View More</p>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function ReelCard({ reel }: { reel: Reel }) {
  return (
    <a href={reel.permalink} target="_blank" rel="noreferrer" className="group relative w-[220px] shrink-0 overflow-hidden rounded-md bg-night">
      <div className="relative aspect-[9/16]">
        <SmartImage src={reel.thumbnail} alt={reel.caption} fallbackLabel="Reel" className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-night/30" />

        {/* Reel glyph */}
        <span className="absolute right-2.5 top-2.5 text-white/90">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5"><path d="M3 8h18M8 3l3 5M14 3l3 5M3 8v9a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8M11 12l4 2.5-4 2.5z" /></svg>
        </span>

        {/* Play on hover */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur transition group-hover:opacity-100">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 text-white"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </span>

        {/* Caption + stats */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <p className="line-clamp-2 text-xs font-medium leading-snug">{reel.caption}</p>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-white/80">
            <span className="inline-flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 21s-7-4.6-9.3-8.4C1 9.6 2.3 6 5.6 6c2 0 3.2 1.2 4.4 2.6C11.2 7.2 12.4 6 14.4 6c3.3 0 4.6 3.6 2.9 6.6C19 16.4 12 21 12 21z" /></svg>
              {reel.likes}
            </span>
            <span className="inline-flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M8 5v14l11-7z" /></svg>
              {reel.views}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

function RailBtn({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      aria-label={dir === 'prev' ? 'Scroll left' : 'Scroll right'}
      onClick={onClick}
      className={cn('grid h-10 w-10 place-items-center rounded-sm border border-ink/15 text-ink transition hover:border-race hover:bg-race hover:text-white')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
        {dir === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  )
}
