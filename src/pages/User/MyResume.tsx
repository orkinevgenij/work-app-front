import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import {
  NavLink as RouterNavLink,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { PDFViewer } from '../../components/PDFViewer'
import { useShowToast } from '../../components/hooks/useShowToast'
import { formatCurrency } from '../../helpers/currency.helper'
import {
  calculateAge,
  formatDate,
  getAgeString,
} from '../../helpers/date.helper'
import {
  useGetOneResumeQuery,
  useRemoveResumeMutation,
} from '../../store/api/services/resume'

export const MyResume: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useShowToast()
  const { data: resume } = useGetOneResumeQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  const [remove] = useRemoveResumeMutation()

  const handleRemove = async (id: number) => {
    try {
      const result = await remove(id)
      if (result) {
        showToast('Резюме удалено', 'warning')
        navigate('/resume/resume-list')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack align="center">
      <Stack
        direction="column"
        w="80%"
        bg={useColorModeValue('gray.100', 'black.600')}
      >
        {resume?.avatar && (
          <Flex justify="center">
            <Avatar
                bg="purple.500"
              src={resume?.avatar?.url}
              mt={5}
              size="2xl"    
            />
          </Flex>
        )}
        {resume ? (
          <>
            <ButtonGroup
              justifyContent="center"
              mt={5}
              mb={5}
              colorScheme="purple"
              variant="outline"
            >
              <Button
                size="sm"
                as={RouterNavLink}
                to={`/resume/${resume.file === null ? 'edit' : 'edit/file'}/${
                  resume.id
                }`}
              >
                Редагувати
              </Button>
              <Button onClick={() => handleRemove(resume.id)} size="sm">
                Видалити
              </Button>
            </ButtonGroup>

            <Stack
              bg={useColorModeValue('white', 'black.600')}
              rounded={'lg'}
              boxShadow={'lg'}
              mb={3}
              p={3}
              direction="column"
            >
              <Text mb={3} color="gray">
                Резюме від {formatDate(resume.createdAt)}
              </Text>
              <Flex align="center">
                <Heading fontSize="xl" fontWeight="700" pr={1}>
                  {resume.name} {resume.lastname},
                </Heading>
                <Text fontSize="xl" fontWeight="700" pr={1}>
                  {calculateAge(resume.age)}
                </Text>
                <Text fontSize="xl" fontWeight="700">
                  {getAgeString(calculateAge(resume.age))}
                </Text>
              </Flex>
              <Flex gap={3}>
                <Text fontSize="xl">Місто:</Text>
                <Text fontSize="xl" fontWeight="700">
                  {resume.city}
                </Text>
              </Flex>
              {resume.salary && (
                <Flex gap={3}>
                  <Text fontSize="xl">Зарплатні очікування:</Text>
                  <Text fontSize="xl" fontWeight="700">
                    {formatCurrency.format(resume.salary)}
                  </Text>
                </Flex>
              )}
            </Stack>

            {resume.phone && resume.email && (
              <Stack
                bg={useColorModeValue('gray.100', 'black.500')}
                rounded={'lg'}
                boxShadow={'lg'}
                p={5}
                mb={5}
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
                    {resume.phone}
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
                    {resume.email}
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
                  {resume.position}
                </Text>
              </Flex>
            </Stack>

            {resume.profile && (
              <Stack
                direction="column"
                bg={useColorModeValue('white', 'black.600')}
                rounded={'lg'}
                boxShadow={'lg'}
                mb={5}
                p={5}
                h="20%"
              >
                <Flex direction="column" gap={3}>
                  <Heading fontSize="2xl" fontWeight="700">
                    Про себе
                  </Heading>
                  <Text fontSize="2xl">{resume.profile}</Text>
                </Flex>
              </Stack>
            )}
          </>
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
        {resume?.file && (
          <Flex>
            <PDFViewer fileUrl={resume.file.url} />
          </Flex>
        )}
      </Stack>
    </Stack>
  )
}
