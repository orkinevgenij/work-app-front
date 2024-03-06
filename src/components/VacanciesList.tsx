import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/layout'
import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Icon,
  IconButton,
  Select,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaCheck, FaRegEdit } from 'react-icons/fa'
import { FiEye } from 'react-icons/fi'
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { formatCurrency } from '../helpers/currency.helper'
import { formatDate } from '../helpers/date.helper'
import { useGetUserResponseQuery } from '../store/api/services/response'
import { useRemoveVacancyMutation } from '../store/api/services/vacancy'
import { setFilter } from '../store/features/filter/filterSlice'
import { setTotalPage } from '../store/features/pagination/paginationSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { IVacancy, Response } from '../types/types'
import { EmptyDataMessage } from './EmptyDataMessage'
import { Loader } from './Loader'
import { Pagination } from './Pagination'

type Sorting = {
  name: string
  value: string
}
const sorting: Sorting[] = [
  { name: 'За датою ↑', value: 'createdAt_DESC' },
  { name: 'За датою ↓', value: 'createdAt_ASC' },
  { name: 'За зарплатою ↑', value: 'salary_DESC' },
  { name: 'За зарплатою ↓', value: 'salary_ASC' },
]
type Props = {
  vacancies?: IVacancy
  city?: string
  isLoading?: boolean
}

export const VacanciesList: FC<Props> = ({ vacancies, city, isLoading }) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { totalPages } = useAppSelector(state => state.pagination)
  const { data: responses = [] } = useGetUserResponseQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const [remove] = useRemoveVacancyMutation()

  const handleRemove = async (id: number) => {
    await remove(id)
  }
  const handleSortChange = (value: string) => {
    const [selectedSortBy, selectedSortOrder] = value.split('_')
    dispatch(setFilter({ selectedSortBy, selectedSortOrder }))
  }

  useEffect(() => {
    dispatch(setTotalPage(vacancies?.meta?.totalPages))
  }, [vacancies])

  if (isLoading) {
    return <Loader />
  }
  if (!vacancies?.data?.length)
    return <EmptyDataMessage text={'Вакансій не знайдено'} />
  return (
    <>
      <Flex direction="column" w="90%" margin="0 auto" pb={5}>
        <Flex
          bg={useColorModeValue('white', 'black.500')}
          roundedTop={'xl'}
          boxShadow={'lg'}
          align="center"
          height="80px"
          justify="space-between"
          p={3}
        >
          <Flex direction="column">
            <Text color="gray" mr={3}>
              Кількість: {vacancies?.meta?.totalItems}
            </Text>
            {pathname.startsWith('/vacancy/city/') && (
              <Text color="gray" mr={3}>
                Вакансії у місті: {city}
              </Text>
            )}
          </Flex>
          <Select
            border="none"
            w="max-content"
            fontWeight="bold"
            onChange={e => handleSortChange(e.target.value)}
          >
            {sorting.map(sort => (
              <option key={sort.name} value={sort.value}>
                {sort.name}
              </option>
            ))}
          </Select>
        </Flex>
        <Divider color="gray.300" />
        {vacancies?.data?.map(vacancy => (
          <Card
            key={vacancy?.id}
            size="sm"
            variant="elevated"
            rounded="none"
            bg={useColorModeValue('white', 'black.600')}
          >
            <CardBody>
              <Stack>
                <Link as={RouterNavLink} to={`/vacancy/${vacancy?.id}`}>
                  <Heading
                    color="purple.500"
                    size="md"
                    fontWeight="700"
                    textTransform="uppercase"
                    _hover={{
                      cursor: 'pointer',
                      color: 'purple.700',
                    }}
                  >
                    {vacancy?.title}
                  </Heading>
                </Link>
                <Text pt="2" fontSize="sm" fontWeight="700">
                  {formatCurrency.format(vacancy?.salary)}
                </Text>
                <Flex align="center">
                  <Text fontSize="xl" fontWeight="700" pr={1}>
                    {vacancy.company?.title}
                  </Text>
                  <Text fontSize="xl">{vacancy.city?.name}</Text>
                </Flex>
                <Text noOfLines={3} fontSize="md">
                  {vacancy?.description}
                </Text>
                <Text color="gray">{formatDate(vacancy?.createdAt)}</Text>
                <CardFooter>
                  <Stack>
                    <Tooltip label={`${vacancy?.views} перегляди`}>
                      <HStack>
                        <Icon color="gray.400" boxSize={5} as={FiEye} />
                        <Text fontSize="md" color="gray">
                          {vacancy?.views} перегляди
                        </Text>
                      </HStack>
                    </Tooltip>
                    {responses?.find(
                      (response: Response) =>
                        response.vacancy?.id === vacancy?.id,
                    ) ? (
                      <Tooltip label={`Ви вже відгукнулись`}>
                        <Box>
                          <Icon boxSize={5} color="green" as={FaCheck} />
                        </Box>
                      </Tooltip>
                    ) : (
                      ''
                    )}
                    {pathname === '/vacancies/my' && (
                      <ButtonGroup spacing="2">
                        <IconButton
                          color="gray"
                          size="sm"
                          variant="outline"
                          aria-label="Search database"
                          icon={<FaRegEdit />}
                          as={RouterNavLink}
                          to={`/vacancy/edit/${vacancy?.id}`}
                        />
                        <IconButton
                          color="gray"
                          size="sm"
                          variant="outline"
                          aria-label="Search database"
                          icon={<AiOutlineDelete />}
                          onClick={() => handleRemove(vacancy?.id)}
                        />
                      </ButtonGroup>
                    )}
                  </Stack>
                </CardFooter>
              </Stack>
            </CardBody>
          </Card>
        ))}
        <Pagination totalPages={totalPages} />
      </Flex>
    </>
  )
}
