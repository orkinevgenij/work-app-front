import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FC, useState } from 'react'
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import { useShowToast } from '../../components/hooks/useShowToast'
import { useRegisterMutation } from '../../store/api/services/user'
import { auth } from '../../store/features/user/authSlice'
import { useAppDispatch } from '../../store/hooks'
interface ErrorResponse {
  data: {
    error: string
    message: string
  }
  status: number
}
interface IFormValues {
  name: string
  lastname: string
  email: string
  phone: string
  role: string
  password: string
  confirmPassword: string
}

const validationSchema = Yup.object({
  name: Yup.string().required("Введіть iм'я"),
  lastname: Yup.string().required('Введіть прізвище'),
  email: Yup.string()
    .email('Введіть вірний E-mail')
    .required("E-mail обов'язковий"),
  phone: Yup.number().required('Введіть ваш телефон'),
  role: Yup.string().required('Оберіть роль'),
  password: Yup.string()
    .required('Введіть ваш пароль')
    .min(6, 'Пароль не менше 6 символів'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі повинні збігатися')
    .required('Введіть ваш пароль'),
})
export const Register: FC = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const navigate = useNavigate()
  const { showToast } = useShowToast()
  const [register, { isLoading }] = useRegisterMutation()

  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } =
    useFormik({
      initialValues: {
        role: '',
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        try {
          const result = await register(values).unwrap()
          if (result) {
            dispatch(
              auth({
                accessToken: result.accessToken || '',
                role: result.role || '',
              }),
            )
            showToast('Реєстрація успішна', 'success')
            navigate('/')
          }
        } catch (error: unknown) {
          const customError = error as ErrorResponse
          const errorMessage =
            customError && customError.data
              ? customError.data.message
              : 'An error occurred'
          showToast(errorMessage, 'warning')
        }
      },
    })
  return (
    <>
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent={'center'}
        minH={'100vh'}
        as="form"
        onSubmit={handleSubmit}
        bg={useColorModeValue('gray.50', 'black.700')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'} textAlign={'center'}>
              Реєстрація
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'black.600')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4} align="center">
              <RadioGroup
                name="role"
                onChange={value => setFieldValue('role', value)}
                colorScheme="purple"
              >
                <Stack direction="row">
                  <Radio value="user">Шукач</Radio>
                  <Radio value="employer">Роботодавець</Radio>
                </Stack>
              </RadioGroup>
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>Ім'я</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Прізвище</FormLabel>
                    <Input
                      type="text"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="e-mail">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Номер</FormLabel>
                <Input
                  name="phone"
                  value={values.phone || ''}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Пароль</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {touched.password && errors.password ? (
                <Text color="red">{errors.password}</Text>
              ) : null}
              <FormControl id="confirmPassword">
                <FormLabel>Підтвердити пароль</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowConfirmPassword(
                          showConfirmPassword => !showConfirmPassword,
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {touched.confirmPassword && errors.confirmPassword ? (
                <Text color="red">{errors.confirmPassword}</Text>
              ) : null}
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  loadingText="Вхід"
                  size="lg"
                  bg={'purple.400'}
                  color={'white'}
                  _hover={{
                    bg: 'purple.500',
                  }}
                >
                  Реєстрація
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Ви вже з нами?{' '}
                  <Link
                    as={RouterNavLink}
                    sx={{
                      color: 'purple.500',
                      _hover: {
                        textDecoration: 'underline',
                        color: 'red',
                      },
                    }}
                    to="/auth/login"
                  >
                    Увійти
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
