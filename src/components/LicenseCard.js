import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SynBioNet } from '@synbionet/api'
import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'

// TODO: this is a near exact copy of BioAssetCard for now, with extra computation for demo purposes
// will change significantly when hooked up to indexer

const LicenseCard = ({ bioAssetAddress, assetIndex, marketView, portfolioView, licenseView }) => {
  const [assetDetails, setAssetDetails] = useState(undefined)
  const [licenseBalance, setLicenseBalance] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)

  useEffect(() => {
    async function getAssetDetails() {
      const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
      const details = await synbionet.market.getProduct(bioAssetAddress)
      setAssetDetails(details)
      if (parseInt(details.availableLicenses) === 0) return
      const licenseBalance = await synbionet.market.balanceOfLicense(bioAssetAddress, activeAccount)
      setLicenseBalance(licenseBalance)
    }
    getAssetDetails()
  }, [bioAssetAddress, activeAccount])

  if (!assetDetails || !licenseBalance) return
  // temp filters for demoing until hooked up to indexer
  if (marketView && parseInt(assetDetails.availableLicenses) === 0) return
  if (marketView && assetDetails.owner.toLowerCase() === activeAccount.toLowerCase()) return
  if (portfolioView && assetDetails.owner.toLowerCase() !== activeAccount.toLowerCase()) return
  if (
    licenseView &&
    (assetDetails.owner.toLowerCase() === activeAccount.toLowerCase() || licenseBalance === '0')
  )
    return
  return (
    <div className="flex rounded bg-white bg-opacity-20 p-3">
      <div className="flex flex-col flex-grow space-y-2">
        <h4>BioAsset #{assetIndex}</h4>
        <p className="w-64 truncate">
          URI: {assetDetails.uri.replace('http://127.0.0.1:8081/', '')}
        </p>
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
      <div className="flex flex-col items-end space-y-2">
        <button className="flex fill-gray-200 opacity-80 hover:opacity-100">
          <div className="whitespace-nowrap">Redeem Service</div>
          <PlusIcon className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default LicenseCard
