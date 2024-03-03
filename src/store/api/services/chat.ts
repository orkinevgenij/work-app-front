import { api } from '../api'

export const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    getOfferMessages: builder.query<any, string | undefined>({
      query: id => `/api/chat/messages/${id}`,
      providesTags: ['Chat'],
    }),

    createMessage: builder.mutation<any, any>({
      query: data => ({
        url: '/api/chat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
})
export const { useGetOfferMessagesQuery, useCreateMessageMutation } = chatApi
