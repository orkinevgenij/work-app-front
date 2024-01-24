import { api } from '../api'
import { ICompany, CompanyArgs } from '../../../types/types'

export const companyApi = api.injectEndpoints({
  endpoints: builder => ({
    createCompany: builder.mutation<ICompany, CompanyArgs>({
      query: data => ({
        url: 'api/company',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Company'],
    }),
    getMyCompany: builder.query<ICompany, undefined>({
      query: () => '/api/company/my-companies',
      providesTags: ['Company'],
    }),

    getCompany: builder.query<ICompany[], undefined>({
      query: () => '/api/company/all',
      providesTags: ['Company'],
    }),
  }),
})
export const {
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useGetMyCompanyQuery,
} = companyApi
