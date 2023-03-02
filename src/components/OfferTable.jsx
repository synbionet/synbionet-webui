import { PrimaryButton } from './common/PrimaryButton'
import { useSelector } from 'react-redux'
import { voidOffer, commitToOffer, redeem, finalize } from '../utils'

export function OfferTable({ toggleShowPanel, portfolioView, providerAddress }) {
  const activeAccount = useSelector((state) => state.account.activeAccount)

  const createdOffers = useSelector((state) => state.event.createOfferEvents)
  const voidedOffers = useSelector((state) => state.event.voidOfferEvents)
  const createdExchanges = useSelector((state) => state.event.exchangeCreatedEvents)
  const redeemedExchanges = useSelector((state) => state.event.exchangeRedeemedEvents)
  const completedExchanges = useSelector((state) => state.event.exchangeCompletedEvents)

  async function handleVoidOffer(offerId) {
    await voidOffer(offerId)
  }

  async function handleCommitToOffer(offerId) {
    await commitToOffer(offerId)
  }

  async function handleRedeemOffer(offerId) {
    await redeem(offerId)
  }

  async function handleCompleteExchange(offerId) {
    await finalize(offerId)
  }

  return (
    <div>
      <div className="flex justify-between items-end pb-2">
        <h2 className="text-xl font-semibold">Offers</h2>
        {portfolioView && (
          <PrimaryButton defaultSize text="Create Offer" onClick={toggleShowPanel} />
        )}
      </div>
      <div className="flex bg-slate-500 h-12 items-center text-white font-semibold">
        <div className="w-1/4 px-3">Offer Id</div>
        <div className="w-1/4 px-3">Price</div>
        <div className="w-1/4 px-3">Offer Terms</div>
      </div>
      {/* TODO: refactor all these buttons and conditions below */}
      {createdOffers.map((o, index) => {
        const isOfferedByThisProvider = o.offer.assetAddress === providerAddress
        if (!isOfferedByThisProvider) return undefined
        const isOfferVoided = voidedOffers.find((vo) => o.offerId === vo.offerId)
        const isCommitedOffer = createdExchanges.find((ce) => o.offerId === ce.offerId)
        const isCommitedToBuy =
          isCommitedOffer && isCommitedOffer.buyer.toLowerCase() === activeAccount.toLowerCase()
        const isRedeemed =
          isCommitedOffer &&
          redeemedExchanges.find((re) => re.exchangeId === isCommitedOffer.exchangeId)
        const isComplete =
          isRedeemed &&
          completedExchanges.find((ce) => ce.exchangeId === isCommitedOffer.exchangeId)
        return (
          <div key={o.offerId} className={`flex h-12 items-center ${index % 2 && 'bg-slate-200'}`}>
            <div className="w-1/4 px-3">{o.offerId}</div>
            <div className="w-1/4 px-3">{o.offer.price}</div>
            <div className="w-1/4 px-3">{o.offer.metadataUri}</div>
            <div className="w-1/4 px-3 flex justify-end">
              {isComplete ? (
                <div className="h-8 justify-center flex rounded-sm text-sm font-semibold text-white items-center bg-green-600 opacity-80 w-32">
                  Completed
                </div>
              ) : isCommitedOffer ? (
                isRedeemed ? (
                  <div
                    className="h-8 justify-center flex rounded-sm text-sm font-semibold items-center border-2 border-green-500 bg-green-200 text-green-600 w-32 cursor-pointer"
                    onClick={() => handleCompleteExchange(isCommitedOffer.exchangeId)}
                  >
                    Finalize
                  </div>
                ) : isCommitedToBuy ? (
                  <div
                    className="h-8 justify-center flex rounded-sm text-sm font-semibold items-center border-2 border-green-500 bg-green-200 text-green-600 w-32 cursor-pointer"
                    onClick={() => handleRedeemOffer(isCommitedOffer.exchangeId)}
                  >
                    Redeem
                  </div>
                ) : (
                  <div className="h-8 justify-center flex rounded-sm text-sm font-semibold items-center border-2 border-green-500 bg-green-200 text-green-600 w-32">
                    Commited
                  </div>
                )
              ) : isOfferVoided ? (
                <div className="h-8 justify-center flex rounded-sm text-sm font-semibold text-white items-center bg-slate-600 opacity-60 w-32">
                  Offer Voided
                </div>
              ) : portfolioView ? (
                <div
                  className="h-8 justify-center flex rounded-sm text-sm font-semibold text-white items-center bg-slate-600 w-32 cursor-pointer"
                  onClick={() => handleVoidOffer(o.offerId)}
                >
                  Void Offer
                </div>
              ) : (
                <div
                  className="h-8 justify-center flex rounded-sm text-sm font-semibold text-white items-center bg-indigo-500 w-32 cursor-pointer"
                  onClick={() => handleCommitToOffer(o.offerId)}
                >
                  Commit
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
