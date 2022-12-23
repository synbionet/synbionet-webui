import { useSelector } from 'react-redux'
import BioAssetCard from './BioAssetCard'
import { SynBioNet } from '@synbionet/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LicenseTable = () => {
  const bioAssets = useSelector((state) => state.account.bioAssets)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
  const [licensedAssets, setLicensedAssets] = useState([])

  const getAssetsWithLicenseBalances = async (bioAssets) => {
    const assetsWithLicenseBalances = await Promise.all(
      bioAssets.map(async (asset) => {
        const licensesOwned = await synbionet.market.balanceOfLicense(
          asset.nftAddress,
          activeAccount
        )
        return Object.assign({}, asset, { licensesOwned })
      })
    )
    const licensedAssets = assetsWithLicenseBalances
      ? assetsWithLicenseBalances.filter((asset) => asset.licensesOwned > 0)
      : []
    setLicensedAssets(licensedAssets)
  }

  useEffect(() => {
    getAssetsWithLicenseBalances(bioAssets)
  }, [bioAssets])

  return (
    <div className="flex flex-col space-y-4 mx-8 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold uppercase tracking-wider text-slate-500 pb-2 py-2">
          licenses
        </h5>
      </div>
      {licensedAssets.map((bioAsset, index) => (
        <Link to={`/asset/${bioAsset.did}`}>
          <BioAssetCard
            key={bioAsset.did}
            assetIndex={index + 1}
            asset={bioAsset}
            licenseView={true}
          />
        </Link>
      ))}
    </div>
  )
}

export default LicenseTable
