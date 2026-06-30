import type { DriverStanding, EventStanding, SportStandings, TeamStanding } from '@/types'
import { asset } from '@/lib/utils'

const j = (f: string) => asset(`jockeys/${f}`)
const h = (f: string) => asset(`horses/${f}`)

/** Raw rider rows; totals/positions are derived so per-round points always reconcile. */
interface RiderSeed {
  name: string
  team: string
  image: string
  nationality: string
  trend: number
  poles: number
  byRound: number[]
}

const F1 = 25 // points for a win, MotoGP-style

function buildDrivers(seed: RiderSeed[]): DriverStanding[] {
  return seed
    .map((s) => {
      const points = s.byRound.reduce((a, b) => a + b, 0)
      const wins = s.byRound.filter((p) => p === F1).length
      const podiums = s.byRound.filter((p) => p >= 16).length
      return { ...s, points, wins, podiums, pointsByRound: s.byRound }
    })
    .sort((a, b) => b.points - a.points)
    .map((d, i) => ({
      position: i + 1,
      name: d.name,
      team: d.team,
      points: d.points,
      trend: d.trend,
      image: d.image,
      nationality: d.nationality,
      wins: d.wins,
      podiums: d.podiums,
      poles: d.poles,
      pointsByRound: d.pointsByRound,
    }))
}

function buildTeams(seed: Omit<TeamStanding, 'position'>[]): TeamStanding[] {
  return seed
    .slice()
    .sort((a, b) => b.points - a.points)
    .map((t, i) => ({ ...t, position: i + 1 }))
}

interface EventMeta {
  id: string
  round: string
  name: string
  dateLabel: string
  venue: string
}

/**
 * Derive per-event standings from the season's per-round points.
 * Round i becomes an event: riders ranked by the points they scored that round.
 */
function buildEvents(drivers: DriverStanding[], teams: TeamStanding[], meta: EventMeta[]): EventStanding[] {
  return meta.map((m, i) => {
    const ranked = drivers
      .map((d) => ({ d, pts: d.pointsByRound?.[i] ?? 0 }))
      .sort((a, b) => b.pts - a.pts)
      .map(({ d, pts }, idx): DriverStanding => ({
        position: idx + 1,
        name: d.name,
        team: d.team,
        points: pts,
        trend: 0,
        image: d.image,
        nationality: d.nationality,
      }))

    // Team result for the event mirrors the rider order (one rider per team here).
    const teamOrder = ranked.map((r) => {
      const t = teams.find((tt) => tt.team === r.team || r.team.startsWith(tt.team))
      return { team: r.team, image: t?.image ?? '', points: r.points }
    })

    return {
      ...m,
      drivers: ranked,
      teams: teamOrder.map((t, idx) => ({ position: idx + 1, ...t })),
    }
  })
}

const horseDrivers = buildDrivers([
  { name: 'Rifqi Nur Yulianto', team: 'Royal Dinasty', image: j('rifqi.png'), nationality: 'IDN', trend: 0, poles: 3, byRound: [25, 20, 25, 16, 25] },
  { name: 'Nana Suryana', team: 'Karkasa Stable', image: j('nana.png'), nationality: 'IDN', trend: 2, poles: 1, byRound: [20, 25, 16, 25, 20] },
  { name: 'Sidik Permana', team: 'Merkava Racing', image: j('sidik.png'), nationality: 'IDN', trend: -1, poles: 1, byRound: [16, 16, 20, 20, 16] },
  { name: 'Zainul Fanani', team: 'Elgawira', image: j('zainul.png'), nationality: 'IDN', trend: 1, poles: 0, byRound: [13, 11, 13, 13, 13] },
  { name: 'Samsul Arif', team: 'Rastaban', image: j('samsul.png'), nationality: 'IDN', trend: -2, poles: 0, byRound: [11, 13, 11, 11, 10] },
])
const horseTeams = buildTeams([
  { team: 'Royal Dinasty', points: 312, image: h('royal-dinasty.jpg'), wins: 3, podiums: 9 },
  { team: 'Karkasa Stable', points: 289, image: h('karkasa.jpg'), wins: 2, podiums: 8 },
  { team: 'Merkava Racing', points: 264, image: h('merkava.jpg'), wins: 0, podiums: 6 },
  { team: 'Elgawira', points: 238, image: h('elgawira.jpg'), wins: 0, podiums: 3 },
])

