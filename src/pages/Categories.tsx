import {
  Flex,
  HStack,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { countByCategory } from '../helpers/vacancyCounter'
import { useGetCategoryQuery } from '../store/api/services/category'
import { useGetAllVacancyQuery } from '../store/api/services/vacancy'
import { ICategory } from '../types/types'
import { FC } from 'react'
export const Categories: FC = () => {
  const { data: categories = [] } = useGetCategoryQuery(undefined, {})
  const { data: vacancies = [] } = useGetAllVacancyQuery(undefined, {})

  return (
    <Stack>
      <Flex
        bg={useColorModeValue('white', 'black.600')}
        m={10}
        p={10}
        rounded={'sm'}
        boxShadow={'lg'}
      >
        <UnorderedList width="100%" spacing={1}>
          {categories.map((category: ICategory) => (
            <ListItem key={category.id} color="purple.500">
              <HStack>
                <Link
                  as={RouterNavLink}
                  to={`/vacancy/category/${category.id}`}
                >
                  {category.name}{' '}
                </Link>
                <Text color="gray.400">
                  {' '}
                  {countByCategory(vacancies, category.id)}
                </Text>
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Stack>
  )
}
