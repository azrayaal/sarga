import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { EventsPage } from '@/pages/EventsPage'
import { EventDetailPage } from '@/pages/EventDetailPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { SportsPage } from '@/pages/SportsPage'
import { SportDetailPage } from '@/pages/SportDetailPage'
import { MediaPage } from '@/pages/MediaPage'
import { FestivalPage } from '@/pages/FestivalPage'
import { RisingStarPage } from '@/pages/RisingStarPage'
import { VenuesPage } from '@/pages/VenuesPage'
import { SargaTechPage } from '@/pages/SargaTechPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * SARGA — 360° sports & entertainment ecosystem.
 * Routes: home, events list, event detail, full standings.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="sports/:id" element={<SportDetailPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="festival" element={<FestivalPage />} />
          <Route path="rising-star" element={<RisingStarPage />} />
          <Route path="venues" element={<VenuesPage />} />
          <Route path="sarga-tech" element={<SargaTechPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
