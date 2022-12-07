import BioTokenWidget from '../components/BioTokenWidget'
import AssetTable from '../components/AssetTable'
import LicenseTable from '../components/LicenseTable'

const PortfolioView = () => {
  return (
    <div className="flex flex-col py-4">
      <BioTokenWidget />
      <div className="mt-8 flex">
        <div className="w-1/2">
          <AssetTable />
        </div>
        <div className="w-1/2">
          <LicenseTable />
        </div>
      </div>
    </div>
  )
}

export default PortfolioView
