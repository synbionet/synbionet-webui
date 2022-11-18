import { useState, useEffect } from 'react'
import { SynBioNet } from 'synbionet-api'
import BioAssetCard from './BioAssetCard'

const ExploreViewBody = () => {
  // hardcode address for testing
  const [assetAddresses, setAssetsAddresses] = useState([
    '0xa16e02e87b7454126e5e10d957a927a7f5b5d2be',
  ])
  const [bioAssets, setBioAssets] = useState([])

  useEffect(() => {
    async function getProducts(assetAddresses) {
      const synbionet = new SynBioNet()
      const products = await Promise.all(
        assetAddresses.map(async (address) => await synbionet.market.getProduct(address))
      )
      setBioAssets(products)
    }
    getProducts(assetAddresses)
  }, [assetAddresses])

  return (
    <div className="flex flex-wrap space-x-4 mx-8">
      {bioAssets.map((asset) => {
        return <BioAssetCard key={asset} bioAsset={asset} />
      })}
    </div>
  )
}

export default ExploreViewBody