const rxDrivers = buildDrivers([
  { name: 'Zaki Ramadhan', team: 'Swingly Motorsport', image: j('zaki.jpg'), nationality: 'IDN', trend: 1, poles: 2, byRound: [25, 20, 25, 20] },
  { name: 'Nugdha Pratama', team: 'Kembang Tanjung RX', image: j('nugdha.jpg'), nationality: 'IDN', trend: -1, poles: 1, byRound: [20, 25, 20, 25] },
  { name: 'Samsul Arif', team: 'Rastaban Dirt', image: j('samsul.png'), nationality: 'IDN', trend: 3, poles: 1, byRound: [16, 16, 16, 16] },
  { name: 'Sidik Permana', team: 'Merkava Racing', image: j('sidik.png'), nationality: 'IDN', trend: 0, poles: 0, byRound: [13, 13, 11, 13] },
  { name: 'Rifqi Nur Yulianto', team: 'Royal Dinasty RX', image: j('rifqi.png'), nationality: 'IDN', trend: -2, poles: 0, byRound: [11, 10, 13, 11] },
])
const rxTeams = buildTeams([
  { team: 'Swingly Motorsport', points: 281, image: h('swingly.jpg'), wins: 2, podiums: 7 },
  { team: 'Kembang Tanjung RX', points: 272, image: h('kembang-tanjung.jpg'), wins: 2, podiums: 7 },
  { team: 'Rastaban Dirt', points: 244, image: h('rastaban.jpg'), wins: 0, podiums: 4 },
  { team: 'Merkava Racing', points: 219, image: h('merkava.jpg'), wins: 0, podiums: 2 },
])

const msDrivers = buildDrivers([
  { name: 'Nugdha Pratama', team: 'Karkasa Speed', image: j('nugdha.jpg'), nationality: 'IDN', trend: 0, poles: 2, byRound: [25, 20, 25] },
  { name: 'Zaki Ramadhan', team: 'Elgawira GT', image: j('zaki.jpg'), nationality: 'IDN', trend: 1, poles: 1, byRound: [20, 25, 20] },
  { name: 'Zainul Fanani', team: 'Royal Dinasty GT', image: j('zainul.png'), nationality: 'IDN', trend: -1, poles: 0, byRound: [16, 16, 16] },
  { name: 'Nana Suryana', team: 'Merkava Racing', image: j('nana.png'), nationality: 'IDN', trend: 2, poles: 0, byRound: [13, 13, 13] },
  { name: 'Sidik Permana', team: 'Swingly Motorsport', image: j('sidik.png'), nationality: 'IDN', trend: -1, poles: 0, byRound: [11, 11, 13] },
])
const msTeams = buildTeams([
  { team: 'Karkasa Speed', points: 246, image: h('karkasa.jpg'), wins: 2, podiums: 5 },
  { team: 'Elgawira GT', points: 233, image: h('elgawira.jpg'), wins: 1, podiums: 5 },
  { team: 'Royal Dinasty GT', points: 208, image: h('royal-dinasty.jpg'), wins: 0, podiums: 3 },
  { team: 'Swingly Motorsport', points: 187, image: h('swingly.jpg'), wins: 0, podiums: 1 },
])

const champDrivers = buildDrivers([
  { name: 'Rifqi Nur Yulianto', team: 'Royal Dinasty', image: j('rifqi.png'), nationality: 'IDN', trend: 1, poles: 5, byRound: [25, 20, 25, 25, 20, 25, 16, 25, 20] },
  { name: 'Zaki Ramadhan', team: 'Swingly Motorsport', image: j('zaki.jpg'), nationality: 'IDN', trend: -1, poles: 4, byRound: [20, 25, 20, 20, 25, 20, 25, 16, 25] },
  { name: 'Nugdha Pratama', team: 'Karkasa', image: j('nugdha.jpg'), nationality: 'IDN', trend: 2, poles: 4, byRound: [16, 16, 25, 16, 16, 16, 20, 20, 16] },
  { name: 'Nana Suryana', team: 'Karkasa Stable', image: j('nana.png'), nationality: 'IDN', trend: 0, poles: 1, byRound: [25, 13, 13, 13, 13, 13, 13, 13, 13] },
  { name: 'Zainul Fanani', team: 'Elgawira', image: j('zainul.png'), nationality: 'IDN', trend: -2, poles: 1, byRound: [13, 11, 16, 11, 11, 11, 11, 11, 11] },
])
const champTeams = buildTeams([
  { team: 'Royal Dinasty', points: 841, image: h('royal-dinasty.jpg'), wins: 6, podiums: 21 },
  { team: 'Karkasa', points: 807, image: h('karkasa.jpg'), wins: 5, podiums: 19 },
  { team: 'Swingly Motorsport', points: 762, image: h('swingly.jpg'), wins: 4, podiums: 16 },
  { team: 'Elgawira', points: 688, image: h('elgawira.jpg'), wins: 1, podiums: 9 },
])

