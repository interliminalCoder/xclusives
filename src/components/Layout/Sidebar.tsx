import type { Platform } from '../../types'
import './Sidebar.css'

interface SidebarProps {
  platforms: Platform[]
  selectedPlatform: string | null
  onSelectPlatform: (id: string | null) => void
}

const platformIcons: Record<string, string> = {
  'xbox-360': '◈',
  'ps2': '◆',
  'ps3': '◆',
  'ds': '▣',
  '3ds': '▣',
}

export function Sidebar({ platforms, selectedPlatform, onSelectPlatform }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-header-icon">🎮</span>
        <span>Plataformas</span>
      </div>
      <div className="sidebar-list">
        <button
          className={`sidebar-item ${selectedPlatform === null ? 'active' : ''}`}
          onClick={() => onSelectPlatform(null)}
        >
          <span className="sidebar-item-icon">★</span>
          <span className="sidebar-item-label">Todas</span>
        </button>
        {platforms.map((p) => (
          <button
            key={p.id}
            className={`sidebar-item ${selectedPlatform === p.id ? 'active' : ''}`}
            onClick={() => onSelectPlatform(p.id)}
            style={{ '--platform-color': p.color } as React.CSSProperties}
          >
            <span className="sidebar-item-icon" style={{ color: p.color }}>
              {platformIcons[p.id] || '●'}
            </span>
            <span className="sidebar-item-label">{p.shortName}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
