import { createSlice } from '@reduxjs/toolkit'

export const eventStore = createSlice({
  name: 'event',
  initialState: {
    services: [],
    exchanges: [],
    treasuryBalance: undefined,
  },
  reducers: {
    setServices: (state, services) => {
      state.services = services.payload
    },
    setExchanges: (state, exchanges) => {
      state.exchanges = exchanges.payload
    },
    setTreasuryBalance: (state, treasuryBalance) => {
      state.treasuryBalance = treasuryBalance.payload
    },
  },
})

export const { setServices, setExchanges, setTreasuryBalance } = eventStore.actions

export default eventStore.reducer
