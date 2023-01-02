import { PrimaryButton } from './common/PrimaryButton'
import { useState } from 'react'
import { buyBioTokens, withdrawBioTokens } from '../utils'
import { FormField } from './common/FormField'
import { ThreeDots } from 'react-loader-spinner'

function BuyAndSellToggle({ buyOptionSelected, setBuyOptionSelected }) {
  const commonStyle = 'w-1/2 tracking-wider rounded-sm py-2 drop-shadow-sm font-semibold'
  const activeStyle = 'bg-indigo-200 text-slate-800'
  const passiveStyle = 'text-slate-500 bg-gray-200'

  return (
    <div className="flex w-full space-x-2 text-center">
      <button
        onClick={() => setBuyOptionSelected(true)}
        className={`${commonStyle} ${buyOptionSelected ? activeStyle : passiveStyle}`}
      >
        Buy
      </button>
      <button
        onClick={() => setBuyOptionSelected(false)}
        className={`${commonStyle} ${!buyOptionSelected ? activeStyle : passiveStyle}`}
      >
        Sell
      </button>
    </div>
  )
}

export function BioTokenWidget({ accountBalance, getBioTokenBalance }) {
  const [tokensToBuyOrSell, setTokensToBuyOrSell] = useState('')
  const [buyOptionSelected, setBuyOptionSelected] = useState(true)

  async function handleTradeTokens() {
    const amt = parseInt(tokensToBuyOrSell)
    buyOptionSelected ? await buyBioTokens(amt) : await withdrawBioTokens(amt)
    getBioTokenBalance()
    setTokensToBuyOrSell('')
  }

  return (
    <div className="p-6 px-8 space-y-6 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm">
      <div className="flex flex-col items-center">
        <h5 className="font-semibold uppercase wtracking-wider text-slate-500 pt-1">balance</h5>
        <div className="flex items-baseline mt-4">
          {!accountBalance ? (
            <ThreeDots
              height="40"
              width="60"
              radius="9"
              color="#6366f1"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            <div className="text-4xl mr-1" style={{ minHeight: '40px' }}>
              {accountBalance}
            </div>
          )}
        </div>
        <div className="text-base font-semibold text-slate-600">BioTokens</div>
      </div>
      <div className="flex flex-col space-y-4 w-48">
        <BuyAndSellToggle
          setBuyOptionSelected={setBuyOptionSelected}
          buyOptionSelected={buyOptionSelected}
        />
        <FormField
          alternateStyle
          type="text"
          value={tokensToBuyOrSell}
          setter={setTokensToBuyOrSell}
          placeholder="Enter Amt"
        />
        <PrimaryButton text="trade" onClick={handleTradeTokens} />
      </div>
    </div>
  )
}
