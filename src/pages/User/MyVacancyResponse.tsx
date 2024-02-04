import { Divider, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { Card, CardBody, CardFooter, useColorModeValue } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { Pagination } from '../../components/Pagination'
import { formatDate } from '../../helpers/date.helper'
import { useMyResponseWithPaginateQuery } from '../../store/api/services/response'
import {
  pagination,
  setTotalPage,
} from '../../store/features/pagination/paginationSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Response } from '../../types/types'

export const MyVacancyResponse: FC = () => {
  const dispatch = useAppDispatch()
  const { currentPage, limit, totalPages } = useAppSelector(pagination)
  const { data: responses } = useMyResponseWithPaginateQuery(
    { page: currentPage, limit },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  useEffect(() => {
    dispatch(setTotalPage(responses?.meta?.totalPages))
  }, [responses])

  if (!responses?.data?.length)
    return <Text textAlign="center">Відгуків не знайдено &#128546; </Text>
  return (
    <>
      <Heading textAlign="center" size="md">
        Мої відгуки
      </Heading>
      <Stack w="90vw" margin="0 auto">
        {responses.data?.map((resp: Response) => (
          <Card
            _hover={{
              bg: useColorModeValue('gray.200', 'black.500'),
            }}
            mt={10}
            size="sm"
            bg={useColorModeValue('gray.100', 'black.600')}
          >
            <CardBody>
              <Stack key={resp.id}>
                <Heading fontSize="md" mb={3}>
                  Відгук на вакансію:{' '}
                  <Link
                    as={RouterNavLink}
                    to={`/vacancy/${resp.vacancy.id}`}
                    color="purple.400"
                    fontWeight="bold"
                  >
                    {resp.vacancy.title}, {resp.vacancy.company.title}
                  </Link>
                </Heading>
                <CardFooter p={0}>
                  <Flex direction="column">
                    <Link
                      as={RouterNavLink}
                      to={`/resume/my`}
                      color="purple.400"
                      fontWeight="bold"
                      width="fit-content"
                    >
                      <Text color="purple.400" fontWeight="bold">
                        Резюме
                      </Text>
                    </Link>
                    <Text color="gray" mb={3}>
                      відгук від {formatDate(resp.createdAt)}
                    </Text>
                  </Flex>
                </CardFooter>
                <Text
                  sx={{
                    border: '2px solid',
                    borderColor: 'gray.300',
                    borderRadius: 'lg',
                    padding: '5px',
                  }}
                  width="fit-content"
                >
                  {resp.status}
                </Text>
                <Divider mb={5} />
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
      <Pagination totalPages={totalPages} />
    </>
  )
}
