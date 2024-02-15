import { Stack } from '@chakra-ui/layout'
import { useParams } from 'react-router-dom'
import { VacanciesList } from '../components/VacanciesList'
import { useGetVacancyByCompanyQuery } from '../store/api/services/vacancy'
import { useAppSelector } from '../store/hooks'
import { FC } from 'react'
import { pagination } from '../store/features/pagination/paginationSlice'
import { filters } from '../store/features/filter/filterSlice'
import { Loader } from '../components/Loader'

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
