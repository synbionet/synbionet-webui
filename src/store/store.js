import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountStore'

export default configureStore({
  reducer: {
    account: accountReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       // ignoredActions: ['account/requestAccount'],
  //     },
  //   }),
})
