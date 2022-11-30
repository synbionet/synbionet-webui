import { useSelector } from 'react-redux'
import LicenseCard from './LicenseCard'

const LicenseTable = () => {
  const bioAssets = useSelector((state) => state.account.bioAssets)

  return (
    <div className="flex flex-col space-y-4 mx-8">
      <div className="flex space-x-2 items-center border-b-2 border-gray-300 pb-1 px-3">
        <h3 className="flex-grow text-3xl">Licenses</h3>
      </div>
      {bioAssets.map((bioAsset, index) => (
        <LicenseCard
          key={bioAsset}
          assetIndex={index + 1}
          bioAssetAddress={bioAsset}
          licenseView={true}
        />
      ))}
    </div>
  )
}

export default LicenseTable
