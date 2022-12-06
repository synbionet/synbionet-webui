// import Header from './components/Header'
import Layout from './views/Layout'
import ExploreView from './views/ExploreView'
import PortfolioView from './views/PortfolioView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExploreView />} />
          <Route path="portfolio" element={<PortfolioView />} />
          {/* <Route path="*" element={<NoPage />} /> */}
          {/* <Route path="blog/:id" element={<Post />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
