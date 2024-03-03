import { IVacancy, IVacancyArgs, Vacancy } from '../../../types/types'
import { api } from '../api'

export const vacancyApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllVacancy: builder.query<Vacancy[], undefined>({
      query: () => `/api/vacancy/all`,
      providesTags: ['Vacancy'],
    }),
    getVacancyPagination: builder.query<
      IVacancy,
      Record<'page' | 'limit' | 'sort' | 'order', number | string>
    >({
      query: ({ page, limit, sort, order }) =>
        `/api/vacancy/pagination?page=${page}&limit=${limit}&sortBy=${sort}:${order}`,
      providesTags: ['Vacancy'],
    }),
    getOneVacancy: builder.query<Vacancy, string | undefined>({
      query: id => `/api/vacancy/${id}`,
    }),

    getSimilarVacancy: builder.query<
      Vacancy[],
      Record<'companyId' | 'vacancyId', number | undefined>
    >({
      query: params =>
        `/api/vacancy/similar/${params.companyId}/${params.vacancyId}`,
    }),
    getVacancyByCategory: builder.query<
      IVacancy,
      Record<
        'id' | 'page' | 'limit' | 'sort' | 'order',
        string | number | undefined
      >
    >({
      query: ({ id, page, limit, sort, order }) =>
        `/api/vacancy/category/${id}?page=${page}&limit=${limit}&sortBy=${sort}:${order}`,
    }),
    getVacancyByCity: builder.query<
      IVacancy,
      Record<
        'id' | 'page' | 'limit' | 'sort' | 'order',
        string | number | undefined
      >
    >({
      query: ({ id, page, limit, sort, order }) =>
        `/api/vacancy/city/${id}?page=${page}&limit=${limit}&sortBy=${sort}:${order}`,
    }),

    getAllVacancyByCompanyPaginate: builder.query<
      IVacancy,
      Record<
        'id' | 'page' | 'limit' | 'sort' | 'order',
        string | number | undefined
      >
    >({
      query: ({ id, page, limit, sort, order }) =>
        `/api/vacancy/company/${id}?page=${page}&limit=${limit}&sortBy=${sort}:${order}`,
      providesTags: ['Vacancy'],
    }),

    getVacancyByCompany: builder.query<Vacancy[], any>({
      query: ({ id }) => `/api/vacancy/all/company/${id}`,
      providesTags: ['Vacancy'],
    }),

    searchVacancy: builder.query<
      IVacancy,
      Record<'title' | 'page' | 'limit', string | number | undefined>
    >({
      query: ({ title, page, limit }) =>
        `/api/vacancy/search?title=${title}&page=${page}&limit=${limit}`,
      providesTags: ['Vacancy'],
    }),
    createVacancy: builder.mutation<Vacancy, Partial<IVacancyArgs>>({
      query: data => ({
        url: '/api/vacancy',
        method: 'POST',
        body: data,
      }),
    }),
    updateVacancy: builder.mutation<
      Vacancy,
      { data: Partial<IVacancyArgs>; id: string | undefined }
    >({
      query: ({ data, id }) => ({
        url: `/api/vacancy/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Vacancy'],
    }),
    removeVacancy: builder.mutation<Vacancy, number>({
      query: id => ({
        url: `/api/vacancy/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vacancy'],
    }),
    averageSalary: builder.query<number, undefined>({
      query: () => '/api/vacancy/average-salary',
    }),
  }),
})
export const {
  useGetAllVacancyQuery,
  useGetOneVacancyQuery,
  useGetSimilarVacancyQuery,
  useCreateVacancyMutation,
  useGetVacancyByCategoryQuery,
  useGetVacancyByCityQuery,
  useGetAllVacancyByCompanyPaginateQuery,
  useSearchVacancyQuery,
  useAverageSalaryQuery,
  useUpdateVacancyMutation,
  useRemoveVacancyMutation,
  useGetVacancyPaginationQuery,
  useGetVacancyByCompanyQuery,
} = vacancyApi
