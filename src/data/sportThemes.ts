import type { SportId } from '@/types'

/**
 * Per-sport "micro-brand" identities. Each SARGA discipline gets its own
 * landing-page look — palette, hero personality and editorial copy — so a
 * sport detail page (`/sports/horse-racing`) reads like a standalone site
 * for that sport rather than a themed sub-page of one template.
 *
 * Colours are plain hex and are injected as CSS custom properties at the page
 * root, so the same JSX renders in any palette without touching Tailwind config.
 */

export interface SportPalette {
  /** Page background. */
  bg: string
  /** Raised surface / alternating section. */
  panel: string
  /** Hairline borders. */
  line: string
  /** Primary brand colour (CTAs, kickers, links). */
  brand: string
  /** Secondary brand colour (used in the signature gradient). */
  brand2: string
  /** A contrasting third accent for details. */
  accent: string
  /** Primary text colour. */
  ink: string
  /** Secondary / muted text colour. */
  muted: string
  /** Text colour that sits on top of a brand-filled surface. */
  onBrand: string
}

export interface BrandSwatch {
  hex: string
  name: string
}

export interface SportTheme {
  /** Sub-brand display name, e.g. "SARGA Horse Sport". */
  brand: string
  /** Faux domain shown in the micro-nav to sell the "different site" feel. */
  domain: string
  kicker: string
  /** Mega hero title, split into stacked lines. */
  heroTitle: string[]
  heroLede: string
  mode: 'light' | 'dark'
  heroVariant: 'editorial' | 'kinetic' | 'tech' | 'prestige' | 'festival' | 'f1'
  palette: SportPalette
  /** Signature CSS gradient string. */
  gradient: string
  about: {
    heading: string
    paragraphs: string[]
    pillars: { value: string; label: string; sub: string }[]
  }
  /** Brand-guide-style colour swatches shown in the About block. */
  swatches: BrandSwatch[]
  /** News categories that belong to this sport (matches `news[].category`). */
  newsCategories: string[]
}

