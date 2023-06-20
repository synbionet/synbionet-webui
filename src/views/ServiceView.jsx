import { useParams } from 'react-router-dom'
import { Slide, Fade, Chip, Rating } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import { useState, useEffect } from 'react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
// import { ThreeDotsLoader } from '../components/common/ThreeDotsLoader'
import { getServices } from '../utils'
import { useAccount } from 'wagmi'
import { JsonForms } from '@jsonforms/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { Modal } from '../components/common/Modal'
import { CreateExchangeForm } from '../components/CreateExchangeForm'

export function ServiceView() {
  const { did } = useParams()
  const { address } = useAccount()
  const [services, setServices] = useState(undefined)
  const [capabilityFormData, setCapabilityFormData] = useState({})
  const [selectedCapability, setSelectedCapability] = useState()
  // const [showCapabilityDetails, setShowCapabilityDetails] = useState(false)
  // const [showCapabilityMenu, setShowCapabilityMenu] = useState(true)
  const [currentSlide, setCurrentSlide] = useState('serviceOverview')
  const [destinationSlide, setDestinationSlide] = useState()
  const [jsonFormSchemas, setJsonFormSchemas] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dummyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ante nec tellus vulputate, ac fringilla magna aliquam. Sed convallis cursus ligula vel consequat. Proin fermentum, neque id aliquet vestibulum, augue nisi pulvinar sem, vel faucibus velit massa in dolor. Vivamus venenatis, turpis ac tincidunt consectetur, nisl ex laoreet metus, nec iaculis tortor justo nec nulla. Cras finibus tempor purus, id feugiat neque feugiat id. Suspendisse potenti. Maecenas quis lacinia ex, vel cursus dui. Suspendisse tempor, metus in consectetur pellentesque, massa orci elementum dolor, non eleifend ipsum nisi nec elit. Curabitur iaculis, neque id elementum ultricies, velit quam volutpat urna, id condimentum nisi quam et velit. Sed eu iaculis ligula. Sed mattis, lorem id fermentum blandit, ipsum dui tempor turpis, id bibendum tortor turpis in tortor. Fusce vulputate scelerisque felis id ultrices. Sed in aliquet odio.\n\nPellentesque ut tortor ac justo lobortis pellentesque. Sed consectetur justo eget turpis varius pulvinar. Ut eget metus mauris. In vel elit id felis vestibulum tincidunt a ut odio. Etiam faucibus, justo vel vulputate aliquam, elit ligula facilisis nulla, a posuere purus ipsum vel purus. Curabitur in lacus enim. Vestibulum hendrerit est in eros viverra tincidunt. Mauris auctor, ex vel tristique fringilla, nibh nibh tristique urna, ut gravida mauris dui vel purus. Nunc auctor mauris ac massa ultrices, vel gravida leo dapibus. Vivamus pellentesque mauris non ligula rutrum commodo. Mauris sagittis, odio ut lacinia lacinia, sapien lectus aliquam nisl, eu aliquam sem lacus non urna. Integer iaculis felis ligula, sit amet malesuada enim fermentum et.'

  const service = did
    ? services?.find((service) => service.id === parseInt(did))
    : services?.find((service) => service.owner === address)

  useEffect(() => {
    async function fetchServices() {
      setServices(await getServices())
    }
    fetchServices()
  }, [])

  useEffect(() => {
    if (destinationSlide) {
      if (destinationSlide === 'capabilityForm')
        setJsonFormSchemas(JSON.parse(service.uri.capabilities[selectedCapability - 1].api))
      setCurrentSlide(null)
    }
  }, [destinationSlide])

  function selectCapability(index) {
    setSelectedCapability(index)
    setDestinationSlide('capabilityForm')
  }

  const AssetDetailsTableRow = ({ title, details, lineClamp }) => {
    const [isLineClampled, setIsLineClamped] = useState(lineClamp ? true : false)
    const [showReadMore, setShowReadMore] = useState()

    useEffect(() => {
      if (!lineClamp || !isLineClampled) return
      const element = document.getElementById('details')
      setShowReadMore(element ? element.scrollHeight > element.clientHeight : null)
    }, [])

    return (
      <div>
        <h3 className="font-semibold capitalize text-black mb-1 pb-2">{title}</h3>
        {details && (
          <div>
            <p
              id="details"
              className={`whitespace-pre-line leading-loose pb-2 ${
                isLineClampled && 'line-clamp-4'
              }`}
            >
              {details}
            </p>
            {showReadMore && isLineClampled && (
              <div
                onClick={() => setIsLineClamped(false)}
                className="font-medium underline cursor-pointer"
              >
                Read More
              </div>
            )}
            {lineClamp && !isLineClampled && (
              <div
                onClick={() => setIsLineClamped(true)}
                className="font-medium underline cursor-pointer"
              >
                Show Less
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div
        className={
          'w-full mx-auto bg-slate-100 border border-slate-300 py-8 px-10 shadow-sm overflow-hidden min-h-screen'
        }
      >
        {!service && <CreateServiceView />}
        <Modal title={service?.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <SlideWrapper
          show={service && currentSlide === 'serviceOverview'}
          isTransitionDisabled={selectedCapability === undefined}
          Component={() => (
            <div className="flex flex-col space-y-14 w-full">
              <div className="flex flex-col space-y-2 border-b pb-8">
                <h2 className="font-semibold text-2xl capitalize">MITRE LABS - {service.name}</h2>
                <div className="font-mono text-slate-600 text-sm pb-2">{service.owner}</div>
                <div className="flex space-x-3 font-mono text-slate-600 text-sm pb-4">
                  <Rating name="read-only" size="small" value={5} readOnly />
                  <div>2k+ Exchanges</div>
                </div>
                <div className="flex space-x-6">
                  <Chip label="Gene synthesis" variant="outlined" />
                  <Chip label="Pathway engineering" variant="outlined" />
                  <Chip label="Plasmid construction" variant="outlined" />
                  <Chip label="DNA cloning" variant="outlined" />
                </div>
                <div className="flex space-x-6 pt-5">
                  {service?.owner === address && (
                    <div className="w-64">
                      <PrimaryButton
                        text="Create Exchange"
                        onClick={() => setDestinationSlide('createExchange')}
                      />
                    </div>
                  )}
                  <div className="w-64">
                    <PrimaryButton
                      alternate
                      text="Terms & Conditions"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-12">
                <BadgeWrapper title="BioNet Alliance" description="9/12/23" />
                <BadgeWrapper title="Accreditied Lab" description="8/2/23" />
                <BadgeWrapper title="Biosecurity Accreditation" description="7/11/23" />
              </div>
              <AssetDetailsTableRow
                title="Description"
                details={service.uri.description + dummyText}
                lineClamp
              />
              <div>
                <AssetDetailsTableRow title="Capabilities" />
                <TableWrapper
                  rows={service.uri.capabilities.map((capability) => {
                    return {
                      name: capability.name,
                      calories: capability.description,
                    }
                  })}
                  onClick={selectCapability}
                />
              </div>
            </div>
          )}
          onExited={() => setCurrentSlide(destinationSlide)}
        />
        <SlideWrapper
          show={currentSlide === 'createExchange'}
          onExited={() => setCurrentSlide(destinationSlide)}
          Component={() => (
            <div>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-row space-x-4 items-center">
                  <div className="cursor-pointer">
                    <ArrowBackIcon
                      size="small"
                      onClick={() => setDestinationSlide('serviceOverview')}
                    />
                  </div>
                  <BreadcrumbsWrapper serviceName={service?.name} pageName="Create Exchange" />
                </div>
                <CreateExchangeForm onSubmit={{}} />
              </div>
            </div>
          )}
        />
        <SlideWrapper
          show={jsonFormSchemas && currentSlide === 'capabilityForm'}
          onExited={() => setCurrentSlide(destinationSlide)}
          Component={() => (
            <div>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-row space-x-4 items-center">
                  <div className="cursor-pointer">
                    <ArrowBackIcon
                      size="small"
                      onClick={() => setDestinationSlide('serviceOverview')}
                    />
                  </div>
                  <BreadcrumbsWrapper serviceName={service?.name} pageName="Capabilities" />
                </div>
                <JsonForms
                  schema={jsonFormSchemas.dataSchema}
                  uischema={jsonFormSchemas.uiSchema}
                  data={capabilityFormData}
                  renderers={materialRenderers}
                  cells={materialCells}
                  onChange={({ data, errors }) => {
                    setCapabilityFormData(data)
                  }}
                />
                <div className="w-64">
                  <PrimaryButton text="Submit Request" />
                </div>
                <div className="w-64">
                  <PrimaryButton alternate text="Save to Workflow" />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}

function SlideWrapper({ Component, show, isTransitionDisabled, onExited }) {
  return (
    <Fade
      in={Boolean(show)}
      onExited={onExited}
      timeout={{ enter: isTransitionDisabled ? 0 : 300, exit: isTransitionDisabled ? 0 : 300 }}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <Slide
          direction="right"
          in={Boolean(show)}
          timeout={{
            enter: isTransitionDisabled ? 0 : 300,
            exit: isTransitionDisabled ? 0 : 300,
          }}
        >
          <div>
            <Component />
          </div>
        </Slide>
      </div>
    </Fade>
  )
}

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ]

export function TableWrapper({ rows, onClick }) {
  return (
    <TableContainer>
      <Table aria-labelledby="tableTitle" size={'medium'}>
        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = false
            const labelId = `enhanced-table-checkbox-${index}`

            return (
              <TableRow
                hover
                onClick={() => onClick(index + 1)} // to avoid index 0 as false
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" id={labelId} scope="row">
                  <div className="font-semibold pb-2">{row.name}</div>
                  <div>{row.calories}</div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export default function BreadcrumbsWrapper({ serviceName, pageName }) {
  const breadcrumbs = [
    <Typography className="capitalize" key="1" color="text.primary">
      {serviceName}
    </Typography>,
    <Typography className="capitalize" key="2" color="text.primary">
      {pageName}
    </Typography>,
  ]

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  )
}

import { CreateServiceForm } from '../components/CreateServiceForm'
import { createService } from '../utils'

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
          <CreateServiceForm
            onSubmit={onCreateServiceFormSubmit}
            setShowCreateServiceForm={setShowCreateServiceForm}
          />
        )}
      </>
    </div>
  )
}

function BadgeWrapper({ title, description }) {
  return (
    <>
      <div className="flex items-center space-x-3">
        <div className="border pt-2 px-3 pb-3 rounded-full border-gray-400">
          <BadgeIcon fontSize="large" />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{title}</div>
          <div className="text-xs">{description}</div>
        </div>
      </div>
    </>
  )
}

// let jsonFormSchemas = JSON.parse(
//   '{"uiSchema":{"type":"VerticalLayout","elements":[{"type":"Label","text":"Protein Expression and Purification"},{"type":"Control","scope":"#/properties/geneName"},{"type":"Control","scope":"#/properties/sequence","label":"Sequence","options":{"multi":true}},{"type":"Control","scope":"#/properties/requiredServices"},{"type":"Control","scope":"#/properties/purity","label":"Purity (%)"},{"type":"Control","scope":"#/properties/amount","label":"Amount (g)"},{"type":"Control","scope":"#/properties/additionalComments","options":{"multi":true}}]},"dataSchema":{"type":"object","properties":{"geneName":{"type":"string"},"sequence":{"type":"string"},"requiredServices":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["Yeast Expression System","Baculovirus-Insect Cell Expression System","Mammalian Cell Expression System","Bacterial Expression System"]}},"purity":{"type":"integer","maximum":100},"amount":{"type":"integer"},"additionalComments":{"type":"string"}}}}'
// )
// let dataSchema = jsonFormSchemas.dataSchema
// let uiSchema = jsonFormSchemas.uiSchema
// let jsonFormSchemas
// let dataSchema
// let uiSchema
