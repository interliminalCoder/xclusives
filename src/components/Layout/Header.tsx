import { SearchBar } from '../SearchBar/SearchBar'
import './Header.css'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          <span className="header-icon">✦</span>
          Xclusives
        </h1>
        <p className="header-subtitle">Exclusivos que merecen ser recordados</p>
      </div>
      <div className="header-right">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </header>
  )
}
