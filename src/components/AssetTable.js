import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'
import { SynBioNet } from '@synbionet/api'
import { useDispatch, useSelector } from 'react-redux'
import { addBioAsset } from '../store/accountStore'
import BioAssetCard from './BioAssetCard'
import { setBioAssets } from '../store/accountStore'

const AssetTable = () => {
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const dispatch = useDispatch()

  async function getAssets() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    const assets = await synbionet.market.getAllBioAssets()
    dispatch(setBioAssets(assets))
  }

  async function createAsset() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.createAsset(
      'example name',
      'example desc',
      'http://example.license',
      'http://service.endpoint'
    )
    await getAssets()
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
      {bioAssets.map((bioAsset, index) => (
        <BioAssetCard
          key={bioAsset.did}
          assetIndex={index + 1}
          asset={bioAsset}
          portfolioView={true}
        />
      ))}
    </div>
  )
}

export default AssetTable
