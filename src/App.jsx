// import Header from './components/Header'
import { Layout } from './views/Layout'
import { ExploreView } from './views/ExploreView'
import { PortfolioView } from './views/PortfolioView'
import { ServiceView } from './views/ServiceView'
import { CreateAssetView } from './views/CreateAssetView'
import { HomeView } from './views/HomeView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setDispatchForUtils,
  getPublicClient,
  getServices,
  getExchanges,
  getTreasuryBalance,
} from './utils'

import { WagmiConfig, createConfig, useAccount } from 'wagmi'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { foundry } from 'wagmi/chains'

const config = createConfig(
  getDefaultConfig({
    appName: 'bionet',
    appDescription: 'bionet - synbio services on demand',
    appUrl: 'https://www.mitre.org',
    appLogo:
      'https://yt3.ggpht.com/f9CD1mREMez6x5anm3E-WRBU6TTKuoRQjZtDF4TYKTonQQSJR04MeypIpKbpdPbA80s9eTsprA=s108-c-k-c0x00ffffff-no-rj',
    chains: [foundry],
  })
)

function App() {
  const dispatch = useDispatch()
  const { address, isConnected } = useAccount()

  async function watchBlocks() {
    if (!isConnected) return
    const publicClient = await getPublicClient()
    const unwatch = publicClient.watchBlocks({
      onBlock: async (block) => {
        console.log('onBlock')
        console.log({ services: await getServices() })
        console.log({ exchanges: await getExchanges() })
        console.log({ treasuryBalance: await getTreasuryBalance() })
        getServices()
        getExchanges()
        getTreasuryBalance()
      },
    })
  }

  useEffect(() => {
    async function fetchAppData() {
      getServices()
      getExchanges()
      getTreasuryBalance()
    }
    fetchAppData()
    watchBlocks()
  }, [address])

  useEffect(() => {
    setDispatchForUtils(dispatch)
  }, [])

  return (
    <Router>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeView />} />
              <Route path="network" element={<ExploreView />} />
              <Route path="portfolio" element={<PortfolioView />} />
              <Route path="create" element={<CreateAssetView />} />
              <Route
                path="asset/:did"
                element={
                  <div className="flex flex-1 space-x-4 pt-4 mx-4">
                    <div className="flex flex-1 flex-col">
                      <div className="flex-1 w-full mx-auto bg-slate-100 border border-slate-300 py-8 px-10 shadow-sm overflow-hidden">
                        <ServiceView />
                      </div>
                    </div>
                  </div>
                }
              />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </ConnectKitProvider>
      </WagmiConfig>
    </Router>
  )
}

export default App
