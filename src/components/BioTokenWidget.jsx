import { PrimaryButton } from './common/PrimaryButton'
import { ThreeDotsLoader } from './common/ThreeDotsLoader'
import { withdrawFunds } from '../utils'

export function BioTokenWidget({ accountBalance, escrowBalance }) {
  return (
    <div className="p-6 px-8 space-y-6 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm">
      <div className="flex flex-col items-center">
        <h5 className="font-semibold uppercase tracking-wider text-slate-500 pt-1">
          account balance
        </h5>
        <div className="flex items-baseline mt-4">
          {!accountBalance ? (
            <ThreeDotsLoader height="40" width="60" />
          ) : (
            <div className="text-4xl mr-1" style={{ minHeight: '40px' }}>
              {accountBalance.value}
            </div>
          )}
        </div>
        {accountBalance && (
          <div className="text-base font-semibold text-slate-600 uppercase">
            {accountBalance.units}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h5 className="font-semibold uppercase tracking-wider text-slate-500 pt-1">
          escrow balance
        </h5>
        <div className="flex items-baseline mt-4">
          {!escrowBalance ? (
            <ThreeDotsLoader height="40" width="60" />
          ) : (
            <div className="text-4xl mr-1" style={{ minHeight: '40px' }}>
              {escrowBalance.value}
            </div>
          )}
        </div>
        {escrowBalance && (
          <div className="text-base font-semibold text-slate-600 uppercase">
            {escrowBalance.units}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        <PrimaryButton
          text="withdraw"
          onClick={withdrawFunds}
          disabled={parseFloat(escrowBalance) === 0}
        />
      </div>
    </div>
  )
}
