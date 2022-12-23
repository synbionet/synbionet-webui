import { useState } from 'react'
import { SynBioNet } from '@synbionet/api'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'

const CreateAssetView = () => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [serviceEndpointValue, setServiceEndpointValue] = useState('')
  const [licenseValue, setlicenseValue] = useState('')
  const navigate = useNavigate()

  function handleChange(event, setter) {
    setter(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await createAsset()
    navigate('/portfolio')
  }

  async function createAsset() {
    const synbionet = new SynBioNet({ ethereumClient: window.ethereum })
    await synbionet.portfolio.createAsset(
      titleValue,
      descriptionValue,
      licenseValue,
      serviceEndpointValue
    )
  }

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="my-12 font-semibold text-2xl capitalize">Create Asset</div>
      {/* <form className="flex flex-col space-y-8" onSubmit={handleSubmit}> */}
      <form className="flex flex-col space-y-8">
        <label>
          Title:
          <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
            <input
              className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
              type="text"
              value={titleValue}
              onChange={(e) => handleChange(e, setTitleValue)}
            />
          </div>
        </label>
        <label>
          Description:
          <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
            <textarea
              className="h-40 px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
              type="text"
              value={descriptionValue}
              onChange={(e) => handleChange(e, setDescriptionValue)}
            />
          </div>
        </label>
        <label>
          Service Endpoint:
          <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
            <input
              className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
              type="text"
              value={serviceEndpointValue}
              onChange={(e) => handleChange(e, setServiceEndpointValue)}
            />
          </div>
        </label>
        <label>
          License:
          <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
            <input
              className="px-2 grow placeholder:italic placeholder:text-slate-200 bg-gray-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm"
              type="text"
              value={licenseValue}
              onChange={(e) => handleChange(e, setlicenseValue)}
            />
          </div>
        </label>
        <div className="w-36">
          <PrimaryButton text="Submit" onClick={handleSubmit} />
        </div>
        {/* <input
          className="w-36 text-center py-1 bg-slate-200 bg-opacity-60 text-slate-800 rounded"
          type="submit"
          value="Submit"
        /> */}
      </form>
    </div>
  )
}

export default CreateAssetView
