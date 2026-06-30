import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetIso: string
  size?: 'sm' | 'md' | 'lg'
  /** 'bar' = MotoGP-style bare numbers; 'box' = bordered cells. */
  variant?: 'bar' | 'box'
  tone?: 'light' | 'dark'
  className?: string
}

const sizeMap = {
  sm: { num: 'text-lg', label: 'text-[8px]' },
  md: { num: 'text-2xl', label: 'text-[9px]' },
  lg: { num: 'text-4xl sm:text-5xl', label: 'text-[10px]' },
}

const pad = (n: number) => n.toString().padStart(2, '0')

/** Event countdown — MotoGP-style DD HH MM SS. */
export function CountdownTimer({
  targetIso,
  size = 'md',
  variant = 'bar',
  tone = 'light',
  className,
}: CountdownTimerProps) {
  const t = useCountdown(targetIso)
  const s = sizeMap[size]
  const dark = tone === 'dark'

  const units = [
    { value: t.days, label: 'Days' },
    { value: t.hours, label: 'Hrs' },
    { value: t.minutes, label: 'Min' },
    { value: t.seconds, label: 'Sec' },
  ]

  return (
    <div className={cn('flex items-stretch', variant === 'bar' ? 'gap-4' : 'gap-2', className)}>
      {units.map((u) => (
        <div
          key={u.label}
          className={cn(
            'flex flex-col items-center',
            variant === 'box' &&
              cn('min-w-[3.25rem] rounded-sm px-2 py-1.5', dark ? 'bg-night-700' : 'bg-ink text-white'),
          )}
        >
          <span className={cn('font-mega tabular-nums leading-none', s.num, dark || variant === 'box' ? 'text-white' : 'text-ink')}>
            {pad(u.value)}
          </span>
          <span
            className={cn(
              'mt-1 font-display font-bold uppercase tracking-[0.18em]',
              s.label,
              dark || variant === 'box' ? 'text-white/50' : 'text-ink-500',
            )}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