export const sportThemes: Record<SportId, SportTheme> = {
  'horse-racing': {
    brand: 'SARGA Horse Sport',
    domain: 'horse.sarga.co',
    kicker: 'The Flagship Spectacle',
    heroTitle: ['Where', 'Thoroughbreds', 'Become Legends'],
    heroLede:
      'Indonesia’s premier thoroughbred circuit — derbies, classics and the IHR Championship series, from local turf to the global stage.',
    mode: 'light',
    heroVariant: 'editorial',
    palette: {
      bg: '#F6F1E7',
      panel: '#EFE7D6',
      line: '#DED3BE',
      brand: '#E11D2A',
      brand2: '#FF6B1A',
      accent: '#7BB0A6',
      ink: '#17110D',
      muted: '#6E6353',
      onBrand: '#FFFFFF',
    },
    gradient: 'linear-gradient(105deg,#E11D2A 0%,#FF6B1A 100%)',
    about: {
      heading: 'A heritage sport, reimagined',
      paragraphs: [
        'SARGA Horse Sport is the beating heart of the ecosystem — the discipline that started it all. We pair the centuries-old craft of thoroughbred racing with a modern, broadcast-first spectacle built for a new generation of fans.',
        'From highland turf to floodlit city tracks, every meeting is a full day out: paddock walks, fan zones, live music and the roar of the closing straight.',
      ],
      pillars: [
        { value: '120+', label: 'Races', sub: 'per season' },
        { value: '9', label: 'Classics', sub: 'on the calendar' },
        { value: '40k+', label: 'Fans', sub: 'per meeting' },
      ],
    },
    swatches: [
      { hex: '#E11D2A', name: 'Race Red' },
      { hex: '#FF6B1A', name: 'Flame' },
      { hex: '#17110D', name: 'Ink' },
      { hex: '#F6F1E7', name: 'Turf Cream' },
      { hex: '#7BB0A6', name: 'Silks Teal' },
    ],
    newsCategories: ['Horse Racing'],
  },

  rallycross: {
    brand: 'SARGA Rallycross',
    domain: 'rallycross.sarga.co',
    kicker: 'Dirt · Drift · Adrenaline',
    heroTitle: ['Four Surfaces.', 'One', 'Winner.'],
    heroLede:
      'Wheel-to-wheel mixed-surface racing built for short, explosive heats — gravel, tarmac, mud and the joker lap that changes everything.',
    mode: 'dark',
    heroVariant: 'f1',
    palette: {
      bg: '#15151E',
      panel: '#1D1D25',
      line: '#38383F',
      brand: '#E10600',
      brand2: '#B60009',
      accent: '#E10600',
      ink: '#FFFFFF',
      muted: '#B0B2BA',
      onBrand: '#FFFFFF',
    },
    gradient: 'linear-gradient(120deg,#FF1801 0%,#C1000A 100%)',
    about: {
      heading: 'Short heats. Full send.',
      paragraphs: [
        'SARGA Rallycross is the loudest, most explosive corner of the ecosystem — a format engineered for chaos, where every heat is a sprint and the joker lap keeps the result alive until the final metre.',
        'Cars slide across four surfaces in a single lap while packed crowds sit metres from the action. Broadcast with telemetry-rich, edge-of-the-seat coverage — it’s racing with the volume turned all the way up.',
      ],
      pillars: [
        { value: '16', label: 'Heats', sub: 'per round' },
        { value: '4', label: 'Surfaces', sub: 'per lap' },
        { value: '600m', label: 'Sprint', sub: 'circuit length' },
      ],
    },
    swatches: [
      { hex: '#E10600', name: 'Race Red' },
      { hex: '#15151E', name: 'Carbon' },
      { hex: '#38383F', name: 'Steel' },
      { hex: '#B0B2BA', name: 'Silver' },
      { hex: '#FFFFFF', name: 'Snow' },
    ],
    newsCategories: ['Rallycross'],
  },

  motorsport: {
    brand: 'SARGA Motorsport',
    domain: 'motorsport.sarga.co',
    kicker: 'Pure Track Speed',
    heroTitle: ['Precision', 'At', '290 km/h'],
    heroLede:
      'Circuit racing, time-attack and the SARGA Speed Series — precision engineering at full throttle under the lights.',
    mode: 'dark',
    heroVariant: 'tech',
    palette: {
      bg: '#070B12',
      panel: '#0E1420',
      line: '#1C2637',
      brand: '#00C2FF',
      brand2: '#7A5CFF',
      accent: '#C9D6E6',
      ink: '#EAF2FB',
      muted: '#8494A9',
      onBrand: '#05080D',
    },
    gradient: 'linear-gradient(105deg,#00C2FF 0%,#7A5CFF 100%)',
    about: {
      heading: 'Engineered for the limit',
      paragraphs: [
        'SARGA Motorsport is the ecosystem at its most technical — a proving ground where aero, tyre strategy and reaction time decide tenths, and tenths decide championships.',
        'The Speed Series runs day and night rounds on Indonesia’s fastest circuits, streamed with telemetry-rich broadcast built for fans who love the data as much as the drama.',
      ],
      pillars: [
        { value: '290', label: 'km/h', sub: 'top speed' },
        { value: '0–100', label: '2.6s', sub: 'launch' },
        { value: '7', label: 'Circuits', sub: 'per season' },
      ],
    },
    swatches: [
      { hex: '#00C2FF', name: 'Circuit Cyan' },
      { hex: '#7A5CFF', name: 'Violet Drive' },
      { hex: '#070B12', name: 'Carbon' },
      { hex: '#C9D6E6', name: 'Titanium' },
      { hex: '#EAF2FB', name: 'HUD White' },
    ],
    newsCategories: ['Motorsport'],
  },

  championship: {
    brand: 'SARGA Championship',
    domain: 'championship.sarga.co',
    kicker: 'The Road to the Crown',
    heroTitle: ['Nine Rounds.', 'One', 'Champion.'],
    heroLede:
      'Season-long points battles across every SARGA discipline, decided under the lights at the Grand Final.',
    mode: 'dark',
    heroVariant: 'prestige',
    palette: {
      bg: '#100D08',
      panel: '#1A140B',
      line: '#2E2415',
      brand: '#E4B24A',
      brand2: '#C6902A',
      accent: '#F2E4C0',
      ink: '#F7F1E4',
      muted: '#B0A487',
      onBrand: '#100D08',
    },
    gradient: 'linear-gradient(105deg,#F2E4C0 0%,#E4B24A 45%,#C6902A 100%)',
    about: {
      heading: 'Every discipline. One crown.',
      paragraphs: [
        'The SARGA Championship is where the whole ecosystem converges — horse racing, rallycross and motorsport athletes chasing a single, unified title across a season-long points battle.',
        'It builds to the Grand Final: one night, under the lights, where the year’s form counts for everything and a champion is crowned across the sport.',
      ],
      pillars: [
        { value: '9', label: 'Rounds', sub: 'to the title' },
        { value: '3', label: 'Disciplines', sub: 'combined' },
        { value: '1', label: 'Grand Final', sub: 'winner takes all' },
      ],
    },
    swatches: [
      { hex: '#F2E4C0', name: 'Champagne' },
      { hex: '#E4B24A', name: 'Trophy Gold' },
      { hex: '#C6902A', name: 'Bronze' },
      { hex: '#100D08', name: 'Podium Black' },
      { hex: '#B0A487', name: 'Laurel' },
    ],
    newsCategories: ['Championship'],
  },

  community: {
    brand: 'SARGA Community & Festival',
    domain: 'community.sarga.co',
    kicker: 'Where Fans Become the Show',
    heroTitle: ['The Party', 'Around', 'the Race'],
    heroLede:
      'Fan zones, festivals, fun-games and grassroots meetups that turn race weekends into full ecosystem experiences.',
    mode: 'light',
    heroVariant: 'festival',
    palette: {
      bg: '#FDF6F2',
      panel: '#F8ECE9',
      line: '#F0D9D9',
      brand: '#FF3D77',
      brand2: '#FFB020',
      accent: '#2BB6A3',
      ink: '#1B1220',
      muted: '#7A6874',
      onBrand: '#FFFFFF',
    },
    gradient: 'linear-gradient(105deg,#FF3D77 0%,#FFB020 100%)',
    about: {
      heading: 'The other half of race day',
      paragraphs: [
        'SARGA Community & Festival is the ecosystem’s front door — the music, food, games and meet-the-driver moments that turn a race weekend into a festival everyone remembers.',
        'From grassroots meetups to headline fan parks, it’s where new fans fall in love with the sport and lifelong ones find their crew.',
      ],
      pillars: [
        { value: '40k+', label: 'Fans', sub: 'per event' },
        { value: '30+', label: 'Activations', sub: 'per weekend' },
        { value: '12', label: 'Fan Zones', sub: 'nationwide' },
      ],
    },
    swatches: [
      { hex: '#FF3D77', name: 'Festival Pink' },
      { hex: '#FFB020', name: 'Sunburst' },
      { hex: '#2BB6A3', name: 'Teal Pop' },
      { hex: '#FDF6F2', name: 'Warm Paper' },
      { hex: '#1B1220', name: 'Night Out' },
    ],
    newsCategories: ['Community', 'Ecosystem'],
  },
}

export function getSportTheme(id: SportId): SportTheme {
  return sportThemes[id]
}

/** News site the micro-sites deep-link into for full coverage. */
export const NEWS_SITE_URL = 'https://news.sarga.co/id'
