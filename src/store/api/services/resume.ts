import { IResume } from '../../../types/types'
import { api } from '../api'

export const resumeApi = api.injectEndpoints({
  endpoints: builder => ({
    createResume: builder.mutation<IResume, FormData>({
      query: data => ({
        url: '/api/resume',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),
    updateResume: builder.mutation<
      IResume,
      { formData: FormData; id: string | undefined }
    >({
      query: ({ formData, id }) => ({
        url: `/api/resume/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Resume'],
    }),

    getOneResume: builder.query<IResume, string | undefined>({
      query: id => `/api/resume/${id}`,
    }),
    otherResumesUser: builder.query<IResume[], string | undefined>({
      query: id => `/api/resume/other-resumes/${id}`,
    }),
    getAllResume: builder.query<IResume[], undefined>({
      query: () => '/api/resume/all',
      providesTags: ['Resume'],
    }),
    getMyResume: builder.query<IResume[], undefined>({
      query: () => `/api/resume/my-resumes`,
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
  useGetAllResumeQuery,
  useGetMyResumeQuery,
  useUpdateResumeMutation,
  useRemoveResumeMutation,
  useOtherResumesUserQuery,
  useGetOneResumeQuery,
} = resumeApi
