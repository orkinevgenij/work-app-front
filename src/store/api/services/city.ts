import { ICity } from '../../../types/types'
import { api } from '../api'

export const cityApi = api.injectEndpoints({
  endpoints: builder => ({
    getCity: builder.query<ICity[], undefined>({
      query: () => '/api/city',
    }),
  }),
})
export const { useGetCityQuery } = cityApi
