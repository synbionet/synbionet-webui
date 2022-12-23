const BioAssetCard = ({ asset, assetIndex, marketView, portfolioView, licenseView }) => {
  return (
    <div className="flex rounded-sm bg-gray-100 border-2 border-slate-300 drop-shadow-sm">
      <div className="w-2 bg-slate-300" />
      <div className="flex flex-col flex-grow px-6 pt-4 pb-6">
        <div className="flex">
          <h4 className="capitalize flex-grow font-semibold text-xl tracking-wide">{asset.name}</h4>
          {parseInt(asset.availableLicenses) > 0 && portfolioView && (
            <div className="whitespace-nowrap">Available on Market</div>
          )}
        </div>
        {marketView && (
          <div className="flex items-baseline">
            <div className="w-36 truncate text-sm tracking-wide">{asset.owner}</div>
          </div>
        )}
        <p className="mt-8">{asset.description}</p>
        {marketView && (
          <p className="mt-8">
            {asset.licensePrice} {parseInt(asset.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
          </p>
        )}
      </div>
    </div>
  )
}

export default BioAssetCard
