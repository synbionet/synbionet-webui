import { FormField } from './FormField'
import { PrimaryButton } from './PrimaryButton'
import { SecondaryButton } from './SecondaryButton'
import { ReactComponent as CloseIcon } from '../../assets/close-x.svg'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'

export function FlyoutForm({
  inputFields = [],
  formTitle,
  submitButtonText,
  handleSubmit,
  showPanel,
  setShowPanel,
  jsonForm,
}) {
  return (
    <div>
      <div
        className={`fixed inset-0 top-16 z-40 bg-black transition-opacity duration-1000 ${
          showPanel ? 'opacity-80' : 'opacity-0 pointer-events-none'
        }`}
      ></div>
      <div
        className={`fixed z-50 right-0 top-16 bottom-0 bg-slate-100 w-1/2 xl:w-1/3 transition transform ease-in-out duration-500 pt-3 px-4 flex flex-col ${
          showPanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-full flex items-center justify-between pb-2 border-b-2 border-gray-400">
          <h2 className="font-semibold text-gray-600">{formTitle}</h2>
          <button className="p-2" onClick={() => setShowPanel(false)}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full h-full py-4 overflow-scroll">
          {jsonForm ? (
            <JsonForms
              schema={jsonForm.dataSchema}
              uischema={jsonForm.uiSchema}
              data={jsonForm.data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data, errors }) => {
                jsonForm.setData(data)
              }}
            />
          ) : (
            <form className="flex flex-col space-y-8">
              {inputFields.map((field, index) => {
                return (
                  <FormField
                    key={index}
                    value={field.value}
                    setter={field.setter}
                    label={field.label}
                    type={field.type}
                    disabled={field.disabled}
                    selectionOptions={field.selectionOptions}
                  />
                )
              })}
            </form>
          )}
          <div className="space-y-4 pt-4">
            <PrimaryButton
              text={submitButtonText ? submitButtonText : 'Submit'}
              onClick={handleSubmit}
            />
            <SecondaryButton
              text="Cancel"
              onClick={(e) => {
                e.preventDefault()
                setShowPanel(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// dynamic form examples for jsonForms

// raw json
// {"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Protein Expression and Purification"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}

// javascript objects
// const dataSchema = {
//   type: 'object',
//   properties: {
//     geneName: {
//       type: 'string',
//     },
//     sequence: {
//       type: 'string',
//     },
//     requiredServices: {
//       type: 'array',
//       uniqueItems: true,
//       items: {
//         type: 'string',
//         enum: [
//           'Yeast Expression System',
//           'Baculovirus-Insect Cell Expression System',
//           'Mammalian Cell Expression System',
//           'Bacterial Expression System',
//         ],
//       },
//     },
//     purity: {
//       type: 'integer',
//       maximum: 100,
//     },
//     amount: {
//       type: 'integer',
//     },
//     additionalComments: {
//       type: 'string',
//     },
//   },
// }

// const uiSchema = {
//   type: 'VerticalLayout',
//   elements: [
//     {
//       type: 'Label',
//       text: 'Protein Expression and Purification',
//     },
//     {
//       type: 'Control',
//       scope: '#/properties/geneName',
//     },
//     {
//       type: 'Control',
//       scope: '#/properties/sequence',
//       label: 'Sequence',
//       options: {
//         multi: true,
//       },
//     },
//     {
//       type: 'Control',
//       scope: '#/properties/requiredServices',
//     },
//     {
//       type: 'Control',
//       scope: '#/properties/purity',
//       label: 'Purity (%)',
//     },
//     {
//       type: 'Control',
//       scope: '#/properties/amount',
//       label: 'Amount (g)',
//     },
//     {
//       type: 'Control',
//       scope: '#/properties/additionalComments',
//       options: {
//         multi: true,
//       },
//     },
//   ],
// }
