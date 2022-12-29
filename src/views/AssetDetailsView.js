import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SynBioNet } from '@synbionet/api'
import { useSelector } from 'react-redux'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { ReactComponent as CloseIcon } from '../assets/close-x.svg'

// TODO: Refactor this page, make components, ect... just getting idea down for now

const AssetDetailsView = () => {
  const { did } = useParams()
  const [assetDetails, setAssetDetails] = useState(undefined)
  const [licenseBalance, setLicenseBalance] = useState(undefined)
  const [showPanel, setShowPanel] = useState(false)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const [licenseQty, setLicenseQty] = useState('')
  const [licensePrice, setLicensePrice] = useState('')
  const [ipForSale, setIpForSale] = useState(false)
  const [ipPrice, setIpPrice] = useState('')
  // const navigate = useNavigate()

  function handleChange(event, setter) {
    setter(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await registerAssetOnMarket()
    await getAssetDetails()
    // await createAsset()
    // navigate('/portfolio')
  }

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
    if (licensePrice === '' || licenseQty === '' || (ipForSale && ipPrice === '')) return
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.registerAssetOnMarket(
      assetDetails.nftAddress,
      parseInt(licenseQty),
      parseInt(licensePrice),
      ipForSale,
      ipPrice !== '' ? parseInt(ipPrice) : 0
    )
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
  }, [])

  if (!assetDetails?.nftAddress) return
  return (
    <div>
      <div className="h-8" />
      <div className="w-11/12 lg:w-9/12 xl:w-3/4 mx-auto bg-slate-100 border-2 border-slate-300 py-4 px-6 shadow-sm">
        <div className="flex justify-between space-x-4">
          <div className="flex flex-col break-all space-y-8">
            <div>
              <div className="font-semibold text-2xl capitalize">{assetDetails.name}</div>
              <div>
                <span className="font-semibold uppercase text-sm text-slate-500 mb-1 mr-2">
                  Owned by:
                </span>
                <span className="font-mono text-slate-600">{assetDetails.owner}</span>
              </div>
            </div>
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
            <div className="w-40">
              <a target="_blank" href={assetDetails.license} rel="noreferrer">
                <SecondaryButton text="View License" />
              </a>
            </div>
          </div>
          <div>
            {ownedByActiveAccount && !listedOnMarket && (
              <div className="flex flex-col flex-grow space-y-10 items-end">
                <div className="w-40">
                  <PrimaryButton text="List on Market" onClick={() => setShowPanel(!showPanel)} />
                </div>
                <div
                  className={`fixed inset-0 top-6 z-40 bg-black transition-opacity duration-1000 ${
                    showPanel ? 'opacity-80' : 'opacity-0 pointer-events-none'
                  }`}
                ></div>
                <div
                  className={`fixed z-50 right-0 top-6 bottom-0 bg-slate-100 w-1/2 xl:w-1/3 transition transform ease-in-out duration-500 pt-3 px-4 flex flex-col ${
                    showPanel ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="w-full flex items-center justify-between pb-2 border-b-2 border-gray-400">
                    <h2 className="font-semibold text-gray-600">List Asset on Market</h2>
                    <button className="p-2" onClick={() => setShowPanel(false)}>
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-full h-full py-4 overflow-scroll">
                    <form className="flex flex-col space-y-8">
                      <label>
                        License Price in BioTokens
                        <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
                          <input
                            className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
                            type="text"
                            value={licensePrice}
                            onChange={(e) => handleChange(e, setLicensePrice)}
                          />
                        </div>
                      </label>
                      <label>
                        License Qty
                        <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
                          <input
                            className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
                            type="text"
                            value={licenseQty}
                            onChange={(e) => handleChange(e, setLicenseQty)}
                          />
                        </div>
                      </label>
                      <label>
                        Asset for sale?
                        <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
                          <select
                            className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
                            value={ipForSale}
                            onChange={(e) => handleChange(e, setIpForSale)}
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </select>
                        </div>
                      </label>
                      <label>
                        Asset Price:
                        <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
                          <input
                            className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
                            disabled={!ipForSale}
                            type="text"
                            value={ipPrice}
                            onChange={(e) => handleChange(e, setIpPrice)}
                          />
                        </div>
                      </label>
                      <div className="space-y-4">
                        <PrimaryButton text="List on Market" onClick={handleSubmit} />
                        <SecondaryButton
                          text="Cancel"
                          onClick={(e) => {
                            e.preventDefault()
                            setShowPanel(false)
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {listedOnMarket && !ownedByActiveAccount && (
              <div className="flex flex-col flex-0 space-y-16 items-end">
                <div className="text-right flex flex-col space-y-2">
                  <div
                    className={`w-40 rounded bg-slate-200 bg-opacity-30 whitespace-nowrap ${
                      parseInt(licenseBalance) === 0 ? 'opacity-50 cursor-default`' : ''
                    }`}
                  >
                    <PrimaryButton text="Redeem Service" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">
                    {licenseBalance !== '0'
                      ? `${licenseBalance} license owned`
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
                  <div className="w-40">
                    <PrimaryButton text="Purchase License" onClick={buyLicense} />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">
                    {assetDetails.availableLicenses} licenses remaining
                  </p>
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
                      <PrimaryButton text="Purchase Asset" onClick={buyAsset} />
                    </div>
                  </div>
                )}
              </div>
            )}
            {ownedByActiveAccount && listedOnMarket && (
              <div className="flex flex-col flex-none w-40 text-right space-y-16 items-end">
                <div>
                  <p className="font-semibold uppercase text-sm mb-1">License Price</p>
                  <p>
                    <span className="mr-1 text-2xl font-semibold">{assetDetails.licensePrice}</span>
                    <span className="text-slate-500">
                      {parseInt(assetDetails.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {assetDetails.availableLicenses} available Licenses
                    </p>
                  </p>
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

export default AssetDetailsView
