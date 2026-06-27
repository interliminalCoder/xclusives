import type { Platform } from '../../types'
import './PlatformBar.css'

interface PlatformBarProps {
  platforms: Platform[]
  selected: string | null
  onSelect: (id: string | null) => void
}

const icons: Record<string, string> = {
  'xbox-360': '◈',
  'ps2': '◆',
  'ps3': '◆',
  'ds': '▣',
  '3ds': '▣',
}

export function PlatformBar({ platforms, selected, onSelect }: PlatformBarProps) {
  return (
    <div className="platform-bar">
      <button
        className={`platform-chip ${selected === null ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        ★ Todas
      </button>
      {platforms.map((p) => (
        <button
          key={p.id}
          className={`platform-chip ${selected === p.id ? 'active' : ''}`}
          onClick={() => onSelect(p.id)}
        >
          <span className="platform-chip-icon" style={{ color: p.color }}>
            {icons[p.id] || '●'}
          </span>
          {p.shortName}
        </button>
      ))}
    </div>
  )
}
