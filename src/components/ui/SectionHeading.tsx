import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight } from './Button'

/**
 * Editorial section header: red kicker tick + condensed uppercase title,
 * optional right-aligned "VIEW MORE" link. `dark` flips colors for dark sections.
 */
export function SectionHeading({
  kicker,
  title,
  moreLabel,
  moreHref,
  dark = false,
  className,
}: {
  kicker?: string
  title: ReactNode
  moreLabel?: string
  moreHref?: string
  dark?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between gap-4 border-b-2 pb-4', dark ? 'border-white/15' : 'border-ink/10', className)}>
      <div>
        {kicker && (
          <span className="kicker mb-1.5">
            <span className="h-3 w-1 bg-race" />
            {kicker}
          </span>
        )}
        <h2 className={cn('h-section', dark && 'text-white')}>{title}</h2>
      </div>
      {moreLabel && (
        <a href={moreHref ?? '#'} className={cn('view-more shrink-0 pb-1', dark && 'text-white hover:text-race')}>
          {moreLabel}
          <ArrowRight />
        </a>
      )}
    </div>
  )
}
