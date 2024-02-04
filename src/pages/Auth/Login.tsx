import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useShowToast } from '../../components/hooks/useShowToast'
import { useLoginMutation } from '../../store/api/services/user'
import { auth } from '../../store/features/user/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введіть вірний E-mail')
    .required("E-mail обов'язковий"),
  password: Yup.string().required('Введіть ваш пароль'),
})
export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { accessToken } = useAppSelector(state => state.auth)
  const { showToast } = useShowToast()
  const [login, { isLoading }] = useLoginMutation()

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const result = await login({
          email: values.email,
          password: values.password,
        }).unwrap()
        if (result) {
          showToast('Ви увійшли', 'success')
        }
        if (result) {
          dispatch(
            auth({
              accessToken: result.accessToken || '',
              role: result.role || '',
            }),
          )
        }
        navigate('/')
      } catch (error) {
        if (error) showToast('Не дійсний пароль або email', 'error')
      }
    },
  })
  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [])
  return (
    <Box
      display="flex"
      as="form"
      onSubmit={handleSubmit}
      minH={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={useColorModeValue('gray.50', 'black.700')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Логін</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          bg={useColorModeValue('white', 'black.600')}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </FormControl>
            {touched.email && errors.email ? (
              <Text color="red">{errors.email}</Text>
            ) : null}
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
            <Stack>
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
                Увійти
              </Button>
              <Text
                m={3}
                align="center"
                sx={{
                  color: 'purple.500',
                  _hover: {
                    textDecoration: 'underline',
                    color: 'red',
                  },
                }}
                as={RouterNavLink}
                to="/auth/forgot-password"
              >
                Нагадати пароль?
              </Text>
            </Stack>
            <Stack>
              <Text align={'center'}>
                Ви ще не з нами?{' '}
                <Link
                  as={RouterNavLink}
                  sx={{
                    color: 'purple.500',
                    _hover: {
                      textDecoration: 'underline',
                      color: 'red',
                    },
                  }}
                  to="/auth/register"
                >
                  Зареєструйтесь
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
