import type { Game, Platform } from '../../types'
import { GameCard } from '../GameCard/GameCard'
import './GameGrid.css'

interface GameGridProps {
  games: Game[]
  platforms: Platform[]
  onSelectGame: (game: Game) => void
}

export function GameGrid({ games, platforms, onSelectGame }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="grid-empty">
        <span className="grid-empty-icon">🔍</span>
        <p>No se encontraron juegos</p>
        <p className="grid-empty-hint">Probá con otros términos de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="game-grid">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          platform={platforms.find((p) => p.id === game.platformId)}
          onClick={() => onSelectGame(game)}
        />
      ))}
    </div>
  )
}
