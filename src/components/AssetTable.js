import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'
import { SynBioNet } from '@synbionet/api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BioAssetCard from './BioAssetCard'
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

  async function createAsset() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.createAsset(
      'example name',
      'example desc',
      'http://example.license',
      'http://service.endpoint'
    )
    dispatch(setBioAssets(await fetchAssets()))
  }
  return (
    <div className="flex flex-col space-y-4 mx-8">
      <div className="flex space-x-2 items-center border-b-2 border-gray-300 pb-1 px-3">
        <h3 className="flex-grow text-3xl">BioAssets</h3>
        <button onClick={createAsset} className="flex fill-gray-200 opacity-80 hover:opacity-100">
          <div>Create Asset</div>
          <PlusIcon className="w-6 h-6 ml-2" />
        </button>
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
