import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import { formatDate } from '../../helpers/date.helper'
import { useGetMyCompanyQuery } from '../../store/api/services/company'

import { Pagination } from '../../components/Pagination'
import {
  useChangeStatusResponseMutation,
  useResponseByCompanyQuery,
} from '../../store/api/services/response'
import {
  pagination,
  setTotalPage,
} from '../../store/features/pagination/paginationSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Response } from '../../types/types'
import { Loader } from '../../components/Loader'
import { EmptyDataMessage } from '../../components/EmptyDataMessage'
enum ResponseStatus {
  VIEWED = 'Переглянуто',
  INTERVIEW = 'Співбесіда',
  REFUSAL = 'Відмова',
}
const statusList = [
  {
    label: 'Переглянуто',
    title: ResponseStatus.VIEWED,
    color: 'messenger',
  },
  {
    label: 'Співбесіда',
    title: ResponseStatus.INTERVIEW,
    color: 'whatsapp',
  },
  {
    label: 'Відмова',
    title: ResponseStatus.REFUSAL,
    color: 'red',
  },
]
export const VacancyResponse: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentPage, limit, totalPages } = useAppSelector(pagination)

  const { data: company } = useGetMyCompanyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: responses, isLoading } = useResponseByCompanyQuery(
    { id: company?.id, page: currentPage, limit },
    {
      refetchOnMountOrArgChange: true,
      skip: company ? false : true,
    },
  )
  const [changeStatusResponse] = useChangeStatusResponseMutation()

  const handleChangeStatus = async (id: number, status: ResponseStatus) => {
    await changeStatusResponse({ id, status })
  }
  useEffect(() => {
    dispatch(setTotalPage(responses?.meta?.totalPages))
  }, [responses])

  if (isLoading) {
    return <Loader />
  }
  if (!responses?.data?.length)
    return <EmptyDataMessage text={'Відгуків не знайдено'} />
  return (
    <Stack w="90vw" margin="0 auto">
      <Card mt={10} bg={useColorModeValue('white', 'black.600')}>
        <CardHeader>
          <Heading size="md">Відгуки</Heading>
        </CardHeader>
        <CardBody>
          {responses.data?.map((resp: Response) => (
            <Stack key={resp.id}>
              <Heading fontSize="md" mb={3}>
                Відгук на вакансію:
                <Link
                  as={RouterNavLink}
                  to={`/vacancy/${resp.vacancy.id}`}
                  color="purple.400"
                  fontWeight="bold"
                  p={3}
                >
                  {resp.vacancy.title}
                </Link>
              </Heading>
              <Text fontSize="md">
                {resp?.resume?.name} {resp?.resume?.lastname}
              </Text>
              <CardFooter p={0}>
                <Flex direction="column">
                  <Link
                    mb={3}
                    as={RouterNavLink}
                    to={`/resume/${resp?.resume?.id}`}
                    color="purple.400"
                    fontWeight="bold"
                  >
                    Резюме
                  </Link>
                  <Button
                    colorScheme="purple"
                    variant="outline"
                    size="sm"
                    mb={3}
                    w="150px"
                    onClick={() =>
                      navigate('/cover-letter', {
                        state: { coverLetter: resp.coverLetter },
                      })
                    }
                  >
                    Супровідний лист
                  </Button>
                  <Text color="gray" mb={3}>
                    від {formatDate(resp.createdAt)}
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
                variant="outline"
                width="fit-content"
              >
                {resp.status}
              </Text>
              <Flex gap={3}>
                {statusList.map(status => (
                  <Button
                    isDisabled={resp.status === status.title}
                    size="sm"
                    colorScheme={status.color}
                    onClick={() => handleChangeStatus(resp.id, status.title)}
                  >
                    {status.label}
                  </Button>
                ))}
              </Flex>
              <Divider mb={5} />
            </Stack>
          ))}
        </CardBody>
      </Card>
      <Pagination totalPages={totalPages} />
    </Stack>
  )
}
