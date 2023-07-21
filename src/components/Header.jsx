import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ConnectKitButton } from 'connectkit'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useAccount } from 'wagmi'

export function AddressDetails({ address, flip }) {
  const services = useSelector((state) => state.event.services)
  const service = address ? services?.find((service) => service.owner === address) : undefined

  return (
    <div className={`flex items-center ${flip && 'flex-row-reverse'} justify-end`}>
      <div className="h-8 w-8 rounded-full overflow-hidden">
        <img src="/example_logo.png" className="object-fit w-full h-full" />
      </div>
      <div className={`flex flex-col items-${flip ? 'end' : 'start'} px-3`}>
        <h2 className="font-medium capitalize whitespace-nowrap">{service.name}</h2>
        <div className="font-mono text-slate-600 text-xs w-24 truncate">{service.owner}</div>
      </div>
    </div>
  )
}

function NavBar() {
  const services = useSelector((state) => state.event.services)
  const { address } = useAccount()

  const service = address ? services?.find((service) => service.owner === address) : undefined
  return (
    <div className="flex items-center">
      <NavTabs />
      {!service ? (
        <ConnectKitButton />
      ) : (
        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
            return (
              <button onClick={show} className="pl-3">
                <AddressDetails address={address} />
              </button>
            )
          }}
        </ConnectKitButton.Custom>
      )}
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

  let path = `${location.pathname.substring(1)}`
  if (path.includes('asset')) path = 'network'

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={path in pages ? pages[path] : -1} aria-label="nav tabs">
        <LinkTab label="Network" href="/network" />
        <LinkTab label="Portfolio" href="/portfolio" />
      </Tabs>
    </Box>
  )
}
