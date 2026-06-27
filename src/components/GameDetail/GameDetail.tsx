import type { Game, Platform, GameLink } from '../../types'
import './GameDetail.css'

interface GameDetailProps {
  game: Game
  platform: Platform | undefined
  onClose: () => void
}

const linkLabels: Record<GameLink['type'], { label: string; icon: string }> = {
  buy: { label: 'Comprar', icon: '🛒' },
  download: { label: 'Descargar', icon: '⬇️' },
  emulation: { label: 'Emular', icon: '🕹️' },
  info: { label: 'Info', icon: 'ℹ️' },
}

export function GameDetail({ game, platform, onClose }: GameDetailProps) {
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>

        <div className="detail-hero" style={{ '--platform-color': platform?.color || '#666' } as React.CSSProperties}>
          {game.backgroundUrl ? (
            <img src={game.backgroundUrl} alt="" className="detail-bg" />
          ) : (
            <div className="detail-bg-gradient" />
          )}
          <div className="detail-hero-content">
            {game.coverUrl && (
              <img src={game.coverUrl} alt={game.name} className="detail-cover" />
            )}
            <div className="detail-hero-info">
              <h2 className="detail-title">{game.name}</h2>
              <div className="detail-badges">
                {platform && (
                  <span className="detail-badge" style={{ background: platform.color }}>
                    {platform.name}
                  </span>
                )}
                {game.releaseYear && (
                  <span className="detail-badge">{game.releaseYear}</span>
                )}
                {game.rating && (
                  <span className="detail-badge detail-rating">★ {game.rating}</span>
                )}
              </div>
              {game.genre && game.genre.length > 0 && (
                <div className="detail-genres">
                  {game.genre.map((g) => (
                    <span key={g} className="detail-genre">{g}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="detail-body">
          {game.description && (
            <p className="detail-description">{game.description}</p>
          )}

          <div className="detail-info-grid">
            {game.developer && (
              <div className="detail-info-item">
                <span className="detail-info-label">Desarrollador</span>
                <span className="detail-info-value">{game.developer}</span>
              </div>
            )}
            {game.publisher && (
              <div className="detail-info-item">
                <span className="detail-info-label">Publicador</span>
                <span className="detail-info-value">{game.publisher}</span>
              </div>
            )}
            {game.notes && (
              <div className="detail-info-item">
                <span className="detail-info-label">Notas</span>
                <span className="detail-info-value">{game.notes}</span>
              </div>
            )}
          </div>

          <div className="detail-links">
            <h3 className="detail-links-title">Links</h3>
            <div className="detail-links-grid">
              {game.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                  data-type={link.type}
                >
                  <span className="detail-link-icon">{linkLabels[link.type]?.icon || '🔗'}</span>
                  <span className="detail-link-label">{linkLabels[link.type]?.label || link.type}</span>
                  <span className="detail-link-name">{link.label}</span>
                  <span className="detail-link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
