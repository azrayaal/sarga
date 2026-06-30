import type { FanRank, GameMode, Reward } from '@/types'

/** Gamification hub — designed to drive registrations and sharing. */
export const gameModes: GameMode[] = [
  {
    id: 'predict',
    title: 'Predict The Winner',
    description: 'Call the podium before lights-out. Nail it and bank bonus points every round.',
    icon: '🏆',
    reward: 'Up to 500 pts / event',
    cta: 'Make a Prediction',
    highlight: true,
  },
  {
    id: 'trivia',
    title: 'Trivia Quiz',
    description: 'Test your SARGA knowledge in 60-second daily quizzes across every sport.',
    icon: '⚡',
    reward: '50 pts / streak day',
    cta: 'Play Trivia',
  },
  {
    id: 'weekly',
    title: 'Weekly Challenges',
    description: 'Fresh missions every Monday — watch, predict, share, climb.',
    icon: '🎯',
    reward: 'Exclusive badges',
    cta: 'View Challenges',
  },
  {
    id: 'referral',
    title: 'Referral Program',
    description: 'Bring your crew. Earn points and VIP unlocks for every friend who registers.',
    icon: '🤝',
    reward: '1,000 pts / referral',
    cta: 'Invite Friends',
  },
]

export const fanLeaderboard: FanRank[] = [
  { position: 1, handle: '@turbo_rina', points: 18420, badge: 'Legend' },
  { position: 2, handle: '@paddock_pro', points: 17110, badge: 'Veteran' },
  { position: 3, handle: '@dirt_devil', points: 15980, badge: 'Veteran' },
  { position: 4, handle: '@grandstand_gita', points: 14250, badge: 'Pro' },
  { position: 5, handle: '@nightcircuit', points: 13600, badge: 'Pro' },
]

export const rewards: Reward[] = [
  { icon: '⭐', label: 'Points', detail: 'Earn on every prediction, quiz & share' },
  { icon: '🎖️', label: 'Badges', detail: 'Unlock tiers from Rookie to Legend' },
  { icon: '📈', label: 'Progress', detail: 'Level up your fan profile each season' },
  { icon: '🎟️', label: 'VIP Unlocks', detail: 'Paddock passes & meet-the-driver access' },
]

/** Rewards redeemable with referral points at the event venue. */
export interface RedeemReward {
  id: string
  label: string
  detail: string
  cost: number
}

export const eventRewards: RedeemReward[] = [
  { id: 'merch', label: 'Limited Tee', detail: 'Event-exclusive merch drop', cost: 500 },
  { id: 'pit', label: 'Pit-lane Walk', detail: 'Behind-the-scenes access pass', cost: 1500 },
  { id: 'upgrade', label: 'Grandstand Upgrade', detail: 'Bump your seat to grandstand', cost: 2500 },
  { id: 'vip', label: 'VIP Paddock Pass', detail: 'Meet-the-driver + lounge', cost: 5000 },
]

/** Points awarded per referral action (dummy economy). */
export const referralRewardPoints = 250

/** Share targets for the gamification + event sections. */
export const shareTargets = [
  { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram' },
  { id: 'x', label: 'X', icon: 'x' },
  { id: 'copy', label: 'Copy link', icon: 'link' },
] as const
