import {
  Button,
  Card,
  CardBody,
  Select,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { useCreateResponseMutation } from '../store/api/services/response'
import { useGetMyResumeQuery } from '../store/api/services/resume'
import { IResume, Vacancy } from '../types/types'
import { useShowToast } from './hooks/useShowToast'
type Props = {
  vacancy?: Vacancy
  isVisible: boolean
}
export const ResponseForm: FC<Props> = ({ vacancy, isVisible }) => {
  const [coverLetter, setCoverLetter] = useState<string>('')
  const [resumeId, setResumeId] = useState<number>()
  const blockRef = useRef<HTMLDivElement>(null)
  const { showToast } = useShowToast()
  const { data: resumes = [] } = useGetMyResumeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
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
            <option value={resume.id}>
              {resume?.position}
              {resume.file && '(Файл)'}
            </option>
          ))}
        </Select>
        <Button onClick={responseVacancy} colorScheme="purple">
          Надіслати
        </Button>
      </CardBody>
    </Card>
  )
}
