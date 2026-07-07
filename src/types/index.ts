/**
 * Shared domain types for the SARGA ecosystem.
 *
 * Everything the UI renders flows through these shapes, so swapping the dummy
 * data modules in `src/data` for a CMS / API later is a drop-in change as long
 * as the responses are mapped back to these interfaces.
 */

export type SportId =
  | 'horse-racing'
  | 'rallycross'
  | 'motorsport'
  | 'championship'
  | 'community'

export interface Sport {
  id: SportId
  name: string
  tagline: string
  description: string
  image: string
  /** Tailwind text/utility accent kept per-sport for subtle differentiation. */
  accent: string
  stat: { label: string; value: string }
  url?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface HeroSlide {
  id: string
  sport: SportId
  sportLabel: string
  title: string
  subtitle: string
  description: string
  image: string
  /** Optional looping background video (takes precedence over image when present). */
  video?: string
  venue: string
  /** ISO date string for the countdown target. */
  startsAt: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export type EventStatus = 'registration-open' | 'selling-fast' | 'coming-soon' | 'live' | 'completed'

export interface EventCard {
  id: string
  title: string
  sport: SportId
  sportLabel: string
  banner: string
  venue: string
  city: string
  /** ISO date string. */
  date: string
  dateLabel: string
  status: EventStatus
  priceFrom?: string
  spotsLabel?: string
  cta: string
  /** 'upcoming' events take registrations; 'past' events show results + gallery. */
  kind: 'upcoming' | 'past'
  /** Marks the marquee event surfaced in the homepage popup. */
  starred?: boolean
  /** Short promo hook shown in the featured popup. */
  promo?: string
}

export interface ScheduleItem {
  time: string
  title: string
  detail?: string
}

export interface TicketType {
  id: string
  name: string
  price: string
  perks: string[]
  /** Highlighted / recommended tier. */
  featured?: boolean
  soldOut?: boolean
}

export interface RaceResult {
  className: string
  distance: string
  winner: string
  region: string
}

export interface EventFaq {
  q: string
  a: string
}

/** Full event detail — extends the card with everything the detail page needs. */
export interface EventDetail extends EventCard {
  gatesOpen: string
  endDate?: string
  endDateLabel?: string
  overview: string[]
  highlights: string[]
  schedule: ScheduleItem[]
  tickets: TicketType[]
  gallery: string[]
  faqs: EventFaq[]
  address: string
  results?: RaceResult[]
  attendance?: string
}

export interface DriverStanding {
  position: number
  name: string
  team: string
  points: number
  /** Position change vs. previous round. Positive = climbed. */
  trend: number
  image: string
  nationality: string
  /** Extra stats for the full standings table. */
  wins?: number
  podiums?: number
  poles?: number
  /** Points scored per round (aligns with LeaderboardCategory.rounds). */
  pointsByRound?: number[]
}

export interface TeamStanding {
  position: number
  team: string
  points: number
  image: string
  wins?: number
  podiums?: number
}

export interface LeaderboardCategory {
  sport: SportId
  label: string
  round: string
  /** Short round codes for the per-round columns, e.g. ['R1','R2',...]. */
  rounds?: string[]
  drivers: DriverStanding[]
  teams: TeamStanding[]
}

/** Standings for a single event/round within a sport (sport → event → standings). */
export interface EventStanding {
  id: string
  round: string
  name: string
  dateLabel: string
  venue: string
  /** Finishing order for this event (position by points scored). */
  drivers: DriverStanding[]
  teams: TeamStanding[]
}

/** A sport's full standings: season aggregate + per-event breakdown. */
export interface SportStandings extends LeaderboardCategory {
  season: string
  events: EventStanding[]
}

export type MediaCategory =
  | 'shorts'
  | 'highlights'
  | 'behind-the-scenes'
  | 'interviews'
  | 'community'
  | 'teasers'

export interface MediaItem {
  id: string
  title: string
  category: MediaCategory
  categoryLabel: string
  thumbnail: string
  duration: string
  views: string
}

export interface GameMode {
  id: string
  title: string
  description: string
  icon: string
  reward: string
  cta: string
  highlight?: boolean
}

export interface FanRank {
  position: number
  handle: string
  points: number
  badge: string
}

export interface Reward {
  icon: string
  label: string
  detail: string
}

export interface Partner {
  name: string
  logo: string
}

/* ── Festival ─────────────────────────────────────────────────────────── */

export interface FestivalExperience {
  id: string
  title: string
  description: string
  /** Icon key resolved by the page's local icon map. */
  icon: string
  image: string
}

export interface FestivalAct {
  id: string
  name: string
  genre: string
  time: string
  image: string
  /** Marks the marquee headliner. */
  headliner?: boolean
}

export interface FestivalEdition {
  year: string
  name: string
  city: string
  attendance: string
  image: string
}

/* ── Rising Star ──────────────────────────────────────────────────────── */

export interface RisingStar {
  id: string
  name: string
  discipline: SportId
  sportLabel: string
  age: number
  region: string
  image: string
  achievement: string
  stat: { label: string; value: string }
  /** Program spotlight rank (1 = top prospect). */
  rank: number
}

/* ── Venues ───────────────────────────────────────────────────────────── */

export type VenueType = 'racetrack' | 'circuit' | 'arena' | 'festival-ground'

export interface Venue {
  id: string
  name: string
  city: string
  type: VenueType
  typeLabel: string
  capacity: string
  surface: string
  image: string
  description: string
  /** Human label for hosted events, e.g. "24 events / yr". */
  events: string
  featured?: boolean
}

/* ── Sarga Tech ───────────────────────────────────────────────────────── */

export interface TechProduct {
  id: string
  name: string
  category: string
  description: string
  /** Icon key resolved by the page's local icon map. */
  icon: string
  features: string[]
  highlight?: boolean
}

export interface TechStat {
  label: string
  value: string
}
