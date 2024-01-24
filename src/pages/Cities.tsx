import {
  Flex,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { countByCity } from '../helpers/vacancyCounter'
import { useGetCityQuery } from '../store/api/services/city'
import { useGetAllVacancyQuery } from '../store/api/services/vacancy'
import { ICity } from '../types/types'

export const Cities: FC = () => {
  const navigation = useNavigate()
  const { data: cities = [] } = useGetCityQuery(undefined, {})
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
          {cities.map((city: ICity) => (
            <ListItem key={city.id} color="purple.500">
              <HStack>
                <Text
                  // as={RouterNavLink}
                  cursor="pointer"
                  onClick={() =>
                    navigation(`/vacancy/city/${city.id}`, {
                      state: { city: city.name },
                    })
                  }
                >
                  {city.name}
                </Text>
                <Text color="gray.400"> {countByCity(vacancies, city.id)}</Text>
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Stack>
  )
}
