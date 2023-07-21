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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
      {services.map((service) => {
        return (
          <div key={service.id}>
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
