import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '@/data'
import { asset, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'

export function Navbar({ barOpen = true }: { barOpen?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={cn('sticky z-30 border-b border-line bg-paper/95 backdrop-blur transition-[top] duration-200', barOpen ? 'top-11' : 'top-0')}>
      <nav className="container-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <SmartImage src={asset('logos/sarga-mark.png')} alt="SARGA" fallbackLabel="S" className="h-8 w-auto lg:h-9" />
          <span className="font-mega text-2xl uppercase leading-none tracking-tight text-ink lg:text-[28px]">
            SARGA<span className="text-race">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-x-5 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.06em] text-ink-700 transition hover:text-race"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-sm border border-line text-ink-500 transition hover:border-race hover:text-race sm:grid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <Link to="/#community" className="hidden font-display text-sm font-bold uppercase tracking-[0.08em] text-ink-500 transition hover:text-ink xl:inline">
            Login
          </Link>
          <Button asChildHref="/events" size="sm" className="hidden sm:inline-flex">
            Register Event
          </Button>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-line xl:hidden"
          >
            <div className="space-y-1.5">
              <span className={cn('block h-0.5 w-5 bg-ink transition', open && 'translate-y-2 rotate-45')} />
              <span className={cn('block h-0.5 w-5 bg-ink transition', open && 'opacity-0')} />
              <span className={cn('block h-0.5 w-5 bg-ink transition', open && '-translate-y-2 -rotate-45')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden bg-paper transition-[max-height] duration-300 xl:hidden',
          open ? 'max-h-[80vh] border-t border-line' : 'max-h-0',
        )}
      >
        <div className="container-page flex flex-col py-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 font-display text-base font-bold uppercase tracking-[0.06em] text-ink-700"
            >
              {item.label}
            </Link>
          ))}
          <Button asChildHref="/events" className="my-4 w-full" size="lg">
            Register Event
          </Button>
        </div>
      </div>
    </header>
  )
}
