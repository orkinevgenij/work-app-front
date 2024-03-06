import { Stack } from '@chakra-ui/layout'
import { FC } from 'react'
import { VacanciesList } from '../../components/VacanciesList'
import { useGetMyCompanyQuery } from '../../store/api/services/company'
import { useGetAllVacancyByCompanyPaginateQuery } from '../../store/api/services/vacancy'
import { filters } from '../../store/features/filter/filterSlice'
import { useAppSelector } from '../../store/hooks'

export const MyVacancies: FC = () => {
  const { limit, currentPage } = useAppSelector(state => state.pagination)
  const { sort, order } = useAppSelector(filters)
  const { data: company } = useGetMyCompanyQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const { data: vacancies } = useGetAllVacancyByCompanyPaginateQuery(
    { id: company?.id, page: currentPage, limit, sort, order },
    {
      refetchOnMountOrArgChange: true,
      skip: company ? false : true,
    },
  )
  return (
    <Stack pt={5}>
      <VacanciesList vacancies={vacancies} />
    </Stack>
  )
}
