// import Header from './components/Header'
import { Layout } from './views/Layout'
import { ExploreView } from './views/ExploreView'
import { PortfolioView } from './views/PortfolioView'
import { AssetDetailsView } from './views/AssetDetailsView'
import { CreateAssetView } from './views/CreateAssetView'
import { HomeView } from './views/HomeView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="market" element={<ExploreView />} />
          <Route path="portfolio" element={<PortfolioView />} />
          <Route path="create" element={<CreateAssetView />} />
          <Route path="asset/:did" element={<AssetDetailsView />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
