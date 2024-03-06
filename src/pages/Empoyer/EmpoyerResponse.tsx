import { FC } from 'react'
import { useGetMyCompanyQuery } from '../../store/api/services/company'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { Card, useColorModeValue, CardBody, CardFooter } from '@chakra-ui/react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatDate } from '../../helpers/date.helper'
import { Loader } from '../../components/Loader'
import { useGetResponseByCompanyQuery } from '../../store/api/services/response'
import { Response } from '../../types/types'
import { EmptyDataMessage } from '../../components/EmptyDataMessage'

export const EmpoyerResponse: FC = () => {
  const { data: company } = useGetMyCompanyQuery(null)
  const { data: responses = [], isLoading } = useGetResponseByCompanyQuery(
    { id: company?.id },
    {
      skip: company ? false : true,
    },
  )

  if (isLoading) {
    return <Loader />
  }
  if (!responses?.length)
    return <EmptyDataMessage text={'Пропозицій не знайдено'} />
  return (
    <>
      <Box>
        <Heading p={5} size="md">
          Пропозиції
        </Heading>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {responses?.map((response: Response) => (
          <Card
            mb="10px"
            w="90%"
            bg={useColorModeValue('white', 'black.500')}
            _hover={{
              bg: useColorModeValue('gray.200', 'black.600'),
            }}
          >
            {' '}
            <CardBody>
              <Box
                display="flex"
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="space-between"
              >
                <Stack flex="1">
                  <Text fontSize="xl" fontWeight="600" color="blue.600">
                    {response.vacancy.company.title}
                  </Text>
                </Stack>
                <Stack flex="2">
                  <Text fontSize="xl" fontWeight="400" color="gray">
                    {response.vacancy.title}
                  </Text>
                  <Text color="gray" noOfLines={3}>
                    <Link
                      as={RouterNavLink}
                      to={`/response/detail/${response.id}`}
                    >
                      {response.message}
                    </Link>
                  </Text>
                </Stack>
              </Box>
            </CardBody>
            <CardFooter flexDirection="column">
              <Text>Резюме</Text>
              <Link
                color="blue.600"
                fontWeight="600"
                as={RouterNavLink}
                to={`/resume/${response.resume.id}`}
                w="max-content"
              >
                {response.resume.position}
              </Link>
              <Text fontSize="sm" color="gray">
                {formatDate(response.createdAt)}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </>
  )
}
