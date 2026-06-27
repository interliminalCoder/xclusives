import { useState, useMemo } from 'react'
import type { Game, Platform } from './types'
import platformsData from './data/platforms.json'
import gamesData from './data/games.json'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { GameGrid } from './components/GameGrid/GameGrid'
import { GameDetail } from './components/GameDetail/GameDetail'
import './App.css'

const platforms = platformsData as Platform[]
const games = gamesData as Game[]

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [detailGame, setDetailGame] = useState<Game | null>(null)

  const filteredGames = useMemo(() => {
    let result = games

    if (selectedPlatform) {
      result = result.filter((g) => g.platformId === selectedPlatform)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.genre?.some((genre) => genre.toLowerCase().includes(q)) ||
          g.developer?.toLowerCase().includes(q) ||
          g.publisher?.toLowerCase().includes(q)
      )
    }

    return result
  }, [selectedPlatform, searchQuery])

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="app-body">
        <Sidebar
          platforms={platforms}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
        <main className="app-main">
          <GameGrid games={filteredGames} platforms={platforms} onSelectGame={setDetailGame} />
        </main>
      </div>

      {detailGame && (
        <GameDetail
          game={detailGame}
          platform={platforms.find((p) => p.id === detailGame.platformId)}
          onClose={() => setDetailGame(null)}
        />
      )}
    </div>
  )
}

export default App
