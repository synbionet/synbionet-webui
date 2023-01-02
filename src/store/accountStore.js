import { createSlice } from '@reduxjs/toolkit'

export const accountStore = createSlice({
  name: 'account',
  initialState: {
    activeAccount: undefined,
    bioAssets: [],
    bioTokenBalance: undefined,
  },
  reducers: {
    setActiveAccount: (state, activeAccount) => {
      state.activeAccount = activeAccount.payload
    },
    setBioTokenBalance: (state, bioTokenBalance) => {
      state.bioTokenBalance = bioTokenBalance.payload
    },
    setBioAssets: (state, bioAssetAddresses) => {
      state.bioAssets = bioAssetAddresses.payload
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
  },
})

export const { setActiveAccount, setBioTokenBalance, setBioAssets } = accountStore.actions

export default accountStore.reducer
