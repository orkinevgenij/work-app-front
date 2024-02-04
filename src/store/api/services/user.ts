import { IUser, Profile, UserArgs } from '../../../types/types'
import { api } from '../api'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    profile: builder.query<Profile, undefined>({
      query: () => '/api/user/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<Profile, Partial<Profile>>({
      query: data => ({
        url: '/api/user/profile/edit',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: builder.mutation<Profile, { email: string }>({
      query: email => ({
        url: '/api/user/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),
    changePassword: builder.mutation<
      Profile,
      { password: string; newPassword: string }
    >({
      query: data => ({
        url: '/api/user/change-password',
        method: 'POST',
        body: { password: data.password, newPassword: data.newPassword },
      }),
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
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = userApi
