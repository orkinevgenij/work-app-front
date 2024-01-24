import { Stack } from '@chakra-ui/layout'
import { VacanciesList } from '../components/VacanciesList'
import { useSearchVacancyQuery } from '../store/api/services/vacancy'
import { searchValue } from '../store/features/search/searchSlice'
import { useAppSelector } from '../store/hooks'
import { FC } from 'react'
import { pagination } from '../store/features/pagination/paginationSlice'

export const SearchVacancy: FC = () => {
  const title = useAppSelector(searchValue)
  const { limit, currentPage } = useAppSelector(pagination)
  const { data: vacancies } = useSearchVacancyQuery(
    { title, page: currentPage, limit },
    {},
  )
  return (
    <Stack p={10}>
      <VacanciesList vacancies={vacancies} />
    </Stack>
  )
}
