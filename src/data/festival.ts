import type { FestivalExperience, FestivalAct, FestivalEdition } from '@/types'
import { asset } from '@/lib/utils'

const m = (n: number) => asset(`media/media-${n}.jpg`)

/** SARGA Festival — the live entertainment layer wrapped around every race weekend. */
export const festivalIntro = {
  edition: 'SARGA Festival 2026',
  tagline: 'Where the race becomes a party',
  dateLabel: '12–14 SEP 2026',
  venue: 'Grand Circuit Park',
  city: 'Jakarta',
  description:
    'Three days of racing, live music, food and culture. SARGA Festival turns every Grand Final weekend into a full-scale entertainment destination — from the trackside grandstands to the neon-lit fan city after dark.',
  hero: asset('heroes/hero-community.jpg'),
  stats: [
    { label: 'Days', value: '3' },
    { label: 'Live acts', value: '40+' },
    { label: 'Fan zones', value: '8' },
    { label: 'Expected crowd', value: '120k' },
  ],
}

export const festivalExperiences: FestivalExperience[] = [
  { id: 'fanzone', title: 'Fan Zone', description: 'Trackside grandstands, big-screen replays and driver meet-and-greets at the heart of the action.', icon: 'flag', image: m(5) },
  { id: 'stage', title: 'Live Music Stage', description: 'Headline artists and local bands lighting up the main stage from sundown to close.', icon: 'music', image: m(1) },
  { id: 'bazaar', title: 'Food & Street Bazaar', description: 'A curated line-up of Indonesia’s best street food, coffee roasters and craft vendors.', icon: 'food', image: m(3) },
  { id: 'esports', title: 'Esports Arena', description: 'Sim-racing tournaments and open play — take the wheel and set the fastest festival lap.', icon: 'game', image: m(7) },
  { id: 'kids', title: 'Kids & Family Park', description: 'Rides, karting for juniors and hands-on pit-crew games for the whole family.', icon: 'family', image: m(2) },
  { id: 'market', title: 'Merch & Culture Market', description: 'Official team merch, artist collabs and limited festival drops you won’t find anywhere else.', icon: 'shop', image: m(8) },
]

export const festivalLineup: FestivalAct[] = [
  { id: 'a1', name: 'The Midnight Riders', genre: 'Headliner · Rock', time: 'Sat · 21:30', image: m(4), headliner: true },
  { id: 'a2', name: 'Neon Kuda', genre: 'Electronic', time: 'Fri · 20:00', image: m(6) },
  { id: 'a3', name: 'Rimba Collective', genre: 'Indie / World', time: 'Sat · 19:00', image: m(2) },
  { id: 'a4', name: 'DJ Velocity', genre: 'House · After-race set', time: 'Sun · 22:00', image: m(7) },
  { id: 'a5', name: 'Payakumbuh Brass', genre: 'Live Brass', time: 'Fri · 18:00', image: m(1) },
  { id: 'a6', name: 'Sirkuit Sound System', genre: 'Bass / Dub', time: 'Sat · 23:00', image: m(3) },
]

export const festivalEditions: FestivalEdition[] = [
  { year: '2025', name: 'SARGA Festival · Bandung', city: 'Bandung', attendance: '96k', image: m(8) },
  { year: '2024', name: 'SARGA Festival · Payakumbuh', city: 'Payakumbuh', attendance: '72k', image: m(5) },
  { year: '2023', name: 'SARGA Festival · Jakarta', city: 'Jakarta', attendance: '58k', image: m(6) },
]
