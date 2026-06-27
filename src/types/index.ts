export interface Platform {
  id: string
  name: string
  shortName: string
  manufacturer: string
  releaseYear: number
  color: string
  icon: string
  description: string
}

export interface GameLink {
  type: 'buy' | 'download' | 'emulation' | 'info'
  label: string
  url: string
}

export interface Game {
  id: string
  platformId: string
  name: string
  alternativeNames?: string[]
  developer?: string
  publisher?: string
  releaseYear?: number
  genre?: string[]
  description?: string
  coverUrl?: string
  backgroundUrl?: string
  rating?: number
  links: GameLink[]
  isExclusive: boolean
  notes?: string
}
