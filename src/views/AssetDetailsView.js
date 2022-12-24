import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SynBioNet } from '@synbionet/api'
import { useSelector } from 'react-redux'
import PrimaryButton from '../components/PrimaryButton'

// TODO: Refactor this page, make components, ect... just getting idea down for now

const AssetDetailsView = () => {
  const { did } = useParams()
  const [assetDetails, setAssetDetails] = useState(undefined)
  const [licenseBalance, setLicenseBalance] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)

  const listedOnMarket = parseInt(assetDetails?.availableLicenses) > 0
  const ownedByActiveAccount = assetDetails?.owner.toLowerCase() === activeAccount?.toLowerCase()

  async function buyLicense() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.buyLicense(assetDetails.nftAddress, 1)
    await getAssetDetails()
  }

  async function buyAsset() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.buyAsset(assetDetails.nftAddress)
    await getAssetDetails()
  }

  async function registerAssetOnMarket() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.registerAssetOnMarket(assetDetails.nftAddress, 10, 1, true, 15)
    await getAssetDetails()
  }

  async function getAssetDetails() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    const details = await synbionet.market.getBioAssetById(did)
    const productInfo = await synbionet.market.getProduct(details?.nftAddress)
    // now check on license balance
    const licenseBalance = await synbionet.market.balanceOfLicense(
      details.nftAddress,
      activeAccount
    )
    setLicenseBalance(licenseBalance)
    setAssetDetails(Object.assign({}, details, productInfo))
  }

  useEffect(() => {
    getAssetDetails()
  })

  if (!assetDetails?.nftAddress) return
  return (
    <div className="flex flex-col w-3/4 mx-auto space-y-8">
      <div>
        <div className="mt-8 font-semibold text-2xl capitalize">{assetDetails.name}</div>
        <div>
          <span className="font-semibold uppercase text-sm text-slate-500 mb-1 mr-2">
            Owned by:
          </span>
          <span className="font-mono text-slate-600">{assetDetails.owner}</span>
        </div>
      </div>
      <div className="flex break-words">
        <div className="flex flex-col space-y-8 w-3/4">
          {/* <div>
            <p className="font-semibold uppercase text-sm mb-1">Owner</p>
            <p>{assetDetails.owner}</p>
          </div> */}
          <div>
            <p className="font-semibold uppercase text-sm mb-1">Description</p>
            <p>{assetDetails.description}</p>
          </div>
          <div>
            <p className="font-semibold uppercase text-sm mb-1">Did</p>
            <p>{assetDetails.did}</p>
          </div>
          <div>
            <p className="font-semibold uppercase text-sm mb-1">Asset Contract Address</p>
            <p>{assetDetails.nftAddress}</p>
          </div>
          <div>
            <p className="font-semibold uppercase text-sm mb-1">Service Endpoint</p>
            <p>{assetDetails.serviceEndpoint}</p>
          </div>
        </div>
        {listedOnMarket && !ownedByActiveAccount && (
          <div className="flex flex-col flex-grow space-y-10 items-end">
            <div className="text-center">
              <div className="text-right mb-4">
                <p className="font-semibold uppercase text-sm mb-1">License Price</p>
                <p>
                  {assetDetails.licensePrice}{' '}
                  {parseInt(assetDetails.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
                </p>
              </div>
              <div className="w-40">
                <PrimaryButton text="Purchase License" onClick={buyLicense} />
              </div>
              {/* <button
                onClick={buyLicense}
                className="w-40 py-2 rounded bg-slate-200 bg-opacity-30 whitespace-nowrap"
              >
                Purchase License
              </button> */}
              {/* <div className="text-right mb-8">
                <p className="font-semibold uppercase text-sm mb-1"># Licenses Owned</p>
                <p>{licenseBalance}</p>
              </div> */}
            </div>
            <div className="text-center">
              <div className="text-right mb-4">
                <p className="font-semibold uppercase text-sm mb-1"># Licenses Owned</p>
                <p>{licenseBalance}</p>
              </div>
              <div
                className={`w-40 py-2 rounded bg-slate-200 bg-opacity-30 whitespace-nowrap ${
                  parseInt(licenseBalance) === 0 ? 'opacity-50 cursor-default`' : ''
                }`}
              >
                <PrimaryButton text="Redeem Service" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-right mb-4">
                <p className="font-semibold uppercase text-sm mb-1">IP Price</p>
                <p>
                  {assetDetails.ipPrice}{' '}
                  {parseInt(assetDetails.ipPrice) !== 1 ? 'BioTokens' : 'BioToken'}
                </p>
              </div>
              <div className="w-40 py-2 rounded bg-slate-200 bg-opacity-30 whitespace-nowrap">
                <PrimaryButton text="Purchase Asset" onClick={buyAsset} />
              </div>
            </div>
          </div>
        )}
        {ownedByActiveAccount && !listedOnMarket && (
          <div className="flex flex-col flex-grow space-y-10 items-end">
            <div className="w-40">
              <PrimaryButton text="List on Market" onClick={registerAssetOnMarket} />
            </div>
            {/* <div className="text-center">
              <button
                onClick={registerAssetOnMarket}
                className="w-40 py-2 rounded bg-slate-200 bg-opacity-30 whitespace-nowrap"
              >
                List on Market
              </button>
            </div> */}
          </div>
        )}
        {ownedByActiveAccount && listedOnMarket && (
          <div className="flex flex-col flex-grow text-right space-y-8 items-end">
            <div>
              <p className="font-semibold uppercase text-sm mb-1">License Price</p>
              <p>
                {assetDetails.licensePrice}{' '}
                {parseInt(assetDetails.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase text-sm mb-1"># License Available</p>
              <p>{assetDetails.availableLicenses}</p>
            </div>
            <div>
              <p className="font-semibold uppercase text-sm mb-1">IP for Sale</p>
              <p>{assetDetails.ipForSale ? 'Yes' : 'No'}</p>
            </div>
            {assetDetails.ipForSale && (
              <div>
                <p className="font-semibold uppercase text-sm mb-1">IP Price</p>
                <p>
                  {assetDetails.ipPrice}{' '}
                  {parseInt(assetDetails.ipPrice) !== 1 ? 'BioTokens' : 'BioToken'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-40">
        <PrimaryButton text="view license" />
      </div>
    </div>
  )
}

export default AssetDetailsView
