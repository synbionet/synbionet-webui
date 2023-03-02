import { PrimaryButton } from './common/PrimaryButton'

export function BioAssetCard({ asset, marketView, portfolioView, licenseView }) {
  return (
    <div className="flex rounded-sm bg-gray-100 border-2 border-slate-300 drop-shadow-sm">
      <div className="w-2 bg-indigo-200 flex-none" />
      <div
        className={`flex flex-col justify-between flex-grow px-3 pt-3 pb-3 ${
          marketView ? 'h-60' : 'h-36'
        }`}
      >
        <div>
          <div className="flex">
            <h4
              className={`capitalize flex-grow font-semibold text-xl tracking-wide leading-6 ${
                marketView ? 'line-clamp-2' : 'line-clamp-1'
              }`}
            >
              {asset.name}
            </h4>
          </div>
          {marketView && (
            <div className="flex items-baseline mt-1">
              <div className="font-mono text-slate-500 w-24 truncate text-sm tracking-wide">
                {asset.owner}
              </div>
            </div>
          )}
          <p className={`mt-4 ${marketView ? 'line-clamp-3' : 'line-clamp-1'}`}>
            {asset.description}
          </p>
        </div>
        {/* {marketView && (
          <p className="mt-4">
            <span className="mr-1 text-2xl font-semibold">{asset.licensePrice}</span>
            <span className="text-slate-500">
              {parseInt(asset.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
            </span>
          </p>
        )} */}
        {parseInt(asset.availableLicenses) > 0 && portfolioView && (
          <div className="mt-4">
            <p className="text-sm font-semibold uppercase text-indigo-400">Available on market</p>
          </div>
        )}
      </div>
    </div>
  )
}
