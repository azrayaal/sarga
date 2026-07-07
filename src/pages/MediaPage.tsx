import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mediaItems } from '@/data'
import type { MediaCategory, MediaItem } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/utils'

const filters: { value: MediaCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'highlights', label: 'Highlights' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'interviews', label: 'Interviews' },
  { value: 'behind-the-scenes', label: 'Behind the Scenes' },
  { value: 'community', label: 'Community' },
  { value: 'teasers', label: 'Teasers' },
]

/** Media — the full SARGA video library. Future-ready for IG / YouTube Shorts / Media API. */
export function MediaPage() {
  const [cat, setCat] = useState<MediaCategory | 'all'>('all')

  const list = useMemo(
    () => (cat === 'all' ? mediaItems : mediaItems.filter((m) => m.category === cat)),
    [cat],
  )
  const feature = mediaItems[0]

  return (
    <div className="bg-black text-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container-page py-12 sm:py-16">
          <nav className="byline mb-4 flex items-center gap-2 text-white/45">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Media</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />Watch</span>
          <h1 className="font-mega text-5xl uppercase leading-none sm:text-7xl">Media Center</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/60">
            Highlights, interviews, shorts and behind-the-scenes from across the SARGA ecosystem —
            all in one place.
          </p>
        </div>
      </header>

      {/* Featured player */}
      <section className="bg-black pb-4 text-white">
        <div className="container-page">
          <article className="group relative overflow-hidden rounded-md">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <SmartImage src={feature.thumbnail} alt={feature.title} fallbackLabel={feature.categoryLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <button aria-label={`Play ${feature.title}`} className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:scale-110 group-hover:bg-race">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-white"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <span className="mb-3 inline-block"><Badge tone="race">{feature.categoryLabel}</Badge></span>
                <h2 className="max-w-2xl font-mega text-2xl uppercase leading-none sm:text-4xl">{feature.title}</h2>
                <p className="byline mt-2 text-white/60">{feature.views} views · {feature.duration}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Library */}
      <section className="container-page bg-black py-10 text-white sm:py-14">
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setCat(f.value)}
              className={cn(
                'shrink-0 rounded-sm border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] transition',
                cat === f.value ? 'border-race bg-race text-white' : 'border-white/15 text-white/55 hover:border-white hover:text-white',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {list.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => <MediaCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-display text-xl font-bold uppercase text-white">Nothing here yet</p>
            <p className="mt-2 text-sm text-white/55">Try another category.</p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6 text-white/55">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.16em]">Coming soon</span>
          <Badge tone="dark" className="border border-white/15">Instagram Feed</Badge>
          <Badge tone="dark" className="border border-white/15">YouTube Shorts</Badge>
          <Badge tone="dark" className="border border-white/15">Media API</Badge>
        </div>
      </section>
    </div>
  )
}

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <article className="group overflow-hidden rounded-md border border-white/10 bg-night-800 transition hover:-translate-y-0.5 hover:border-race">
      <div className="relative aspect-video overflow-hidden">
        <SmartImage src={item.thumbnail} alt={item.title} fallbackLabel={item.categoryLabel} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button aria-label={`Play ${item.title}`} className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:scale-110 group-hover:bg-race">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5 text-white"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
        <span className="absolute bottom-2 left-2"><Badge tone="race">{item.categoryLabel}</Badge></span>
        <span className="absolute bottom-2 right-2 rounded-sm bg-black/85 px-1.5 py-0.5 font-mega text-xs tabular-nums text-white">{item.duration}</span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-display text-base font-bold uppercase leading-tight text-white transition group-hover:text-race">{item.title}</h3>
        <p className="byline mt-1.5 text-white/55">{item.views} views</p>
      </div>
    </article>
  )
}
