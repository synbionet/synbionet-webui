import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  return (
    <div className="App text-gray-200">
      <Header />
      <div className="bg-gradient-to-b from-teal-800 to-gray-900 min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
