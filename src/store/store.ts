import { configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import authSlice from './features/user/authSlice'
import searchSlice from './features/search/searchSlice'
import paginationSlice from './features/pagination/paginationSlice'
import filterSlice from './features/filter/filterSlice'

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
