import { SynBioNet } from '@synbionet/api'

export async function fetchAssets() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const assets = await synbionet.market.getAllBioAssets()
  const assetsWithDetails = await Promise.all(
    assets.map(async (asset) => {
      const productDetails = await synbionet.market.getProduct(asset.nftAddress)
      return Object.assign(asset, productDetails)
    })
  )
  return assetsWithDetails
}
