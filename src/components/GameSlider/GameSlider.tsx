import { useState, useEffect, useCallback } from 'react'
import type { Game, Platform, GameLink } from '../../types'
import './GameSlider.css'

interface GameSliderProps {
  games: Game[]
  platforms: Platform[]
}

const linkLabels: Record<GameLink['type'], { label: string; icon: string }> = {
  buy: { label: 'Comprar', icon: '🛒' },
  download: { label: 'Descargar', icon: '⬇' },
  emulation: { label: 'Emular', icon: '🕹' },
  info: { label: 'Info', icon: 'ℹ' },
}

export function GameSlider({ games, platforms }: GameSliderProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % games.length)
  }, [games.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + games.length) % games.length)
  }, [games.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (games.length === 0) {
    return (
      <div className="slider-empty">
        <p>No se encontraron juegos</p>
      </div>
    )
  }

  const game = games[current]
  const platform = platforms.find((p) => p.id === game.platformId)

  return (
    <div className="slider-container">
      <button className="slider-arrow slider-arrow-left" onClick={prev} aria-label="Anterior">
        ‹
      </button>

      <div className="slider-stage">
        <div className="slider-track" style={{ transform: `translateX(${direction * 0}px)` }}>
          <FloatingCard
            key={`${game.id}-${current}`}
            game={game}
            platform={platform}
          />
        </div>
      </div>

      <button className="slider-arrow slider-arrow-right" onClick={next} aria-label="Siguiente">
        ›
      </button>

      <div className="slider-dots">
        {games.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir al juego ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function FloatingCard({
  game,
  platform,
}: {
  game: Game
  platform: Platform | undefined
}) {
  return (
    <div className="floating-card" style={{ '--platform-color': platform?.color || '#e60012' } as React.CSSProperties}>
      <div className="card-cover">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.name} className="card-cover-img" />
        ) : (
          <div className="card-cover-fallback">
            <span>{game.name.split(' ').map(w => w[0]).join('').slice(0, 3)}</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="card-header">
          <h2 className="card-title">{game.name}</h2>
          <div className="card-badges">
            {platform && (
              <span className="card-badge card-badge-platform" style={{ background: platform.color }}>
                {platform.name}
              </span>
            )}
            {game.releaseYear && (
              <span className="card-badge card-badge-year">{game.releaseYear}</span>
            )}
          </div>
        </div>

        {game.genre && game.genre.length > 0 && (
          <div className="card-genres">
            {game.genre.map((g) => (
              <span key={g} className="card-genre">{g}</span>
            ))}
          </div>
        )}

        <p className="card-description">{game.description}</p>

        <div className="card-meta">
          {game.developer && (
            <div className="card-meta-item">
              <span className="card-meta-label">Desarrollador</span>
              <span className="card-meta-value">{game.developer}</span>
            </div>
          )}
          {game.publisher && (
            <div className="card-meta-item">
              <span className="card-meta-label">Publicador</span>
              <span className="card-meta-value">{game.publisher}</span>
            </div>
          )}
        </div>

        {game.links.length > 0 && (
          <div className="card-links">
            {game.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                data-type={link.type}
              >
                <span className="card-link-icon">{linkLabels[link.type]?.icon || '🔗'}</span>
                <span className="card-link-text">{link.label}</span>
                <span className="card-link-arrow">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
