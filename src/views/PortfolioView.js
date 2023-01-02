import { BioTokenWidget } from '../components/BioTokenWidget'
import { AssetTable } from '../components/AssetTable'
import { PortfolioNavBar } from '../components/PortfolioNavBar'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBioAssets, setBioTokenBalance } from '../store/accountStore'
import { fetchAssets } from '../utils'
import { getBioTokenBalanceForAccount } from '../utils'
import { Loader } from '../components/common/loader'

export function PortfolioView() {
  const dispatch = useDispatch()
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const bioTokenBalance = useSelector((state) => state.account.bioTokenBalance)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('portfolio')

  const ownedAssets = bioAssets.filter((asset) => isOwner(asset))
  const licensedAssets = bioAssets.filter((asset) => isLicensee(asset))

  function isOwner(asset) {
    return asset.owner.toLowerCase() === activeAccount.toLowerCase()
  }

  function isLicensee(asset) {
    if (!asset.numberOfLicensesOwnedByActiveAccount) return false
    if (isOwner(asset)) return false
    if (parseInt(asset.numberOfLicensesOwnedByActiveAccount) === 0) return false
    return true
  }

  async function getAssets() {
    dispatch(setBioAssets(await fetchAssets(activeAccount)))
  }

  async function getBioTokenBalance() {
    dispatch(setBioTokenBalance(await getBioTokenBalanceForAccount(activeAccount)))
  }

  async function fetchData() {
    setIsLoading(true)
    await Promise.all([await getBioTokenBalance(), await getAssets()])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [activeAccount])

  if (bioAssets.length === 0 && isLoading)
    return (
      <div className="flex-1 flex">
        <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex flex-1 justify-center mt-36">
          <Loader />
        </div>
      </div>
    )

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
            <BioTokenWidget
              accountBalance={bioTokenBalance}
              getBioTokenBalance={getBioTokenBalance}
            />
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
