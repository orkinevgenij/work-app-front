import { IUser, Profile, UserArgs } from '../../../types/types'
import { api } from '../api'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    profile: builder.query<Profile, undefined>({
      query: () => '/api/user/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<Profile, Profile>({
      query: data => ({
        url: '/api/user/profile/edit',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<IUser, UserArgs>({
      query: data => ({
        url: '/api/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<IUser, Record<'email' | 'password', string>>({
      query: data => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})
export const {
  useProfileQuery,
  useRegisterMutation,
  useLoginMutation,
  useUpdateProfileMutation,
} = userApi
