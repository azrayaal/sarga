import { Outlet } from 'react-router-dom'
import { EventBar } from './EventBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollManager } from './ScrollManager'
import { FeaturedEventModal } from './FeaturedEventModal'

/** Shared chrome around every route. */
export function Layout() {
  return (
    <div className="min-h-screen bg-paper">
      <ScrollManager />
      <EventBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FeaturedEventModal />
    </div>
  )
}
