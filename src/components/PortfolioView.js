import BioTokenWidget from './BioTokenWidget'
import AssetTable from './AssetTable'
import LicenseTable from './LicenseTable'
import { useSelector } from 'react-redux'

const PortfolioView = () => {
  const activeAccount = useSelector((state) => state.account.activeAccount)

  if (!activeAccount) return <p className="pt-4 text-center">Connect your wallet to access page</p>
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
