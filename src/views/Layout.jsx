import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { setActiveAccount, setEthBalance, setBioAssets } from '../store/accountStore'
import { setAllEvents } from '../store/eventStore'
import {
  connectWalletToBionet,
  getExchangeContractEvents,
  getProvider,
  bigNumToUSDString,
  fetchAssets,
} from '../utils'

export function Layout() {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const location = useLocation()
  const dispatch = useDispatch()
  let provider = undefined

  async function connectWallet() {
    const activeAccountAddress = dispatch(setActiveAccount(await connectWalletToBionet())).payload

    provider = await getProvider()
    // TODO: append new events for latest block rather than recreating entire history of events
    // TODO: update escrow balance on mined block
    provider.on('block', async (blockNumber) => {
      // temp solution to index the history of the contract
      const bioAssets = await fetchAssets()
      dispatch(setBioAssets(bioAssets))
      const allExchangeEvents = await getExchangeContractEvents()
      dispatch(setAllEvents(allExchangeEvents))

      dispatch(setEthBalance(bigNumToUSDString(await provider.getBalance(activeAccountAddress))))
    })

    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0) {
        const activeAccountAddress = dispatch(setActiveAccount(accounts[0])).payload
        dispatch(setEthBalance(bigNumToUSDString(await provider.getBalance(activeAccountAddress))))
        return
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
