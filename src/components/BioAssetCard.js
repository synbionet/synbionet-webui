import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SynBioNet } from '@synbionet/api'
import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'

// TODO: this component is doing alot of computation for demo purposes that
// will be unnecessary when connected to indexer

const BioAssetCard = ({ asset, assetIndex, marketView, portfolioView, licenseView }) => {
  const [assetDetails, setAssetDetails] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const bioAssetAddress = asset?.nftAddress

  const availableOnMarket = assetDetails ? parseInt(assetDetails.availableLicenses) > 0 : false

  useEffect(() => {
    async function getAssetDetails() {
      if (!bioAssetAddress) return
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
    <div className="flex flex-col rounded bg-white bg-opacity-20 px-6 pt-4 pb-6">
      <div className="flex">
        <h4 className="capitalize flex-grow font-semibold text-xl">{asset.name}</h4>
        {/* {availableOnMarket && marketView && (
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={buyLicense}
              className="flex fill-gray-200 opacity-80 hover:opacity-100"
            >
              <div>Buy Sublicense</div>
              <PlusIcon className="w-6 h-6 ml-2" />
            </button>
            <button className="flex fill-gray-200 opacity-80 hover:opacity-100">
              <div>Buy IP</div>
              <PlusIcon className="w-6 h-6 ml-2" />
            </button>
          </div>
        )} */}
        {parseInt(assetDetails.availableLicenses) === 0 && (
          <button
            onClick={registerAssetOnMarket}
            className="flex fill-gray-200 opacity-80 hover:opacity-100"
          >
            <div className="whitespace-nowrap">Register with Market</div>
            <PlusIcon className="w-6 h-6 ml-2" />
          </button>
        )}
        {parseInt(assetDetails.availableLicenses) > 0 && portfolioView && (
          <div className="whitespace-nowrap">Available on Market</div>
        )}
      </div>
      <div className="w-36 truncate">{assetDetails.owner}</div>
      <p className="text-justify mt-8">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      </p>
      {availableOnMarket && <p className="mt-4">{assetDetails.licensePrice} BioTokens</p>}
    </div>
  )
}

export default BioAssetCard
