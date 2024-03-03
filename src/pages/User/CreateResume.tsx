import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useShowToast } from '../../components/hooks/useShowToast.tsx'
import { calculateAge, getAgeString } from '../../helpers/date.helper.ts'
import { useCreateResumeMutation } from '../../store/api/services/resume.ts'
import { useGetCityQuery } from '../../store/api/services/city.ts'
import { ICity } from '../../types/types.ts'

interface ErrorResponse {
  data: {
    error: string
    message: string
  }
  status: number
}


const validationSchema = Yup.object({
  name: Yup.string().required("Введіть ім'я"),
  lastname: Yup.string().required('Вкажіть прізвищє'),
  position: Yup.string().required('Вкажіть бажану позицію'),
  city: Yup.string().required('Вкажіть місто'),
  phone: Yup.string().required('Вкажіть номер телефону'),
  email: Yup.string()
    .email('Введіть вірний E-mail')
    .required("E-mail обов'язковий"),
  profile: Yup.string().required('Розкажіть про себе'),
  salary: Yup.number().required('Вкажіть бажану заробітну плату'),
  age: Yup.string().required('Вкажіть дату народження'),
  file: Yup.mixed()
    .required("Аватар обов'язковий")
    .test('fileSize', 'Файл дуже великий, максимум 10 МБ', value => {
      if (value) {
        const fileWithSize = value as File
        return fileWithSize.size <= 10 * 1024 * 1024
      }
      return true
    }),
})
interface IFormValues {
  name: string
  lastname: string
  position: string
  city: string
  phone: string
  email: string
  profile: string
  salary: number
  age: string
  file: File | ''
}
export const CreateResume: FC = () => {
  const { showToast } = useShowToast()
  const navigate = useNavigate()
  const [createResume, { isLoading }] = useCreateResumeMutation()
  const { data: cities = [] } = useGetCityQuery(undefined, {})

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        name: '',
        lastname: '',
        city:'', 
        position: '',
        age: '',
        phone: '',
        email: '',
        profile: '',
        salary: 0,
        file: '',
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('lastname', values.lastname)
        formData.append('position', values.position)
        formData.append('city', values.city)
        formData.append('phone', values.phone)
        formData.append('profile', values.profile)
        formData.append('salary', values.salary.toString())
        formData.append('age', values.age)
        if (values.file) {
          formData.append('file', values.file)
        }
        try {
          const result = await createResume(formData).unwrap()
          if (result) {
            showToast('Резюме успішно створено', 'success')
            navigate('/')
          }
        } catch (error) {
          const customError = error as ErrorResponse
          const errorMessage =
            customError && customError.data
              ? customError.data.message
              : 'An error occurred'
          showToast(errorMessage, 'error')
        }
      },
    })
  useEffect(() => {
    setFieldValue('city', cities[1]?.name )
  }, [])
  return (
    <>
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
            Створити резюме
          </Heading>
          <Flex direction="column" align="center" textAlign="center">
            <Avatar
              m={5}
              size="2xl"
              src={values.file && URL.createObjectURL(values.file)}
            />
            <FormControl flexDirection="column">
              <label htmlFor="avatar">
                <Button
                  as="span"
                  colorScheme="purple"
                  cursor="pointer"
                  size="sm"
                >
                  Выберите фото
                </Button>
              </label>
              <Input
                name="file"
                type="file"
                id="avatar"
                display="none"
                onChange={(event: any) => {
                  setFieldValue('file', event.currentTarget.files[0])
                }}
                accept="image/*"
              />
            </FormControl>
            <Box mb={3}>
              {touched.file && errors.file ? <Text color="red">{errors.file}</Text> : null}
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
          {values.age && (
            <Flex>
              <Text pr={1}>{calculateAge(values.age)}</Text>
              <Text>{getAgeString(calculateAge(values.age))}</Text>
            </Flex>
          )}
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
              Заробітна плата
            </FormLabel>
            <Input
              type="number"
              name="salary"
              value={values.salary === 0 ? '' : values.salary}
              onChange={handleChange}
              placeholder="Заробітна плата"
            />
          </FormControl>
          {touched.salary && errors.salary ? (
            <Text color="red">{errors.salary}</Text>
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
          <FormControl flexDirection="column">
            <FormLabel
              sx={{
                fontSize: '1xl',
                mb: 5,
              }}
            >
              Телефон
            </FormLabel>
            <Input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Телефон"
            />
          </FormControl>
          {touched.phone && errors.phone ? (
            <Text color="red">{errors.phone}</Text>
          ) : null}
          <FormControl flexDirection="column">
            <FormLabel
              sx={{
                fontSize: '1xl',
                mb: 5,
              }}
            >
              E-mail
            </FormLabel>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="E-mail"
            />
          </FormControl>
          {touched.email && errors.email ? (
            <Text color="red">{errors.email}</Text>
          ) : null}
          <FormControl flexDirection="column">
            <FormLabel
              sx={{
                fontSize: '1xl',
                mb: 5,
              }}
            >
              О себе
            </FormLabel>
            <Textarea
              name="profile"
              value={values.profile}
              onChange={handleChange}
              placeholder="О себе"
            />
          </FormControl>
          {touched.profile && errors.profile ? (
            <Text color="red">{errors.profile}</Text>
          ) : null}
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Створення"
            w="50%"
            maxW="xs"
            mt={5}
            colorScheme="purple"
            type="submit"
          >
            Створити
          </Button>
        </Stack>
      </Box>
    </>
  )
}
