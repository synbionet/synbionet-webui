import HeaderButton from './HeaderButton'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveAccount } from '../store/accountStore'
import { SynBioNet } from '@synbionet/api'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const dispatch = useDispatch()
  const location = useLocation()

  async function connectWallet() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    const account = await synbionet.requestAccounts()
    dispatch(setActiveAccount(account))
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        return dispatch(setActiveAccount(accounts[0]))
      } else {
        return dispatch(setActiveAccount(undefined))
      }
    })
    window.ethereum.on('disconnect', (accounts) => {
      console.log({ test: accounts })
      dispatch(setActiveAccount(undefined))
      return
    })
  }

  return (
    <div className="flex items-center space-x-8">
      <Link to="/market">
        <HeaderButton buttonTitle="Market" isActive={location.pathname === '/market'} />
      </Link>
      <Link to="/portfolio">
        <HeaderButton buttonTitle="Portfolio" isActive={location.pathname === '/portfolio'} />
      </Link>
      <HeaderButton
        buttonTitle={activeAccount ? activeAccount : 'Connect'}
        onClick={connectWallet}
      />
    </div>
  )
}

const Header = ({ setActiveView }) => {
  return (
    <header className="flex items-center justify-between pl-4 pr-8 h-16 bg-gray-100 drop=shadow-sm border-2 border-slate-300">
      <Link to="/">
        <div className="flex space-x-1 items-center">
          {/* <img src={logo} className="h-10" alt="logo" /> */}
          <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-indigo-400" />
          <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-indigo-300" />
          <div className="w-4 h-4 bg-gradient-to-r from-indigo-300 to-indigo-200" />
          <h1 className="text-xl tracking-wide pl-1">SynBioNet</h1>
        </div>
      </Link>
      <NavBar setActiveView={setActiveView} />
    </header>
  )
}
export default Header
