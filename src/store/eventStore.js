import { createSlice } from '@reduxjs/toolkit'

export const eventStore = createSlice({
  name: 'event',
  initialState: {
    services: [],
    exchanges: [],
  },
  reducers: {
    setServices: (state, services) => {
      state.services = services.payload
    },
    setExchanges: (state, exchanges) => {
      state.exchanges = exchanges.payload
    },
  },
})

export const { setServices, setExchanges } = eventStore.actions

export default eventStore.reducer
