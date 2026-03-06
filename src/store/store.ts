import { configureStore } from "@reduxjs/toolkit"

import globalReducer from  "../features/globalSlice"
import companyReducer from  "../features/companySlice"
import jobReducer from "../features/jobSlice"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    companies: companyReducer,
    jobs: jobReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch