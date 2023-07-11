import { CreateServiceForm } from './CreateServiceForm'
import { createService } from '../utils'
import { PrimaryButton } from './common/PrimaryButton'
import { useState } from 'react'

export function CreateServiceView() {
  const [showCreateServiceForm, setShowCreateServiceForm] = useState()

  async function onCreateServiceFormSubmit(service) {
    await createService(service.name, service.uri)
    setShowCreateServiceForm(false)
  }

  return (
    <div>
      <div className="font-bold text-xl tracking-wide">BioNet Business</div>
      <>
        <div className="text-4xl font-semibold tracking-wide pb-2">Become a BioNet Service</div>
        <div className="text-lg pb-10">Make your capabilities discoverable and earn</div>
        {!showCreateServiceForm ? (
          <PrimaryButton
            onClick={() => setShowCreateServiceForm(true)}
            defaultSize
            text="create service"
          />
        ) : (
          <CreateServiceForm onSubmit={onCreateServiceFormSubmit} />
        )}
      </>
    </div>
  )
}
