import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { EventBar } from './EventBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollManager } from './ScrollManager'
import { FeaturedEventModal } from './FeaturedEventModal'

/** Shared chrome around every route. */
export function Layout() {
  const [barOpen, setBarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-paper">
      <ScrollManager />
      <EventBar open={barOpen} onClose={() => setBarOpen(false)} />
      <Navbar barOpen={barOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FeaturedEventModal />
    </div>
  )
}
