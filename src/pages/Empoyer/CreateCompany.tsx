import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {
  useCreateCompanyMutation,
  useGetMyCompanyQuery,
} from '../../store/api/services/company'
import { useShowToast } from '../../components/hooks/useShowToast'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { FC } from 'react'

interface IFormValues {
  title: string
  description: string
}
const validationSchema = Yup.object({
  title: Yup.string().required('Введіть назву компанії'),
  description: Yup.string().required('Введіть опис'),
})
export const CreateCompany: FC = () => {
  const navigate = useNavigate()
  const { data: company } = useGetMyCompanyQuery(undefined, {})
  console.log('🚀 ~ company:', company)
  const [create, { isLoading }] = useCreateCompanyMutation()
  const { showToast } = useShowToast()

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values: IFormValues) => {
      try {
        const result = await create(values).unwrap()
        if (result) {
          showToast('Компанія створена', 'success')
          navigate('/company/my')
        }
      } catch (error) {
        if (error) showToast('Не вдалось створити компанію', 'error')
      }
    },
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      as="form"
      onSubmit={handleSubmit}
    >
      {company ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <Text mb={5}> У вас вже є создана компанія</Text>
          <Button colorScheme="purple" as={RouterNavLink} to="/company/my">
            Моя компанія
          </Button>
        </Box>
      ) : (
        <Stack
          mt={10}
          spacing={5}
          width="50%"
          rounded={'lg'}
          boxShadow={'lg'}
          p={5}
          align="center"
          bg={useColorModeValue('white', 'black.600')}
        >
          <FormControl flexDirection="column">
            <FormLabel
              sx={{
                fontSize: '1xl',
                mb: 5,
              }}
            >
              Компанія
            </FormLabel>
            <Input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Назва компанії"
            />
          </FormControl>
          {touched.title && errors.title ? (
            <Text color="red">{errors.title}</Text>
          ) : null}
          <FormControl flexDirection="column">
            <FormLabel
              sx={{
                fontSize: '1xl',
                mb: 5,
              }}
            >
              Опис
            </FormLabel>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Опис"
            />
          </FormControl>
          {touched.description && errors.description ? (
            <Text color="red">{errors.description}</Text>
          ) : null}

          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Створення"
            type="submit"
            w="50%"
            maxW="xs"
            mt={5}
            colorScheme="purple"
          >
            Створити
          </Button>
        </Stack>
      )}
    </Box>
  )
}
