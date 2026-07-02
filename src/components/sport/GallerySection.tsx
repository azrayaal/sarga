import type { Sport } from '@/types'
import { SmartImage } from '@/components/ui/SmartImage'
import { SectionHead, cnJoin } from './primitives'

/** Photo grid for the sport, with a featured lead tile. */
export function GallerySection({ sport, gallery }: { sport: Sport; gallery: string[] }) {
  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHead kicker="Gallery" title="From the Track" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <div key={i} className={cnJoin('overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--c-line)]', i === 0 && 'col-span-2 sm:col-span-1 sm:row-span-2')}>
              <SmartImage src={src} alt={`${sport.name} ${i + 1}`} className={cnJoin('w-full transition-transform duration-700 hover:scale-105', i === 0 ? 'aspect-[4/3] sm:h-full sm:aspect-auto' : 'aspect-[4/3]')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
