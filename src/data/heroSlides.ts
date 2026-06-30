import type { HeroSlide } from '@/types'
import { asset } from '@/lib/utils'

/**
 * Full-screen, auto-rotating hero slides — one per ecosystem pillar.
 * `startsAt` values are future-dated so the countdown stays live.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 'ihr-payakumbuh',
    sport: 'horse-racing',
    sportLabel: 'Horse Racing',
    title: 'IHR Championship · Payakumbuh',
    subtitle: 'Round 6 — The Highland Derby',
    description:
      'The fastest thoroughbreds in the archipelago descend on the highlands. Grandstand, paddock and fan-zone passes are open now.',
    image: asset('heroes/hero-horse-racing.jpg'),
    video: asset('videos/sarga-hero.mp4'),
    venue: 'Payakumbuh Turf, West Sumatra',
    startsAt: '2026-07-19T15:00:00+07:00',
    ctaPrimary: { label: 'Register Event', href: '#events' },
    ctaSecondary: { label: 'Explore Event', href: '#events' },
  },
  {
    id: 'rallycross-bandung',
    sport: 'rallycross',
    sportLabel: 'Rallycross',
    title: 'SARGA Rallycross · Bandung',
    subtitle: 'Mixed-Surface Showdown',
    description:
      'Six corners, four surfaces, zero margin for error. Lock in your driver entry or trackside seat before the gates close.',
    image: asset('heroes/hero-rallycross.jpg'),
    venue: 'Sirkuit Dago Highland, Bandung',
    startsAt: '2026-08-09T16:30:00+07:00',
    ctaPrimary: { label: 'Register Event', href: '#events' },
    ctaSecondary: { label: 'Explore Event', href: '#events' },
  },
  {
    id: 'motorsport-mandalika',
    sport: 'motorsport',
    sportLabel: 'Motorsport',
    title: 'SARGA Speed Series · Mandalika',
    subtitle: 'Round 4 — Night Circuit',
    description:
      'Floodlit asphalt, 290km/h straights and the closest grid of the season. Be on the grid or in the stands.',
    image: asset('heroes/hero-motorsport.jpg'),
    venue: 'Mandalika International Circuit',
    startsAt: '2026-08-30T19:00:00+07:00',
    ctaPrimary: { label: 'Register Event', href: '#events' },
    ctaSecondary: { label: 'Explore Event', href: '#events' },
  },
  {
    id: 'championship-grand-final',
    sport: 'championship',
    sportLabel: 'Championship',
    title: 'SARGA Grand Final 2026',
    subtitle: 'One Night. Every Champion. One Crown.',
    description:
      'The season-ending spectacle where every SARGA discipline crowns its champion under the lights. The hype ends here.',
    image: asset('heroes/hero-championship.jpg'),
    venue: 'Gelora Bung Karno, Jakarta',
    startsAt: '2026-09-27T18:00:00+07:00',
    ctaPrimary: { label: 'Register Event', href: '#events' },
    ctaSecondary: { label: 'Explore Event', href: '#events' },
  },
  {
    id: 'sarga-fest',
    sport: 'community',
    sportLabel: 'Community Event',
    title: 'SARGA Festival · Payakumbuh',
    subtitle: 'Sport. Music. Culture. All in one weekend.',
    description:
      'Fan zones, live music, fun-games and meet-the-driver sessions. Bring the whole crew — entry is free with registration.',
    image: asset('heroes/hero-community.jpg'),
    venue: 'SARGA Fan Park, Payakumbuh',
    startsAt: '2026-07-12T10:00:00+07:00',
    ctaPrimary: { label: 'Join Event', href: '#community' },
    ctaSecondary: { label: 'Explore Event', href: '#events' },
  },
]
