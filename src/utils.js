import { SynBioNet } from '@synbionet/api'
import { keccak256, toHex } from 'viem'
import { setLastTransactionStatus } from './store/accountStore'
import { setServices, setExchanges, setTreasuryBalance } from './store/eventStore'
import { formatUnits } from 'viem'

// dispatch to set values in store. must be set from a react component using useDispatch()
let dispatch = undefined
const oneDollar = 1e6

export function weiToUSD(wei) {
  return '0'
}

export function formatCurrency(amt) {
  const usDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return usDollar.format(amt)
}

export function formatUSDCBalance(amt) {
  return formatUnits(amt, 6)
}

export async function getServices() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const services = (await synbionet.service.getServices()).map((service) => {
    try {
      return Object.assign(service, { uri: JSON.parse(service.uri) })
    } catch (e) {
      return service
    }
  })
  dispatch(setServices(services))
  return services
}

export async function getExchanges() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const exchanges = (await synbionet.exchange.getExchanges()).map((exchange) => {
    try {
      return Object.assign(exchange, { uri: JSON.parse(exchange.uri) })
    } catch (e) {
      return exchange
    }
  })
  dispatch(setExchanges(exchanges))
  return exchanges
}

export async function getTreasuryBalance() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const balance = await synbionet.core.getTreasuryBalance()
  dispatch(setTreasuryBalance(formatUSDCBalance(balance)))
  return formatUSDCBalance(balance)
}

export async function createExchange(serviceId, buyer, moderator, priceInDollars, agreementUri) {
  setTransactionStatus('pending')
  try {
    const defaultDisputeTime = 2592000 // 30 days in seconds
    const price = parseFloat(priceInDollars) * oneDollar
    const defaultModeratorFee = 200 // 2%
    const exchangeArgs = {
      serviceId: serviceId,
      buyer: buyer,
      moderator: moderator,
      moderatorPercentage: defaultModeratorFee,
      price: price,
      disputeTimerValue: defaultDisputeTime,
      uri: agreementUri,
    }
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    const exchangeId = await synbionet.exchange.createOffer(exchangeArgs)
    setTransactionStatus('complete')
    return exchangeId
  } catch (e) {
    setTransactionStatus('failed')
    throw new Error('Error creating exchange: ' + e)
  }
}

export async function createService(serviceName, serviceUri) {
  setTransactionStatus('pending')
  try {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    const serviceId = await synbionet.service.createService(serviceName, serviceUri)
    setTransactionStatus('complete')
    return serviceId
  } catch (e) {
    setTransactionStatus('failed')
    throw new Error('Error creating service: ' + e)
  }
}

export async function getPublicClient() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  return synbionet.config.getPublicClient()
}

export async function getExchangeContractEvents() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const allEvents = await synbionet.exchange.getExchangeEvents()
  return allEvents
}

export async function getOwnerOfVoucher(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  return await synbionet.exchange.getOwnerOfVoucher(exchangeId)
}

export async function fetchAssets(activeAccount) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const assets = await synbionet.market.getAllBioAssets()
  const assetsWithDetails = await Promise.all(
    assets.map(async (asset) => {
      let assetDetails
      try {
        assetDetails = await getAssetByDid(asset.did, activeAccount)
      } catch (err) {
        throw new Error('error getting asset details')
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

export async function getOfferById(offerId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  return synbionet.exchange.getOffer(offerId)
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
  setTransactionStatus('pending')
  try {
    await synbionet.market.registerAssetOnMarket(
      assetAddress,
      parseInt(licenseQty),
      parseInt(licensePrice),
      ipForSale,
      ipPrice !== '' ? parseInt(ipPrice) : 0
    )
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function createOfferOnExchange(assetAddress, name, description, price, metadataUri) {}

export async function voidOffer(offerId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.voidOffer(offerId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function fundOffer(offerId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.fundOffer(offerId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function disputeExchange(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.dispute(exchangeId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function agreeToDisputeResolution(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.agreeToRefund(exchangeId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function resolveExchange(exchangeId, resolutionType) {
  const resolutionOptions = {
    none: 0,
    partial: 1,
    full: 2,
  }
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.resolve(exchangeId, resolutionOptions[resolutionType])
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function completeExchange(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.complete(exchangeId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function commitToOffer(offerId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.commitToOffer(offerId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function redeem(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.redeem(exchangeId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function revoke(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.revoke(exchangeId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
}

export async function withdrawFunds() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.withdrawFunds()
    setTransactionStatus('complete')
  } catch (e) {
    setTransactionStatus('failed')
    console.log({ error: e.message })
    const errorObject = JSON.parse(e.message.match(/.*({.+}).*/)[1])
    console.log({ errorObject })
  }
}

export async function finalize(exchangeId) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  setTransactionStatus('pending')
  try {
    await synbionet.exchange.finalize(exchangeId)
    setTransactionStatus('complete')
  } catch (e) {
    console.log({ error: e })
    setTransactionStatus('failed')
  }
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
  setTransactionStatus('pending')
  try {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.createAsset(title, description, licenseURI, serviceEndpoint)
    setTransactionStatus('complete')
  } catch (e) {
    console.log('error: ' + e)
    setTransactionStatus('failed')
  }
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
  return balance
}

export async function getEscrowBalanceForAccount(accountAddress) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const balance = await synbionet.exchange.getEscrowBalance(accountAddress)
  return balance
}

export async function getAvailableToWithdrawEscrowBalanceForAccount(accountAddress) {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const balance = await synbionet.exchange.getAvailableToWithdrawEscrowBalance(accountAddress)
  return balance
}

export async function connectWalletToBionet() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const account = await synbionet.requestAccounts()
  return account
}

export function setDispatchForUtils(dispatchForUtils) {
  dispatch = dispatchForUtils
}

export function generateDid(nftAddress, tokenId) {
  const chainId = 31337
  const did_value = keccak256(toHex(nftAddress + tokenId + chainId))
  return `did:synbio:${did_value}`
}

export function setTransactionStatus(status, message) {
  const transactionMessage =
    status === 'pending'
      ? 'transaction pending'
      : status === 'complete'
      ? 'transaction complete'
      : 'transaction failed'
  dispatch(setLastTransactionStatus({ status, message: transactionMessage }))
}
