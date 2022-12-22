import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const Layout = () => {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  return (
    <div className="App text-gray-200">
      <Header />
      <div className="bg-slate-800 min-h-screen">
        {!activeAccount ? (
          <p className="pt-4 text-center">Connect your wallet to access page</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default Layout
