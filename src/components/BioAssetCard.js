const BioAssetCard = ({ asset, assetIndex, marketView, portfolioView, licenseView }) => {
  return (
    <div className="flex flex-col rounded bg-white bg-opacity-20 px-6 pt-4 pb-6">
      <div className="flex">
        <h4 className="capitalize flex-grow font-semibold text-xl">{asset.name}</h4>
        {parseInt(asset.availableLicenses) > 0 && portfolioView && (
          <div className="whitespace-nowrap">Available on Market</div>
        )}
      </div>
      {!portfolioView && <div className="w-36 truncate">{asset.owner}</div>}
      <p className="mt-8">{asset.description}</p>
      {marketView && (
        <p className="mt-8">
          {asset.licensePrice} {parseInt(asset.licensePrice) !== 1 ? 'BioTokens' : 'BioToken'}
        </p>
      )}
    </div>
  )
}

export default BioAssetCard
