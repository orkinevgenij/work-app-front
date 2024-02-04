import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatDate } from '../../helpers/date.helper'
import { useGetMyCompanyQuery } from '../../store/api/services/company'

export const MyCompany: FC = () => {
  const { data: company } = useGetMyCompanyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <Flex align="center" direction="column">
      {company ? (
        <Box textAlign="center">
          <Heading>{company?.title}</Heading>
          <Text>{company?.description}</Text>
          <Text color="gray">{formatDate(company?.createdAt || '')}</Text>
        </Box>
      ) : (
        <Box textAlign="center">
          <Text fontSize="xl" m={5}>
            Компанія відсутня
          </Text>
          <Button colorScheme="purple" as={RouterNavLink} to="/company/create">
            Створити компанію
          </Button>
        </Box>
      )}
    </Flex>
  )
}
