import type { NavItem } from '@/types'

/** Sticky primary navigation. No "Register" item — registration is contextual. */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sports', href: '/sports' },
  { label: 'Events', href: '/events' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Media', href: '/#media' },
  { label: 'Community', href: '/#community' },
  { label: 'News', href: '/#news' },
]
