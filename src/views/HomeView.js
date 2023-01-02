import { PrimaryButton } from '../components/common/PrimaryButton'
import { SecondaryButton } from '../components/common/SecondaryButton'
import { Link } from 'react-router-dom'

export function HomeView() {
  return (
    <div className="flex flex-1 pt-56">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-96 word-break flex-none font-semibold text-slate-500 text-5xl text-center">
          Incentivize innovation and collaboration in{' '}
          <span className="text-indigo-500">Synthetic Biology</span>
        </div>
        <div className="flex space-x-8 mt-20">
          <Link to="/market">
            <PrimaryButton defaultSize text="view market" />
          </Link>
          <Link to="/portfolio">
            <PrimaryButton defaultSize text="manage assets" />
          </Link>
          <a target="_blank" href="https://github.com/synbionet" rel="noreferrer">
            <SecondaryButton defaultSize text="view GitHub" />
          </a>
        </div>
      </div>
    </div>
  )
}
