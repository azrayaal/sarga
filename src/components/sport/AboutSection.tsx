import type { SportTheme } from '@/data'
import type { Sport } from '@/types'
import { GradText, SectionHead } from './primitives'

/** Story + brand-guide-style identity card (pillars, swatches, gradient). */
export function AboutSection({ theme }: { theme: SportTheme; sport: Sport }) {
  return (
    <section id="about" className="scroll-mt-20 border-y border-[color:var(--c-line)] bg-[var(--c-panel)]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-16">
        <div className="lg:col-span-7">
          <SectionHead kicker="About" title={theme.about.heading} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[color:var(--c-muted)]">
            {theme.about.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {theme.about.pillars.map((pillar) => (
              <div key={pillar.label} className="rounded-[var(--radius-card)] border bg-[var(--c-bg)] p-4 border-[color:var(--c-line)]">
                <p className="font-mega text-3xl leading-none"><GradText>{pillar.value}</GradText></p>
                <p className="mt-1.5 text-sm font-bold uppercase leading-tight">{pillar.label}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--c-muted)]">{pillar.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
