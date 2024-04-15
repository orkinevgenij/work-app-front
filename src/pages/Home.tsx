import {
  Box,
  Circle,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaCity } from 'react-icons/fa'
import { IoSearchCircleSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm'
import { VacanciesList } from '../components/VacanciesList'
import { formatCurrency } from '../helpers/currency.helper'
import {
  useAverageSalaryQuery,
  useGetVacancyPaginationQuery,
} from '../store/api/services/vacancy'
import { filters } from '../store/features/filter/filterSlice'
import { pagination } from '../store/features/pagination/paginationSlice'
import { useAppSelector } from '../store/hooks'

export const Home: FC = () => {
  const { currentPage, limit } = useAppSelector(pagination)
  const { sort, order } = useAppSelector(filters)
  const { data: vacancies } = useGetVacancyPaginationQuery(
    {
      page: currentPage,
      limit,
      sort,
      order,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )
  const { data: averageSalary } = useAverageSalaryQuery(undefined, {})
  console.log('Hello world')
  return (
    <>
      <SearchForm vacancies={vacancies} />
      <SimpleGrid columns={[1, 3]} spacing={3}>
        <Flex
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            color: useColorModeValue('purple.500', 'white'),
            bg: useColorModeValue('white', 'black.600'),
            padding: '15px',
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          display="flex"
          alignItems="center"
        >
          <NavLink to="categories">
            <Icon as={BiCategory} boxSize={20} color="gray.500" />
            <Text>Вакансії за категоріямі</Text>
          </NavLink>
        </Flex>
        <Flex
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            color: useColorModeValue('purple.500', 'white'),
            bg: useColorModeValue('white', 'black.600'),
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          display="flex"
          alignItems="center"
        >
          <NavLink to="companies">
            <Icon as={IoSearchCircleSharp} color="gray.500" boxSize={20} />
            <Text>Вакансії за компаніями</Text>
          </NavLink>
        </Flex>
        <Flex
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            color: useColorModeValue('purple.500', 'white'),
            bg: useColorModeValue('white', 'black.600'),
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          display="flex"
          alignItems="center"
        >
          <NavLink to="cities">
            <Icon as={FaCity} color="gray.500" boxSize={16} />
            <Text>Вакансії за містами</Text>
          </NavLink>
        </Flex>
      </SimpleGrid>
      <Flex my={10} direction="column" align="center">
        <Heading size="md" mb={5} color="purple.400">
          Середня зарплата
        </Heading>
        <Circle
          size="120px"
          as={Flex}
          direction="column"
          border="1px solid gray"
        >
          <Text fontWeight="700" color="purple.400">
            {formatCurrency.format(averageSalary)}
          </Text>
        </Circle>
      </Flex>
      <VacanciesList vacancies={vacancies} />
    </>
  )
}
