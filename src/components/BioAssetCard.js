const BioAssetCard = ({ bioAsset }) => {
  // TODO: this is a placeholder. deign and make this component
  return (
    <div className="flex flex-col w-48 space-y-2 p-3 rounded bg-white bg-opacity-30">
      <h4 className="text-center">BioAsset</h4>
      <p>License price: {bioAsset.licensePrice}</p>
      <p>Ip for sale? {bioAsset.ipForSale ? 'yes' : 'no'}</p>
    </div>
  )
}

export default BioAssetCard
