import { PrimaryButton } from '../components/common/PrimaryButton'
import { SecondaryButton } from '../components/common/SecondaryButton'
import { Link } from 'react-router-dom'

export function HomeView() {
  return (
    <div className="flex flex-1 pt-16">
      <div className="flex-1 flex flex-col items-center">
        <div className="h-[600px] rounded-full overflow-hidden">
          <img src="/bionet-home-graphic.png" className="object-fit w-full h-full" />
        </div>
        {/* <div className="w-96 word-break flex-none font-medium text-slate-500 leading-tight text-5xl text-center">
          Capability Network of Synthetic Biology
        </div> */}
        <div className="flex space-x-8 mt-20">
          <Link to="/network">
            <PrimaryButton disableElevation defaultSize text="view network" />
          </Link>
          <Link to="/portfolio">
            <PrimaryButton disableElevation defaultSize text="manage assets" />
          </Link>
          <a target="_blank" href="https://github.com/synbionet" rel="noreferrer">
            <PrimaryButton defaultSize alternate text="View GitHub" />
          </a>
        </div>
      </div>
    </div>
  )
}
