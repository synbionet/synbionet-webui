import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { Link } from 'react-router-dom'

const HomeView = () => {
  return (
    <div className="flex flex-1 pt-56">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-96 word-break flex-none font-semibold text-slate-500 text-5xl text-center">
          Incentivize innovation and collaboration in{' '}
          <span className="text-indigo-500">Synthetic Biology</span>
        </div>
        <div className="flex space-x-8 mt-20">
          <Link to="/market">
            <div className="w-40">
              <PrimaryButton text="view market" />
            </div>
          </Link>
          <Link to="/portfolio">
            <div className="w-40">
              <PrimaryButton text="manage assets" />
            </div>
          </Link>
          <a target="_blank" href="https://github.com/synbionet" rel="noreferrer">
            <div className="w-40">
              <SecondaryButton text="view GitHub" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default HomeView
