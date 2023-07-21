import { ExploreViewHeader } from '../components/ExploreViewHeader'
import { ExploreViewBody } from '../components/ExploreViewBody'

export function ExploreView() {
  return (
    <div className="px-2 md:px-4 lg:px-8">
      <ExploreViewHeader />
      <ExploreViewBody />
    </div>
  )
}
