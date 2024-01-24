import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout'
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
import { useShowToast } from '../components/hooks/useShowToast'
import { formatCurrency } from '../helpers/currency.helper'
import { formatDate } from '../helpers/date.helper'
import { useCreateResponseMutation } from '../store/api/services/response'
import { useGetMyResumeQuery } from '../store/api/services/resume'
import {
  useGetOneVacancyQuery,
  useGetSimilarVacancyQuery,
} from '../store/api/services/vacancy'
import { Vacancy } from '../types/types'

export const VacancyDetail: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [coverLetter, setCoverLetter] = useState<string>('')
  const blockRef = useRef<HTMLDivElement>(null)

  const { id } = useParams()
  const { showToast } = useShowToast()
  const { data: resume } = useGetMyResumeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: vacancy } = useGetOneVacancyQuery(id, {})

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
        resume: resume?.id,
        coverLetter,
      }).unwrap()
      showToast('Відгук відправлений', 'success')
    } catch (error) {
      if (error) {
        showToast('Відгук вже відправлений', 'info')
      }
    }
  }

  useEffect(() => {
    if (isVisible && blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isVisible])
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
              <Select mb={5}>
                <option>{resume?.position}</option>
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
                {' '}
                {formatCurrency.format(vacancy?.salary)}
              </Text>
            </Flex>
            <Flex gap={3}>
              <Text fontWeight="700">{vacancy?.company.title}</Text>
              <Text>{vacancy?.city?.name}</Text>
            </Flex>
          </Box>
        ))}
      </Flex>
    </>
  )
}
