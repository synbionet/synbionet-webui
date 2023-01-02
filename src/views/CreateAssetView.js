import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { createAsset } from '../utils'
import { FormField } from '../components/common/FormField'

export function CreateAssetView() {
  const navigate = useNavigate()
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [serviceEndpointValue, setServiceEndpointValue] = useState('')
  const [licenseValue, setlicenseValue] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    await createAsset(titleValue, descriptionValue, licenseValue, serviceEndpointValue)
    navigate('/portfolio')
  }

  return (
    <div>
      <div className="mt-8 w-11/12 lg:w-9/12 xl:w-3/4 mx-auto py-4 px-6">
        <div className="mb-8 font-semibold text-2xl capitalize">Publish Asset</div>
        <form className="flex flex-col space-y-8">
          <FormField value={titleValue} setter={setTitleValue} type="text" label="title" />
          <FormField
            value={descriptionValue}
            setter={setDescriptionValue}
            type="textarea"
            label="description"
          />
          <FormField
            value={serviceEndpointValue}
            setter={setServiceEndpointValue}
            type="text"
            label="service endpoint"
          />
          <FormField
            value={licenseValue}
            setter={setlicenseValue}
            type="text"
            label="license URI"
          />
          <PrimaryButton defaultSize text="Publish" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  )
}
