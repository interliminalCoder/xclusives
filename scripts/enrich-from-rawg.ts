/**
 * Script para enriquecer el catálogo con metadata de RAWG API.
 * Uso: RAWG_API_KEY=your_key npx tsx scripts/enrich-from-rawg.ts
 *
 * RAWG es una API gratuita que provee carátulas, descripciones, géneros,
 * años de lanzamiento, ratings, etc.
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const GAMES_PATH = join(import.meta.dirname, '..', 'src', 'data', 'games.json')
const RAWG_BASE = 'https://api.rawg.io/api'

interface RawgGame {
  id: number
  name: string
  slug: string
  released?: string
  background_image?: string
  rating?: number
  genres?: { name: string }[]
  developers?: { name: string }[]
  publishers?: { name: string }[]
  description_raw?: string
}

interface GameEntry {
  id: string
  name: string
  platformId: string
  coverUrl?: string
  description?: string
  releaseYear?: number
  rating?: number
  genre?: string[]
  developer?: string
  publisher?: string
  [key: string]: unknown
}

const PLATFORM_MAP: Record<string, string> = {
  'xbox-360': 'xbox-360',
  'ps2': 'playstation2',
  'ps3': 'playstation3',
  'ds': 'nintendo-ds',
  '3ds': 'nintendo-3ds',
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function searchGame(apiKey: string, name: string, platformSlug: string): Promise<RawgGame | null> {
  const url = `${RAWG_BASE}/games?key=${apiKey}&search=${encodeURIComponent(name)}&platforms=${platformSlug}&page_size=5`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`  RAWG error: ${res.status} para "${name}"`)
      return null
    }
    const data = await res.json() as { results: RawgGame[] }
    return data.results[0] || null
  } catch (err) {
    console.warn(`  Error fetching "${name}":`, err)
    return null
  }
}

async function main() {
  const apiKey = process.env.RAWG_API_KEY
  if (!apiKey) {
    console.error('ERROR: Necesitás una API key de RAWG.')
    console.error('1. Registrate en https://rawg.io/apidocs')
    console.error('2. Exportá la variable: RAWG_API_KEY=tu_key npx tsx scripts/enrich-from-rawg.ts')
    process.exit(1)
  }

  const raw = readFileSync(GAMES_PATH, 'utf-8')
  const games = JSON.parse(raw) as GameEntry[]

  console.log(`Enriqueciendo ${games.length} juegos con RAWG API...\n`)

  let updated = 0

  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const platformSlug = PLATFORM_MAP[game.platformId]
    if (!platformSlug) continue

    const needsEnrich = !game.coverUrl || !game.description
    if (!needsEnrich) continue

    process.stdout.write(`[${i + 1}/${games.length}] ${game.name}... `)

    const rawg = await searchGame(apiKey, game.name, platformSlug)

    if (rawg) {
      if (!game.coverUrl && rawg.background_image) {
        game.coverUrl = rawg.background_image
      }
      if (!game.description && rawg.description_raw) {
        game.description = rawg.description_raw.slice(0, 500)
      }
      if (!game.releaseYear && rawg.released) {
        game.releaseYear = parseInt(rawg.released.slice(0, 4))
      }
      if (!game.rating && rawg.rating) {
        game.rating = Math.round(rawg.rating * 10)
      }
      if ((!game.genre || game.genre.length === 0) && rawg.genres) {
        game.genre = rawg.genres.map((g) => g.name)
      }
      if (!game.developer && rawg.developers) {
        game.developer = rawg.developers[0]?.name
      }
      if (!game.publisher && rawg.publishers) {
        game.publisher = rawg.publishers[0]?.name
      }

      console.log('✓')
      updated++
    } else {
      console.log('no encontrado')
    }

    await sleep(250)
  }

  writeFileSync(GAMES_PATH, JSON.stringify(games, null, 2))
  console.log(`\n✅ ${updated} juegos actualizados.`)
}

main().catch(console.error)
