import type { TechProduct, TechStat } from '@/types'
import { asset } from '@/lib/utils'

/**
 * SARGA Tech — the technology platform powering the whole ecosystem:
 * ticketing, live timing, streaming, the fan app and venue operations.
 */
export const techIntro = {
  tagline: 'The engine behind the ecosystem',
  description:
    'SARGA Tech is the in-house platform that runs every event — one connected stack for ticketing, live timing, streaming, fan engagement and venue operations. Built to scale from a local meet to a national championship.',
  hero: asset('heroes/hero-rallycross.jpg'),
}

export const techStats: TechStat[] = [
  { label: 'Tickets processed', value: '3.4M' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Live data points / s', value: '12k' },
  { label: 'Peak concurrent fans', value: '480k' },
]

export const techProducts: TechProduct[] = [
  {
    id: 'ticketing', name: 'Ticketing Engine', category: 'Commerce', icon: 'ticket',
    description: 'High-throughput ticketing with dynamic pricing, seat maps and QR entry — built to survive on-sale spikes.',
    features: ['Dynamic pricing', 'Anti-scalping', 'QR & NFC entry'], highlight: true,
  },
  {
    id: 'timing', name: 'Live Timing', category: 'Data', icon: 'timing',
    description: 'Sub-second timing and scoring streamed straight to the app, broadcast graphics and the leaderboard.',
    features: ['Sub-second latency', 'Sector splits', 'Broadcast feed'],
  },
  {
    id: 'streaming', name: 'Streaming & OTT', category: 'Media', icon: 'stream',
    description: 'Adaptive live streaming with multi-camera, replays and shorts generation for every SARGA event.',
    features: ['Multi-cam', 'Auto-highlights', 'Low-latency HLS'],
  },
  {
    id: 'fan-app', name: 'Fan App & Loyalty', category: 'Engagement', icon: 'app',
    description: 'One app for tickets, live scores, predictions and rewards — the home base for every SARGA fan.',
    features: ['Predictions', 'Rewards points', 'Push alerts'], highlight: true,
  },
  {
    id: 'analytics', name: 'Data & Analytics', category: 'Intelligence', icon: 'chart',
    description: 'Real-time dashboards for organisers — attendance, revenue and engagement in one control room.',
    features: ['Revenue insights', 'Crowd flow', 'Sponsor ROI'],
  },
  {
    id: 'venue-ops', name: 'Venue Operations', category: 'Operations', icon: 'ops',
    description: 'Access control, staffing and incident management to run a safe, smooth event floor at any scale.',
    features: ['Access control', 'Staff dispatch', 'Incident log'],
  },
]

/** The layered SARGA Tech stack, ground-up. */
export const techStack = [
  { layer: 'Fan Layer', detail: 'App, web, kiosks — every touchpoint fans interact with.' },
  { layer: 'Experience APIs', detail: 'Ticketing, loyalty, predictions and content services.' },
  { layer: 'Live Data Core', detail: 'Timing, scoring and streaming ingest at event scale.' },
  { layer: 'Cloud Infrastructure', detail: 'Auto-scaling, multi-region, 99.9% uptime SLA.' },
]
