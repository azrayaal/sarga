import type { EventStatus } from '@/types'

export type StatusTone = 'race' | 'success' | 'warn' | 'live' | 'dark'

export const statusMeta: Record<EventStatus, { label: string; tone: StatusTone }> = {
  'registration-open': { label: 'Registration Open', tone: 'success' },
  'selling-fast': { label: 'Selling Fast', tone: 'warn' },
  'coming-soon': { label: 'Coming Soon', tone: 'race' },
  live: { label: 'Live Now', tone: 'live' },
  completed: { label: 'Completed', tone: 'dark' },
}

/** Whether a status should show a pulsing dot (urgency / live). */
export const isUrgent = (s: EventStatus) => s === 'live' || s === 'selling-fast'
