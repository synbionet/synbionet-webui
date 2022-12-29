import { useSelector, useDispatch } from 'react-redux'
import BioAssetCard from './BioAssetCard'
import { useEffect } from 'react'
import { setBioAssets } from '../store/accountStore'
import { Link } from 'react-router-dom'
import { fetchAssets } from '../utils'

const ExploreViewBody = () => {
  const dispatch = useDispatch()
  const bioAssets = useSelector((state) => state.account.bioAssets)
  // TODO: fix this temp filter to show what assets are currently listed on market. May not be correct since licenses can run out.
  const marketAssets = bioAssets.filter((asset) => asset.availableLicenses > 0)

  useEffect(() => {
    async function getAssets() {
      dispatch(setBioAssets(await fetchAssets()))
    }
    getAssets()
  }, [dispatch])

  return (
    <div className="flex flex-wrap mx-8">
      {marketAssets.map((asset, index) => {
        return (
          <div className="w-1/4 p-3">
            <Link to={`/asset/${asset.did}`}>
              <BioAssetCard
                key={asset.did}
                assetIndex={index + 1}
                asset={asset}
                marketView={true}
              />
            </Link>
          </div>
        )
      })}
      {bioAssets.length % 2 !== 0 && <div className="w-1/3 m-2" />}
    </div>
  )
}

export default ExploreViewBody
