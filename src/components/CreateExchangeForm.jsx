import TextField from '@mui/material/TextField'
import { PrimaryButton } from './common/PrimaryButton'
import { useState } from 'react'

export function CreateExchangeForm({ onSubmit }) {
  const [buyer, setBuyer] = useState('0x70997970c51812dc3a010c7d01b50e0d17dc79c8')
  const [moderator, setModerator] = useState('0x90f79bf6eb2c4f870365e785982e1f101e93b906')
  const [price, setPrice] = useState('')
  const [agreementUri, setAgreementUri] = useState(
    '/ipfs/QmZQqbc1u8RKv1CgXijCzDv64vZvqQpXZbbkG1Lfa9xEeH'
  )

  function isInputValid() {
    return buyer !== '' && moderator !== '' && price !== '' && agreementUri !== ''
  }

  return (
    <div className="flex flex-col space-y-10">
      <TextField
        onChange={(e) => setBuyer(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Buyer"
        variant="filled"
        defaultValue={buyer}
      />
      <TextField
        onChange={(e) => setModerator(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Moderator"
        variant="filled"
        defaultValue={moderator}
      />
      <TextField
        onChange={(e) => setPrice(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Price (USDC)"
        variant="filled"
      />
      <TextField
        onChange={(e) => setAgreementUri(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="AgreementUri"
        variant="filled"
        defaultValue={agreementUri}
      />
      <div className="w-64">
        <PrimaryButton disabled={!isInputValid()} onClick={{}} text="create service" />
      </div>
    </div>
  )
}

// serviceId: 1,
// buyer: buyerAddress,
// moderator: moderatorAddress,
// moderatorPercentage: defaultModeratorFee,
// price: defaultPrice,
// disputeTimerValue: defaultDisputeTime,
// uri: 'ar://txid',
