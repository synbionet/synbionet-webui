import { ReactComponent as MinusIcon } from '../assets/minusIcon.svg'
import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'
import PrimaryButton from './PrimaryButton'
import { useSelector } from 'react-redux'
import { SynBioNet } from '@synbionet/api'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const BioTokenWidget = () => {
  const [tokensToBuyOrSell, setTokensToBuyOrSell] = useState('')
  const [accountBalance, setAccountBalance] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)
  const [buyOptionSelected, setBuyOptionSelected] = useState(true)

  function handleChange(event, setter) {
    setter(event.target.value)
  }

  async function buyTokens() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.buyBioTokens(parseInt(tokensToBuyOrSell))
    const balance = await synbionet.portfolio.getBioTokenBalance(activeAccount)
    setAccountBalance(ethers.utils.formatUnits(balance, 'wei'))
    setTokensToBuyOrSell('')
  }

  async function withdrawTokens() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.withdrawBioTokens(parseInt(tokensToBuyOrSell))
    const balance = await synbionet.portfolio.getBioTokenBalance(activeAccount)
    setAccountBalance(ethers.utils.formatUnits(balance, 'wei'))
    setTokensToBuyOrSell('')
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
    <div className="mx-8 flex space-x-10 bg-gray-100 px-4 py-4 rounded-sm border-2 border-slate-300 drop-shadow-sm">
      <div className="flex flex-col">
        <h5 className="font-semibold uppercase tracking-wider text-slate-500 pt-1">balance</h5>
        <div className="flex items-baseline mt-4">
          <div className="text-4xl mr-1">{accountBalance}</div>
          <div className="text-base font-semibold text-slate-600">BioTokens</div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-48">
        <div className="flex text-center">
          <button
            onClick={() => setBuyOptionSelected(true)}
            className={`w-1/2 mr-1 rounded-sm py-2 drop-shadow-sm ${
              buyOptionSelected ? 'bg-slate-300' : 'border border-slate-400'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setBuyOptionSelected(false)}
            className={`w-1/2 ml-1  rounded-sm py-2 drop-shadow-sm ${
              !buyOptionSelected ? 'bg-slate-300' : 'border border-slate-400'
            }`}
          >
            Sell
          </button>
        </div>
        <input
          className="placeholder:italic placeholder:text-slate-500 text-slate-800 bg-slate-200 shadow-inner py-2 font-semibold rounded-sm px-2 focus:outline-none tracking-wide text-center"
          placeholder="Enter Amt"
          type="text"
          name="search"
          autoComplete="off"
          value={tokensToBuyOrSell}
          onChange={(e) => handleChange(e, setTokensToBuyOrSell)}
        />
        <PrimaryButton text="trade" onClick={buyOptionSelected ? buyTokens : withdrawTokens} />
      </div>
      {/* <button onClick={buyTokens} className="w-6 h-6 fill-gray-200 opacity-80 hover:opacity-100">
        <PlusIcon />
        <div className="text-base opacity-100">Buy</div>
      </button>
      <button
        onClick={withdrawTokens}
        className="w-6 h-6 fill-gray-200 opacity-80 hover:opacity-100"
      >
        <MinusIcon />
        <div className="text-base">Sell</div>
      </button> */}
    </div>
  )
}

export default BioTokenWidget
