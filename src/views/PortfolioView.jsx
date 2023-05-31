import { BioTokenWidget } from '../components/BioTokenWidget'
import { PortfolioNavBar } from '../components/PortfolioNavBar'
import { OfferTable } from '../components/OfferTable'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GridLoader } from '../components/common/GridLoader'
import { useBalance, useAccount } from 'wagmi'
import { USDC_CONTRACT_ADDRESS } from '../utils'

export function PortfolioView() {
  const { address } = useAccount()
  const { data: balance, isError } = useBalance({
    address,
    token: USDC_CONTRACT_ADDRESS,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('portfolio')

  async function fetchData() {
    setIsLoading(true)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  })

  if (isLoading)
    return (
      <div className="flex-1 flex">
        <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <GridLoader />
      </div>
    )

  // TODO: Refactor code below
  return (
    <div className="flex flex-1">
      <PortfolioNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'portfolio' ? (
        <div className="flex flex-1 space-x-4 pt-4 mx-4">
          <div className="flex-1" />
          <div className="flex-none">
            <BioTokenWidget
              accountBalance={{ value: balance?.formatted, units: balance?.symbol }}
              escrowBalance={{ value: balance?.formatted, units: balance?.symbol }}
              availableToWithdrawEscrowBalance={{
                value: balance?.formatted,
                units: balance?.symbol,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
              <OfferTable workflowView />
            </div>
          </div>
          <div className="flex flex-col">
            <BioTokenWidget
              accountBalance={{ value: balance?.formatted, units: balance?.symbol }}
              escrowBalance={{ value: balance?.formatted, units: balance?.symbol }}
              availableToWithdrawEscrowBalance={{
                value: balance?.formatted,
                units: balance?.symbol,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
