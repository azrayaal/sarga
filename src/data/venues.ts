import type { Venue } from '@/types'
import { asset } from '@/lib/utils'

const ev = (name: string) => asset(`events/${name}`)
const sp = (name: string) => asset(`sports/${name}`)

/** SARGA Venues — the circuits, tracks and grounds that host the ecosystem. */
export const venueIntro = {
  tagline: 'Where SARGA comes alive',
  description:
    'From championship racetracks to purpose-built festival grounds, SARGA venues are engineered for world-class competition and unforgettable crowds. Explore the homes of the ecosystem across Indonesia.',
  hero: asset('heroes/hero-motorsport.jpg'),
  stats: [
    { label: 'Venues', value: '7' },
    { label: 'Cities', value: '6' },
    { label: 'Total seats', value: '210k' },
    { label: 'Events / yr', value: '90+' },
  ],
}

export const venues: Venue[] = [
  {
    id: 'grand-circuit-park', name: 'Grand Circuit Park', city: 'Jakarta',
    type: 'circuit', typeLabel: 'Circuit', capacity: '65,000', surface: 'Asphalt · 4.2 km',
    image: sp('motorsport.jpg'),
    description: 'The flagship home of the Speed Series and SARGA Festival — a floodlit permanent circuit built for night racing.',
    events: '24 events / yr', featured: true,
  },
  {
    id: 'payakumbuh-turf', name: 'Payakumbuh Turf Club', city: 'Payakumbuh',
    type: 'racetrack', typeLabel: 'Racetrack', capacity: '28,000', surface: 'Turf · 1,800 m',
    image: ev('event-payakumbuh.jpg'),
    description: 'A historic thoroughbred track set against the West Sumatran highlands — heartland of Indonesian horse racing.',
    events: '18 events / yr',
  },
  {
    id: 'merdeka-raceway', name: 'Merdeka Raceway', city: 'Bandung',
    type: 'racetrack', typeLabel: 'Racetrack', capacity: '32,000', surface: 'Turf · 2,000 m',
    image: ev('event-merdeka-cup.jpg'),
    description: 'Host of the Merdeka Cup, with sweeping grandstands and a straight built for photo-finishes.',
    events: '15 events / yr',
  },
  {
    id: 'derby-park', name: 'Derby Park Jakarta', city: 'Jakarta',
    type: 'racetrack', typeLabel: 'Racetrack', capacity: '40,000', surface: 'Turf · 2,400 m',
    image: ev('event-derby.jpg'),
    description: 'The stage for the season-ending Derby classic — the largest turf crowd in the country.',
    events: '12 events / yr',
  },
  {
    id: 'sarga-arena', name: 'SARGA Arena', city: 'Surabaya',
    type: 'arena', typeLabel: 'Arena', capacity: '18,000', surface: 'Indoor · multi-use',
    image: sp('championship.jpg'),
    description: 'An indoor esports and awards arena hosting the championship gala and sim-racing finals.',
    events: '30 events / yr',
  },
  {
    id: 'festival-grounds', name: 'Neon Festival Grounds', city: 'Jakarta',
    type: 'festival-ground', typeLabel: 'Festival Ground', capacity: '80,000', surface: 'Open-air',
    image: sp('community.jpg'),
    description: 'The open-air fan city that wraps every Grand Final weekend in music, food and culture.',
    events: '6 events / yr',
  },
]

export function getVenue(id: string): Venue | undefined {
  return venues.find((v) => v.id === id)
}
