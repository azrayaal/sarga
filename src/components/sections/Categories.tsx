import { Link } from 'react-router-dom'
import { sports } from '@/data'
import { ArrowRight } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'
import { cn } from '@/lib/utils'

/** "Explore by sport" — Sport-News-style category tile grid (light). */
export function Categories() {
  return (
    <section id="sports" className="bg-paper py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading kicker="360° Ecosystem" title="Explore by Sport" moreLabel="All Sports" moreHref="/sports" />

     <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {sports.map((sport, i) => {
          const onlyTwo = sports.length === 2
          const wide = !onlyTwo && i === 0

          return (
            <Link
              key={sport.id}
              to={`/sports/${sport.id}`}
              className={cn(
                'group relative overflow-hidden rounded-md bg-night',
                wide
                  ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto'
                  : 'aspect-[4/3]',
                onlyTwo && 'md:col-span-2' // masing-masing ambil setengah row saat cuma 2
              )}
            >
              <SmartImage
                src={sport.image}
                alt={sport.name}
                fallbackLabel={sport.name}
                className="h-full w-full transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />

              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm bg-night/70 text-white backdrop-blur transition group-hover:bg-race">
                <SportIcon sport={sport.id} className="h-5 w-5" />
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div>
                  <p className="byline text-race">
                    {sport.stat.value} · {sport.stat.label}
                  </p>

                  <h3
                    className={cn(
                      'font-mega uppercase leading-none text-white',
                      wide
                        ? 'text-3xl sm:text-5xl'
                        : 'text-xl sm:text-2xl'
                    )}
                  >
                    {sport.name}
                  </h3>
                </div>

                <span className="grid h-9 w-9 shrink-0 translate-x-2 place-items-center rounded-sm bg-race text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowRight />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      </div>
    </section>
  )
}
