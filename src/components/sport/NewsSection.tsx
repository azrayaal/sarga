import { NEWS_SITE_URL } from '@/data'
import { news } from '@/data/news'
import { SmartImage } from '@/components/ui/SmartImage'
import { BrandTag, ExtArrow, SectionHead } from './primitives'

/** Sport news cards that deep-link out to the SARGA news site. */
export function NewsSection({ sportNews }: { sportNews: typeof news }) {
  const items = sportNews.length > 0 ? sportNews : news.slice(0, 3)
  return (
    <section id="news" className="scroll-mt-20 border-t border-[color:var(--c-line)] bg-[var(--c-panel)]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="Latest" title="News & Stories" />
          <a href={NEWS_SITE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--c-ink)] transition hover:text-[color:var(--c-brand)]">
            All News <ExtArrow />
          </a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <a
              key={n.id}
              href={NEWS_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-[var(--c-panel)] transition-colors border-[color:var(--c-line)] hover:border-[color:var(--c-brand)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage src={n.image} alt={n.title} fallbackLabel={n.category} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3"><BrandTag>{n.category}</BrandTag></span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className=" text-base uppercase leading-tight transition group-hover:text-[color:var(--c-brand)]">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--c-muted)]">{n.excerpt}</p>
                <p className="mt-4  text-[11px] uppercase tracking-[0.12em] text-[color:var(--c-muted)]">{n.date} · {n.source}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-8 text-center  text-[11px] uppercase tracking-[0.14em] text-[color:var(--c-muted)]">
          Full coverage on{' '}
          <a href={NEWS_SITE_URL} target="_blank" rel="noreferrer" className="text-[color:var(--c-brand)] underline-offset-2 hover:underline">news.sarga.co</a>
        </p>
      </div>
    </section>
  )
}
