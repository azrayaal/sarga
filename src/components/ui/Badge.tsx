import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'race' | 'dark' | 'light' | 'live' | 'success' | 'warn'

const tones: Record<Tone, string> = {
  race: 'bg-race text-white',
  dark: 'bg-ink text-white',
  light: 'bg-white/90 text-ink',
  live: 'bg-race text-white',
  success: 'bg-emerald-600 text-white',
  warn: 'bg-amber-500 text-ink',
}

/** Sharp editorial tag/label (category chip, status). */
export function Badge({
  tone = 'dark',
  className,
  children,
  pulse = false,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
  pulse?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em]',
        tones[tone],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}
