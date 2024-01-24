import { Stack } from '@chakra-ui/layout'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { VacanciesList } from '../components/VacanciesList'
import { useGetVacancyByCategoryQuery } from '../store/api/services/vacancy'
import { useAppSelector } from '../store/hooks'
import { pagination } from '../store/features/pagination/paginationSlice'
import { filters } from '../store/features/filter/filterSlice'

export const VacancyByCategory: FC = () => {
  const { id } = useParams()
  const { limit, currentPage } = useAppSelector(pagination)
  const { sort, order } = useAppSelector(filters)

  const { data: vacancies } = useGetVacancyByCategoryQuery(
    { id, page: currentPage, limit, sort, order },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  return (
    <Stack p={10}>
      <VacanciesList vacancies={vacancies} />
    </Stack>
  )
}
