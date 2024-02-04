import { Flex, Stack, Text, Link } from '@chakra-ui/layout'
import {
  Card,
  CardBody,
  CardHeader,
  textDecoration,
  useColorModeValue,
} from '@chakra-ui/react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatCurrency } from '../../helpers/currency.helper'
import { formatDate } from '../../helpers/date.helper'
import { useGetAllResumeQuery } from '../../store/api/services/resume'
import { IResume } from '../../types/types'

export const CandidateList = () => {
  const { data: candidates } = useGetAllResumeQuery(undefined)
  return (
    <Stack w="90vw" margin="0 auto">
      {candidates?.map((candidate: IResume) => (
        <Link
          as={RouterNavLink}
          to={`/resume/${candidate.id}`}
          color="purple.400"
          fontWeight="bold"
          m={3}
        >
          <Card
            bg={useColorModeValue('white', 'black.600')}
            _hover={{
              color: 'purple.400',
              cursor: 'pointer',
              bg: 'gray.200',
            }}
          >
            <CardHeader fontSize="3xl" fontWeight="700">
              {candidate.position}
            </CardHeader>
            <CardBody>
              <Stack>
                <Flex direction="column">
                  <Text fontWeight="700">
                    {formatCurrency.format(candidate.salary)}
                  </Text>
                  <Flex>
                    <Text fontSize="md" mr={1}>
                      {candidate.name},
                    </Text>
                    <Text fontSize="md">{candidate.city}</Text>
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Text color="gray">{formatDate(candidate.createdAt)}</Text>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Stack>
  )
}
