import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:8000'
      : 'https://work-app-2jgg.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state?.auth?.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const api = createApi({
  baseQuery,
  endpoints: builder => ({}),
  tagTypes: [
    'Vacancy',
    'Company',
    'Resume',
    'User',
    'Response',
    'Chat',
  ],
})
