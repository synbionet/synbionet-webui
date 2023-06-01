// import Header from './components/Header'
import { Layout } from "./views/Layout";
import { ExploreView } from "./views/ExploreView";
import { PortfolioView } from "./views/PortfolioView";
import { AssetDetailsView } from "./views/AssetDetailsView";
import { CreateAssetView } from "./views/CreateAssetView";
import { HomeView } from "./views/HomeView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getPublicClient } from "./utils";

import { WagmiConfig, createConfig, useAccount } from "wagmi";

import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { foundry } from "wagmi/chains";

const config = createConfig(
  getDefaultConfig({
    appName: "bionet",
    appDescription: "bionet - synbio services on demand",
    appUrl: "https://www.mitre.org",
    appLogo:
      "https://yt3.ggpht.com/f9CD1mREMez6x5anm3E-WRBU6TTKuoRQjZtDF4TYKTonQQSJR04MeypIpKbpdPbA80s9eTsprA=s108-c-k-c0x00ffffff-no-rj",
    chains: [foundry],
  })
);

function App() {
  const { address, isConnected } = useAccount();

  async function watchBlocks() {
    if (!isConnected) return;
    const publicClient = await getPublicClient();
    const unwatch = publicClient.watchBlocks({
      onBlock: async (block) => {
        console.log("onBlock");
      },
    });
  }

  useEffect(() => {
    console.log("account changed");
    watchBlocks();
  }, [address]);

  return (
    <Router>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
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
        </ConnectKitProvider>
      </WagmiConfig>
    </Router>
  );
}

export default App;
