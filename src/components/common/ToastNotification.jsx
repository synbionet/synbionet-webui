import React, { useState, useEffect } from 'react'
import { ReactComponent as LoadingSpinner } from '../../assets/loading-spinner.svg'
import { ReactComponent as CheckBadge } from '../../assets/check-badge.svg'
import { ReactComponent as ExclamationPoint } from '../../assets/exclamation-point.svg'

export function ToastNotification({ lastTransactionStatus, message }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)
    const status = lastTransactionStatus
    if (status) {
      setShow(true)
      if (status === 'complete' || status === 'failed') setTimeout(() => setShow(false), 2000)
    }
  }, [lastTransactionStatus, message])

  return (
    <div
      className={`${
        show ? 'translate-y-1' : '-translate-y-full'
      } fixed top-0 w-full transition-transform duration-500 ease-in-out flex justify-center`}
    >
      <div
        className={`${
          lastTransactionStatus === 'failed'
            ? 'bg-red-500'
            : lastTransactionStatus === 'pending'
            ? 'bg-indigo-600'
            : 'bg-green-500'
        }  py-3 flex items-center justify-center space-x-4 w-96 rounded-sm shadow text-white`}
      >
        {lastTransactionStatus === 'pending' && (
          <LoadingSpinner className="stroke-current w-7 h-7" />
        )}
        {lastTransactionStatus === 'complete' && <CheckBadge className="stroke-white w-7 h-7" />}
        {lastTransactionStatus === 'failed' && <ExclamationPoint className="fill-white w-7 h-7" />}
        <span className="ml-3 font-medium tracking-wide truncate capitalize">{message}</span>
      </div>
    </div>
  )
}
