import {
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
import { FC } from 'react'
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import { formatDate } from '../../helpers/date.helper'
import { useGetMyCompanyQuery } from '../../store/api/services/company'

import { useResponseQuery } from '../../store/api/services/response'
import { IResponse } from '../../types/types'

export const VacancyResponse: FC = () => {
  const navigate = useNavigate()
  const { data: company } = useGetMyCompanyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: response = [] } = useResponseQuery(company?.id, {
    refetchOnMountOrArgChange: true,
    skip: company ? false : true,
  })

  return (
    <Stack w="90vw" margin="0 auto">
      <Card mt={10} bg={useColorModeValue('white', 'black.600')}>
        <CardHeader>
          <Heading size="md">Відгуки</Heading>
        </CardHeader>
        <CardBody>
          {response.map((resp: IResponse) => (
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
              <Divider mb={5} />
            </Stack>
          ))}
        </CardBody>
      </Card>
    </Stack>
  )
}
