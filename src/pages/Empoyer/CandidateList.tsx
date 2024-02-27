import { Flex, Link, Stack, Text } from '@chakra-ui/layout'
import { Card, CardBody, CardHeader, useColorModeValue } from '@chakra-ui/react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatCurrency } from '../../helpers/currency.helper'
import {
  calculateAge,
  formatDate,
  getAgeString,
} from '../../helpers/date.helper'
import { useGetAllResumeQuery } from '../../store/api/services/resume'
import { IResume } from '../../types/types'

export const CandidateList = () => {
  const { data: candidates } = useGetAllResumeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  console.log('🚀 ~ CandidateList ~ candidates:', candidates)

  return (
    <Stack w="90vw" margin="0 auto">
      {candidates?.map((candidate: IResume) => (
        <Link
          key={candidate.id}
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
              bg: useColorModeValue('gray.200', 'black.500'),
            }}
          >
            {candidate.file && (
              <Text
                sx={{
                  borderRadius: '15px',
                  fontSize: '12px',
                  p: '3px 15px 3px 15px',
                  m: 3,
                  bg: 'purple.400',
                  color: 'white',
                  w: 'max-content',
                }}
              >
                Файл
              </Text>
            )}
            <CardHeader fontSize="3xl" fontWeight="700">
              {candidate.position}
            </CardHeader>
            <CardBody>
              <Stack>
                <Flex direction="column">
                  {candidate.salary && (
                    <Text fontWeight="700">
                      {formatCurrency.format(candidate.salary)}
                    </Text>
                  )}
                  <Flex>
                    <Text fontSize="md" mr={1}>
                      {candidate.name},
                    </Text>
                    <Text fontSize="md" fontWeight="700" pr={1}>
                      {calculateAge(candidate.age)}
                    </Text>
                    <Text fontSize="md" fontWeight="700" pr={1}>
                      {getAgeString(calculateAge(candidate.age))},
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
