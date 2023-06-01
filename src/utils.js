import { SynBioNet } from '@synbionet/api'
import { keccak256, toHex } from 'viem'
import { setLastTransactionStatus } from './store/accountStore'

// TODO: dynamically set accurate ethPrice instead of hard-coded value
const ethPriceInUSD = 1998
export const USDC_CONTRACT_ADDRESS = '0xbdEd0D2bf404bdcBa897a74E6657f1f12e5C6fb6'

// dispatch to set values in store. must be set from a react component using useDispatch()
let dispatch = undefined

// export function bigNumToEtherString(bigNum) {
//   // TODO: refactor logic to return appropriate string and units (eth, gwei, wei)
//   const ethString = ethers.utils.formatEther(bigNum)
//   if (ethString[0] === '0' && ethString[1] === '.')
//     // return { value: ethers.utils.formatUnits(bigNum, 'gwei'), units: 'gwei' }
//     return { value: bigNum.toString(), units: 'wei' }
//   // format limiting to 2 decimal places
//   const decimalIndex = ethString.indexOf('.')
//   if (decimalIndex === -1 || decimalIndex >= ethString.length - 3 || ethString[0] === '0')
//     return { value: ethString, units: 'eth' }
//   else return { value: ethString.substring(0, ethString.indexOf('.') + 3), units: 'eth' }
// }

// export function bigNumToUSDString(bigNum) {
//   const ethString = ethers.utils.formatEther(bigNum)
//   return {
//     value: (parseFloat(ethString) * ethPriceInUSD).toFixed(2),
//     units: 'usd',
//     ethString: bigNumToEtherString(bigNum),
//   }
// }

// export function ethStringToUSD(ethString) {
//   return parseFloat(ethString) * ethPriceInUSD
// }

export function weiToUSD(wei) {
  // const ethString = ethers.utils.formatEther(ethers.utils.parseUnits(wei, 'wei'))
  // return (parseFloat(ethString) * ethPriceInUSD).toFixed(2)
  return '0'
}

// // temporary helper function for getting and storing events in app storage to recreate history without indexer
// function serializeAndConvertEvent(event) {
//   let e = JSON.parse(JSON.stringify(event))
//   if (e.event === 'OfferCreated') {
//     Object.assign(e, {
//       args: {
//         offerId: ethers.utils.formatUnits(e.args[0], 'wei'),
//         seller: e.args[1],
//         offer: {
//           offerId: ethers.utils.formatUnits(e.args[2][0], 'wei'),
//           seller: e.args[2][1],
//           price: ethers.utils.formatUnits(e.args[2][2], 'wei'),
//           quantityAvailable: ethers.utils.formatUnits(e.args[2][3], 'wei'),
//           assetAddress: e.args[2][4],
//           assetTokenId: ethers.utils.formatUnits(e.args[2][5], 'wei'),
//           metadataUri: e.args[2][6],
//           voided: e.args[2][7],
//         },
//       },
//     })
//   } else if (e.event === 'OfferVoided') {
//     Object.assign(e, {
//       args: {
//         offerId: ethers.utils.formatUnits(e.args[0], 'wei'),
//         seller: e.args[1],
//       },
//     })
//   } else if (e.event === 'ExchangeCreated') {
//     Object.assign(e, {
//       args: {
//         offerId: ethers.utils.formatUnits(e.args[0], 'wei'),
//         exchangeId: ethers.utils.formatUnits(e.args[1], 'wei'),
//         buyer: e.args[2],
//       },
//     })
//   } else if (e.event === 'ExchangeRedeemed') {
//     Object.assign(e, {
//       args: {
//         offerId: ethers.utils.formatUnits(e.args[0], 'wei'),
//         exchangeId: ethers.utils.formatUnits(e.args[1], 'wei'),
//         seller: e.args[2],
//       },
//     })
//   } else if (e.event === 'ExchangeCompleted') {
//     Object.assign(e, {
//       args: {
//         offerId: ethers.utils.formatUnits(e.args[0], 'wei'),
//         exchangeId: ethers.utils.formatUnits(e.args[1], 'wei'),
//         timestamp: ethers.utils.formatUnits(e.args[2], 'wei'),
//       },
//     })
//   } else if (e.event === 'Withdraw') {
//     Object.assign(e, {
//       args: {
//         account: e.args[0],
//         amount: ethers.utils.formatUnits(e.args[1], 'wei'),
//       },
//     })
//   } else if (e.event === 'FundsNotAvailable') {
//     Object.assign(e, {
//       args: {
//         account: e.args[0],
//         amount: ethers.utils.formatUnits(e.args[1], 'wei'),
//       },
//     })
//   } else if (e.event === 'ExchangeRevoked') {
//     Object.assign(e, {
//       args: {
//         offerId: ethers.utils.formatUnits(e.args[0], 'wei'),
//         exchangeId: ethers.utils.formatUnits(e.args[1], 'wei'),
//         seller: e.args[2],
//       },
//     })
//   }
//   return e
// }

// async function sortEvents(allEvents) {
//   const serializedEvents = allEvents.map((event) => serializeAndConvertEvent(event))
//   const createOffers = []
//   const voidOffers = []
//   const exchangesCreated = []
//   const exchangesRedeemed = []
//   const exchangesCompleted = []
//   const withdraws = []
//   const fundsNotAvailable = []
//   const exchangesRevoked = []
//   serializedEvents.forEach((e) => {
//     switch (e.event) {
//       case 'OfferCreated':
//         createOffers.unshift(e.args)
//         break
//       case 'OfferVoided':
//         voidOffers.unshift(e.args)
//         break
//       case 'ExchangeCreated':
//         exchangesCreated.unshift(e.args)
//         break
//       case 'ExchangeRedeemed':
//         exchangesRedeemed.unshift(e.args)
//         break
//       case 'ExchangeCompleted':
//         exchangesCompleted.unshift(e.args)
//         break
//       case 'Withdraw':
//         withdraws.unshift(e.args)
//         break
//       case 'FundsNotAvailable':
//         fundsNotAvailable.unshift(e.args)
//         break
//       case 'ExchangeRevoked':
//         exchangesRevoked.unshift(e.args)
//         break
//       default:
//         break
//     }
//   })
//   return {
//     createOffers,
//     voidOffers,
//     exchangesCreated,
//     exchangesRedeemed,
//     exchangesCompleted,
//     withdraws,
//     fundsNotAvailable,
//     exchangesRevoked,
//   }
// }

export async function getPublicClient() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  return synbionet.config.getPublicClient()
}

export async function getExchangeContractEvents() {
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const allEvents = await synbionet.exchange.getExchangeEvents()
  const sortedEvents = sortEvents(allEvents)
  return sortedEvents
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

export async function createOfferOnExchange(assetAddress, name, description, price, metadataUri) {
  //   if (name === '' || description === '' || price === '' || metadataUri === '') return
  //   const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  //   setTransactionStatus('pending')
  //   try {
  //     await synbionet.exchange.createOffer(
  //       assetAddress,
  //       name,
  //       description,
  //       ethers.utils.parseEther('1').div(ethPriceInUSD).mul(parseInt(price)),
  //       metadataUri
  //     )
  //     setTransactionStatus('complete')
  //   } catch (e) {
  //     console.log({ error: e.message })
  //     const errorObject = JSON.parse(e.message.match(/.*({.+}).*/)[1])
  //     console.log({ errorObject })
  //     setTransactionStatus('failed')
  //   }
}

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
