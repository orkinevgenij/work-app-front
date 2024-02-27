import { Stack } from '@chakra-ui/layout'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { VacanciesList } from '../components/VacanciesList'
import { useGetVacancyByCompanyQuery } from '../store/api/services/vacancy'
import { filters } from '../store/features/filter/filterSlice'
import { pagination } from '../store/features/pagination/paginationSlice'
import { useAppSelector } from '../store/hooks'

export const VacanciesByCompany: FC = () => {
  const { id } = useParams()
  const { limit, currentPage } = useAppSelector(pagination)
  const { sort, order } = useAppSelector(filters)

  const { data: vacancies, isLoading } = useGetVacancyByCompanyQuery(
    { id, page: currentPage, limit, sort, order },
    {
      refetchOnMountOrArgChange: true,
    },
  )
  if (isLoading) {
    return <Loader />
  }
  return (
    <Stack p={10}>
      <VacanciesList vacancies={vacancies} />
    </Stack>
  )
}
