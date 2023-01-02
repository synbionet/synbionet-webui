import { BioTokenWidget } from '../components/BioTokenWidget'
import { AssetTable } from '../components/AssetTable'
import { PortfolioNavBar } from '../components/PortfolioNavBar'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBioAssets } from '../store/accountStore'
import { fetchAssets } from '../utils'

export function PortfolioView() {
  const dispatch = useDispatch()
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const [selectedTab, setSelectedTab] = useState('portfolio')

  const ownedAssets = bioAssets.filter(
    (asset) => asset.owner.toLowerCase() === activeAccount.toLowerCase()
  )

  const licensedAssets = bioAssets.filter((asset) => {
    if (!asset.numberOfLicensesOwnedByActiveAccount) return false
    if (ownedAssets.find((ownedAsset) => ownedAsset.did === asset.did)) return false
    return parseInt(asset.numberOfLicensesOwnedByActiveAccount) > 0 ? true : false
  })

  async function getAssets() {
    const allBioAssets = await fetchAssets(activeAccount)
    dispatch(setBioAssets(allBioAssets))
  }

  useEffect(() => {
    getAssets()
  }, [activeAccount])

  return (
    <div className="flex flex-1">
      <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'portfolio' ? (
        <div className="flex flex-1 space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <AssetTable assets={ownedAssets} portfolioView />
          </div>
          <div className="flex-1">
            <AssetTable assets={licensedAssets} licenseView />
          </div>
          <div className="flex-none">
            <BioTokenWidget />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold uppercase tracking-wider text-slate-500 py-2">
                  workflows
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
