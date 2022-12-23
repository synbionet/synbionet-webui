import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const Layout = () => {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  return (
    <div className="App text-slate-700 tracking-wide">
      <Header />
      <div className="bg-gray-200 min-h-screen">
        {!activeAccount ? (
          <p className="pt-4 text-center tracking-wide">Connect your wallet to use SynBioNet App</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default Layout
