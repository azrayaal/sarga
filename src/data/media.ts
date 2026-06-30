import type { MediaItem } from '@/types'
import { asset } from '@/lib/utils'

const m = (n: number) => asset(`media/media-${n}.jpg`)

/** Horizontal media slider content. Future-ready for IG / YouTube Shorts / Media API. */
export const mediaItems: MediaItem[] = [
  { id: 'sh-01', title: 'Final-furlong photo finish you have to see', category: 'shorts', categoryLabel: 'SARGA Shorts', thumbnail: m(1), duration: '0:42', views: '1.2M' },
  { id: 'hl-01', title: 'IHR Round 5 — Full Race Highlights', category: 'highlights', categoryLabel: 'Highlights', thumbnail: m(2), duration: '6:18', views: '684k' },
  { id: 'bts-01', title: 'Inside the paddock at dawn', category: 'behind-the-scenes', categoryLabel: 'Behind the Scenes', thumbnail: m(3), duration: '4:05', views: '212k' },
  { id: 'int-01', title: 'Rifqi Nur: “This crown means everything”', category: 'interviews', categoryLabel: 'Driver Interview', thumbnail: m(4), duration: '8:51', views: '301k' },
  { id: 'cm-01', title: 'Fan zone goes wild at SARGA Festival', category: 'community', categoryLabel: 'Community', thumbnail: m(5), duration: '1:30', views: '498k' },
  { id: 'tz-01', title: 'Grand Final 2026 — Official Teaser', category: 'teasers', categoryLabel: 'Event Teaser', thumbnail: m(6), duration: '0:58', views: '2.4M' },
  { id: 'sh-02', title: 'Rallycross drift compilation', category: 'shorts', categoryLabel: 'SARGA Shorts', thumbnail: m(7), duration: '0:36', views: '903k' },
  { id: 'hl-02', title: 'Merdeka Cup — Top 5 Moments', category: 'highlights', categoryLabel: 'Highlights', thumbnail: m(8), duration: '5:22', views: '377k' },
]
