import { Flex, Heading, Stack } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowToast } from '../../components/hooks/useShowToast'
import { useGetCategoryQuery } from '../../store/api/services/category'
import { useGetCityQuery } from '../../store/api/services/city'
import {
  useGetOneVacancyQuery,
  useUpdateVacancyMutation,
} from '../../store/api/services/vacancy'
import { ICategory, ICity } from '../../types/types'

export const EditVacancy: FC = () => {
  const navigate = useNavigate()
  const { showToast } = useShowToast()
  const { id } = useParams()
  const [description, setDescription] = useState<string | undefined>('')
  const [title, setTitle] = useState<string | undefined>('')
  const [salary, setSalary] = useState<number | undefined>()
  const [category, setCategory] = useState<number | undefined>()
  const [city, setCity] = useState<number | undefined>()
  const { data: categories = [] } = useGetCategoryQuery(undefined, {})
  const { data: cities = [] } = useGetCityQuery(undefined, {})
  const { data: vacancy } = useGetOneVacancyQuery(id, {
    refetchOnMountOrArgChange: true,
  })

  const [update, { isLoading }] = useUpdateVacancyMutation()

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const data = {
      title,
      category,
      city,
      salary,
      description,
    }
    try {
      const result = await update({ data, id }).unwrap()
      if (result) {
        showToast('Успішно оновлена', 'success')
        navigate('/vacancies/my')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTitle(vacancy?.title)
    setDescription(vacancy?.description)
    setSalary(vacancy?.salary)
  }, [vacancy?.title, vacancy?.description, vacancy?.salary])

  return (
    <>
      <Heading textAlign="center" size="md" p={5}>
        Редагувати вакансію
      </Heading>
      <Flex as="form" onSubmit={onSubmit} justify="center">
        <Stack
          spacing={5}
          width="50%"
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
              Назва вакансії
            </FormLabel>
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Назва вакансії"
            />
          </FormControl>
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
              onChange={e => setCategory(+e.target.value)}
              placeholder="Додати категорію"
            >
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
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
              onChange={e => setCity(+e.target.value)}
              placeholder="Виберіть місто"
            >
              {cities.map((city: ICity) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Select>
          </FormControl>
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
              value={salary === undefined ? '' : salary}
              onChange={e => setSalary(+e.target.value)}
              placeholder="Заробітна плата"
            />
          </FormControl>
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
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Опис"
            />
          </FormControl>
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
            Оновити
          </Button>
        </Stack>
      </Flex>
    </>
  )
}
