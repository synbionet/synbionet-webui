import { BioTokenWidget } from '../components/BioTokenWidget'
import { PortfolioNavBar } from '../components/PortfolioNavBar'
import { TableWrapper } from '../components/common/TableWrapper'
import { useState } from 'react'
import { useBalance, useAccount } from 'wagmi'
import { USDC_CONTRACT_ADDRESS } from '@synbionet/api'
import { ServiceView } from './ServiceView'
import { useSelector } from 'react-redux'
import { TabWrapper } from '../components/common/TabWrapper'
import { ExchangeTableRow } from '../components/ExchangeTableRow'
import { formatUSDCBalance } from '../utils'

export function PortfolioView() {
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address,
    token: USDC_CONTRACT_ADDRESS,
    watch: true,
  })

  const exchanges = useSelector((state) => state.event.exchanges)
  const exchangesAsBuyer = exchanges?.filter((exchange) => exchange.buyer === address) || []
  const exchangesAsSeller = exchanges?.filter((exchange) => exchange.seller === address) || []
  const exchangesAsModerator = exchanges?.filter((exchange) => exchange.moderator === address) || []
  const exchangesOfferedToMe = exchangesAsBuyer?.filter((exchange) => exchange.state === 0) || []
  const disputedExchanges = [
    ...exchangesAsBuyer,
    ...exchangesAsSeller,
    ...exchangesAsModerator,
  ].filter((exchange) => exchange.state === 2 || exchange.state === 3)

  const escrowedFunds = formatUSDCBalance(
    exchangesAsBuyer
      .filter((exchange) => exchange.state !== 0 && exchange.state !== 4)
      .reduce((sum, exchange) => sum + exchange.price, 0)
  )

  const [selectedTab, setSelectedTab] = useState('portfolio')

  // TODO: Refactor code below
  return (
    <div className="flex flex-1">
      <PortfolioNavBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        numOfferNotifications={exchangesOfferedToMe.length}
        numDisputeNotifications={disputedExchanges.length}
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
      ) : selectedTab === 'workflows' ? (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-slate-100 rounded-sm border border-slate-300 drop-shadow-sm h-full px-8 py-6">
              <TabWrapper
                tabs={[
                  {
                    label: 'exchanges',
                    Component: () => (
                      <div>
                        <TableWrapper
                          rows={exchangesAsBuyer.map((offer) =>
                            Object.assign(
                              {},
                              { customComponent: () => <ExchangeTableRow exchange={offer} /> }
                            )
                          )}
                        />
                        {!exchangesAsBuyer.length && <div>No Exchanges</div>}
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
      ) : (
        <div className="flex-1 flex space-x-4 pt-4 mx-4">
          <div className="flex-1">
            <div className="flex flex-col space-y-4 bg-slate-100 rounded-sm border border-slate-300 drop-shadow-sm h-full px-8 py-6">
              <TabWrapper
                tabs={[
                  {
                    label: 'disputes',
                    Component: () => (
                      <div>
                        <TableWrapper
                          rows={disputedExchanges.map((offer) =>
                            Object.assign(
                              {},
                              { customComponent: () => <ExchangeTableRow exchange={offer} /> }
                            )
                          )}
                        />
                        {!disputedExchanges.length && <div>No Disputes</div>}
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