export const standings: SportStandings[] = [
  {
    sport: 'horse-racing',
    label: 'Horse Racing',
    season: '2026',
    round: 'After Round 5 of 9',
    rounds: ['R1', 'R2', 'R3', 'R4', 'R5'],
    drivers: horseDrivers,
    teams: horseTeams,
    events: buildEvents(horseDrivers, horseTeams, [
      { id: 'hr-r1', round: 'R1', name: 'Jateng Derby', dateLabel: '15 Feb 2026', venue: 'Tegalwaton, Central Java' },
      { id: 'hr-r2', round: 'R2', name: 'Pertiwi Cup', dateLabel: '08 Mar 2026', venue: 'Pulomas, Jakarta' },
      { id: 'hr-r3', round: 'R3', name: 'Piala Raja HB', dateLabel: '30 Mar 2026', venue: 'Sultan’s Turf, Yogyakarta' },
      { id: 'hr-r4', round: 'R4', name: 'Merdeka Classic', dateLabel: '26 Apr 2026', venue: 'Pulomas, Jakarta' },
      { id: 'hr-r5', round: 'R5', name: 'Highland Derby', dateLabel: '24 May 2026', venue: 'Payakumbuh, West Sumatra' },
    ]),
  },
  {
    sport: 'rallycross',
    label: 'Rallycross',
    season: '2026',
    round: 'After Round 4 of 8',
    rounds: ['R1', 'R2', 'R3', 'R4'],
    drivers: rxDrivers,
    teams: rxTeams,
    events: buildEvents(rxDrivers, rxTeams, [
      { id: 'rx-r1', round: 'R1', name: 'Dirt Opener', dateLabel: '22 Mar 2026', venue: 'Sentul, West Java' },
      { id: 'rx-r2', round: 'R2', name: 'Highland Clash', dateLabel: '19 Apr 2026', venue: 'Dago Highland, Bandung' },
      { id: 'rx-r3', round: 'R3', name: 'Coastal RX', dateLabel: '17 May 2026', venue: 'Parangtritis, Yogyakarta' },
      { id: 'rx-r4', round: 'R4', name: 'Night Heat', dateLabel: '14 Jun 2026', venue: 'Dago Highland, Bandung' },
    ]),
  },
  {
    sport: 'motorsport',
    label: 'Motorsport',
    season: '2026',
    round: 'After Round 3 of 7',
    rounds: ['R1', 'R2', 'R3'],
    drivers: msDrivers,
    teams: msTeams,
    events: buildEvents(msDrivers, msTeams, [
      { id: 'ms-r1', round: 'R1', name: 'Speed Opener', dateLabel: '12 Apr 2026', venue: 'Sentul, West Java' },
      { id: 'ms-r2', round: 'R2', name: 'Circuit Clash', dateLabel: '10 May 2026', venue: 'Mandalika, Lombok' },
      { id: 'ms-r3', round: 'R3', name: 'Night Circuit', dateLabel: '07 Jun 2026', venue: 'Mandalika, Lombok' },
    ]),
  },
  {
    sport: 'championship',
    label: 'Championship',
    season: '2026',
    round: 'Overall — all disciplines',
    rounds: ['HR', 'RX', 'MS', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9'],
    drivers: champDrivers,
    teams: champTeams,
    events: buildEvents(champDrivers, champTeams, [
      { id: 'ch-1', round: 'HR', name: 'Horse Racing Leg', dateLabel: '15 Feb 2026', venue: 'Tegalwaton, Central Java' },
      { id: 'ch-2', round: 'RX', name: 'Rallycross Leg', dateLabel: '22 Mar 2026', venue: 'Sentul, West Java' },
      { id: 'ch-3', round: 'MS', name: 'Motorsport Leg', dateLabel: '12 Apr 2026', venue: 'Mandalika, Lombok' },
      { id: 'ch-4', round: 'R4', name: 'Merdeka Leg', dateLabel: '26 Apr 2026', venue: 'Pulomas, Jakarta' },
      { id: 'ch-5', round: 'R5', name: 'Coastal Leg', dateLabel: '17 May 2026', venue: 'Parangtritis, Yogyakarta' },
      { id: 'ch-6', round: 'R6', name: 'Highland Leg', dateLabel: '24 May 2026', venue: 'Payakumbuh, West Sumatra' },
      { id: 'ch-7', round: 'R7', name: 'Night Leg', dateLabel: '07 Jun 2026', venue: 'Mandalika, Lombok' },
      { id: 'ch-8', round: 'R8', name: 'Capital Leg', dateLabel: '21 Jun 2026', venue: 'Pulomas, Jakarta' },
      { id: 'ch-9', round: 'R9', name: 'Grand Final Leg', dateLabel: '27 Sep 2026', venue: 'GBK, Jakarta' },
    ]),
  },
]

/** Back-compat alias — the home section reads season-level standings as before. */
export const leaderboard = standings

export function getStandings(sport: string): SportStandings | undefined {
  return standings.find((c) => c.sport === sport)
}
export const getCategory = getStandings
