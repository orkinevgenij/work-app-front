import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FC } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useShowToast } from '../../components/hooks/useShowToast'
import { useForgotPasswordMutation } from '../../store/api/services/user'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введіть вірний E-mail')
    .required("E-mail обов'язковий"),
})
export const ForgotPassword: FC = () => {
  const { showToast } = useShowToast()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const result = await forgotPassword({ email: values.email }).unwrap()
        if (result) {
          showToast('Вам відправлено новий пароль', 'success')
        }
      } catch (error) {
        if (error) {
          showToast('Такий користувач не зареєстрований', 'error')
        }
      }
    },
  })

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
      <Stack spacing={8} mx={'auto'} maxW={'lg'}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Відновлення пароля</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          bg={useColorModeValue('white', 'black.600')}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Ел. пошта</FormLabel>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </FormControl>
            {touched.email && errors.email ? (
              <Text color="red">{errors.email}</Text>
            ) : null}
            <Stack>
              <Button
                type="submit"
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText="Відправлення"
                size="lg"
                bg={'purple.400'}
                color={'white'}
                mb={3}
                _hover={{
                  bg: 'purple.500',
                }}
              >
                Отримати тимчасовий пароль
              </Button>
              <Text
                sx={{
                  color: 'purple.500',
                  _hover: {
                    textDecoration: 'underline',
                    color: 'red',
                  },
                }}
                align="center"
                as={RouterNavLink}
                to="/auth/login"
              >
                Я згадав(ла) свій пароль
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
