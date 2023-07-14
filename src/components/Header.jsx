import { HeaderButton } from './HeaderButton'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ConnectKitButton } from 'connectkit'

function NavBar({ connectWallet }) {
  const location = useLocation()

  return (
    <div className="flex items-center space-x-10">
      <div className="flex space-x-14">
        <Link to="/network">
          <HeaderButton buttonTitle="Network" isActive={location.pathname === '/network'} />
        </Link>
        <Link to="/portfolio">
          <HeaderButton buttonTitle="Portfolio" isActive={location.pathname === '/portfolio'} />
        </Link>
      </div>
      <ConnectKitButton />
    </div>
  )
}

export function Header({ connectWallet }) {
  return (
    <header className="flex items-center justify-between pl-4 pr-8 h-16 bg-slate-100 border border-slate-300">
      <Link to="/">
        <div className="flex space-x-3 items-center">
          <div className="h-9">
            <img src="/bionet-graphic.png" className="object-fit w-full h-full" />
          </div>
          <div className="h-7">
            <img src="/mitre-bionet-logo.png" className="object-fit w-full h-full" />
          </div>
        </div>
      </Link>
      <NavBar connectWallet={connectWallet} />
    </header>
  )
}
