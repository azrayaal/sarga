import type { RisingStar } from '@/types'
import { asset } from '@/lib/utils'

const faces = ['rifqi.png', 'nana.png', 'samsul.png', 'zaki.jpg', 'sidik.png', 'zainul.png']
const j = (n: number) => asset(`jockeys/${faces[n - 1]}`)

/**
 * SARGA Rising Star — the talent pipeline spotlighting the next generation of
 * riders, drivers and athletes across the ecosystem.
 */
export const risingStarIntro = {
  tagline: 'The next generation, discovered',
  description:
    'SARGA Rising Star scouts, develops and showcases young talent across every discipline. From grassroots tracks to the national stage, this is where tomorrow’s champions are made.',
  hero: asset('heroes/hero-championship.jpg'),
  stats: [
    { label: 'Prospects', value: '48' },
    { label: 'Disciplines', value: '4' },
    { label: 'Scouted 2026', value: '12' },
    { label: 'Avg. age', value: '19' },
  ],
}

export const risingStars: RisingStar[] = [
  { id: 'rs-01', name: 'Raka Aditya', discipline: 'horse-racing', sportLabel: 'Horse Racing', age: 18, region: 'Payakumbuh', image: j(1), achievement: 'Youngest IHR feature-race winner', stat: { label: 'Wins 2026', value: '9' }, rank: 1 },
  { id: 'rs-02', name: 'Sinta Larasati', discipline: 'motorsport', sportLabel: 'Motorsport', age: 20, region: 'Bandung', image: j(2), achievement: 'Speed Series rookie pole record', stat: { label: 'Poles', value: '5' }, rank: 2 },
  { id: 'rs-03', name: 'Bima Prasetyo', discipline: 'horse-racing', sportLabel: 'Horse Racing', age: 17, region: 'Jakarta', image: j(3), achievement: 'National apprentice title', stat: { label: 'Podiums', value: '14' }, rank: 3 },
  { id: 'rs-04', name: 'Kayla Rahmawati', discipline: 'motorsport', sportLabel: 'Motorsport', age: 19, region: 'Surabaya', image: j(4), achievement: 'Fastest junior time-attack lap', stat: { label: 'Best lap', value: '1:42' }, rank: 4 },
  { id: 'rs-05', name: 'Deni Kurniawan', discipline: 'horse-racing', sportLabel: 'Horse Racing', age: 21, region: 'Makassar', image: j(5), achievement: 'Most improved rider of the season', stat: { label: 'Wins 2026', value: '6' }, rank: 5 },
  { id: 'rs-06', name: 'Aline Suryani', discipline: 'motorsport', sportLabel: 'Motorsport', age: 18, region: 'Medan', image: j(6), achievement: 'First female Speed Series podium', stat: { label: 'Podiums', value: '3' }, rank: 6 },
]

/** The path from grassroots to the pro grid. */
export const risingStarProgram = [
  { step: '01', title: 'Scouting', detail: 'Regional trials and open days spot raw talent at grassroots tracks nationwide.' },
  { step: '02', title: 'Academy', detail: 'Selected prospects join the SARGA Academy for coaching, fitness and race craft.' },
  { step: '03', title: 'Showcase', detail: 'Rising Stars race on the undercard of every major SARGA event, watched by scouts.' },
  { step: '04', title: 'Pro Grid', detail: 'Top graduates earn contracts and a seat on the national championship grid.' },
]
