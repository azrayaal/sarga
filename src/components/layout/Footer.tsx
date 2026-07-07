import { Link } from 'react-router-dom'
import { asset } from '@/lib/utils'
import { partners } from '@/data'
import { SmartImage } from '@/components/ui/SmartImage'

type FooterLink = { label: string; href?: string }

const ecosystem: FooterLink[] = [
  { label: 'Sports', href: '/sports' },
  { label: 'Events', href: '/events' },
  { label: 'Media', href: '/media' },
  { label: 'Festival', href: '/festival' },
  { label: 'Rising Star', href: '/rising-star' },
  { label: 'Venues', href: '/venues' },
]
const company: FooterLink[] = [
  { label: 'About SARGA' },
  { label: 'Careers' },
  { label: 'Newsroom' },
  { label: 'Partnerships' },
  { label: 'Sarga Tech', href: '/sarga-tech' },
]
const support: FooterLink[] = [
  { label: 'Help Center' },
  { label: 'Buy Tickets', href: '/events' },
  { label: 'Register Event', href: '/events' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'FAQ' },
]
const socials = ['Instagram', 'YouTube', 'TikTok', 'X', 'Facebook']

export function Footer() {
  return (
    <footer className="bg-night-800 text-white">
      {/* Sponsors marquee strip */}
      <div className="border-y border-white/10 py-7">
        <p className="container-page byline mb-5 text-center text-white/40">Official Partners &amp; Sponsors</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 px-4">
          {partners.map((p) => (
            <SmartImage
              key={p.name}
              src={p.logo}
              alt={p.name}
              fallbackLabel={p.name}
              className="h-8 w-auto max-w-[120px] object-contain opacity-50 grayscale brightness-0 invert transition hover:opacity-100"
            />
          ))}
        </div>
      </div>

      <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-6">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <SmartImage src={asset('logos/sarga-mark.png')} alt="SARGA" fallbackLabel="S" className="h-9 w-auto" />
            <span className="font-mega text-2xl uppercase leading-none">SARGA<span className="text-race">.</span></span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/55">
            A 360° sports &amp; entertainment ecosystem. From local track to global highlights —
            the central hub of every SARGA experience.
          </p>
          <div className="mt-5 space-y-1 text-sm text-white/55">
            <p>hello@sarga.co</p>
            <p>Jakarta · Bandung · Payakumbuh</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a key={s} href="#" className="rounded-sm border border-white/15 px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-white/65 transition hover:border-race hover:text-white">{s}</a>
            ))}
          </div>
        </div>

        <FooterCol title="Ecosystem" links={ecosystem} />
        <FooterCol title="Company" links={company} />
        <FooterCol title="Support" links={support} />
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-white/40 sm:flex-row">
          <p className="byline">© 2026 SARGA. All rights reserved.</p>
          <p className="byline">
            Powered by <span className="font-bold text-white">SAGARA TECH</span>
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms', 'Cookies'].map((l) => (
              <a key={l} href="#" className="byline transition hover:text-white">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.1em]">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) =>
          l.href ? (
            <li key={l.label}><Link to={l.href} className="text-sm text-white/55 transition hover:text-race">{l.label}</Link></li>
          ) : (
            <li key={l.label}><a href="#" className="text-sm text-white/55 transition hover:text-race">{l.label}</a></li>
          ),
        )}
      </ul>
    </div>
  )
}
