import { Chip } from '@mui/material'

export function BioAssetCard({ asset, marketView, portfolioView, licenseView }) {
  console.log({ asset })
  return (
    <div className="flex rounded-sm bg-slate-100 shadow">
      <div className="w-2 bg-indigo-400 flex-none" />
      <div
        className={`flex flex-col justify-between flex-grow px-3 pt-3 pb-3 ${
          marketView ? 'h-60' : 'h-36'
        }`}
      >
        <div>
          <div className="flex items-center space-x-3">
            <div className="h-10 rounded-full overflow-hidden">
              <img src="/example_logo.png" className="object-fit w-full h-full" />
            </div>
            <div className="flex flex-col">
              <h4
                className={`capitalize flex-grow font-semibold text-xl tracking-wide leading-6 ${
                  marketView ? 'line-clamp-2' : 'line-clamp-1'
                }`}
              >
                {asset.name}
              </h4>
              {marketView && (
                <div className="mt-1 font-mono text-slate-500 w-32 truncate text-sm tracking-wide">
                  {asset.owner}
                </div>
              )}
            </div>
          </div>
          <p className={`mt-4 ${marketView ? 'line-clamp-3' : 'line-clamp-1'}`}>
            {asset.uri.description}
          </p>
        </div>
        <div className="flex flex-wrap">
          {asset?.uri?.tags?.map((tag) => (
            <div className="mr-1 mt-1">
              <Chip key={tag} size="small" label={tag} variant="outlined" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
