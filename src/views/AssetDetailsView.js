import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { SecondaryButton } from '../components/common/SecondaryButton'
import { FlyoutForm } from '../components/common/FlyoutForm'
import { getAssetByDid, registerAssetOnMarket, buyAsset, buyLicense } from '../utils'

export function AssetDetailsView() {
  const { did } = useParams()
  const [assetDetails, setAssetDetails] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)

  // form fields
  const [showPanel, setShowPanel] = useState(false)
  const [licenseQty, setLicenseQty] = useState('')
  const [licensePrice, setLicensePrice] = useState('')
  const [ipForSale, setIpForSale] = useState(false)
  const [ipPrice, setIpPrice] = useState('')
  const formInputFields = [
    {
      label: 'License Price in BioTokens',
      value: licensePrice,
      setter: setLicensePrice,
      type: 'text',
    },
    {
      label: 'Number of available licenses',
      value: licenseQty,
      setter: setLicenseQty,
      type: 'text',
    },
    {
      label: 'Asset for sale?',
      value: ipForSale,
      setter: setIpForSale,
      type: 'boolean',
    },
    {
      label: 'Asset Price in BioTokens',
      value: ipPrice,
      setter: setIpPrice,
      type: 'text',
      disabled: !ipForSale,
    },
  ]

  const isListedOnMarket = parseInt(assetDetails?.availableLicenses) > 0
  const isOwnedByActiveAccount = assetDetails?.owner.toLowerCase() === activeAccount?.toLowerCase()
  const isLicensedByActiveAccount =
    !isOwnedByActiveAccount && parseInt(assetDetails?.numberOfLicensesOwnedByActiveAccount) > 0

  async function handleRegisterOnMarket(event) {
    event.preventDefault()
    await registerAssetOnMarket(
      assetDetails.nftAddress,
      licensePrice,
      licenseQty,
      ipForSale,
      ipPrice
    )
    await getAssetDetails()
  }

  async function handleBuyLicense() {
    await buyLicense(assetDetails.nftAddress)
    await getAssetDetails()
  }

  async function handleBuyAsset() {
    await buyAsset(assetDetails.nftAddress)
    await getAssetDetails()
  }

  async function getAssetDetails() {
    setAssetDetails(await getAssetByDid(did, activeAccount))
  }

  useEffect(() => {
    getAssetDetails()
  }, [])

  const AssetDetailsTableRow = ({ title, details }) => {
    return (
      <div>
        <h3 className="font-semibold uppercase text-sm mb-1">{title}</h3>
        <p>{details}</p>
      </div>
    )
  }

  if (!assetDetails?.nftAddress) return
  return (
    <div>
      <div className="h-8" />
      <div className="w-11/12 lg:w-9/12 xl:w-3/4 mx-auto bg-slate-100 border-2 border-slate-300 py-4 px-6 shadow-sm">
        <div className="flex justify-between space-x-4">
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="font-semibold text-2xl capitalize">{assetDetails.name}</h2>
              <div>
                <span className="font-semibold uppercase text-sm text-slate-500 mb-1 mr-2">
                  Owned by:
                </span>
                <span className="font-mono text-slate-600">{assetDetails.owner}</span>
              </div>
            </div>
            <AssetDetailsTableRow title="Description" details={assetDetails.description} />
            <div className="break-all">
              <AssetDetailsTableRow title="Did" details={assetDetails.did} />
            </div>
            <AssetDetailsTableRow
              title="Asset Contract Address"
              details={assetDetails.nftAddress}
            />
            <AssetDetailsTableRow title="Service Endpoint" details={assetDetails.serviceEndpoint} />
            <a target="_blank" href={assetDetails.license} rel="noreferrer">
              <SecondaryButton text="View License" defaultSize />
            </a>
          </div>

          <div>
            {isOwnedByActiveAccount && !isListedOnMarket && (
              <div className="flex flex-col flex-grow space-y-10 items-end">
                <PrimaryButton
                  defaultSize
                  text="List on Market"
                  onClick={() => setShowPanel(!showPanel)}
                />
                <FlyoutForm
                  formTitle="List Asset on Market"
                  inputFields={formInputFields}
                  showPanel={showPanel}
                  setShowPanel={setShowPanel}
                  submitButtonText="List On Market"
                  handleSubmit={handleRegisterOnMarket}
                />
              </div>
            )}

            {isListedOnMarket && !isOwnedByActiveAccount && (
              <div className="flex flex-col flex-0 space-y-16 items-end">
                <div className="text-right flex flex-col space-y-2">
                  <div className={`${!isLicensedByActiveAccount && 'opacity-50 cursor-default`'}`}>
                    <PrimaryButton defaultSize text="Redeem Service" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">
                    {isLicensedByActiveAccount
                      ? `${assetDetails.numberOfLicensesOwnedByActiveAccount} license owned`
                      : '*requires license'}
                  </p>
                </div>

                <div className="text-right flex flex-col space-y-2">
                  <p className="text-slate-600 font-semibold uppercase text-sm">License Price</p>
                  <p>
                    <span className="mr-1 text-2xl font-semibold">{assetDetails.licensePrice}</span>
                    <span className="text-slate-500">
                      {parseInt(assetDetails.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
                    </span>
                  </p>
                  <PrimaryButton defaultSize text="Purchase License" onClick={handleBuyLicense} />
                  <p className="text-sm font-semibold text-slate-600">
                    {assetDetails.availableLicenses} licenses remaining
                  </p>
                </div>

                {assetDetails.ipForSale && (
                  <div className="text-right flex flex-col space-y-2">
                    <p className="text-slate-600 font-semibold uppercase text-sm">IP Price</p>
                    <p>
                      <span className="mr-1 text-2xl font-semibold">{assetDetails.ipPrice}</span>
                      <span className="text-slate-500">
                        {parseInt(assetDetails.ipPrice) !== 1 ? 'BioTokens' : 'BioToken'}
                      </span>
                    </p>
                    <div className="w-40">
                      <PrimaryButton text="Purchase Asset" onClick={handleBuyAsset} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {isOwnedByActiveAccount && isListedOnMarket && (
              <div className="flex flex-col flex-none w-40 text-right space-y-16 items-end">
                <div>
                  <p className="font-semibold uppercase text-sm mb-1">License Price</p>
                  <div>
                    <span className="mr-1 text-2xl font-semibold">{assetDetails.licensePrice}</span>
                    <span className="text-slate-500">
                      {parseInt(assetDetails.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {assetDetails.availableLicenses} available Licenses
                    </p>
                  </div>
                </div>

                {assetDetails.ipForSale ? (
                  <div>
                    <p className="font-semibold uppercase text-sm mb-1">IP Price</p>
                    <p>
                      <span className="mr-1 text-2xl font-semibold">{assetDetails.ipPrice}</span>
                      <span className="text-slate-500">
                        {parseInt(assetDetails.ipPrice) !== 1 ? 'BioTokens' : 'BioToken'}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="font-semibold text-sm mb-1">Asset not for sale</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
