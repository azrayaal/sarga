# SARGA — 360° Sports & Entertainment Ecosystem

A premium, MotoGP-inspired sports platform for the **SARGA** ecosystem — the central hub
for Horse Racing, Rallycross, Motorsport, Championships, community events and media.

Built with **React + TypeScript + Tailwind CSS + Vite**. Mobile-first, component-based,
dummy-data driven and ready for future CMS/API integration. No backend.

## Design language

A **light, editorial magazine** layout (crisp rectangles, hairline rules, condensed
uppercase display type) that alternates with **dark full-bleed bands** for the hero, video
rail and footer — the MotoGP rhythm. Typography is `Anton` (mega hero), `Saira Condensed`
(headings/labels) and `Inter` (body). The single accent is SARGA race-red `#E11D2A`
(the red end of the brand flame gradient), used for CTAs, kickers and active states.
A fixed MotoGP-style **event bar** sits above the nav with the next event + live countdown.

## Why it looks like this

The experience adapts MotoGP.com's engagement model — not its code — onto SARGA's brand
(editorial light/dark sections + the orange→red flame mark, distilled to a race-red accent):

| MotoGP pattern            | SARGA adaptation                                              |
| ------------------------- | ------------------------------------------------------------ |
| Immersive race hero       | Full-screen auto-rotating hero, one slide per ecosystem pillar with live countdown |
| Championship standings    | Tabbed Leaderboard (driver + team) per sport                 |
| Calendar / buy tickets    | Conversion-first Upcoming Events with countdowns + Register/Get Tickets CTAs |
| Video rail + VideoPass    | Live Media horizontal slider (Shorts/Highlights/Interviews)  |
| Fantasy / Predictor / Guru| Gamification hub (Predict, Trivia, Challenges, Referral, Fan Leaderboard) |
| Fan registration / social | Community channels, newsletter, partners & sponsors          |

Primary KPI is **event registration conversion**, so the flame-gradient `Register Event` /
`Get Tickets` CTA recurs contextually throughout (there is no "Register" nav item).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build
```

## Routes

`react-router-dom` powers four pages under a shared layout (event bar + nav + footer):

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | The full editorial homepage |
| `/sports` | Explore by Sport | All categories with cover art, per-sport icon and event count |
| `/sports/:id` | Sport detail | Events inside the category (upcoming + past) + standings preview + gallery |
| `/events` | Events calendar | Upcoming / Past tabs + sport filters |
| `/events/:id` | Event detail | Overview, schedule, tickets, gallery, results (past), FAQ, **registration form** + **referral gamification** |
| `/leaderboard` | World Standing | MotoGP-style standings, **drill-down: sport → event → standings** (season aggregate or single-event result). `?sport=` preselects a class. |

**Leaderboard drill-down** — two levels everywhere (home section + full page): pick a **sport
(cabang olahraga)**, then an **event** within it (or "Season Standings" for the aggregate).
The season view shows the per-round points table; an event view shows that event's finishing
order, gap and points. Per-event standings are derived from the round data so totals reconcile.

**Event registration** is a dummy form (name/email/phone/ticket/qty) that returns an instant
confirmation + a referral code. **Referral gamification**: share the event (WhatsApp / X /
Instagram / copy link) to earn points, then redeem them for merch, upgrades and VIP passes at
the venue — all client-side state, ready to wire to a real points API.

## Featured-event popup & Reels

- **Featured-event popup** (`FeaturedEventModal`) — a MotoGP-style modal that surfaces the
  starred event (`events.ts` → `starred: true`, exposed as `featuredEvent`) once per session
  (sessionStorage), a beat after load. Dismissible via X, backdrop click or Escape.
- **SARGA Reels** (`Reels` section + `reels.ts`) — a "Latest Content" rail modelled on
  `@indonesiashorseracing` Instagram reels: vertical 9:16 cards with likes/views and a Follow
  CTA. The card shape matches the Instagram Graph API so the dummy data is a drop-in swap.

## Architecture

```
public/assets/        Curated local assets (logos, heroes, events, jockeys, horses, media, sponsors, videos)
src/
  data/               Dummy JSON-shaped data — the single seam to swap for a CMS/API later
                        events.ts (full EventDetail + getEvent), leaderboard.ts (rounds + getCategory)
  types/              Shared domain types (Sport, EventDetail, TicketType, LeaderboardCategory, …)
  hooks/useCountdown  Live countdown ticker
  lib/                utils (cn, asset, placeholder), eventStatus (status badges)
  components/
    ui/               Reusable primitives (Button [route-aware], Badge, Tabs, CountdownTimer,
                        SmartImage, ShareButtons, SectionHeading, EventCard)
    layout/           EventBar, Navbar, Footer, Layout (Outlet), ScrollManager
    sections/         Home sections (Hero, Categories, Leaderboard, UpcomingEvents, LiveMedia,
                        Gamification, News, Community)
  pages/              HomePage, EventsPage, EventDetailPage, LeaderboardPage, NotFoundPage
  App.tsx             Router (BrowserRouter + Routes)
```

## Future integration hooks

- **Data**: every section reads from `src/data/*`. Replace those modules (or fetch into the
  same `src/types` shapes) to wire a CMS/API — no component changes needed.
- **Media**: `LiveMedia` is laid out for Instagram Feed / YouTube Shorts / a Media API
  (placeholders flagged in the UI).
- **Assets**: reference everything through `asset()`; missing files fall back to a generated
  on-brand `SmartImage` placeholder instead of a broken image.
- **Sharing / forms / gamification actions** are presentational stubs ready to be wired up.

## Assets

Curated from the SARGA asset library into `public/assets/`. SARGA currently runs a
horse-racing-first program, so motorsport/rallycross/championship slides reuse the most
cinematic available shots under themed overlays; drop dedicated imagery into the matching
`public/assets/*` folder (same filename) to upgrade any slide instantly.
# sarga
