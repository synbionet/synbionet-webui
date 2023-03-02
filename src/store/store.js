import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountStore'
import eventReducer from './eventStore'

export default configureStore({
  reducer: {
    account: accountReducer,
    event: eventReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       // ignoredActions: ['account/requestAccount'],
  //     },
  //   }),
})
