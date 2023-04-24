import { PrimaryButton } from './common/PrimaryButton'
import { useSelector } from 'react-redux'
import { voidOffer, commitToOffer, redeem, revoke, finalize, generateDid, weiToUSD } from '../utils'
import { useState } from 'react'

export function OfferTable({
  toggleShowPanel,
  isOwnedByActiveAccount,
  providerAddress,
  workflowView,
}) {
  const [expandedOffer, setExpandedOffer] = useState(null)

  const activeAccount = useSelector((state) => state.account.activeAccount)

  const bioAssets = useSelector((state) => state.account.bioAssets)
  const allOfferDetails = bioAssets.filter((asset) => asset.assetType === 'offer')

  const createdOffers = useSelector((state) => state.event.createOfferEvents)
  const voidedOffers = useSelector((state) => state.event.voidOfferEvents)
  const createdExchanges = useSelector((state) => state.event.exchangeCreatedEvents)
  const redeemedExchanges = useSelector((state) => state.event.exchangeRedeemedEvents)
  const completedExchanges = useSelector((state) => state.event.exchangeCompletedEvents)
  const revokedExchanges = useSelector((state) => state.event.exchangeRevokedEvents)

  async function handleVoidOffer(offerId) {
    await voidOffer(offerId)
  }

  async function handleCommitToOffer(offerId) {
    await commitToOffer(offerId)
  }

  async function handleRedeemOffer(offerId) {
    await redeem(offerId)
  }

  async function handleRevokeOffer(exchangeId) {
    await revoke(exchangeId)
  }

  async function handleCompleteExchange(offerId) {
    await finalize(offerId)
  }

  return (
    <div>
      <div className="flex justify-between items-end pb-2">
        <h2 className="text-xl font-semibold">{!workflowView ? 'Offers' : 'Active Operations'}</h2>
        {isOwnedByActiveAccount && (
          <PrimaryButton defaultSize text="Create Offer" onClick={toggleShowPanel} />
        )}
      </div>
      <div className="flex bg-slate-500 bg-opacity-80 h-12 items-center text-white font-semibold">
        <div className="w-16 px-3">ID</div>
        <div className="w-1/4">Name</div>
        <div className="flex-1 flex justify-end">
          <div className="w-32 text-center mr-8">Status</div>
          <div className="w-32 text-center">Price (USD)</div>
        </div>
      </div>
      {/* TODO: refactor all these buttons and conditions below */}
      {createdOffers
        .filter((o) => {
          // filter offers to display in UI
          const isOfferedByThisProvider = o.offer.assetAddress === providerAddress
          if (!isOfferedByThisProvider && !workflowView) return false
          const isCommittedOffer = createdExchanges.find((ce) => o.offerId === ce.offerId)
          const isCommittedToBuy =
            isCommittedOffer && isCommittedOffer.buyer.toLowerCase() === activeAccount.toLowerCase()
          if (workflowView && !isCommittedToBuy) return false
          return true
        })
        .map((o, index) => {
          const isOfferVoided = voidedOffers.find((vo) => o.offerId === vo.offerId)

          const isCommittedOffer = createdExchanges.find((ce) => o.offerId === ce.offerId)
          // TODO: below is quick solution to demo buyer, but this should be whoever owns the voucher not made the initial commitment as emited by the event

          const isCommittedToBuy =
            isCommittedOffer && isCommittedOffer.buyer.toLowerCase() === activeAccount.toLowerCase()

          const isExchangeRevoked =
            isCommittedOffer &&
            revokedExchanges.find((re) => re.exchangeId === isCommittedOffer.exchangeId)

          const isRedeemed =
            isCommittedOffer &&
            redeemedExchanges.find((re) => re.exchangeId === isCommittedOffer.exchangeId)

          const isComplete =
            isRedeemed &&
            completedExchanges.find((ce) => ce.exchangeId === isCommittedOffer.exchangeId)

          function determineButtonState() {
            if (isOfferVoided) {
              return { text: 'Offer Voided', onClick: null }
            } else if (isExchangeRevoked) {
              return { text: 'Revoked', onClick: null }
            } else if (isComplete) {
              return { text: 'Completed', onClick: null }
            } else if (isRedeemed) {
              if (isCommittedToBuy)
                return {
                  text: 'Finalize',
                  onClick: () => handleCompleteExchange(isCommittedOffer.exchangeId),
                }
              else return { text: 'Redeemed', onClick: null }
            } else if (!!isCommittedOffer) {
              if (isOwnedByActiveAccount)
                return {
                  text: 'Revoke',
                  onClick: () => handleRevokeOffer(isCommittedOffer.exchangeId),
                }
              else if (isCommittedToBuy)
                return {
                  text: 'Redeem',
                  onClick: () => handleRedeemOffer(isCommittedOffer.exchangeId),
                }
              else return { text: 'Committed', onClick: null }
            } else {
              if (isOwnedByActiveAccount)
                return { text: 'Void Offer', onClick: () => handleVoidOffer(o.offerId) }
              else return { text: 'Commit', onClick: () => handleCommitToOffer(o.offerId) }
            }
          }

          const buttonState = determineButtonState()

          const did = generateDid(o.offer.assetAddress, o.offer.assetTokenId)
          const offerDetails = allOfferDetails.find((offerDetails) => offerDetails.did === did)

          return (
            <div
              key={o.offerId}
              className={`flex flex-col ${index % 2 && 'bg-slate-200'} ${
                expandedOffer !== o.offerId && 'cursor-pointer'
              }`}
              onClick={() => setExpandedOffer(expandedOffer === o.offerId ? null : o.offerId)}
            >
              <div className="flex h-12 items-center">
                <div className="w-16 px-3">{o.offerId}</div>
                <div className="w-1/4 font-semibold">{offerDetails.name}</div>
                <div className="flex-1 flex justify-end">
                  <div className="w-32 text-center mr-8 uppercase text-sm font-semibold">
                    {isComplete
                      ? 'Completed'
                      : isRedeemed
                      ? 'Redeemed'
                      : isCommittedOffer
                      ? isExchangeRevoked
                        ? 'Revoked'
                        : 'Committed'
                      : isOfferVoided
                      ? 'Voided'
                      : 'Created'}
                  </div>
                  <div className="w-32 text-center font-semibold">{weiToUSD(o.offer.price)}</div>
                </div>
              </div>
              <div
                className={`transition-all duration-500 transition-500 overflow-hidden ${
                  expandedOffer === o.offerId ? 'h-96' : 'h-0'
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="flex-1 pt-4 pl-16">
                      <h3 className="font-semibold uppercase text-sm mb-1 text-gray-500">
                        Description
                      </h3>
                      <p className="h-24 overflow-auto">{offerDetails.description}</p>
                      <h3 className="pt-8 font-semibold uppercase text-sm mb-1 text-gray-500">
                        Agreement Fingerprint
                      </h3>
                      <p>{offerDetails.license}</p>
                    </div>
                    <div className="flex pr-8 pt-6 pl-24">
                      <div className="flex-1 flex flex-col items-center">
                        <OfferTableButton buttonText="View Agreement" onClick={() => {}} />
                        <div className="text-sm font-semibold pt-3">delivery 4-6 weeks</div>
                        <div className="text-sm font-semibold pt-3">98% purity</div>
                        <div className="text-sm font-semibold pt-3">accredited lab</div>
                      </div>
                    </div>
                  </div>

                  {/* TODO: make this progress bar dynamic and refactor as separate component */}
                  <div className="pt-16 flex">
                    <div className="flex justify-center w-1/4 items-center">
                      <div className="flex-1" />
                      <div className="h-5 w-5 rounded-full bg-indigo-400" />
                      <div className="flex-1 h-1 bg-slate-400" />
                    </div>
                    <div className="flex justify-center w-1/4 items-center">
                      <div className="flex-1 h-1 bg-slate-400" />
                      <div className="h-5 w-5 rounded-full bg-slate-400" />
                      <div className="flex-1 h-1 bg-slate-400" />
                    </div>
                    <div className="flex justify-center w-1/4 items-center">
                      <div className="flex-1 h-1 bg-slate-400" />
                      <div className="h-5 w-5 rounded-full bg-slate-400" />
                      <div className="flex-1 h-1 bg-slate-400" />
                    </div>
                    <div className="flex justify-center w-1/4 items-center">
                      <div className="flex-1 h-1 bg-slate-400" />
                      <div className="h-5 w-5 rounded-full bg-slate-400" />
                      <div className="flex-1" />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between text-sm align-middle">
                    <div className="flex flex-col items-center w-1/4">
                      {buttonState && buttonState.text !== 'Void Offer' ? (
                        <div className={`text-center ${!isCommittedOffer && 'text-gray-500'}`}>
                          <div className="font-semibold uppercase">
                            {isOfferVoided ? 'Voided' : 'Created'}
                          </div>
                          <div className="font-mono">{"20 April '23 - 9:16 AM"}</div>
                        </div>
                      ) : (
                        <OfferTableButton
                          buttonText={buttonState.text}
                          onClick={buttonState.onClick}
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-center w-1/4">
                      {buttonState && buttonState.text !== 'Commit' ? (
                        <div className={`text-center ${!isCommittedOffer && 'text-gray-500'}`}>
                          <div className="font-semibold uppercase">committed</div>
                          <div className="font-mono">
                            {!isCommittedOffer ? 'TBD' : "20 April '23 - 9:16 AM"}
                          </div>
                        </div>
                      ) : (
                        <OfferTableButton
                          buttonText={buttonState.text}
                          onClick={buttonState.onClick}
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-center w-1/4">
                      {buttonState &&
                      buttonState.text !== 'Redeem' &&
                      buttonState.text !== 'Revoke' ? (
                        <div
                          className={`text-center ${
                            !isRedeemed && !isComplete && !isExchangeRevoked && 'text-gray-500'
                          }`}
                        >
                          <div className="font-semibold uppercase">
                            {isExchangeRevoked ? 'revoked' : 'redeemed'}
                          </div>
                          <div className="font-mono">
                            {!isRedeemed && !isComplete && !isExchangeRevoked
                              ? 'TBD'
                              : "20 April '23 - 9:16 AM"}
                          </div>
                        </div>
                      ) : (
                        <OfferTableButton
                          buttonText={buttonState.text}
                          onClick={buttonState.onClick}
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-center w-1/4">
                      {buttonState && buttonState.text !== 'Finalize' ? (
                        <div className={`text-center ${!isComplete && 'text-gray-500'}`}>
                          <div className="font-semibold uppercase">finalized</div>
                          <div className="font-mono">
                            {!isComplete ? 'TBD' : "20 April '23 - 9:16 AM"}
                          </div>
                        </div>
                      ) : (
                        <OfferTableButton
                          buttonText={buttonState.text}
                          onClick={buttonState.onClick}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

function OfferTableButton({ buttonText, onClick }) {
  const dynamicStyle = `w-32 h-8 justify-center flex rounded-sm text-sm font-semibold items-center 
    ${buttonText === 'View Agreement' && 'text-indigo-500 border-2 border-indigo-500'}
    ${
      (buttonText === 'Offer Voided' || buttonText === 'Revoked') &&
      'text-white bg-slate-600 opacity-60'
    }
    ${(buttonText === 'Void Offer' || buttonText === 'Revoke') && 'text-white bg-slate-600'}
    ${buttonText === 'Commit' && 'text-white bg-indigo-500'}
    ${
      (buttonText === 'Committed' ||
        buttonText === 'Redeem' ||
        buttonText === 'Redeemed' ||
        buttonText === 'Finalize') &&
      'border-2 border-green-500 bg-green-200 text-green-600'
    }
    ${buttonText === 'Completed' && 'text-white bg-green-600 opacity-80'}
    ${
      onClick &&
      'hover:bg-opacity-90 hover:border-opacity-80 hover:text-opacity-90 transition duration-100 ease-in-out'
    }
    `
  return (
    <div
      className={`${dynamicStyle} ${onClick && 'cursor-pointer'}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {buttonText}
    </div>
  )
}
