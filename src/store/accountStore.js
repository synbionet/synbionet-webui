import { createSlice } from '@reduxjs/toolkit'

export const accountStore = createSlice({
  name: 'account',
  initialState: {
    activeAccount: undefined,
    bioAssets: [],
    bioTokenBalance: undefined,
    ethBalance: undefined,
    escrowBalance: undefined,
    lastTransactionStatus: undefined,
    lastTransactionMessage: undefined,
  },
  reducers: {
    setActiveAccount: (state, activeAccount) => {
      state.activeAccount = activeAccount.payload
    },
    setBioTokenBalance: (state, bioTokenBalance) => {
      state.bioTokenBalance = bioTokenBalance.payload
    },
    setEthBalance: (state, ethBalance) => {
      state.ethBalance = ethBalance.payload
    },
    setEscrowBalance: (state, escrowBalance) => {
      state.escrowBalance = escrowBalance.payload
    },
    setBioAssets: (state, bioAssetAddresses) => {
      state.bioAssets = bioAssetAddresses.payload
    },
    setLastTransactionStatus: (state, lastTransactionStatus) => {
      state.lastTransactionStatus = lastTransactionStatus.payload.status
      state.lastTransactionMessage = lastTransactionStatus.payload.message
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
  },
})

export const {
  setActiveAccount,
  setBioTokenBalance,
  setBioAssets,
  setEthBalance,
  setEscrowBalance,
  setLastTransactionStatus,
} = accountStore.actions

export default accountStore.reducer
