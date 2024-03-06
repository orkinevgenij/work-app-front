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
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useShowToast } from '../../components/hooks/useShowToast'
import { useGetCityQuery } from '../../store/api/services/city'
import {
  useGetOneResumeQuery,
  useUpdateResumeMutation,
} from '../../store/api/services/resume'
import { ICity } from '../../types/types'
interface FileWithSize extends File {
  size: number
}

const validationSchema = Yup.object().shape({
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
    .nullable()
    .test('fileSize', 'Файл дуже великий, максимум 10 МБ', value => {
      if (value) {
        const fileWithSize = value as FileWithSize
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
  file: File | null
}
export const EditResume: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: resume } = useGetOneResumeQuery(id, {})
  const [update, { isLoading }] = useUpdateResumeMutation()
  const { data: cities = [] } = useGetCityQuery(undefined, {})

  const { showToast } = useShowToast()
  const { handleSubmit, handleChange, setFieldValue, touched, errors, values } =
    useFormik({
      initialValues: {
        name: '',
        lastname: '',
        position: '',
        city: '',
        phone: '',
        email: '',
        profile: '',
        salary: 0,
        age: '',
        file: null,
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
        formData.append('age', values.age)
        formData.append('salary', values.salary.toString())
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
          <Avatar
            src={
              values?.file
                ? URL.createObjectURL(values?.file)
                : resume?.avatar.url
            }
            m={5}
            size="2xl"
          />
          <Box mb={3}>
            {errors.file ? <Text color="red">{errors.file}</Text> : null}
          </Box>
          <FormControl flexDirection="column">
            <label htmlFor="avatar">
              <Button as="span" colorScheme="purple" cursor="pointer" size="sm">
                Змінити фото
              </Button>
            </label>

            <Input
              name="avatar"
              type="file"
              id="avatar"
              display="none"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.currentTarget.files
                if (files && files.length > 0) {
                  setFieldValue('file', files[0])
                }
              }}
              accept="image/*"
            />
          </FormControl>
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
            Про себе
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
