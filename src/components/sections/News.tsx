import { news } from '@/data/news'
import type { NewsArticle } from '@/data/news'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'

/** Editorial news: a lead feature + a side list + a bottom grid (MotoGP "Latest News"). */
export function News() {
  const feature = news.find((n) => n.feature) ?? news[0]
  const side = news.filter((n) => n.id !== feature.id).slice(0, 3)
  const grid = news.filter((n) => n.id !== feature.id).slice(3)

  return (
    <section id="news" className="bg-paper py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading kicker="Latest" title="SARGA News" moreLabel="All News" moreHref="#news" />

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Lead feature */}
          <a href="#news" className="group lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md">
              <SmartImage src={feature.image} alt={feature.title} fallbackLabel={feature.category} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3"><Badge tone="race">{feature.category}</Badge></span>
            </div>
            <h3 className="mt-4 font-mega text-2xl uppercase leading-[0.95] transition group-hover:text-race sm:text-4xl">{feature.title}</h3>
            <p className="mt-3 max-w-2xl text-sm text-ink-500">{feature.excerpt}</p>
            <p className="byline mt-3 text-ink-500">{feature.date} · by {feature.source}</p>
          </a>

          {/* Trending list */}
          <div className="lg:col-span-5">
            <p className="kicker mb-4"><span className="h-3 w-1 bg-race" />Trending</p>
            <div className="divide-y divide-line">
              {side.map((a, i) => (
                <a key={a.id} href="#news" className="group flex items-start gap-4 py-4 first:pt-0">
                  <span className="font-mega text-3xl leading-none text-ink-300 group-hover:text-race">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <Badge tone="dark" className="mb-1.5">{a.category}</Badge>
                    <h4 className="line-clamp-2 font-display text-base font-bold uppercase leading-tight transition group-hover:text-race">{a.title}</h4>
                    <p className="byline mt-1 text-ink-500">{a.date} · by {a.source}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        {grid.length > 0 && (
          <div className="mt-10 grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <a href="#news" className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md">
        <SmartImage src={article.image} alt={article.title} fallbackLabel={article.category} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3"><Badge tone="race">{article.category}</Badge></span>
      </div>
      <h4 className="mt-3 line-clamp-2 font-display text-lg font-bold uppercase leading-tight transition group-hover:text-race">{article.title}</h4>
      <p className="mt-2 line-clamp-2 text-sm text-ink-500">{article.excerpt}</p>
      <p className="byline mt-2 inline-flex items-center gap-1.5 text-ink-500">{article.date} · by {article.source} <ArrowRight className="h-3 w-3 text-race" /></p>
    </a>
  )
}
