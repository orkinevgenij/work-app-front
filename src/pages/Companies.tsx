import {
  useColorModeValue,
  Flex,
  HStack,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { countByCompany } from '../helpers/vacancyCounter'
import { useGetCompanyQuery } from '../store/api/services/company'
import { useGetAllVacancyQuery } from '../store/api/services/vacancy'
import { ICompany } from '../types/types'

export const Companies: FC = () => {
  const { data: companies = [] } = useGetCompanyQuery(undefined, {})
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
          {companies.map((company: ICompany) => (
            <ListItem key={company.id} color="purple.500">
              <HStack>
                <Link as={RouterNavLink} to={`/vacancy/company/${company.id}`}>
                  {company.title}
                </Link>
                <Text color="gray.400">
                  {' '}
                  {countByCompany(vacancies, company.id)}
                </Text>
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Stack>
  )
}
