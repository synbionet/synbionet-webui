import { PrimaryButton } from './common/PrimaryButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import {
  fundOffer,
  completeExchange,
  disputeExchange,
  resolveExchange,
  agreeToDisputeResolution,
  formatCurrency,
  formatUSDCBalance,
} from '../utils'
import { useAccount } from 'wagmi'
import { AddressDetails } from './Header'

export function ExchangeTableRow({ exchange, variant }) {
  const { address, isConnected } = useAccount()

  async function handleFundOffer() {
    await fundOffer(exchange.id)
  }

  async function handleAgreeToDisputeResolution() {
    await agreeToDisputeResolution(exchange.id)
  }

  async function handleCompleteExchange() {
    await completeExchange(exchange.id)
  }

  async function handleResolveExchange(resolutionType) {
    await resolveExchange(exchange.id, resolutionType)
  }

  async function handleDisputeExchange() {
    await disputeExchange(exchange.id)
  }

  return (
    <div className="flex flex-col flex-1 space-y-4 py-2">
      <div className="flex justify-between">
        <div className="flex flex-col items-stretch text-center pb-4">
          <div className="font-mono text-gray-600 text-xs uppercase py-1">Seller</div>
          <AddressDetails address={exchange.seller} />
        </div>

        <div className="flex flex-col items-stretch text-center space-y-2">
          <div className="font-mono text-gray-600 text-xs uppercase pt-1">Price</div>
          <div className="text-lg font-medium">
            {formatCurrency(formatUSDCBalance(exchange.price))}
          </div>

          <div className="font-mono text-gray-600 text-xs uppercase pt-2">Actions</div>
          {/* <div className="text-lg pt-6">{formatCurrency(formatUSDCBalance(exchange.price))}</div> */}
          {address === exchange.seller && exchange.state === 0 && (
            <PrimaryButton size="small" defaultSize text="Void Offer" endIcon={<DeleteIcon />} />
          )}
          {address === exchange.buyer && exchange.state === 0 && (
            <PrimaryButton
              onClick={handleFundOffer}
              size="small"
              defaultSize
              text="Fund Offer"
              endIcon={<HandshakeOutlinedIcon />}
            />
          )}
          {address === exchange.buyer && exchange.state === 1 && (
            <div className="flex flex-col space-y-3">
              <PrimaryButton
                onClick={handleCompleteExchange}
                size="small"
                defaultSize
                text="Complete"
                endIcon={<DoneRoundedIcon />}
              />
              <PrimaryButton
                onClick={handleDisputeExchange}
                size="small"
                defaultSize
                text="Dispute"
                endIcon={<GavelRoundedIcon />}
              />
            </div>
          )}
          {address === exchange.moderator && exchange.state === 2 && (
            <div className="flex flex-col space-y-3">
              <PrimaryButton
                onClick={() => handleResolveExchange('full')}
                size="small"
                defaultSize
                text="Full Refund"
              />
              <PrimaryButton
                onClick={() => handleResolveExchange('partial')}
                size="small"
                defaultSize
                text="Partial Refund"
              />
              <PrimaryButton
                onClick={() => handleResolveExchange('none')}
                size="small"
                defaultSize
                text="No Refund"
              />
            </div>
          )}
          {(address === exchange.buyer || address === exchange.seller) && exchange.state === 3 && (
            <PrimaryButton
              onClick={handleAgreeToDisputeResolution}
              size="small"
              defaultSize
              text="Agree to Refund"
            />
          )}
          <PrimaryButton
            defaultSize
            alternate
            size="small"
            text="Proposal"
            endIcon={<ArrowOutwardIcon />}
          />
        </div>

        <div className="flex flex-col items-stretch text-center pb-4">
          <div className="font-mono text-gray-600 text-xs uppercase py-1">Buyer</div>
          <AddressDetails flip address={exchange.buyer} />
        </div>
      </div>
      <div className="pt-6">
        <HorizontalStepperWithError exchange={exchange} />
      </div>
    </div>
  )
}

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

export default function HorizontalStepperWithError({ exchange }) {
  const isDisputed = exchange.state === 2
  const isResolved = exchange.state === 3 || (exchange.state === 4 && exchange.signer)
  const steps = ['Offered', 'Funded', isDisputed ? 'Disputed' : 'Complete']
  const when = parseInt(exchange.when.toString() + '000')

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={exchange.state}>
        {steps.map((label, index) => {
          const labelProps = {}
          if ((isDisputed || isResolved) && index === 2) {
            labelProps.optional = (
              <Typography
                variant="caption"
                className={exchange.state === 2 ? 'capitalize' : 'uppercase'}
                color="error"
              >
                {exchange.state === 2
                  ? 'In moderation'
                  : exchange.refundType === 2
                  ? 'Full Refund'
                  : exchange.refundType === 1
                  ? 'Partial Refund'
                  : 'No Refund'}
              </Typography>
            )

            labelProps.error = isDisputed
          } else {
            labelProps.optional = (
              <Typography variant="caption">{new Date(when).toLocaleString()}</Typography>
            )
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}
