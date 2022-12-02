import { useSelector, useDispatch } from 'react-redux'
import BioAssetCard from './BioAssetCard'
import { SynBioNet } from '@synbionet/api'
import { useEffect } from 'react'
import { setBioAssets } from '../store/accountStore'

const ExploreViewBody = () => {
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: temporary method to render assets without breaking. Will need to modify to use data from indexer instead of just mapping contract addressess
    async function getAssets() {
      const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
      const assets = await synbionet.market.getAllBioAssets()
      const addresses = assets.map((asset) => asset.nftAddress)
      dispatch(setBioAssets(addresses))
    }
    getAssets()
  }, [dispatch])

  return (
    <div className="flex flex-wrap mx-8 justify-center">
      {bioAssets.map((asset, index) => {
        return (
          <div className="w-1/3 m-2">
            <BioAssetCard
              key={asset.toString()}
              assetIndex={index + 1}
              bioAssetAddress={asset}
              marketView={true}
            />
          </div>
        )
      })}
      {bioAssets.length % 2 !== 0 && <div className="w-1/3 m-2" />}
    </div>
  )
}

export default ExploreViewBody
