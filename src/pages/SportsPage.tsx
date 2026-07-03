import { Link } from 'react-router-dom'
import { sports, events } from '@/data'
import { ArrowRight } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'
import { SportIcon } from '@/components/ui/SportIcon'

/** Explore by Sport — overview of every category in the SARGA ecosystem. */
export function SportsPage() {
  const countFor = (id: string) => events.filter((e) => e.sport === id).length

  return (
    <>
      <header className="bg-night text-white">
        <div className="container-page py-12 sm:py-16">
          <nav className="byline mb-4 flex items-center gap-2 text-white/45">
            <Link to="/" className="transition hover:text-white">Home</Link><span>/</span>
            <span className="text-white">Sports</span>
          </nav>
          <span className="kicker mb-2"><span className="h-3 w-1 bg-race" />360° Ecosystem</span>
          <h1 className="font-mega text-5xl uppercase leading-none sm:text-7xl">Explore by Sport</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/60">
            One platform, every discipline. Dive into a category to see its events, standings and
            the stories around it.
          </p>
        </div>
      </header>

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {sports.map((sport) => {
           

            return (
              <Link
                key={sport.id}
                  to={
                    sport.url
                      ? sport.url
                      : `/sports/${sport.id}`
                  }
                target={sport.url ? '_blank' : undefined}
                rel={sport.url ? 'noopener noreferrer' : undefined}
                className="group relative overflow-hidden rounded-md border border-line bg-night"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <SmartImage
                    src={sport.image}
                    alt={sport.name}
                    fallbackLabel={sport.name}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

                  <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-sm bg-race text-white">
                    <SportIcon sport={sport.id} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="byline text-race">{sport.tagline}</p>
                    <h2 className="font-mega text-3xl uppercase leading-none text-white sm:text-4xl">
                      {sport.name}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-5">
                  <p className="line-clamp-2 max-w-md text-sm text-white/60">
                    {sport.description}
                  </p>

                  <div className="shrink-0 text-right">
                    <p className="font-mega text-2xl leading-none text-white">
                      {countFor(sport.id)}
                    </p>
                    <p className="byline text-white/45">Events</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                  <span className="byline text-white/45">
                    {sport.stat.value} · {sport.stat.label}
                  </span>

                  <span className="view-more text-white group-hover:text-race">
                    Explore <ArrowRight />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
