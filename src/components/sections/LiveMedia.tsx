import { useRef } from 'react'
import { mediaItems } from '@/data'
import type { MediaItem } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/utils'

/**
 * MotoGP-style dark video rail. Future-ready for Instagram / YouTube Shorts / Media API.
 */
export function LiveMedia() {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })

  return (
    <section id="media" className="bg-night py-14 text-white sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4 border-b-2 border-white/15 pb-4">
          <div>
            <span className="kicker mb-1.5"><span className="h-3 w-1 bg-race" />Watch</span>
            <h2 className="h-section text-white">Latest Videos</h2>
          </div>
          <div className="flex items-center gap-2">
            <RailBtn dir="prev" onClick={() => scrollBy(-1)} />
            <RailBtn dir="next" onClick={() => scrollBy(1)} />
          </div>
        </div>
      </div>

      {/* Full-bleed rail */}
      <div ref={scroller} className="no-scrollbar mt-7 flex gap-px overflow-x-auto">
        <div className="w-4 shrink-0 sm:w-[max(1rem,calc((100vw-1320px)/2+2rem))]" aria-hidden />
        {mediaItems.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
        <a
          href="#media"
          className="group grid w-[200px] shrink-0 place-items-center bg-night-700 transition hover:bg-night-600"
        >
          <span className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-sm bg-race text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
            <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.12em]">View More</p>
          </span>
        </a>
        <div className="w-4 shrink-0" aria-hidden />
      </div>

      <div className="container-page mt-7 flex flex-wrap items-center gap-2 text-white/40">
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.16em]">Coming soon</span>
        <Badge tone="dark" className="border border-white/15">Instagram Feed</Badge>
        <Badge tone="dark" className="border border-white/15">YouTube Shorts</Badge>
        <Badge tone="dark" className="border border-white/15">Media API</Badge>
      </div>
    </section>
  )
}

function VideoCard({ item }: { item: MediaItem }) {
  return (
    <article className="group relative w-[340px] shrink-0">
      <div className="relative aspect-video overflow-hidden">
        <SmartImage src={item.thumbnail} alt={item.title} fallbackLabel={item.categoryLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
        <button aria-label={`Play ${item.title}`} className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:scale-110 group-hover:bg-race">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 text-white"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
        <span className="absolute bottom-2 left-2 rounded-sm bg-night/85 px-1.5 py-0.5 font-mega text-xs tabular-nums">{item.duration}</span>
        <span className="absolute left-2 top-2"><Badge tone="race">{item.categoryLabel}</Badge></span>
      </div>
      <h3 className="mt-3 line-clamp-2 px-0.5 font-display text-base font-bold uppercase leading-tight">{item.title}</h3>
      <p className="byline mt-1.5 px-0.5 text-white/40">{item.views} views</p>
    </article>
  )
}

function RailBtn({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      aria-label={dir === 'prev' ? 'Scroll left' : 'Scroll right'}
      onClick={onClick}
      className={cn('grid h-9 w-9 place-items-center rounded-sm border border-white/20 text-white transition hover:border-race hover:bg-race')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
        {dir === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  )
}
