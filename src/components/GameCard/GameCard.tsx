import type { Game, Platform } from '../../types'
import './GameCard.css'

interface GameCardProps {
  game: Game
  platform: Platform | undefined
  onClick: () => void
}

export function GameCard({ game, platform, onClick }: GameCardProps) {
  return (
    <button className="game-card" onClick={onClick} style={{ '--platform-color': platform?.color || '#666' } as React.CSSProperties}>
      <div className="game-card-cover">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt={game.name}
            className="game-card-image"
            loading="lazy"
          />
        ) : (
          <div className="game-card-placeholder">
            <span>{game.name[0]}</span>
          </div>
        )}
        <div className="game-card-overlay">
          <span className="game-card-view">Ver ficha</span>
        </div>
      </div>
      <div className="game-card-info">
        <h3 className="game-card-title">{game.name}</h3>
        <div className="game-card-meta">
          {game.releaseYear && <span className="game-card-year">{game.releaseYear}</span>}
          {platform && <span className="game-card-platform" style={{ color: platform.color }}>{platform.shortName}</span>}
        </div>
      </div>
    </button>
  )
}
