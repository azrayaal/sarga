import type { Partner } from '@/types'
import { asset } from '@/lib/utils'

const s = (f: string) => asset(`sponsors/${f}`)

export const partners: Partner[] = [
  { name: 'Pertamina', logo: s('pertamina.png') },
  { name: 'Semen Padang', logo: s('semen-padang.png') },
  { name: 'Japfa', logo: s('japfa.png') },
  { name: 'MyRepublic', logo: s('myrepublic.png') },
  { name: 'JHL Collection', logo: s('jhl.png') },
  { name: 'Vitalong-C', logo: s('vitalong.png') },
  { name: 'Arsari', logo: s('arsari.png') },
]

/** Ecosystem-wide headline stats (mirrors sarga.co's spectator/horse counters). */
export const ecosystemStats = [
  { label: 'Spectators', value: '212,750', icon: '👥' },
  { label: 'Live-stream views', value: '1,009,818', icon: '📺' },
  { label: 'Athletes & horses', value: '1,404', icon: '🏇' },
  { label: 'Media coverage', value: '217', icon: '📰' },
]

export const communityChannels = [
  { label: 'WhatsApp Community', detail: '12k+ members', href: '#', accent: 'from-[#25D366] to-[#128C7E]' },
  { label: 'Discord Server', detail: 'Live race chat', href: '#', accent: 'from-[#5865F2] to-[#404EED]' },
  { label: 'Telegram Channel', detail: 'Instant updates', href: '#', accent: 'from-[#2AABEE] to-[#229ED9]' },
]
