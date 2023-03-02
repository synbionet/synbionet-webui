import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { setActiveAccount } from '../store/accountStore'
import { setAllEvents } from '../store/eventStore'
import { connectWalletToBionet, getExchangeContractEvents, getProvider } from '../utils'

export function Layout() {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const location = useLocation()
  const dispatch = useDispatch()

  async function connectWallet() {
    dispatch(setActiveAccount(await connectWalletToBionet()))

    const provider = await getProvider()
    // TODO: append new events for latest block rather than recreating entire history of events
    provider.on('block', async (blockNumber) => {
      // temp solution to index the history of the contract
      const allExchangeEvents = await getExchangeContractEvents()
      dispatch(setAllEvents(allExchangeEvents))
    })

    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        return dispatch(setActiveAccount(accounts[0]))
      } else {
        return dispatch(setActiveAccount(undefined))
      }
    })
    window.ethereum.on('disconnect', (accounts) => {
      dispatch(setActiveAccount(undefined))
      return
    })
  }

  return (
    <div className="App flex flex-col min-h-screen text-slate-700 tracking-wide">
      <div className="flex-0">
        <Header connectWallet={connectWallet} />
      </div>
      <div className="bg-gray-200 flex-1 flex flex-col">
        {!activeAccount && location.pathname !== '/' ? (
          <div className="flex flex-col items-center">
            <p className="pt-8 font-semibold text-slate-600 text-center tracking-wide">
              Connect your wallet to use SynBioNet App
            </p>
            <div className="w-40 mt-8">
              <PrimaryButton text="connect Wallet" onClick={connectWallet} />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}
