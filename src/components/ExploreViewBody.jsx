import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GridLoader } from './common/GridLoader'
import { useState } from 'react'
import { getServices } from '../utils'
import { BioAssetCard } from './BioAssetCard'

export function ExploreViewBody() {
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState([])

  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true)
      setServices(await getServices())
      setIsLoading(false)
    }
    fetchServices()
  }, [])

  return (
    <div className="flex flex-wrap mx-8">
      {services.map((service) => {
        return (
          <div key={service.id} className="w-1/4 p-3">
            <Link to={`/asset/${service.id}`}>
              <BioAssetCard marketView asset={service} />
            </Link>
          </div>
        )
      })}
      {isLoading && <GridLoader />}
    </div>
  )
}
