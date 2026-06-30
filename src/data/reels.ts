import { asset } from '@/lib/utils'

const m = (n: number) => asset(`media/media-${n}.jpg`)

/** Instagram handle the Reels rail pulls from (future: IG Graph API). */
export const instagramHandle = 'indonesiashorseracing'
export const instagramUrl = `https://www.instagram.com/${instagramHandle}/reels/`

export interface Reel {
  id: string
  caption: string
  thumbnail: string
  likes: string
  views: string
  /** Deep link to the reel (placeholder permalinks for the demo). */
  permalink: string
}

/**
 * Dummy reels modelled on @indonesiashorseracing. Swap for live IG Graph API
 * media (media_type=VIDEO/REELS) — the card shape already matches the API fields.
 */
export const reels: Reel[] = [
  { id: 'r1', caption: 'Photo finish at the Highland Derby 🏇🔥', thumbnail: m(1), likes: '12.4k', views: '210k', permalink: instagramUrl },
  { id: 'r2', caption: 'Paddock energy before lights out ⚡', thumbnail: m(3), likes: '8.1k', views: '142k', permalink: instagramUrl },
  { id: 'r3', caption: 'POV: front row at the SARGA grandstand', thumbnail: m(5), likes: '15.7k', views: '301k', permalink: instagramUrl },
  { id: 'r4', caption: 'Champion’s lap of honour 🏆', thumbnail: m(6), likes: '9.9k', views: '188k', permalink: instagramUrl },
  { id: 'r5', caption: 'Slow-mo gallop you’ll watch twice 🐎', thumbnail: m(2), likes: '22.3k', views: '405k', permalink: instagramUrl },
  { id: 'r6', caption: 'Fan zone vibes at the festival 🎉', thumbnail: m(7), likes: '6.4k', views: '97k', permalink: instagramUrl },
  { id: 'r7', caption: 'Meet the jockeys — behind the scenes', thumbnail: m(8), likes: '7.8k', views: '120k', permalink: instagramUrl },
  { id: 'r8', caption: 'Sunrise track work in Payakumbuh 🌄', thumbnail: m(4), likes: '5.2k', views: '83k', permalink: instagramUrl },
]
