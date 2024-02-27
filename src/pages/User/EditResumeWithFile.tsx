import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useShowToast } from '../../components/hooks/useShowToast'
import { getFileIcon } from '../../helpers/getFileIcon'
import { useGetCityQuery } from '../../store/api/services/city'
import {
  useGetOneResumeQuery,
  useUpdateResumeWithFileMutation,
} from '../../store/api/services/resume'
import { ICity } from '../../types/types'

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Введіть ім'я"),
  lastname: Yup.string().required('Вкажіть прізвищє'),
  position: Yup.string().required('Вкажіть бажану позицію'),
  city: Yup.string().required('Вкажіть місто'),
  age: Yup.string().required('Вкажіть дату народження'),
  file: Yup.mixed()
    .nullable()
    .test('fileSize', 'Файл дуже великий, максимум 10 МБ', value => {
      if (!value) return true
      const fileWithSize = value as File
      return fileWithSize.size <= 10 * 1024 * 1024
    }),
})
interface IFormValues {
  name: string
  lastname: string
  position: string
  city: string
  age: string
  file: File | null
}
export const EditResumeWithFile: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: resume } = useGetOneResumeQuery(id, {})
  const [update, { isLoading }] = useUpdateResumeWithFileMutation()
  const { data: cities = [] } = useGetCityQuery(undefined, {})

  const { showToast } = useShowToast()
  const { handleSubmit, handleChange, setFieldValue, touched, errors, values } =
    useFormik({
      initialValues: {
        name: '',
        lastname: '',
        position: '',
        city: '',
        age: '',
        file: null,
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        console.log('🚀 ~ onSubmit: ~ values:', values)
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('lastname', values.lastname)
        formData.append('position', values.position)
        formData.append('city', values.city)
        formData.append('age', values.age)
        if (values.file) {
          formData.append('file', values.file)
        }
        try {
          const result = await update({ formData, id }).unwrap()
          if (result) {
            showToast('Резюме оновлено', 'success')
            navigate(`/resume/my/${id}`)
          }
        } catch (error) {
          if (error) {
            console.log(error)
            showToast('Что-то пошло не так', 'error')
          } else {
          }
        }
      },
    })

  useEffect(() => {
    setFieldValue('name', resume?.name)
    setFieldValue('lastname', resume?.lastname)
    setFieldValue('position', resume?.position)
    setFieldValue('salary', resume?.salary)
    setFieldValue('city', resume?.city)
    setFieldValue('phone', resume?.phone)
    setFieldValue('email', resume?.email)
    setFieldValue('profile', resume?.profile)
    setFieldValue('age', resume?.age)
  }, [resume])

  return (
    <Box
      encType="multipart/form-data"
      as="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
    >
      <Stack
        mt={10}
        spacing={5}
        width={{ base: '100%', md: '80%', xl: '80%' }}
        rounded={'lg'}
        p={5}
        align="center"
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'black.600')}
      >
        <Heading size="md" color="purple.400">
          Редагувати резюме
        </Heading>
        <Flex direction="column" align="center" textAlign="center">
          <FormControl flexDirection="column">
            <label htmlFor="resume">
              <Button
                as="span"
                colorScheme="purple"
                cursor="pointer"
                size="sm"
                variant="outline"
              >
                Завантажити
              </Button>
              <Flex align="center" gap={1} mt={3}>
                {values?.file?.name ? (
                  <Flex align="center" gap={1} mt={3}>
                    <Text fontWeight="bold"> Нове резюме: </Text>
                    <Text>{getFileIcon(values.file.type)}</Text>
                    <Text>{values.file.name}</Text>
                  </Flex>
                ) : (
                  <Link href={resume?.file?.url} fontSize="xl">
                    Переглянути резюме
                  </Link>
                )}
              </Flex>
            </label>
            <Input
              name="file"
              type="file"
              id="resume"
              display="none"
              onChange={(event: any) => {
                setFieldValue('file', event.currentTarget.files[0])
              }}
              accept="application/pdf"
            />
          </FormControl>
          <Box mb={3}>
            {errors.file ? <Text color="red">{errors.file}</Text> : null}
          </Box>
        </Flex>
        <FormControl flexDirection="column">
          <FormLabel
            sx={{
              fontSize: '1xl',
              mb: 5,
            }}
          >
            Им'я
          </FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Ім'я"
            onChange={handleChange}
            value={values.name}
          />
        </FormControl>
        {touched.name && errors.name ? (
          <Text color="red">{errors.name}</Text>
        ) : null}
        <FormControl flexDirection="column">
          <FormLabel
            sx={{
              fontSize: '1xl',
              mb: 5,
            }}
          >
            Призвищє
          </FormLabel>
          <Input
            type="text"
            name="lastname"
            placeholder="Призвищє"
            value={values.lastname}
            onChange={handleChange}
          />
        </FormControl>
        {touched.lastname && errors.lastname ? (
          <Text color="red">{errors.lastname}</Text>
        ) : null}
        <FormControl flexDirection="column">
          <FormLabel
            sx={{
              fontSize: '1xl',
              mb: 5,
            }}
          >
            Дата народження
          </FormLabel>
          <Input
            name="age"
            type="date"
            value={values.age}
            onChange={handleChange}
          />
        </FormControl>
        {touched.age && errors.age ? (
          <Text color="red">{errors.age}</Text>
        ) : null}
        <FormControl flexDirection="column">
          <FormLabel
            sx={{
              fontSize: '1xl',
              mb: 5,
            }}
          >
            Позиция
          </FormLabel>
          <Input
            type="text"
            name="position"
            value={values.position}
            onChange={handleChange}
            placeholder="Назва позиції"
          />
        </FormControl>
        {touched.position && errors.position ? (
          <Text color="red">{errors.position}</Text>
        ) : null}

        <FormControl flexDirection="column">
          <FormLabel
            sx={{
              fontSize: '1xl',
              mb: 5,
            }}
          >
            Місто
          </FormLabel>
          <Select name="city" value={values.city} onChange={handleChange}>
            {cities.map((city: ICity) => (
              <option>{city.name}</option>
            ))}
          </Select>
        </FormControl>
        {touched.city && errors.city ? (
          <Text color="red">{errors.city}</Text>
        ) : null}

        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          loadingText="Збереження"
          w="50%"
          maxW="xs"
          mt={5}
          colorScheme="purple"
          type="submit"
        >
          Зберегти
        </Button>
      </Stack>
    </Box>
  )
}
