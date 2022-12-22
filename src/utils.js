import { SynBioNet } from '@synbionet/api'

export async function fetchAssets() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const assets = await synbionet.market.getAllBioAssets()
  const assetsWithDetails = await Promise.all(
    assets.map(async (asset) => {
      let productDetails
      try {
        productDetails = await synbionet.market.getProduct(asset.nftAddress)
      } catch (err) {
        return undefined
      }
      return Object.assign(asset, productDetails)
    })
  )
  return assetsWithDetails.filter((asset) => asset !== undefined)
}
