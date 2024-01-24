import { Stack } from '@chakra-ui/layout'
import { VacanciesList } from '../../components/VacanciesList'
import { useGetMyCompanyQuery } from '../../store/api/services/company'
import { useGetVacancyByCompanyQuery } from '../../store/api/services/vacancy'
import { FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import { filters } from '../../store/features/filter/filterSlice'

export const MyVacancies: FC = () => {
  const { limit, currentPage } = useAppSelector(state => state.pagination)
  const { sort, order } = useAppSelector(filters)
  const { data: company } = useGetMyCompanyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: vacancies } = useGetVacancyByCompanyQuery(
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
