import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatCurrency } from '../helpers/currency.helper'
import { Vacancy } from '../types/types'
import { FC } from 'react'
type Props = {
  similarVacancies: Vacancy[]
}
export const SimilarVacancies: FC<Props> = ({ similarVacancies }) => {
  return (
    <Box>
      {similarVacancies.map((vacancy: Vacancy) => (
        <Box key={vacancy.id} w="80vw">
          <Flex gap={3}>
            <Heading
              size="md"
              fontWeight="500"
              color="purple.400"
              as={RouterNavLink}
              to={`/vacancy/${vacancy.id}`}
            >
              {vacancy?.title}
            </Heading>
            <Text fontWeight="700">
              {formatCurrency.format(vacancy?.salary)}
            </Text>
          </Flex>
          <Flex gap={3}>
            <Text fontWeight="700">{vacancy?.company?.title}</Text>
            <Text>{vacancy?.city?.name}</Text>
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
