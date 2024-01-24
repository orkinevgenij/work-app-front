import {
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useShowToast } from '../../components/hooks/useShowToast.tsx'
import { useGetCategoryQuery } from '../../store/api/services/category.ts'
import { useGetCityQuery } from '../../store/api/services/city.ts'
import { useGetMyCompanyQuery } from '../../store/api/services/company.ts'
import { useCreateVacancyMutation } from '../../store/api/services/vacancy.ts'
import { ICategory, ICity } from '../../types/types.ts'
import { FC, useEffect } from 'react'

interface IFormValues {
  company?: number
  title: string
  description: string
  salary?: number
  category?: number
  city?: number
}
const validationSchema = Yup.object({
  title: Yup.string().required('Введіть назву вакансії'),
  description: Yup.string().required('Опишіть вакансію'),
  salary: Yup.number().required('Вкажіть зарплату'),
  category: Yup.number().required('Оберіть категорію'),
  city: Yup.number().required('Оберіть місто'),
})
export const CreateVacancy: FC = () => {
  const navigate = useNavigate()
  const { data: company } = useGetMyCompanyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: categories = [] } = useGetCategoryQuery(undefined, {})
  const { data: cities = [] } = useGetCityQuery(undefined, {})
  const [createVacancy, { isLoading }] = useCreateVacancyMutation()
  const { showToast } = useShowToast()

  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } =
    useFormik({
      initialValues: {
        company: company?.id,
        title: '',
        description: '',
        salary: undefined,
        category: undefined,
        city: undefined,
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        try {
          const result = await createVacancy(values).unwrap()
          if (result) {
            showToast('Вакансія створена', 'success')
            navigate('/vacancies/my')
          }
        } catch (error) {
          if (error) showToast('Не вдалось створити компанію', 'error')
        }
      },
    })
  useEffect(() => {
    setFieldValue('company', company?.id)
  }, [company?.id])
  return (
    <>
      <Heading textAlign="center" size="md" p={5}>
        Створення вакансії
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        display="flex"
        justifyContent="center"
      >
        <Stack
          spacing={5}
          width="70%"
          rounded={'lg'}
          p={5}
          align="center"
          boxShadow={'lg'}
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
            <Input type="text" value={company?.title} disabled />
          </FormControl>
          <FormControl flexDirection="column">
            <FormLabel
              sx={{
                fontSize: '1xl',
                mb: 5,
              }}
            >
              Назва вакансії
            </FormLabel>
            <Input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Назва вакансії"
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
              Категорія
            </FormLabel>
            <Select
              name="category"
              onChange={e => setFieldValue('category', +e.target.value)}
              value={values.category}
              placeholder="Оберіть категорію"
            >
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {touched.category && errors.category ? (
            <Text color="red">{errors.category}</Text>
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
            <Select
              name="city"
              value={values.city}
              onChange={e => setFieldValue('city', +e.target.value)}
              placeholder="Оберіть місто"
            >
              {cities.map((city: ICity) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
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
              Заробітна плата
            </FormLabel>
            <Input
              type="number"
              name="salary"
              value={values.salary}
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
