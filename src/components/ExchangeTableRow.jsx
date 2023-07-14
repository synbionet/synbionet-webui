import { PrimaryButton } from './common/PrimaryButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import { fundOffer, completeExchange } from '../utils'
import { useAccount } from 'wagmi'

export function ExchangeTableRow({ exchange, variant }) {
  const { address, isConnected } = useAccount()

  async function handleFundOffer() {
    await fundOffer(exchange.id)
    console.log('offer funded')
  }

  async function handleCompleteExchange() {
    await completeExchange(exchange.id)
    console.log('exchange complete')
  }

  return (
    <div className="flex flex-col flex-1 space-y-4 py-2">
      <div className="flex justify-between">
        <div className="flex flex-col space-y-3">
          <div className="truncate font-mono">
            {variant === 'serviceOperations'
              ? `Buyer: ${exchange.buyer}`
              : `Seller: ${exchange.seller}`}
          </div>
          <div className="font-mono">$500.00</div>
        </div>
        <div className="flex flex-col space-y-3">
          {address === exchange.seller && (
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
                size="small"
                defaultSize
                text="Dispute"
                endIcon={<GavelRoundedIcon />}
              />
            </div>
          )}
          <PrimaryButton
            defaultSize
            alternate
            size="small"
            text="View Proposal"
            endIcon={<ArrowOutwardIcon />}
          />
        </div>
      </div>
      <HorizontalLinearStepper exchangeState={exchange.state} />
    </div>
  )
}

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = ['Offered', 'Funded', 'Complete']

function HorizontalLinearStepper({ exchangeState }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={exchangeState}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <div>{label}</div>
              {index <= exchangeState && <div>{new Date().toLocaleString()}</div>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
