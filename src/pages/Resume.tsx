import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { JobOfferForm } from '../components/JobOfferForm'
import { PDFViewer } from '../components/PDFViewer'
import { UserOtherResume } from '../components/UserOtherResume'
import { formatCurrency } from '../helpers/currency.helper'
import { calculateAge, formatDate, getAgeString } from '../helpers/date.helper'
import {
  useGetOneResumeQuery,
  useOtherResumesUserQuery,
} from '../store/api/services/resume'
import { useAppSelector } from '../store/hooks'
import { checkAuth } from '../store/features/user/authSlice'
import { Loader } from '../components/Loader'

export const Resume = () => {
  const { id } = useParams()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { role } = useAppSelector(checkAuth)

  const { data: resume, isLoading } = useGetOneResumeQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  const { data: otherResumes = [] } = useOtherResumesUserQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  if (isLoading) {
    return <Loader />
  }
  return (
    <Stack align="center">
      {resume?.avatar && (
        <Avatar bg="purple.500" src={resume?.avatar.url} mt={5} size="2xl" />
      )}
      {role === 'employer' && (
        <Button onClick={() => setIsVisible(true)} mt={5} colorScheme="purple">
          Запропонувати вакансію
        </Button>
      )}
      <Stack
        bg={useColorModeValue('white', 'black.600')}
        rounded={'lg'}
        boxShadow={'lg'}
        mt={5}
        mb={5}
        p={5}
        w="80%"
      >
        <Text mb={3} color="gray">
          Резюме від {formatDate(resume?.createdAt)}
        </Text>
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
        {resume?.salary && (
          <Flex gap={3}>
            <Text fontSize="xl">Зарплатні очікування:</Text>
            <Text fontSize="xl" fontWeight="700">
              {formatCurrency.format(resume?.salary)}
            </Text>
          </Flex>
        )}
      </Stack>
      {resume?.phone && resume?.email && (
        <Stack
          bg={useColorModeValue('gray.100', 'black.500')}
          rounded={'lg'}
          boxShadow={'lg'}
          p={5}
          mb={5}
          w="80%"
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
      )}
      <Stack
        bg={useColorModeValue('white', 'black.600')}
        rounded={'lg'}
        boxShadow={'lg'}
        p={5}
        mb={5}
        w="80%"
      >
        <Flex
          display="flex"
          alignItems="center"
          gap={3}
          bg={useColorModeValue('white', 'black.600')}
        >
          <Text fontSize="2xl" fontWeight="400">
            Ціль:
          </Text>
          <Text fontSize="2xl" fontWeight="700">
            {resume?.position}
          </Text>
        </Flex>
      </Stack>
      {resume?.file && <PDFViewer fileUrl={resume?.file.url} />}
      {resume?.profile && (
        <Stack
          direction="column"
          bg={useColorModeValue('white', 'black.600')}
          rounded={'lg'}
          boxShadow={'lg'}
          mb={5}
          p={5}
          w="80%"
          h="20%"
        >
          <Flex direction="column" gap={3}>
            <Heading fontSize="2xl" fontWeight="700">
              Про себе
            </Heading>
            <Text fontSize="2xl">{resume?.profile}</Text>
          </Flex>
        </Stack>
      )}
      {isVisible && (
        <JobOfferForm
          isVisible={isVisible}
          resume={resume}
          setIsVisible={setIsVisible}
        />
      )}

      <Flex direction="column">
        <Text fontSize="2xl" textAlign="center">
          Інші резюме цього кандидата
        </Text>
        <UserOtherResume otherResumes={otherResumes} />
      </Flex>
    </Stack>
  )
}
