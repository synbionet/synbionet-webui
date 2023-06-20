import TextField from '@mui/material/TextField'
import { PrimaryButton } from './common/PrimaryButton'
import { useState } from 'react'

export function CreateServiceForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [serviceApi, setServiceApi] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState('')

  function isInputValid() {
    return name !== '' && description !== '' && serviceApi !== '' && termsAndConditions !== ''
  }

  const testCapabilities = [
    {
      name: 'Protein Expression and Purification',
      description: 'description of our services',
      api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Protein Expression and Purification"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
    },
    {
      name: 'does',
      description: 'description of our services',
      api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Does"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
    },
    {
      name: 'this',
      description: 'description of our services',
      api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"This"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
    },
    {
      name: 'work',
      description: 'description of our services',
      api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Work"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
    },
  ]

  return (
    <div className="flex flex-col space-y-10">
      <TextField
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Service Name"
        variant="filled"
      />
      <TextField
        autoComplete="off"
        id="filled-multiline-static"
        label="Service Description"
        multiline
        rows={5}
        variant="filled"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        autoComplete="off"
        id="filled-multiline-static"
        label="Service API"
        multiline
        rows={5}
        variant="filled"
        onChange={(e) => setServiceApi(e.target.value)}
      />
      <TextField
        autoComplete="off"
        id="filled-multiline-static"
        label="Service Terms and Conditions"
        multiline
        rows={5}
        variant="filled"
        onChange={(e) => setTermsAndConditions(e.target.value)}
      />
      <PrimaryButton
        disabled={!isInputValid()}
        onClick={() =>
          onSubmit({
            name,
            uri: JSON.stringify({
              name,
              description,
              termsAndConditions,
              capabilities: testCapabilities,
            }),
          })
        }
        defaultSize
        text="create service"
      />
    </div>
  )
}
