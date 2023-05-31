import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GridLoader } from './common/GridLoader'
import { useState } from 'react'

export function ExploreViewBody() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getAssets() {
      setIsLoading(true)
      setIsLoading(false)
    }
    getAssets()
  })

  return (
    <div className="flex flex-wrap mx-8">
      {[1, 2, 3, 4].map((asset) => {
        return (
          <div key={asset} className="w-1/4 p-3">
            <Link to={`/asset/${asset.did}`}>
              <div className="bg-gray-400 h-64"></div>
            </Link>
          </div>
        )
      })}
      {isLoading && <GridLoader />}
    </div>
  )
}
