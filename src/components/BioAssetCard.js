import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SynBioNet } from '@synbionet/api'
import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'

// TODO: this component is doing alot of computation for demo purposes that
// will be unnecessary when connected to indexer

const BioAssetCard = ({ bioAssetAddress, assetIndex, marketView, portfolioView, licenseView }) => {
  const [assetDetails, setAssetDetails] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)

  useEffect(() => {
    async function getAssetDetails() {
      const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
      const details = await synbionet.market.getProduct(bioAssetAddress)
      setAssetDetails(details)
    }
    getAssetDetails()
  }, [bioAssetAddress, activeAccount])

  async function registerAssetOnMarket() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.registerAssetOnMarket(bioAssetAddress, 10, 1, true, 15)
    const details = await synbionet.market.getProduct(bioAssetAddress)
    setAssetDetails(details)
  }

  async function buyLicense() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.buyLicense(bioAssetAddress, 1)
    const details = await synbionet.market.getProduct(bioAssetAddress)
    setAssetDetails(details)
  }

  if (!assetDetails) return
  // temp filters for demoing until hooked up to indexer
  if (marketView && parseInt(assetDetails.availableLicenses) === 0) return
  if (marketView && assetDetails.owner.toLowerCase() === activeAccount.toLowerCase()) return
  if (portfolioView && assetDetails.owner.toLowerCase() !== activeAccount.toLowerCase()) return
  return (
    <div className="flex rounded bg-white bg-opacity-20 p-3">
      <div className="flex flex-col flex-grow space-y-2">
        <h4>BioAsset #{assetIndex}</h4>
        <p>URI: {assetDetails.uri}</p>
        <p className={parseInt(assetDetails.availableLicenses) === 0 ? 'invisible' : ''}>
          License price: {assetDetails.licensePrice} BioTokens
        </p>
        <p className={parseInt(assetDetails.availableLicenses) === 0 ? 'invisible' : ''}>
          # License Available: {assetDetails.availableLicenses}
        </p>
        <p className={parseInt(assetDetails.availableLicenses) === 0 ? 'invisible' : ''}>
          Asset price: {assetDetails.ipPrice} BioTokens
        </p>
        <p className={portfolioView ? 'invisible' : 'w-64 truncate'}>
          Asset owner: {assetDetails.owner}
        </p>
      </div>
      {parseInt(assetDetails.availableLicenses) === 0 && (
        <button
          onClick={registerAssetOnMarket}
          className="flex fill-gray-200 opacity-80 hover:opacity-100"
        >
          <div>Register with Market</div>
          <PlusIcon className="w-6 h-6 ml-2" />
        </button>
      )}
      {parseInt(assetDetails.availableLicenses) > 0 && portfolioView && (
        <div>Available on Market</div>
      )}
      {parseInt(assetDetails.availableLicenses) > 0 && marketView && (
        <div className="flex flex-col items-end space-y-2">
          <button onClick={buyLicense} className="flex fill-gray-200 opacity-80 hover:opacity-100">
            <div>Buy Sublicense</div>
            <PlusIcon className="w-6 h-6 ml-2" />
          </button>
          <button className="flex fill-gray-200 opacity-80 hover:opacity-100">
            <div>Buy IP</div>
            <PlusIcon className="w-6 h-6 ml-2" />
          </button>
        </div>
      )}
    </div>
  )
}

export default BioAssetCard
