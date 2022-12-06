import ExploreViewHeader from '../components/ExploreViewHeader'
import ExploreViewBody from '../components/ExploreViewBody'
import { useSelector } from 'react-redux'

const ExploreView = () => {
  const activeAccount = useSelector((state) => state.account.activeAccount)

  if (!activeAccount) return <p className="pt-4 text-center">Connect your wallet to access page</p>
  return (
    <div>
      <ExploreViewHeader />
      <ExploreViewBody />
    </div>
  )
}

export default ExploreView
