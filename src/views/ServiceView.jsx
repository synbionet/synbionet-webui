import { useParams } from 'react-router-dom'
import { Chip, Rating } from '@mui/material'
import { useState, useEffect } from 'react'
// import { ThreeDotsLoader } from '../components/common/ThreeDotsLoader'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { SlideWrapper } from '../components/common/SlideWrapper'
import { BreadcrumbsWrapper } from '../components/common/BreadcrumbsWrapper'
import { BadgeWrapper } from '../components/common/BadgeWrapper'
import { TableWrapper } from '../components/common/TableWrapper'
import { getServices } from '../utils'
import { useAccount } from 'wagmi'
import { CreateServiceView } from '../components/CreateServiceView'
import { JsonForms } from '@jsonforms/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { Modal } from '../components/common/Modal'
import { CreateExchangeForm } from '../components/CreateExchangeForm'
import { createExchange } from '../utils'
import { useSelector } from 'react-redux'
import { TabWrapper } from '../components/common/TabWrapper'
import { ExchangeTableRow } from '../components/ExchangeTableRow'

export function ServiceView() {
  const { did } = useParams()
  const { address } = useAccount()
  const [capabilityFormData, setCapabilityFormData] = useState({})
  const [selectedCapability, setSelectedCapability] = useState()
  const [currentSlide, setCurrentSlide] = useState('serviceOverview')
  const [destinationSlide, setDestinationSlide] = useState()
  const [jsonFormSchemas, setJsonFormSchemas] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const services = useSelector((state) => state.event.services)
  const exchanges = useSelector((state) => state.event.exchanges)

  const myActiveOperations = exchanges?.filter((exchange) => exchange.seller === address)

  const dummyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ante nec tellus vulputate, ac fringilla magna aliquam. Sed convallis cursus ligula vel consequat. Proin fermentum, neque id aliquet vestibulum, augue nisi pulvinar sem, vel faucibus velit massa in dolor. Vivamus venenatis, turpis ac tincidunt consectetur, nisl ex laoreet metus, nec iaculis tortor justo nec nulla. Cras finibus tempor purus, id feugiat neque feugiat id. Suspendisse potenti. Maecenas quis lacinia ex, vel cursus dui. Suspendisse tempor, metus in consectetur pellentesque, massa orci elementum dolor, non eleifend ipsum nisi nec elit. Curabitur iaculis, neque id elementum ultricies, velit quam volutpat urna, id condimentum nisi quam et velit. Sed eu iaculis ligula. Sed mattis, lorem id fermentum blandit, ipsum dui tempor turpis, id bibendum tortor turpis in tortor. Fusce vulputate scelerisque felis id ultrices. Sed in aliquet odio.\n\nPellentesque ut tortor ac justo lobortis pellentesque. Sed consectetur justo eget turpis varius pulvinar. Ut eget metus mauris. In vel elit id felis vestibulum tincidunt a ut odio. Etiam faucibus, justo vel vulputate aliquam, elit ligula facilisis nulla, a posuere purus ipsum vel purus. Curabitur in lacus enim. Vestibulum hendrerit est in eros viverra tincidunt. Mauris auctor, ex vel tristique fringilla, nibh nibh tristique urna, ut gravida mauris dui vel purus. Nunc auctor mauris ac massa ultrices, vel gravida leo dapibus. Vivamus pellentesque mauris non ligula rutrum commodo. Mauris sagittis, odio ut lacinia lacinia, sapien lectus aliquam nisl, eu aliquam sem lacus non urna. Integer iaculis felis ligula, sit amet malesuada enim fermentum et.'

  const service = did
    ? services?.find((service) => service.id === parseInt(did))
    : services?.find((service) => service.owner === address)

  useEffect(() => {
    if (destinationSlide) {
      if (destinationSlide === 'capabilityForm')
        setJsonFormSchemas(JSON.parse(service.uri.capabilities[selectedCapability - 1].api))
      setCurrentSlide(null)
    }
  }, [destinationSlide])

  async function onCreateExchange(serviceId, buyer, moderator, price, agreementUri) {
    await createExchange(serviceId, buyer, moderator, price, agreementUri)
    setDestinationSlide('serviceOverview')
  }

  function selectCapability(index) {
    setSelectedCapability(index + 1)
    setDestinationSlide('capabilityForm')
  }

  return (
    <div>
      {!service && <CreateServiceView />}
      <Modal title={service?.name} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <SlideWrapper
        show={service && currentSlide === 'serviceOverview'}
        isTransitionDisabled={selectedCapability === undefined}
        Component={() => (
          <div className="flex flex-col space-y-8 w-full">
            <div className="flex items-center space-x-3">
              <div className="h-12 rounded-full overflow-hidden">
                <img src="/example_logo.png" className="object-fit w-full h-full" />
              </div>
              <div className="flex flex-col space-y-1">
                <h2 className="font-semibold text-2xl capitalize">{service.name}</h2>
                <div className="font-mono text-slate-600 text-sm">{service.owner}</div>
              </div>
            </div>
            {/* <div className="flex space-x-3 font-mono text-slate-600 text-sm items-center">
              <Rating name="read-only" size="small" value={5} readOnly />
              <div>29 Exchanges</div>
            </div> */}
            {service?.owner === address && (
              <div className="w-48">
                <PrimaryButton
                  text="Create Exchange"
                  onClick={() => setDestinationSlide('createExchange')}
                />
              </div>
            )}
            <div className="flex space-x-6">
              {service?.uri?.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </div>
            <TabWrapper
              tabs={[
                {
                  label: 'About us',
                  Component: () => (
                    <div className="space-y-12">
                      <div className="flex space-x-12 pt-6">
                        <BadgeWrapper title="BioNet Alliance" description="9/12/23" />
                        <BadgeWrapper title="Accreditied Lab" description="8/2/23" />
                        <BadgeWrapper title="Biosecurity Accreditation" description="7/11/23" />
                      </div>
                      <ServiceViewTableRow
                        title="Description"
                        details={service.uri.description + dummyText}
                        lineClamp
                      />
                      <div className="w-56">
                        <PrimaryButton
                          alternate
                          text="Terms & Conditions"
                          onClick={() => setIsModalOpen(true)}
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  label: 'Capabilities',
                  Component: () => (
                    <>
                      <TableWrapper
                        rows={
                          service.uri.capabilities
                            ? service.uri.capabilities.map((capability) => {
                                return {
                                  label: capability.name,
                                  secondary: capability.description,
                                }
                              })
                            : []
                        }
                        onClick={selectCapability}
                      />
                    </>
                  ),
                },
                {
                  label: 'Active Operations',
                  Component: () => (
                    <>
                      <TableWrapper
                        rows={
                          myActiveOperations?.map((exchange) => {
                            return {
                              customComponent: () => (
                                <ExchangeTableRow exchange={exchange} variant="serviceOperations" />
                              ),
                            }
                          }) || []
                        }
                      />
                      {!myActiveOperations.length && <div>No active exchanges</div>}
                    </>
                  ),
                },
              ]}
            />
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
              <CreateExchangeForm onSubmit={onCreateExchange} serviceId={service?.id} />
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
  )
}

const ServiceViewTableRow = ({ title, details, lineClamp }) => {
  const [isLineClampled, setIsLineClamped] = useState(lineClamp ? true : false)
  const [showReadMore, setShowReadMore] = useState()

  useEffect(() => {
    if (!lineClamp || !isLineClampled) return
    const element = document.getElementById('details')
    setShowReadMore(element ? element.scrollHeight > element.clientHeight : null)
  }, [])

  return (
    <div>
      <div className="font-medium tracking-wider text-sm uppercase text-slate-600 mb-1 pb-2">
        {title}
      </div>
      {details && (
        <div>
          <div
            id="details"
            className={`whitespace-pre-line leading-loose pb-2 ${isLineClampled && 'line-clamp-4'}`}
          >
            {details}
          </div>
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
