import { createSlice } from '@reduxjs/toolkit'

export const accountStore = createSlice({
  name: 'account',
  initialState: {
    activeAccount: undefined,
    bioAssets: [],
  },
  reducers: {
    setActiveAccount: (state, activeAccount) => {
      state.activeAccount = activeAccount.payload
    },
    addBioAsset: (state, bioAssetAddress) => {
      state.bioAssets.push(bioAssetAddress.payload)
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
  },
})

export const { setActiveAccount, addBioAsset } = accountStore.actions

export default accountStore.reducer
