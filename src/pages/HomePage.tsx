import {
  Categories,
  Community,
  // Gamification,
  Hero,
  Leaderboard,
  LiveMedia,
  News,
  Reels,
  UpcomingEvents,
} from '@/components/sections'

/**
 * Home — MotoGP-style engagement flow on a light editorial canvas:
 * hero → ecosystem → standings → events → media → gamification → news → community.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <UpcomingEvents />
      <Leaderboard />
      <LiveMedia />
      <Reels />
      {/* <Gamification /> */}
      <News />
      <Community />
    </>
  )
}
