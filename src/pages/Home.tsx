import {
  Button,
  Circle,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaCity } from 'react-icons/fa'
import { IoSearchCircleSharp } from 'react-icons/io5'
import { NavLink, useNavigate } from 'react-router-dom'
import { VacanciesList } from '../components/VacanciesList'
import { formatCurrency } from '../helpers/currency.helper'
import {
  useAverageSalaryQuery,
  useGetVacancyPaginationQuery,
} from '../store/api/services/vacancy'
import { searchValue, setSearch } from '../store/features/search/searchSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { pagination } from '../store/features/pagination/paginationSlice'
import { filters } from '../store/features/filter/filterSlice'

export const Home: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentPage, limit } = useAppSelector(pagination)
  const { sort, order } = useAppSelector(filters)
  const search = useAppSelector(searchValue)
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

  return (
    <>
      <form>
        <FormControl
          bg={useColorModeValue('purple.400', 'black.700')}
          display="flex"
          flexDirection="column"
          height="max-content"
          p={5}
          mb={5}
        >
          <FormLabel
            sx={{
              fontSize: '3xl',
              color: 'white',
              mb: 5,
            }}
          >
            Сайт пошуку роботи №1 в Україні
            <Text fontSize="md" opacity="0.8">
              Зараз у нас {vacancies?.meta?.totalItems} актуальних вакансій.
            </Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              bg="gray.100"
              color="gray"
              value={search}
              type="search"
              onChange={e => dispatch(setSearch(e.target.value))}
              placeholder="Посада"
              mb={5}
            />
            <InputRightElement width="9rem">
              <Button
                type="submit"
                onClick={() => navigate('vacancy/search')}
                colorScheme="pink"
              >
                Знайти вакансії
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText color="white" fontSize="md">
            Наприклад:
            <Flex gap={2}>
              <Text as={Link} onClick={() => dispatch(setSearch('касир'))}>
                касир
              </Text>
              <Text as={Link} onClick={() => dispatch(setSearch('продавець'))}>
                продавець
              </Text>
              <Text>або</Text>
              <Text as={Link} onClick={() => dispatch(setSearch('водій'))}>
                водій
              </Text>
            </Flex>
          </FormHelperText>
        </FormControl>
      </form>
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
