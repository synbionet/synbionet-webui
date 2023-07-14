import { BioTokenWidget } from '../components/BioTokenWidget'
import { PortfolioNavBar } from '../components/PortfolioNavBar'
import { TableWrapper } from '../components/common/TableWrapper'
import { useState, useEffect } from 'react'
import { GridLoader } from '../components/common/GridLoader'
import { useBalance, useAccount } from 'wagmi'
import { USDC_CONTRACT_ADDRESS } from '@synbionet/api'
import { ServiceView } from './ServiceView'
import { useSelector } from 'react-redux'
import { TabWrapper } from '../components/common/TabWrapper'
import { ExchangeTableRow } from '../components/ExchangeTableRow'
import { formatUnits } from 'viem'

export function PortfolioView() {
  const { address } = useAccount()
  const { data: balance, isError } = useBalance({
    address,
    token: USDC_CONTRACT_ADDRESS,
  })

  const exchanges = useSelector((state) => state.event.exchanges)
  const myExchanges = exchanges?.filter((exchange) => exchange.buyer === address) || []
  const myOffers = myExchanges?.filter((exchange) => exchange.state === 0) || []
  const myActiveOperations = myExchanges?.filter((exchange) => exchange.state !== 0) || []

  const escrowedFunds = formatUnits(
    myExchanges
      .filter((exchange) => exchange.state === 1)
      .reduce((sum, exchange) => sum + exchange.price, 0),
    6
  )

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
        <PortfolioNavBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          numOfferNotifications={myOffers.length}
        />
        <GridLoader />
      </div>
    )

  // TODO: Refactor code below
  return (
    <div className="flex flex-1">
      <PortfolioNavBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        numOfferNotifications={myOffers.length}
      />
      {selectedTab === 'portfolio' ? (
        <div className="flex flex-1 space-x-4 pt-4 mx-4">
          <div className="flex flex-1 flex-col">
            <div className="flex-1 w-full mx-auto bg-slate-100 border border-slate-300 py-8 px-10 shadow-sm overflow-hidden">
              <ServiceView />
            </div>
          </div>
          <div className="flex-none">
            <BioTokenWidget
              accountBalance={{ value: balance?.formatted, units: balance?.symbol }}
              escrowBalance={{ value: escrowedFunds.toString(), units: balance?.symbol }}
              availableToWithdrawEscrowBalance={{
                value: '0.00',
                units: '$',
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-slate-100 rounded-sm border border-slate-300 drop-shadow-sm h-full px-8 py-6">
              <TabWrapper
                tabs={[
                  {
                    label: 'offers',
                    Component: () => (
                      <div>
                        <TableWrapper
                          rows={myOffers.map((offer) =>
                            Object.assign(
                              {},
                              { customComponent: () => <ExchangeTableRow exchange={offer} /> }
                            )
                          )}
                        />
                        {!myOffers.length && <div>No pending offers</div>}
                      </div>
                    ),
                  },
                  {
                    label: 'exchanges',
                    Component: () => (
                      <div>
                        <TableWrapper
                          rows={myActiveOperations.map((offer) =>
                            Object.assign(
                              {},
                              { customComponent: () => <ExchangeTableRow exchange={offer} /> }
                            )
                          )}
                        />
                        {!myActiveOperations.length && <div>No active exchanges</div>}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <BioTokenWidget
              accountBalance={{ value: balance?.formatted, units: balance?.symbol }}
              escrowBalance={{ value: escrowedFunds.toString(), units: balance?.symbol }}
              availableToWithdrawEscrowBalance={{
                value: '0.00',
                units: '$',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
