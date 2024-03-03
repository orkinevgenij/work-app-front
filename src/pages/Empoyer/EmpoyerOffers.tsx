import { FC } from 'react'
import { useGetMyCompanyQuery } from '../../store/api/services/company'
import { useGetOffersByCompanyQuery } from '../../store/api/services/offer'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { Card, useColorModeValue, CardBody, CardFooter } from '@chakra-ui/react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatDate } from '../../helpers/date.helper'

export const EmpoyerOffers: FC = () => {
  const { data: company } = useGetMyCompanyQuery(null)
  const { data: offers = [] } = useGetOffersByCompanyQuery(
    { id: company?.id },
    {
      skip: company ? false : true,
    },
  )
  console.log(offers)
  return (
    <>
      <Box>
        <Heading p={5} size="md">
          Пропозиції
        </Heading>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {offers?.map((offer: any) => (
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
                    {offer.vacancy.company.title}
                  </Text>
                </Stack>
                <Stack flex="2">
                  <Text fontSize="xl" fontWeight="400" color="gray">
                    {offer.vacancy.title}
                  </Text>
                  <Text fontSize="xl" color="gray" noOfLines={3}>
                    <Link as={RouterNavLink} to={`/offer/detail/${offer.id}`}>
                      {offer.message}
                    </Link>
                  </Text>
                </Stack>
              </Box>
            </CardBody>
            <CardFooter flexDirection="column">
              <Text>Відгук на резюме</Text>
              <Link
                color="blue.600"
                fontWeight="600"
                as={RouterNavLink}
                to={`/resume/${offer.resume.id}`}
                w="max-content"
              >
                {offer.resume.position}
              </Link>
              <Text fontSize="sm" color="gray">
                {formatDate(offer.createdAt)}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </>
  )
}
