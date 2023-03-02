import { BioAssetCard } from './BioAssetCard'
import { PrimaryButton } from './common/PrimaryButton'
import { SecondaryButton } from './common/SecondaryButton'
import { Link } from 'react-router-dom'

export function AssetTable({ assets = [], portfolioView, licenseView }) {
  return (
    <div className="flex flex-col space-y-4 bg-gray-100 rounded-sm border-2 border-slate-300 drop-shadow-sm px-8 py-6">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold uppercase tracking-wider text-slate-500 py-2">
          {/* TODO: update logic here */}
          {portfolioView ? 'Business Overview' : 'licenses'}
        </h5>
        {portfolioView ? (
          <Link to="/create">
            <PrimaryButton defaultSize text="Register Service" />
          </Link>
        ) : (
          <Link to="/market">
            <SecondaryButton defaultSize text="search market" />
          </Link>
        )}
      </div>
      {assets.map((bioAsset) => (
        <Link key={bioAsset.did} to={`/asset/${bioAsset.did}`}>
          <BioAssetCard asset={bioAsset} portfolioView={portfolioView} />
        </Link>
      ))}
    </div>
  )
}
