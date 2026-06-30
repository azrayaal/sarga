import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function diff(target: number): Countdown {
  const total = Math.max(0, target - Date.now())
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isComplete: total === 0,
  }
}

/** Live countdown to an ISO date string, ticking every second. */
export function useCountdown(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime()
  const [time, setTime] = useState<Countdown>(() => diff(target))

  useEffect(() => {
    setTime(diff(target))
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}
