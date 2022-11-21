import HeaderButton from './HeaderButton'
import logo from '../logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveAccount } from '../store/accountStore'
import { SynBioNet } from '@synbionet/api'

const NavBar = ({ setActiveView }) => {
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const dispatch = useDispatch()

  async function connectWallet() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    const account = await synbionet.requestAccounts()
    dispatch(setActiveAccount(account))
  }

  return (
    <div className="flex space-x-8">
      <HeaderButton buttonTitle="Explore" onClick={() => setActiveView('Explore')} />
      <HeaderButton buttonTitle="Portfolio" onClick={() => setActiveView('Portfolio')} />
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
        <h1 className="text-xl font-semibold">SynBioNet</h1>
      </div>
      <NavBar setActiveView={setActiveView} />
    </header>
  )
}
export default Header
