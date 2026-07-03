import type { Sport } from '@/types'
import { asset } from '@/lib/utils'

const cover = (id: string) => asset(`sports/${id}.jpg`)
const g = (n: number) => asset(`media/media-${n}.jpg`)

/** The SARGA multi-sport ecosystem. Drives the Sports rail, /sports pages and hero categories. */
export const sports: Sport[] = [
  {
    id: 'horse-racing',
    name: 'Horse Racing',
    tagline: 'The flagship spectacle',
    description:
      'Indonesia’s premier thoroughbred circuit — derbies, classics and the IHR Championship series from local tracks to global highlights.',
    image: cover('horse-racing'),
    accent: 'text-flame-400',
    stat: { label: 'Races / season', value: '120+' },
    url: 'https://sarga-horse.vercel.app/',
  },
  // {
  //   id: 'rallycross',
  //   name: 'Rallycross',
  //   tagline: 'Dirt, drift & adrenaline',
  //   description:
  //     'Wheel-to-wheel mixed-surface racing built for short, explosive heats and roaring crowds across four surfaces.',
  //   image: cover('rallycross'),
  //   accent: 'text-flame-500',
  //   stat: { label: 'Heats / round', value: '16' },
  // },
  {
    id: 'motorsport',
    name: 'Motorsport',
    tagline: 'Pure track speed',
    description:
      'Circuit racing, time-attack and the SARGA Speed Series — precision engineering at full throttle under the lights.',
    image: cover('rallycross'),
    accent: 'text-flame-500',
    stat: { label: 'Top speed', value: '290km/h' },
    url: 'https://sarga-motorsport.vercel.app/',
  },
  // {
  //   id: 'championship',
  //   name: 'Championship',
  //   tagline: 'The road to the crown',
  //   description:
  //     'Season-long points battles across every SARGA discipline, decided under the lights at the Grand Final.',
  //   image: cover('championship'),
  //   accent: 'text-flame-600',
  //   stat: { label: 'Title rounds', value: '9' },
  // },
  // {
  //   id: 'community',
  //   name: 'Community & Festival',
  //   tagline: 'Where fans become the show',
  //   description:
  //     'Fan zones, festivals, fun-games and grassroots meetups that turn race weekends into full ecosystem experiences.',
  //   image: cover('community'),
  //   accent: 'text-flame-400',
  //   stat: { label: 'Fans / event', value: '40k+' },
  // },
]

/** Extra per-sport gallery imagery for the sport detail pages. */
export const sportGalleries: Record<string, string[]> = {
  'horse-racing': [g(2), g(8), g(1)],
  rallycross: [g(4), g(7), g(3)],
  motorsport: [g(3), g(6), g(8)],
  championship: [g(6), g(2), g(5)],
  community: [g(5), g(1), g(7)],
}

export function getSport(id: string): Sport | undefined {
  return sports.find((s) => s.id === id)
}
