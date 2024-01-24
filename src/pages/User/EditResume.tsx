import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { useShowToast } from '../../components/hooks/useShowToast'
import {
  useGetMyResumeQuery,
  useUpdateResumeMutation,
} from '../../store/api/services/resume'
import { FC, useEffect } from 'react'
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
}
export const EditResume: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: resume } = useGetMyResumeQuery(undefined, {})
  const [update, { isLoading }] = useUpdateResumeMutation()

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
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        const data = values
        try {
          const result = await update({ data, id }).unwrap()
          if (result) {
            showToast('Резюме оновлено', 'success')
            navigate('/resume/my')
          }
        } catch (error) {
          if (error) {
            showToast('Не вдалось створити резюме', 'error')
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
  }, [resume])

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
    >
      <Stack
        mt={10}
        spacing={5}
        width="70%"
        rounded={'lg'}
        p={5}
        align="center"
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'black.600')}
      >
        <Heading size="md" color="purple.400">
          Редагувати резюме
        </Heading>
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
          <Input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            placeholder="Місто"
          />
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
