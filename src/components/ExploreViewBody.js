import { useSelector } from 'react-redux'
import BioAssetCard from './BioAssetCard'

const ExploreViewBody = () => {
  const bioAssets = useSelector((state) => state.account.bioAssets)

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
