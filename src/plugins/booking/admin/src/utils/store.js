import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import CalendarReducer from './reducers'

const store = configureStore({
  reducer: CalendarReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['currentDate', 'todayDate'],
      },
    }),
})

export default store
