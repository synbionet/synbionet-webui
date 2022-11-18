import Header from './components/Header'
import ExploreView from './components/ExploreView'
import PortfolioView from './components/PortfolioView'
import React, { useState } from 'react'

function App() {
  const [activeView, setActiveView] = useState('Explore')

  return (
    <div className="App text-gray-200">
      <Header setActiveView={setActiveView} />
      <div className="bg-gradient-to-b from-teal-800 to-gray-900 min-h-screen">
        {activeView === 'Explore' ? <ExploreView /> : <PortfolioView />}
      </div>
    </div>
  )
}

export default App
