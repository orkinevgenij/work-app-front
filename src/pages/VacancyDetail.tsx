import { ChevronDownIcon } from '@chakra-ui/icons'
import { Divider, Flex, HStack, Heading, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  Card,
  CardBody,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiEye } from 'react-icons/fi'
import { IoArrowBack } from 'react-icons/io5'
import { MdCorporateFare } from 'react-icons/md'
import { PiCurrencyDollarSimpleFill } from 'react-icons/pi'
import { NavLink as RouterNavLink, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { useShowToast } from '../components/hooks/useShowToast'
import { formatCurrency } from '../helpers/currency.helper'
import { formatDate } from '../helpers/date.helper'
import { useCreateResponseMutation } from '../store/api/services/response'
import { useGetMyResumeQuery } from '../store/api/services/resume'
import {
  useGetOneVacancyQuery,
  useGetSimilarVacancyQuery,
} from '../store/api/services/vacancy'
import { IResume } from '../types/types'
import { SimilarVacancies } from '../components/SimilarVacancies'
interface ErrorResponse {
  data: {
    error: string
    message: string
  }
  status: number
}
export const VacancyDetail: FC = () => {
  const [coverLetter, setCoverLetter] = useState<string>('')
  const [resumeId, setResumeId] = useState<number>()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const blockRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()
  const { showToast } = useShowToast()
  const { data: resumes = [] } = useGetMyResumeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: vacancy, isLoading } = useGetOneVacancyQuery(id, {})

  const { data: similarVacancies = [] } = useGetSimilarVacancyQuery(
    {
      companyId: vacancy?.category.id,
      vacancyId: vacancy?.id,
    },
    {
      skip: vacancy ? false : true,
    },
  )
  const [createResponse] = useCreateResponseMutation()

  const responseVacancy = async () => {
    try {
      await createResponse({
        vacancy: vacancy?.id,
        resume: resumeId,
        coverLetter,
      }).unwrap()
      showToast('Відгук відправлений', 'success')
    } catch (error: unknown) {
      const customError = error as ErrorResponse
      const errorMessage =
        customError && customError.data
          ? customError.data.message
          : 'An error occurred'
      showToast(errorMessage, 'info')
    }
  }

  useEffect(() => {
    if (isVisible && blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isVisible])

  useEffect(() => {
    if (resumes.length > 0) {
      setResumeId(resumes[0].id)
    }
  }, [resumes])
  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <Flex direction="column" align="center">
        <Card
          variant="elevated"
          minHeight="80vh"
          w="80vw"
          mt={10}
          bg={useColorModeValue('white', 'black.600')}
        >
          <Flex p={5}>
            <IconButton
              fontSize="xl"
              aria-label="Search database"
              icon={<IoArrowBack />}
              as={RouterNavLink}
              to="/"
              color="purple.500"
            />
            <Button
              ml={5}
              onClick={() => setIsVisible(true)}
              bg="purple.400"
              color="white"
              _hover={{
                bg: 'purple.500',
              }}
            >
              Відгукнутися
            </Button>

            <Menu>
              <MenuButton as={Button} ml="auto" rightIcon={<ChevronDownIcon />}>
                Щє
              </MenuButton>
              <MenuList bg={useColorModeValue('white', 'black.600')}>
                <MenuItem onClick={() => window.print()}>Друк</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Divider color="gray.300" />
          <CardBody>
            <Stack display="flex" mb={10}>
              <HStack>
                <Icon color="gray.400" boxSize={4} as={FaEdit} />
                <Text color="gray" size={'md'}>
                  Вакансія опублікована {formatDate(vacancy?.createdAt || '')}
                </Text>
              </HStack>
              <HStack>
                <Icon color="gray.400" boxSize={4} as={FiEye} />
                <Text fontSize="md" color="gray">
                  {vacancy?.views} перегляди
                </Text>
              </HStack>
              <Heading size="xl" fontWeight="600" mb={5}>
                {vacancy?.title}
              </Heading>

              <HStack>
                <Icon
                  color="gray.400"
                  boxSize={5}
                  as={PiCurrencyDollarSimpleFill}
                />
                <Text fontSize="md" fontWeight="bold">
                  {formatCurrency.format(vacancy?.salary)}
                </Text>
              </HStack>
              <HStack>
                <Icon color="gray.400" boxSize={5} as={MdCorporateFare} />
                <Text fontSize="xl" fontWeight="bold" color="purple.500">
                  {vacancy?.company.title}
                </Text>
              </HStack>
              <HStack>
                <Icon color="gray.400" boxSize={5} as={FaLocationDot} />
                <Text fontSize="xl">{vacancy?.city?.name}</Text>
              </HStack>
              <Heading size="md">Опис вакансії</Heading>
              <Text noOfLines={3} fontSize="xl">
                {vacancy?.description}
              </Text>
            </Stack>
          </CardBody>
        </Card>
        {isVisible && (
          <Card
            ref={blockRef}
            mt={5}
            textAlign="center"
            bg={useColorModeValue('white', 'black.600')}
          >
            <CardBody>
              <Text fontSize="large" fontWeight="bold">
                Відгукнутися на вакансію
              </Text>
              <Text fontSize="medium" fontWeight="bold" mb={5}>
                Розкажіть що зацікавило вас в цій вакансії і чому ви підійдете.
              </Text>
              <Textarea
                onChange={e => setCoverLetter(e.target.value)}
                value={coverLetter}
              />
              <Text fontWeight="bold" m={5}>
                Резюме
              </Text>
              <Select
                mb={5}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setResumeId(+e.target.value)
                }
              >
                {resumes?.map((resume: IResume) => (
                  <option value={resume.id}>{resume?.position}</option>
                ))}
              </Select>
              <Button onClick={responseVacancy} colorScheme="purple">
                Надіслати
              </Button>
            </CardBody>
          </Card>
        )}
      </Flex>
      <Flex direction="column" align="center" p={10}>
        <Heading size="xl" fontWeight="500" mb={5}>
          Схожі вакансії
        </Heading>
        <SimilarVacancies similarVacancies={similarVacancies}/>
      </Flex>
    </>
  )
}
