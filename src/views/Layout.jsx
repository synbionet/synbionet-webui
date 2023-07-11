import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastNotification } from '../components/common/ToastNotification'

import { useAccount } from 'wagmi'
import { ConnectKitButton } from 'connectkit'

export function Layout() {
  const lastTransactionStatus = useSelector((state) => state.account.lastTransactionStatus)
  const lastTransactionMessage = useSelector((state) => state.account.lastTransactionMessage)
  const { isConnected } = useAccount()
  const location = useLocation()

  return (
    <div className="App flex flex-col min-h-screen text-slate-700 tracking-wide">
      <ToastNotification
        lastTransactionStatus={lastTransactionStatus}
        message={lastTransactionMessage}
      />
      <div className="flex-0">
        <Header />
      </div>
      <div className="bg-slate-200 flex-1 flex flex-col">
        {!isConnected && location.pathname !== '/' ? (
          <div className="flex flex-col items-center">
            <p className="pt-8 font-semibold text-slate-600 text-center tracking-wide">
              Connect your wallet to use SynBioNet App
            </p>
            <div className="mt-8">
              <ConnectKitButton />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}
