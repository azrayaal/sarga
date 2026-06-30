import { cn } from '@/lib/utils'

export interface TabOption<T extends string> {
  value: T
  label: string
}

interface TabsProps<T extends string> {
  options: TabOption<T>[]
  value: T
  onChange: (value: T) => void
  dark?: boolean
  className?: string
}

/** Underline-style editorial tabs (used for standings categories). */
export function Tabs<T extends string>({ options, value, onChange, dark = false, className }: TabsProps<T>) {
  return (
    <div role="tablist" className={cn('no-scrollbar flex gap-6 overflow-x-auto', className)}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative shrink-0 whitespace-nowrap pb-3 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors',
              active
                ? dark ? 'text-white' : 'text-ink'
                : dark ? 'text-white/45 hover:text-white/80' : 'text-ink-500 hover:text-ink',
            )}
          >
            {opt.label}
            {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-race" />}
          </button>
        )
      })}
    </div>
  )
}
