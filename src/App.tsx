import { useState, useMemo } from 'react'
import type { Game, Platform } from './types'
import platformsData from './data/platforms.json'
import gamesData from './data/games.json'
import { Header } from './components/Layout/Header'
import { PlatformBar } from './components/Layout/PlatformBar'
import { GameSlider } from './components/GameSlider/GameSlider'
import './App.css'

const platforms = platformsData as Platform[]
const games = gamesData as Game[]

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const filteredGames = useMemo(() => {
    if (!selectedPlatform) return games
    return games.filter((g) => g.platformId === selectedPlatform)
  }, [selectedPlatform])

  return (
    <div className="app">
      <Header />
      <PlatformBar
        platforms={platforms}
        selected={selectedPlatform}
        onSelect={setSelectedPlatform}
      />
      <GameSlider games={filteredGames} platforms={platforms} />
    </div>
  )
}

export default App
