import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { useMyResponseQuery } from '../../store/api/services/response'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
} from '@chakra-ui/react'
import { formatDate } from '../../helpers/date.helper'
import { IResponse } from '../../types/types'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { FC } from 'react'

export const MyVacancyResponse: FC = () => {
  const { data: response = [] } = useMyResponseQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  return (
    <Stack w="90vw" margin="0 auto">
      <Card mt={10} size="sm" bg={useColorModeValue('gray.100', 'black.600')}>
        <CardHeader>
          <Heading size="md">Відгуки</Heading>
        </CardHeader>
        <CardBody>
          {response.map((resp: IResponse) => (
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
              <Divider mb={5} />
            </Stack>
          ))}
        </CardBody>
      </Card>
    </Stack>
  )
}
