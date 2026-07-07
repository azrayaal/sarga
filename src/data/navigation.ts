import type { NavItem } from '@/types'

/** Sticky primary navigation. No "Register" item — registration is contextual. */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sports', href: '/sports' },
  { label: 'Events', href: '/events' },
  { label: 'Media', href: '/media' },
  { label: 'Festival', href: '/festival' },
  { label: 'Rising Star', href: '/rising-star' },
  { label: 'Venues', href: '/venues' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Sarga Tech', href: '/sarga-tech' },
]
