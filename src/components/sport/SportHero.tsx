import type { HeroProps } from './primitives'
import { HeroEditorial } from './heroes/HeroEditorial'
import { HeroF1 } from './heroes/HeroF1'
import { HeroKinetic } from './heroes/HeroKinetic'
import { HeroTech } from './heroes/HeroTech'
import { HeroPrestige } from './heroes/HeroPrestige'
import { HeroFestival } from './heroes/HeroFestival'

/** Picks the hero layout for a sport from its theme's `heroVariant`. */
export function SportHero(props: HeroProps) {
  switch (props.theme.heroVariant) {
    case 'f1':
      return <HeroF1 {...props} />
    case 'kinetic':
      return <HeroKinetic {...props} />
    case 'tech':
      return <HeroTech {...props} />
    case 'prestige':
      return <HeroPrestige {...props} />
    case 'festival':
      return <HeroFestival {...props} />
    default:
      return <HeroEditorial {...props} />
  }
}
