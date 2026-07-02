import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { EventsPage } from '@/pages/EventsPage'
import { EventDetailPage } from '@/pages/EventDetailPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { SportsPage } from '@/pages/SportsPage'
import { HorseRacingPage } from '@/pages/sports/horse-racing'
import { RallycrossPage } from '@/pages/sports/rallycross'
import { MotorsportPage } from '@/pages/sports/motorsport'
import { ChampionshipPage } from '@/pages/sports/championship'
import { CommunityPage } from '@/pages/sports/community'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * SARGA — 360° sports & entertainment ecosystem.
 * Routes: home, events list, event detail, full standings.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone, self-chromed per-sport micro-sites (own nav/footer). */}
        <Route path="sports/horse-racing" element={<HorseRacingPage />} />
        <Route path="sports/rallycross" element={<RallycrossPage />} />
        <Route path="sports/motorsport" element={<MotorsportPage />} />
        <Route path="sports/championship" element={<ChampionshipPage />} />
        <Route path="sports/community" element={<CommunityPage />} />

        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
