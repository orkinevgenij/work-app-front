import { Message, MessageArgs } from '../../../types/types'
import { api } from '../api'

export const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query<Message[], string | undefined>({
      query: id => `/api/chat/messages/${id}`,
      providesTags: ['Chat'],
    }),

    createMessage: builder.mutation<Message, MessageArgs>({
      query: data => ({
        url: '/api/chat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
})
export const { useGetMessagesQuery, useCreateMessageMutation } = chatApi
