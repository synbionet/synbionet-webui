import HeaderButton from './HeaderButton'
import logo from '../logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveAccount } from '../store/accountStore'
import { SynBioNet } from '@synbionet/api'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const dispatch = useDispatch()

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
  }

  return (
    <div className="flex items-center space-x-8">
      <Link to="/">
        <HeaderButton buttonTitle="Explore" />
      </Link>
      <Link to="/portfolio">
        <HeaderButton buttonTitle="Portfolio" />
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
    <header className="flex justify-between px-8 h-16 items-cente bg-gray-800">
      <div className="flex items-center">
        <img src={logo} className="h-10" alt="logo" />
        <h1 className="text-xl">SynBioNet</h1>
      </div>
      <NavBar setActiveView={setActiveView} />
    </header>
  )
}
export default Header
