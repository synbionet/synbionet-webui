import TextField from '@mui/material/TextField'
import { PrimaryButton } from './common/PrimaryButton'
import { useState } from 'react'

export function CreateServiceForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState(exampleDescription)
  const [tags, setTags] = useState(exampleTags)
  const [contact, setContact] = useState(exampleContact)
  const [image, setImage] = useState(exampleImage)
  const [serviceApi, setServiceApi] = useState(exampleCapabilityApi)
  const [termsAndConditions, setTermsAndConditions] = useState(exampleTermsAndConditions)

  function isInputValid() {
    return name !== ''
  }

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
        defaultValue={exampleDescription}
      />
      <TextField
        onChange={(e) => setTags(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Service Tags"
        variant="filled"
        defaultValue={exampleTags}
      />
      <TextField
        onChange={(e) => setContact(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Service Contact"
        variant="filled"
        defaultValue={exampleContact}
      />
      <TextField
        autoComplete="off"
        id="filled-multiline-static"
        label="Service API"
        multiline
        rows={5}
        variant="filled"
        onChange={(e) => setServiceApi(e.target.value)}
        defaultValue={exampleCapabilityApi}
      />
      <TextField
        autoComplete="off"
        id="filled-multiline-static"
        label="Service Terms and Conditions"
        multiline
        rows={5}
        variant="filled"
        onChange={(e) => setTermsAndConditions(e.target.value)}
        defaultValue={exampleTermsAndConditions}
      />
      <TextField
        onChange={(e) => setImage(e.target.value)}
        autoComplete="off"
        id="filled-basic"
        label="Service Image"
        variant="filled"
        defaultValue={exampleImage}
      />
      <PrimaryButton
        disabled={!isInputValid()}
        onClick={() =>
          onSubmit({
            name,
            uri: JSON.stringify({
              name,
              description,
              tags: JSON.parse(tags),
              contact,
              image,
              termsAndConditions,
              capabilities: JSON.parse(serviceApi),
            }),
          })
        }
        defaultSize
        text="create service"
      />
    </div>
  )
}

const exampleImage = 'ipfs://QmTBf3Y3BPSFd1xwgD4f8dmLU3qfSunRcngfoSmEcNCpeU' // BAYC #6346

const exampleContact = 'requests@synbiolab.com'

const exampleTags = JSON.stringify([
  'Gene synthesis',
  'Pathway engineering',
  'Plasmid construction',
  'DNA cloning',
])

const exampleDescription =
  'Our lab specializes in DNA synthesis, gene cloning, and genetic engineering, offering comprehensive services for custom DNA construct design and manipulation. With a focus on strain engineering and metabolic pathway optimization, we enable the development of tailored microbial systems for various industries. Our team of experienced scientists and bioinformatics experts collaborate closely to provide data-driven insights and analysis, facilitating impactful discoveries and innovations in areas such as biotechnology, medicine, and environmental science.'

const exampleCapabilityApi = JSON.stringify([
  {
    name: 'Protein Expression and Purification',
    description: 'Express proteins in various host systems',
    api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Protein Expression and Purification"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
  },
  {
    name: 'Gene Cloning',
    description: 'Generate genetic constructs',
    api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Gene Cloning"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
  },
  {
    name: 'DNA Assembly',
    description:
      'Perform DNA assembly techniques to combine multiple DNA fragments into larger constructs',
    api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"DNA Assembly"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
  },
  {
    name: 'Bioinformatics',
    description:
      'Analysis services, including genome annotation, pathway analysis, protein structure prediction, and next-generation sequencing data analysis',
    api: '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Bioinformatics"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}',
  },
])

const exampleTermsAndConditions =
  'SynBio Technologies LLC and its subsidiaries and affiliates are providing this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here. Service Specifications: The price for any service or product shall be the price stated in the Synbio Technologies’ formal quotation. Synbio Technologies quotations are valid through 30 days from the issued date. Changes to the scope of services (or products) must be agreed upon and authorized by representatives of both Synbio Technologies and client in writing. Shipment and Delivery Terms: Shipping and handling fees will be included in the invoice, except for specifically quoted. Additional fees for shipping and handling, such as wet ice and dry ice packaging fees are included in all invoices as appropriate. Products Acceptance and Returns: If any products shipped to the customer under an order do not materially conform to the applicable sequence submission and quotation or other specifications in the order, or are damaged or short in quantity, then the customer can notify Synbio Technologies within thirty (30) days of customer’s receipt of such products to arrange for the return and replacement of such products. Synbio Technologies will use commercially reasonable efforts to produce and ship customer replacement products within a reasonable period of time; provided that Synbio Technologies may cancel such order (and refund or credit to customer any prepaid amounts received from customer) if Synbio Technologies has already shipped replacement products for such order once before or if Synbio Technologies is unable to produce conforming products. The foregoing shall be customer’s sole and exclusive remedy, and Synbio Technologies sole and exclusive liability, for any failure of products to conform to the order or otherwise be satisfactory to customer. Shipping charges of customer will not be credited or refunded with respect to returns. Payment Terms: Unless specifically quoted, payment shall be made within 30 days from the date of the invoice(s). Taxes: Clients will be responsible for any taxes, fees, duties and charges imposed any governmental authority, including but not limited to use tax, sales tax, custom duty, or excise tax. If client have tax exempt status, a copy of the exemption certificate should be sent along with your order confirmation. Confidentiality: All IP information including DNA sequence and its related information are kept strictly confidential in the entire process by Synbio Technologies. Clients will be notified in advance if the disclosure is requested in any legal proceeding. Indemnification: Clients shall indemnify and hold harmless Synbio Technologies, its subsidiaries and affiliates, and their employees from and against any and all expenses, damages, costs, judgments, and losses arising from clients’ services (or products) based on deliverables or any portion thereof. Force Majeure: Synbio Technologies shall not be deemed in default hereunder for any cessation, interruption or delay in the performance of its obligations due to causes beyond its reasonable control, including but not limited to: earthquake, flood, or other natural disaster, labor controversy, civil disturbance, war (whether or not officially declared) or the inability to obtain sufficient supplies, transportation, or other essential commodity or service required in the conduct of its business, or any change in or the adoption of any law, regulation, judgment or decree (each a “Force Majeure Event”). In the event of any such delay or failure of performance, Synbio Technologies shall have such additional time within which to perform its obligations hereunder as may be reasonably necessary under the circumstances. Limitation of Liability: Synbio Technologies’ liability shall be limited to the price paid by clients for the services (or products) on the relevant sales transaction. Except as prohibited by law, in no event shall Synbio Technologies be liable as a result of Synbio Technologies’ performance of the services (or products) for any indirect, special, incidental, consequential or exemplary damages, including but not limited to damages for loss of profit, loss of customers, loss of data, or loss of business.'
