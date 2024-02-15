import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { Avatar, Icon, useColorModeValue } from '@chakra-ui/react'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { NavLink as RouterNavLink, useParams } from 'react-router-dom'
import { formatCurrency } from '../helpers/currency.helper'
import { calculateAge, getAgeString } from '../helpers/date.helper'
import {
  useGetOneResumeQuery,
  useOtherResumesUserQuery,
} from '../store/api/services/resume'
import { UserOtherResume } from '../components/UserOtherResume'

export const Resume = () => {
  const { id } = useParams()
  const { data: resume } = useGetOneResumeQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  const { data: otherResumes = [] } = useOtherResumesUserQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  console.log('🚀 ~ Resume ~ similarResume:', otherResumes)

  return (
    <Stack align="center">
      <Avatar bg="purple.500" src={resume?.file.url} mt={5} size="2xl" />
      <Stack
        bg={useColorModeValue('white', 'black.600')}
        rounded={'lg'}
        boxShadow={'lg'}
        mt={5}
        mb={5}
        p={5}
        w="80vw"
        h="40%"
        direction="column"
      >
        <Flex align="center">
          <Heading fontSize="xl" fontWeight="700" pr={1}>
            {resume?.name} {resume?.lastname},
          </Heading>
          <Text fontSize="xl" fontWeight="700" pr={1}>
            {calculateAge(resume?.age)}
          </Text>
          <Text fontSize="xl" fontWeight="700">
            {getAgeString(calculateAge(resume?.age))}
          </Text>
        </Flex>
        <Flex gap={3}>
          <Text fontSize="xl">Місто:</Text>
          <Text fontSize="xl" fontWeight="700">
            {resume?.city}
          </Text>
        </Flex>
        <Flex gap={3}>
          <Text fontSize="xl">Зарплатні очікування:</Text>
          <Text fontSize="xl" fontWeight="700">
            {formatCurrency.format(resume?.salary)}
          </Text>
        </Flex>
      </Stack>
      <Stack
        bg={useColorModeValue('gray.100', 'black.500')}
        rounded={'lg'}
        boxShadow={'lg'}
        p={5}
        mb={5}
        w="80vw"
        h="20%"
      >
        <Flex gap={3}>
          <Icon
            aria-label="Call Sage"
            color="gray.400"
            fontSize="20px"
            as={FiPhone}
          />
          <Text fontSize="sm" fontWeight="700">
            {resume?.phone}
          </Text>
        </Flex>
        <Flex gap={3}>
          <Icon
            aria-label="Call Sage"
            color="gray.400"
            fontSize="20px"
            as={MdOutlineEmail}
          />
          <Text fontSize="sm" fontWeight="700">
            {resume?.email}
          </Text>
        </Flex>
      </Stack>
      <Stack
        bg={useColorModeValue('white', 'black.600')}
        rounded={'lg'}
        boxShadow={'lg'}
        p={5}
        mb={5}
        w="80vw"
        h="20%"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={3}
          bg={useColorModeValue('white', 'black.600')}
        >
          <Text fontSize="2xl" fontWeight="400">
            Цель:
          </Text>
          <Text fontSize="2xl" fontWeight="700">
            {resume?.position}
          </Text>
        </Box>
      </Stack>
      <Stack
        direction="column"
        bg={useColorModeValue('white', 'black.600')}
        rounded={'lg'}
        boxShadow={'lg'}
        mb={5}
        p={5}
        w="80vw"
        h="20%"
      >
        <Flex direction="column" gap={3}>
          <Heading fontSize="2xl" fontWeight="700">
            О себе
          </Heading>
          <Text fontSize="2xl">{resume?.profile}</Text>
        </Flex>
      </Stack>
      <Flex direction="column">
        <Text fontSize="2xl" textAlign="center">
          Інші резюме цього кандидата
        </Text>
        <UserOtherResume otherResumes={otherResumes} />
      </Flex>
    </Stack>
  )
}
