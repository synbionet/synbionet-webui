import { BioTokenWidget } from '../components/BioTokenWidget'
import { AssetDetailsView } from './AssetDetailsView'
import { AssetTable } from '../components/AssetTable'
import { PortfolioNavBar } from '../components/PortfolioNavBar'
import { OfferTable } from '../components/OfferTable'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBioAssets, setBioTokenBalance } from '../store/accountStore'
import { fetchAssets } from '../utils'
import { getBioTokenBalanceForAccount } from '../utils'
import { GridLoader } from '../components/common/GridLoader'

export function PortfolioView() {
  const dispatch = useDispatch()
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const ethBalance = useSelector((state) => state.account.ethBalance)
  const escrowBalance = useSelector((state) => state.account.escrowBalance)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('portfolio')

  const ownedAssets = bioAssets.filter((asset) => isOwner(asset))

  function isOwner(asset) {
    return asset.owner.toLowerCase() === activeAccount.toLowerCase()
  }

  async function getAssets() {
    dispatch(setBioAssets(await fetchAssets(activeAccount)))
  }

  async function getBioTokenBalance() {
    dispatch(setBioTokenBalance(await getBioTokenBalanceForAccount(activeAccount)))
  }

  async function fetchData() {
    setIsLoading(true)
    await getAssets()
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [activeAccount])

  if (bioAssets.length === 0 && isLoading)
    return (
      <div className="flex-1 flex">
        <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <GridLoader />
      </div>
    )

  // TODO: Refactor code below
  return (
    <div className="flex flex-1">
      <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'portfolio' ? (
        <div className="flex flex-1 space-x-4 pt-4 mx-4">
          <div className="flex-1">
            {ownedAssets.length === 0 ? (
              <AssetTable assets={ownedAssets} portfolioView />
            ) : (
              <AssetDetailsView portfolioView asset={ownedAssets[0]} />
            )}
          </div>
          {/* <div className="flex-1">
            <AssetTable assets={licensedAssets} licenseView />
          </div> */}
          <div className="flex-none">
            <BioTokenWidget
              accountBalance={ethBalance}
              getBioTokenBalance={getBioTokenBalance}
              escrowBalance={escrowBalance}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
              <OfferTable workflowView />
            </div>
          </div>
          <div className="flex flex-col">
            <BioTokenWidget
              accountBalance={ethBalance}
              getBioTokenBalance={getBioTokenBalance}
              escrowBalance={escrowBalance}
            />
          </div>
        </div>
      )}
    </div>
  )
}
