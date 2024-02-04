import { IResponse, Response } from '../../../types/types'
import { api } from '../api'
enum ResponseStatus {
  UNVIEWED = 'Не переглянуто',
  VIEWED = 'Переглянуто',
  INTERVIEW = 'Співбесіда',
  REFUSAL = 'Відмова',
}
export const responseApi = api.injectEndpoints({
  endpoints: builder => ({
    responseByCompany: builder.query<
      IResponse,
      Record<'id' | 'page' | 'limit', number | string | undefined>
    >({
      query: ({ id, page, limit }) =>
        `/api/response/paginate/${id}?page=${page}&limit=${limit}`,
      providesTags: ['Response'],
    }),
    myResponseWithPaginate: builder.query<
      IResponse,
      Record<'page' | 'limit', number | string>
    >({
      query: ({ page, limit }) =>
        `/api/response/paginate/my?page=${page}&limit=${limit}`,
    }),
    myResponse: builder.query<Response[], undefined>({
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
    changeStatusResponse: builder.mutation<
      IResponse,
      Record<'id' | 'status', number | ResponseStatus>
    >({
      query: ({ id, status }) => ({
        url: '/api/response/response-status',
        method: 'POST',
        body: { id, status },
      }),
      invalidatesTags: ['Response'],
    }),
  }),
})
export const {
  useResponseByCompanyQuery,
  useCreateResponseMutation,
  useMyResponseQuery,
  useMyResponseWithPaginateQuery,
  useChangeStatusResponseMutation,
} = responseApi
