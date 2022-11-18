import { createSlice } from '@reduxjs/toolkit'

export const accountStore = createSlice({
  name: 'account',
  initialState: {
    activeAccount: undefined,
  },
  reducers: {
    setActiveAccount: (state, activeAccount) => {
      state.activeAccount = activeAccount.payload
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
  },
})

export const { setActiveAccount } = accountStore.actions

export default accountStore.reducer
