import { ReactComponent as MinusIcon } from '../assets/minusIcon.svg'
import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'
import { useSelector } from 'react-redux'
import { SynBioNet } from '@synbionet/api'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const BioTokenWidget = () => {
  const [accountBalance, setAccountBalance] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)

  async function buyTokens() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.buyBioTokens(5)
    const balance = await synbionet.portfolio.getBioTokenBalance(activeAccount)
    setAccountBalance(ethers.utils.formatUnits(balance, 'wei'))
  }

  async function withdrawTokens() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.withdrawBioTokens(5)
    const balance = await synbionet.portfolio.getBioTokenBalance(activeAccount)
    setAccountBalance(ethers.utils.formatUnits(balance, 'wei'))
  }

  useEffect(() => {
    async function getBalance() {
      const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
      const balance = await synbionet.portfolio.getBioTokenBalance(activeAccount)
      setAccountBalance(ethers.utils.formatUnits(balance, 'wei'))
    }
    if (activeAccount) getBalance()
  }, [activeAccount])

  return (
    <div className="mx-8 flex items-center space-x-10 text-3xl">
      <div className="flex flex-col">
        <h5 className="font-semibold text-base">balance:</h5>
        <h3>{accountBalance} BioTokens</h3>
      </div>
      <button onClick={buyTokens} className="w-6 h-6 fill-gray-200 opacity-80 hover:opacity-100">
        <PlusIcon />
        <div className="text-base opacity-100">Buy</div>
      </button>
      <button
        onClick={withdrawTokens}
        className="w-6 h-6 fill-gray-200 opacity-80 hover:opacity-100"
      >
        <MinusIcon />
        <div className="text-base">Sell</div>
      </button>
    </div>
  )
}

export default BioTokenWidget
