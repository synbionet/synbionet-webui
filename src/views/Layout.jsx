import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { setActiveAccount } from '../store/accountStore'
import { connectWalletToBionet } from '../utils'

export function Layout() {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const location = useLocation()
  const dispatch = useDispatch()

  async function connectWallet() {
    dispatch(setActiveAccount(await connectWalletToBionet()))
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
