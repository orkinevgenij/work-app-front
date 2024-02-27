import { configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import filterSlice from './features/filter/filterSlice'
import paginationSlice from './features/pagination/paginationSlice'
import searchSlice from './features/search/searchSlice'
import authSlice from './features/user/authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    pagination: paginationSlice,
    filter: filterSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
