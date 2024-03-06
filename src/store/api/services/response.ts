import { IResponse, Response } from '../../../types/types'
import { api } from '../api'

export const responseApi = api.injectEndpoints({
  endpoints: builder => ({
    // responseByCompany: builder.query<
    //   IResponse,
    //   Record<'id' | 'page' | 'limit', number | string | undefined>
    // >({
    //   query: ({ id, page, limit }) =>
    //     `/api/response/paginate/${id}?page=${page}&limit=${limit}`,
    //   providesTags: ['Response'],
    // }),
    getResponseByCompany: builder.query<Response[], { id: number | undefined }>(
      {
        query: ({ id }) => `/api/response/company/${id}`,
        providesTags: ['Response'],
      },
    ),
    myResponseWithPaginate: builder.query<
      IResponse,
      Record<'page' | 'limit', number | string>
    >({
      query: ({ page, limit }) =>
        `/api/response/paginate/my?page=${page}&limit=${limit}`,
    }),
    getUserResponse: builder.query<Response[], null>({
      query: () => `/api/response/user`,
    }),
    getOneResponse: builder.query<Response, string | undefined>({
      query: id => `/api/response/${id}`,
      providesTags: ['Response'],
    }),
    createResponse: builder.mutation<
      IResponse,
      Record<'vacancy' | 'resume' | 'message', number | string | undefined>
    >({
      query: data => ({
        url: '/api/response',
        method: 'POST',
        body: data,
      }),
    }),
    changeStatusResponse: builder.mutation<
      IResponse,
      Record<'id' | 'status', number | string | undefined>
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
  useGetResponseByCompanyQuery,
  useCreateResponseMutation,
  useGetUserResponseQuery,
  useGetOneResponseQuery,
  useMyResponseWithPaginateQuery,
  useChangeStatusResponseMutation,
} = responseApi
