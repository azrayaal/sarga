import { asset } from '@/lib/utils'

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  source: string
  /** Marks the lead/feature story. */
  feature?: boolean
}

export const news: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Rifqi Nur extends championship lead at Round 5',
    excerpt:
      'A flawless ride at the highland turf puts Royal Dinasty firmly in control of the title race with four rounds to run.',
    category: 'Horse Racing',
    image: asset('media/media-2.jpg'),
    date: '30 Jun 2026',
    source: 'SARGA.CO',
    feature: true,
  },
  {
    id: 'n2',
    title: 'SARGA Rallycross adds night-heat format for Bandung',
    excerpt: 'Floodlit mixed-surface racing arrives in August — and driver entries are now open.',
    category: 'Rallycross',
    image: asset('media/media-4.jpg'),
    date: '29 Jun 2026',
    source: 'SARGA.CO',
  },
  {
    id: 'n3',
    title: 'Grand Final 2026 tickets enter Phase 1 release',
    excerpt: 'The season-ending spectacle at GBK goes on sale, with VIP paddock bundles selling fast.',
    category: 'Championship',
    image: asset('media/media-6.jpg'),
    date: '28 Jun 2026',
    source: 'SARGA.CO',
  },
  {
    id: 'n4',
    title: 'Zaki Ramadhan tops opening Speed Series practice',
    excerpt: 'The Elgawira GT driver set the early pace ahead of the Mandalika night round.',
    category: 'Motorsport',
    image: asset('media/media-3.jpg'),
    date: '27 Jun 2026',
    source: 'SARGA.CO',
  },
  {
    id: 'n5',
    title: 'Inside the SARGA Festival fan zone',
    excerpt: 'Music, fun-games and meet-the-driver sessions return bigger for Payakumbuh.',
    category: 'Community',
    image: asset('media/media-5.jpg'),
    date: '26 Jun 2026',
    source: 'SARGA.CO',
  },
  {
    id: 'n6',
    title: 'Karkasa Stable confirm full multi-sport line-up',
    excerpt: 'The stable will campaign across racing, rallycross and motorsport this season.',
    category: 'Ecosystem',
    image: asset('media/media-7.jpg'),
    date: '25 Jun 2026',
    source: 'SARGA.CO',
  },
]
