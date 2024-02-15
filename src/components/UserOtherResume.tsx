import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { formatCurrency } from '../helpers/currency.helper'
import { IResume } from '../types/types'
import { formatDate } from '../helpers/date.helper'

export const UserOtherResume = ({ otherResumes }: any) => {
  return (
    <Stack w="90vw" margin="0 auto">
      {otherResumes?.map((resume: IResume) => (
        <Link
          key={resume.id}
          as={RouterNavLink}
          to={`/resume/${resume.id}`}
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
            <CardHeader fontSize="3xl" fontWeight="700">
              {resume.position}
            </CardHeader>
            <CardBody>
              <Stack>
                <Flex direction="column">
                  <Text fontWeight="700">
                    {formatCurrency.format(resume.salary)}
                  </Text>
                  <Flex>
                    <Text fontSize="md" mr={1}>
                      {resume.name},
                    </Text>
                    <Text fontSize="md">{resume.city}</Text>
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Text color="gray">{formatDate(resume.createdAt)}</Text>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Stack>
  )
}
