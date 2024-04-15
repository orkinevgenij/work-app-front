import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Select,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { ErrorResponse, useNavigate } from 'react-router-dom'
import { useGetMyCompanyQuery } from '../store/api/services/company'
import { useCreateResponseMutation } from '../store/api/services/response'
import { useGetVacancyByCompanyQuery } from '../store/api/services/vacancy'
import { IResume, Vacancy } from '../types/types'
import { useShowToast } from './hooks/useShowToast'

type Props = {
  resume?: IResume
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}
export const JobOfferForm: FC<Props> = ({
  resume,
  isVisible,
  setIsVisible,
}) => {
  const [message, setMessage] = useState<string>('')
  const [vacancyId, setVacancyId] = useState<number>()
  const blockRef = useRef<HTMLDivElement>(null)
  const { showToast } = useShowToast()
  const { data: company } = useGetMyCompanyQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const { data: vacancies = [] } = useGetVacancyByCompanyQuery(
    { id: company?.id },
    {
      skip: company ? false : true,
    },
  )
  const [createResponse] = useCreateResponseMutation()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await createResponse({
        vacancy: vacancyId,
        resume: resume?.id,
        message,
      }).unwrap()
      if (result) {
        showToast('Відгук відправлений', 'success')
      }
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
    if (vacancies.length > 0) {
      setVacancyId(vacancies[0].id)
    }
  }, [vacancies])

  useEffect(() => {
    if (isVisible && blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isVisible])
  return (
    <Box
      as="form"
      w={{
        base: '100%',
        sm: '90%',
        md: '80%',
        xl: '70%',
      }}
      onSubmit={onSubmit}
    >
      <Card
        ref={blockRef}
        mt={5}
        textAlign="center"
        bg={useColorModeValue('white', 'black.600')}
      >
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" justify="center" pr={3}>
              <Box>
                <Heading size="sm">Запропонувати вакансію</Heading>
              </Box>
            </Flex>
            <IconButton
              onClick={() => setIsVisible(!isVisible)}
              colorScheme="purple"
              aria-label="See menu"
              icon={<MdOutlineClose />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <FormControl isRequired mb={5}>
            <FormLabel>Розкажіть про вакансію</FormLabel>
            <Textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
              value={message}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Вакансії</FormLabel>
            <Select
              mb={5}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setVacancyId(+e.target.value)
              }
            >
              {vacancies?.map((vacancy: Vacancy) => (
                <option key={vacancy.id} value={vacancy.id}>
                  {vacancy.title}, {vacancy.city.name}, {vacancy.salary}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="purple">
            Надіслати
          </Button>
        </CardBody>
      </Card>
    </Box>
  )
}
