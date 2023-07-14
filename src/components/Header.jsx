import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ConnectKitButton } from 'connectkit'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function NavBar() {
  return (
    <div className="flex items-center">
      <NavTabs />
      <ConnectKitButton />
    </div>
  )
}

export function Header() {
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
      <NavBar />
    </header>
  )
}

function LinkTab(props) {
  return (
    <Link to={props.href}>
      <Tab disableRipple {...props} />
    </Link>
  )
}

function NavTabs() {
  const location = useLocation()
  const pages = {
    network: 0,
    portfolio: 1,
  }
  const path = `${location.pathname.substring(1)}`

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={path in pages ? pages[path] : -1} aria-label="nav tabs">
        <LinkTab label="Network" href="/network" />
        <LinkTab label="Portfolio" href="/portfolio" />
      </Tabs>
    </Box>
  )
}
