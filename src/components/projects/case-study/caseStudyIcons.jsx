import {
  Building2,
  Clock3,
  Cog,
  Droplets,
  Factory,
  HardHat,
  Headphones,
  Layers,
  MapPin,
  Maximize2,
  Shield,
  SquareStack,
  UserRound,
  Waves,
} from 'lucide-react'

const ICON_MAP = {
  building: Building2,
  droplets: Droplets,
  shield: Shield,
  layers: Layers,
  expand: Maximize2,
  crack: SquareStack,
  'hard-hat': HardHat,
  dam: Waves,
  waves: Waves,
  cog: Cog,
  square: Layers,
  clock: Clock3,
  headset: Headphones,
  pin: MapPin,
  factory: Factory,
  role: UserRound,
}

export function CaseStudyIcon({ name, className = 'size-5', ...props }) {
  const Icon = ICON_MAP[name] || Layers
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" {...props} />
}
