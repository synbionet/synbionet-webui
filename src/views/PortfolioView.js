import BioTokenWidget from '../components/BioTokenWidget'
import AssetTable from '../components/AssetTable'
import LicenseTable from '../components/LicenseTable'
import PortfolioNavBar from '../components/PortfolioNavBar'
import { useState } from 'react'

const PortfolioView = () => {
  const [selectedTab, setSelectedTab] = useState('portfolio')
  return (
    <div className="flex flex-1">
      <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'portfolio' ? (
        <div className="flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <AssetTable />
          </div>
          <div className="flex-1">
            <LicenseTable />
          </div>
          <div className="flex-none">
            <BioTokenWidget />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold uppercase tracking-wider text-slate-500 py-2">
                  workflows
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioView
