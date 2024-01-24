import { IResume, ResumeArgs } from '../../../types/types'
import { api } from '../api'

export const resumeApi = api.injectEndpoints({
  endpoints: builder => ({
    createResume: builder.mutation<IResume, ResumeArgs>({
      query: data => ({
        url: '/api/resume',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),
    updateResume: builder.mutation<
      IResume,
      { data: Partial<IResume>; id: string | undefined }
    >({
      query: ({ data, id }) => ({
        url: `/api/resume/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),

    getOneResume: builder.query<IResume, string | undefined>({
      query: id => `/api/resume/${id}`,
    }),
    getResume: builder.query<IResume[], undefined>({
      query: () => '/api/resume/all',
    }),
    getMyResume: builder.query<IResume, undefined>({
      query: () => `/api/resume/my-resume`,
      providesTags: ['Resume'],
    }),

    removeResume: builder.mutation<IResume, number>({
      query: id => ({
        url: `/api/resume/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resume'],
    }),
  }),
})
export const {
  useCreateResumeMutation,
  useGetResumeQuery,
  useGetMyResumeQuery,
  useUpdateResumeMutation,
  useRemoveResumeMutation,
  useGetOneResumeQuery,
} = resumeApi
