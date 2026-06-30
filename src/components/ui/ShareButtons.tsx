import { cn } from '@/lib/utils'
import { shareTargets } from '@/data'

const icons: Record<string, JSX.Element> = {
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15l-1 3.7 3.8-1A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.6-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.1 2.1 1.3.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.8-.1 1.5Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.5.2.9.5 1.3.9.4.4.7.8.9 1.3.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.5-.2-.9-.5-1.3-.9-.4-.4-.7-.8-.9-1.3-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.9 2.6 10.3 2.6 12s0 2.1.1 3.3c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-3.3s0-2.1-.1-3.3c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm5.1-8.3a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3Z" />
  ),
  x: (
    <path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.2 5.6-6.2Zm-1.2 17.7h1.8L7.1 4.3H5.2l11.8 15.9Z" />
  ),
  link: (
    <path d="M10.6 13.4a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5a1 1 0 1 0 1.4 1.4l1.5-1.5a2 2 0 1 1 2.9 2.9l-3 3a2 2 0 0 1-2.9 0 1 1 0 0 0-1.4 1.4Zm2.8-2.8a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5a1 1 0 0 0-1.4-1.4l-1.5 1.5a2 2 0 0 1-2.9-2.9l3-3a2 2 0 0 1 2.9 0 1 1 0 0 0 1.4-1.4Z" />
  ),
}

/** Social share row. Buttons are presentational (dummy) — wire to real share URLs later. */
export function ShareButtons({
  label = 'Share',
  tone = 'light',
  className,
}: {
  label?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {label && (
        <span className={cn('font-display text-[11px] font-bold uppercase tracking-[0.14em]', dark ? 'text-white/50' : 'text-ink-500')}>
          {label}
        </span>
      )}
      <div className="flex items-center gap-1.5">
        {shareTargets.map((t) => (
          <button
            key={t.id}
            aria-label={`Share on ${t.label}`}
            title={t.label}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-sm transition',
              dark
                ? 'border border-white/15 text-white/70 hover:border-race hover:text-white'
                : 'border border-ink/15 text-ink-500 hover:border-race hover:text-race',
            )}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              {icons[t.icon]}
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
