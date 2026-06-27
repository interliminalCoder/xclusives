import { useEffect, useState } from 'react'
import './ThemeToggle.css'

type Theme = 'dark' | 'light'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('xclusives-theme') as Theme | null
      if (stored) return stored
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('xclusives-theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Cambiar tema">
      <span className="theme-toggle-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  )
}
