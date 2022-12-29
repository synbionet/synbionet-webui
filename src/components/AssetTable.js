import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BioAssetCard from './BioAssetCard'
import PrimaryButton from './PrimaryButton'
import { setBioAssets } from '../store/accountStore'
import { fetchAssets } from '../utils'
import { Link } from 'react-router-dom'

const AssetTable = () => {
  const dispatch = useDispatch()
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const ownedAssets = bioAssets.filter(
    (asset) => asset.owner.toLowerCase() === activeAccount.toLowerCase()
  )

  useEffect(() => {
    async function getAssets() {
      dispatch(setBioAssets(await fetchAssets()))
    }
    getAssets()
  }, [dispatch])

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold uppercase tracking-wider text-slate-500 py-2">bioassets</h5>
        <Link to="/create">
          <div className="w-48">
            <PrimaryButton text="publish asset" />
          </div>
          {/* <button className="flex fill-gray-200 opacity-80 hover:opacity-100">
            <div>Create Asset</div>
            <PlusIcon className="w-6 h-6 ml-2" />
          </button> */}
        </Link>
      </div>
      {ownedAssets.map((bioAsset, index) => (
        <Link to={`/asset/${bioAsset.did}`}>
          <BioAssetCard
            key={bioAsset.did}
            assetIndex={index + 1}
            asset={bioAsset}
            portfolioView={true}
          />
        </Link>
      ))}
    </div>
  )
}

export default AssetTable
