import { Stack } from '@chakra-ui/layout'
import { FC } from 'react'
import { VacanciesList } from '../components/VacanciesList'
import { useSearchVacancyQuery } from '../store/api/services/vacancy'
import { pagination } from '../store/features/pagination/paginationSlice'
import { searchValue } from '../store/features/search/searchSlice'
import { useAppSelector } from '../store/hooks'

export const SearchVacancy: FC = () => {
  const title = useAppSelector(searchValue)
  const { limit, currentPage } = useAppSelector(pagination)
  const { data: vacancies, isLoading } = useSearchVacancyQuery(
    { title, page: currentPage, limit },
    {},
  )
  return (
    <Stack p={10}>
      <VacanciesList vacancies={vacancies} isLoading={isLoading} />
    </Stack>
  )
}
