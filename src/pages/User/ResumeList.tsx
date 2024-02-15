import { Box, Flex, Link, Stack, Text } from '@chakra-ui/layout'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { useGetMyResumeQuery } from '../../store/api/services/resume'
import {
  Card,
  useColorModeValue,
  CardHeader,
  CardBody,
  Button,
} from '@chakra-ui/react'
import { formatCurrency } from '../../helpers/currency.helper'
import { formatDate } from '../../helpers/date.helper'
import { IResume } from '../../types/types'

export const ResumeList = () => {
  const { data: resumes = [] } = useGetMyResumeQuery(undefined, {})

  return (
    <Stack w="90vw" margin="0 auto">
      {resumes.length ? (
        resumes?.map((resume: IResume) => (
          <Link
            key={resume.id}
            as={RouterNavLink}
            to={`/resume/my/${resume.id}`}
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
        ))
      ) : (
        <Box textAlign="center">
          <Text fontSize="xl" m={5}>
            У вас щє нема резюме
          </Text>
          <Button colorScheme="purple" as={RouterNavLink} to="/resume/create">
            Створити резюме?
          </Button>
        </Box>
      )}
    </Stack>
  )
}
