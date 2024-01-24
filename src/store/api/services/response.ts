import { IResponse } from '../../../types/types'
import { api } from '../api'

export const responseApi = api.injectEndpoints({
  endpoints: builder => ({
    response: builder.query<IResponse[], number | undefined>({
      query: id => `/api/response/${id}`,
    }),
    myResponse: builder.query<IResponse[], undefined>({
      query: () => `/api/response/my`,
    }),
    createResponse: builder.mutation<
      IResponse,
      Record<'vacancy' | 'resume' | 'coverLetter', number | string | undefined>
    >({
      query: data => ({
        url: '/api/response',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})
export const {
  useResponseQuery,
  useCreateResponseMutation,
  useMyResponseQuery,
} = responseApi
