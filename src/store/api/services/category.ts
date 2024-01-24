import { ICategory } from '../../../types/types'
import { api } from '../api'

export const categoryApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query<ICategory[], undefined>({
      query: () => '/api/category',
    }),
  }),
})
export const { useGetCategoryQuery } = categoryApi
