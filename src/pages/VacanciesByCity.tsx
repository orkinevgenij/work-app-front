import { Stack } from '@chakra-ui/layout'
import { useLocation, useParams } from 'react-router-dom'
import { useGetVacancyByCityQuery } from '../store/api/services/vacancy'
import { useAppSelector } from '../store/hooks'
import { VacanciesList } from '../components/VacanciesList'
import { FC } from 'react'
import { pagination } from '../store/features/pagination/paginationSlice'
import { filters } from '../store/features/filter/filterSlice'

export const VacanciesByCity: FC = () => {
  const { state } = useLocation()
  const { city } = state
  console.log('🚀 ~ city:', city)
  const { id } = useParams()
  const { limit, currentPage } = useAppSelector(pagination)
  const { sort, order } = useAppSelector(filters)

  const { data: vacancies } = useGetVacancyByCityQuery(
    { id, page: currentPage, limit, sort, order },
    {
      refetchOnMountOrArgChange: true,
    },
  )
  return (
    <Stack p={10}>
      <VacanciesList vacancies={vacancies} city={city} />
    </Stack>
  )
}
