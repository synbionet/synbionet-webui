import { createSlice } from '@reduxjs/toolkit'

export const eventStore = createSlice({
  name: 'event',
  initialState: {
    createOfferEvents: [],
    voidOfferEvents: [],
    exchangeCreatedEvents: [],
    exchangeRedeemedEvents: [],
    exchangeCompletedEvents: [],
  },
  reducers: {
    setAllEvents: (state, allEvents) => {
      state.createOfferEvents = allEvents.payload.createOffers
      state.voidOfferEvents = allEvents.payload.voidOffers
      state.exchangeCreatedEvents = allEvents.payload.exchangesCreated
      state.exchangeRedeemedEvents = allEvents.payload.exchangesRedeemed
      state.exchangeCompletedEvents = allEvents.payload.exchangesCompleted
    },
    // setCreateOfferEvents: (state, createOfferEvents) => {
    //   state.createOfferEvents = createOfferEvents.payload
    // },
    // setVoidOfferEvents: (state, setVoidOfferEvents) => {
    //   state.voidOfferEvents = setVoidOfferEvents.payload
    // },
    // setExchangeCreatedEvents: (state, setExchangeCreatedEvents) => {
    //   state.exchangeCreatedEvents = setExchangeCreatedEvents.payload
    // },
    // setExchangeRedeemedEvents: (state, setExchangeRedeemedEvents) => {
    //   state.exchangeRedeemedEvents = setExchangeRedeemedEvents.payload
    // },
    // setExchangeCompletedEvents: (state, setExchangeCompletedEvents) => {
    //   state.exchangeCompletedEvents = setExchangeCompletedEvents.payload
    // },
  },
})

export const {
  // setCreateOfferEvents,
  // setVoidOfferEvents,
  // setExchangeCreatedEvents,
  // setExchangeRedeemedEvents,
  // setExchangeCompletedEvents,
  setAllEvents,
} = eventStore.actions

export default eventStore.reducer
