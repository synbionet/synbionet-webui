import { ReactComponent as MinusIcon } from '../assets/minusIcon.svg'
import { ReactComponent as PlusIcon } from '../assets/plusIcon.svg'
import { SynBioNet } from 'synbionet-api'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'

// TODO: refactor this page. break down into component. Only buy and sell biotokens working right now.

const PortfolioView = () => {
  const [accountBalance, setAccountBalance] = useState(undefined)
  const activeAccount = useSelector((state) => state.account.activeAccount)

  async function buyTokens() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.buyBioTokens(5)
    const balance = await synbionet.portfolio.getBioTokenBalance(activeAccount)
    setAccountBalance(ethers.utils.formatUnits(balance, 'wei'))
  }

  async function withdrawTokens() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.market.withdrawBioTokens(5)
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

  if (!activeAccount) return <p className="pt-4 text-center">Connect your wallet to access page</p>

  return (
    <div className="flex flex-col pt-4">
      {/* bioToken part */}
      <div className="mx-8 flex items-center space-x-10 text-3xl">
        <div className="flex flex-col">
          <h5 className="font-semibold text-base">balance:</h5>
          <h3>{accountBalance} BioTokens</h3>
        </div>
        <button onClick={buyTokens} className="w-6 h-6 fill-gray-200 opacity-40 hover:opacity-60">
          <PlusIcon />
          <div className="text-base opacity-100">Buy</div>
        </button>
        <button
          onClick={withdrawTokens}
          className="w-6 h-6 fill-gray-200 opacity-40 hover:opacity-60"
        >
          <MinusIcon />
          <div className="text-base">Sell</div>
        </button>
      </div>
      {/* bottom */}
      <div className="mt-8 flex">
        {/* IP part */}
        <div className="w-1/2">
          <div className="flex mx-8 space-x-2 items-center border-b-2 border-gray-300 pb-1">
            <h3 className="text-3xl pl-2">BioAssets</h3>
            <button className="w-6 h-6 fill-gray-200 opacity-40 hover:opacity-60">
              <PlusIcon />
            </button>
          </div>
        </div>
        {/* License part */}
        <div className="w-1/2">
          <div className="flex mx-8 space-x-2 items-center border-b-2 border-gray-300 pb-1">
            <h3 className="text-3xl pl-2">Licenses</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioView
