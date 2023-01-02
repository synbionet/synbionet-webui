import { SynBioNet } from '@synbionet/api'
import { ethers } from 'ethers'

export async function fetchAssets(activeAccount) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const assets = await synbionet.market.getAllBioAssets()
  const assetsWithDetails = await Promise.all(
    assets.map(async (asset) => {
      let assetDetails
      try {
        assetDetails = await getAssetByDid(asset.did, activeAccount)
      } catch (err) {
        return undefined
      }
      return Object.assign(asset, assetDetails)
    })
  )
  return assetsWithDetails.filter((asset) => asset !== undefined)
}

export async function getAssetByDid(did, activeAccount) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const details = await synbionet.market.getBioAssetById(did)
  const productInfo = await synbionet.market.getProduct(details?.nftAddress)
  if (!activeAccount) return Object.assign(details, productInfo)
  // now check on license balance if active account
  const numberOfLicensesOwnedByActiveAccount = await synbionet.market.balanceOfLicense(
    details.nftAddress,
    activeAccount
  )
  return Object.assign(details, productInfo, { numberOfLicensesOwnedByActiveAccount })
}

export async function registerAssetOnMarket(
  assetAddress,
  licensePrice,
  licenseQty,
  ipForSale,
  ipPrice
) {
  if (licensePrice === '' || licenseQty === '' || (ipForSale && ipPrice === '')) return
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  await synbionet.market.registerAssetOnMarket(
    assetAddress,
    parseInt(licenseQty),
    parseInt(licensePrice),
    ipForSale,
    ipPrice !== '' ? parseInt(ipPrice) : 0
  )
}

export async function buyLicense(assetAddress, qty = 1) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  await synbionet.market.buyLicense(assetAddress, qty)
}

export async function buyAsset(assetAddress) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  await synbionet.market.buyAsset(assetAddress)
}

export async function createAsset(title, description, licenseURI, serviceEndpoint) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  await synbionet.portfolio.createAsset(title, description, licenseURI, serviceEndpoint)
}

export async function buyBioTokens(tokenQty) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  await synbionet.portfolio.buyBioTokens(parseInt(tokenQty))
}

export async function withdrawBioTokens(tokenQty) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  await synbionet.portfolio.withdrawBioTokens(parseInt(tokenQty))
}

export async function getBioTokenBalanceForAccount(accountAddress) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const balance = await synbionet.portfolio.getBioTokenBalance(accountAddress)
  return ethers.utils.formatUnits(balance, 'wei')
}

export async function connectWalletToBionet() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const account = await synbionet.requestAccounts()
  return account
}
