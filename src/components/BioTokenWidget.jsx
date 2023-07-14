import { PrimaryButton } from './common/PrimaryButton'
import { ThreeDotsLoader } from './common/ThreeDotsLoader'
import { withdrawFunds } from '../utils'

export function BioTokenWidget({
  accountBalance,
  escrowBalance,
  availableToWithdrawEscrowBalance,
}) {
  const usDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className="p-6 px-8 space-y-6 bg-slate-100 rounded-sm border border-slate-300 drop-shadow-sm">
      <div className="flex flex-col items-center">
        <h5 className="font-medium uppercase tracking-wider text-slate-500 pt-1">
          account balance
        </h5>
        <div className="flex items-baseline mt-4">
          {!accountBalance ? (
            <ThreeDotsLoader height="40" width="60" />
          ) : (
            <div className="text-3xl mr-1" style={{ minHeight: '40px' }}>
              {usDollar.format(accountBalance.value)}
            </div>
          )}
        </div>
        {accountBalance && (
          <div className="text-base font-semibold text-slate-600 uppercase">
            {accountBalance.units}
          </div>
        )}
      </div>

      {parseInt(escrowBalance.value) > 0 && (
        <div className="flex flex-col items-center">
          <h5 className="font-medium uppercase tracking-wider text-slate-500 pt-1">
            escrow balance
          </h5>
          <div className="flex items-baseline mt-4">
            {!escrowBalance ? (
              <ThreeDotsLoader height="40" width="60" />
            ) : (
              <div className="text-3xl mr-1" style={{ minHeight: '40px' }}>
                {usDollar.format(escrowBalance.value)}
              </div>
            )}
          </div>
          {escrowBalance && (
            <div className="text-base font-semibold text-slate-600 uppercase">
              {escrowBalance.units}
            </div>
          )}
        </div>
      )}

      {/* <div className="flex flex-col space-y-2 items-center">
        {parseFloat(escrowBalance?.value) > 0 && availableToWithdrawEscrowBalance && (
          <div className="text-sm font-semibold text-slate-500 lowercase">
            ${availableToWithdrawEscrowBalance.value} Available to Withdraw
          </div>
        )}
        <PrimaryButton
          text="withdraw"
          onClick={withdrawFunds}
          disabled={
            !availableToWithdrawEscrowBalance ||
            parseFloat(availableToWithdrawEscrowBalance.value) === 0
          }
        />
      </div> */}
    </div>
  )
}
