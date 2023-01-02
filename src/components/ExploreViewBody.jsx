import { useSelector, useDispatch } from 'react-redux'
import { BioAssetCard } from './BioAssetCard'
import { useEffect } from 'react'
import { setBioAssets } from '../store/accountStore'
import { Link } from 'react-router-dom'
import { fetchAssets } from '../utils'
import { Loader } from './common/loader'
import { useState } from 'react'

export function ExploreViewBody() {
  const dispatch = useDispatch()
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: fix this temp filter to show what assets are currently listed on market. May not be correct since licenses can run out.
  const marketAssets = bioAssets.filter((asset) => asset.availableLicenses > 0)

  useEffect(() => {
    async function getAssets() {
      setIsLoading(true)
      dispatch(setBioAssets(await fetchAssets()))
      setIsLoading(false)
    }
    getAssets()
  }, [dispatch])

  return (
    <div className="flex flex-wrap mx-8">
      {marketAssets.map((asset) => {
        return (
          <div key={asset.did} className="w-1/4 p-3">
            <Link to={`/asset/${asset.did}`}>
              <BioAssetCard marketView asset={asset} />
            </Link>
          </div>
        )
      })}
      {marketAssets.length === 0 && isLoading && (
        <div className="flex flex-1 justify-center mt-36">
          <Loader />
        </div>
      )}
    </div>
  )
}
