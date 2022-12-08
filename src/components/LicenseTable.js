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
    <div className="flex flex-col space-y-4 mx-8">
      <div className="flex space-x-2 items-center border-b-2 border-gray-300 pb-1 px-3">
        <h3 className="flex-grow text-3xl">Licenses</h3>
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
