import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FC, useEffect } from 'react'
import { useShowToast } from '../components/hooks/useShowToast'
import { IUser } from '../types/types'
import { useUpdateProfileMutation } from '../store/api/services/user'
const validationSchema = Yup.object({
  name: Yup.string().required("Введіть ім'я"),
  lastname: Yup.string().required('Вкажіть прізвищє'),
  phone: Yup.string().required('Вкажіть номер телефону'),
  email: Yup.string()
    .email('Введіть вірний E-mail')
    .required("E-mail обов'язковий"),
})
type IFormValues = {
  name: string
  lastname: string
  phone: string
  email: string
  role: string
}
export const EditProfile: FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { name, lastname, email, phone, role } = state as IUser
  const [update] = useUpdateProfileMutation()
  const { showToast } = useShowToast()
  const { handleSubmit, handleChange, setFieldValue, touched, errors, values } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        lastname: '',
        phone: '',
        role: '',
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        try {
          const result = await update(values).unwrap()
          if (result) {
            showToast('Резюме оновлено', 'success')
            navigate('/auth/profile')
          }
        } catch (error) {
          if (error) {
            showToast('Не вдалось оновити резюме', 'error')
          }
        }
      },
    })

  useEffect(() => {
    setFieldValue('name', name)
    setFieldValue('lastname', lastname)
    setFieldValue('phone', phone)
    setFieldValue('email', email)
    setFieldValue('role', role)
  }, [])

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
          Редагувати профиль
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

        <Button
          // isDisabled={isLoading}
          // isLoading={isLoading}
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
