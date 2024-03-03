import { api } from '../api'

export const offerApi = api.injectEndpoints({
  endpoints: builder => ({
    getCountOffer: builder.query<any, null>({
      query: () => '/api/offer/count',
      providesTags: ['Offer'],
    }),
    getUserOffers: builder.query<any, null>({
      query: () => '/api/offer/my',
      providesTags: ['Offer'],
    }),
    getOffersByCompany: builder.query<any, { id: number | undefined }>({
      query: ({ id }) => `/api/offer/company/${id}`,
      providesTags: ['Offer'],
    }),
    getOneOffer: builder.query<any, string | undefined>({
      query: id => `/api/offer/${id}`,
      providesTags: ['Offer'],
    }),
    createOffer: builder.mutation<any, any>({
      query: data => ({
        url: '/api/offer',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})
export const {
  useGetCountOfferQuery,
  useGetUserOffersQuery,
  useCreateOfferMutation,
  useGetOneOfferQuery,
  useGetOffersByCompanyQuery,
} = offerApi
