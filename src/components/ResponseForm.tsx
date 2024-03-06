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
import { ErrorResponse } from 'react-router-dom'
import { useCreateResponseMutation } from '../store/api/services/response'
import { useGetMyResumeQuery } from '../store/api/services/resume'
import { IResume, Vacancy } from '../types/types'
import { useShowToast } from './hooks/useShowToast'

type Props = {
  vacancy?: Vacancy
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}
export const ResponseForm: FC<Props> = ({
  vacancy,
  isVisible,
  setIsVisible,
}) => {
  const [message, setMessage] = useState<string>('')
  const [resumeId, setResumeId] = useState<number>()
  const blockRef = useRef<HTMLDivElement>(null)
  const { showToast } = useShowToast()
  const { data: resumes = [] } = useGetMyResumeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [createResponse] = useCreateResponseMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await createResponse({
        vacancy: vacancy?.id,
        resume: resumeId,
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
    if (resumes.length > 0) {
      setResumeId(resumes[0].id)
    }
  }, [resumes])

  useEffect(() => {
    if (isVisible && blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isVisible])
  return (
    <Box as="form" w="70%" onSubmit={onSubmit}>
      <Card
        ref={blockRef}
        mt={5}
        textAlign="center"
        bg={useColorModeValue('white', 'black.600')}
      >
        <CardHeader>
          <Flex>
            <Flex flex="1" pr={3} justify="center">
              <Box>
                <Heading size="sm">Відгукнутися на вакансію</Heading>
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
          <FormControl mb={5}>
            <FormLabel>
              Розкажіть що зацікавило вас в цій вакансії і чому ви підійдете
            </FormLabel>
            <Textarea
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Резюме</FormLabel>
            <Select
              mb={5}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setResumeId(+e.target.value)
              }
            >
              {resumes?.map((resume: IResume) => (
                <option value={resume.id}>
                  {resume?.position}
                  {resume.file && '(Файл)'}
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
