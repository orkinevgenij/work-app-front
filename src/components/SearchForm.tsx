import { Box, Flex, Link, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchValue, setSearch } from '../store/features/search/searchSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { IVacancy } from '../types/types'
type Props = {
  vacancies?: IVacancy
}
export const SearchForm: FC<Props> = ({ vacancies }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const search = useAppSelector(searchValue)
  return (
    <Stack as="form">
      <FormControl
        bg={useColorModeValue('purple.400', 'black.700')}
        display="flex"
        flexDirection="column"
        height="max-content"
        p={5}
        mb={5}
      >
        <Box ml={3} bg="red" w="200px">
          Інфо для входу:
          <Text>Работодавець:</Text>
          <Text>login:admin@gmail.com</Text>
          <Text>password:12345678</Text>
          <br />
          <Text>Шукач:</Text>
          <Text>login:user@gmail.com</Text>
          <Text>password:12345678</Text>
        </Box>
        <FormLabel
          sx={{
            fontSize: '3xl',
            color: 'white',
            mb: 5,
          }}
        >
          Сайт пошуку роботи №1 в Україні
          <Text fontSize="md" opacity="0.8">
            Зараз у нас {vacancies?.meta?.totalItems} актуальних вакансій.
          </Text>
        </FormLabel>
        <InputGroup size="md">
          <Input
            bg="gray.100"
            color="gray"
            value={search}
            type="search"
            onChange={e => dispatch(setSearch(e.target.value))}
            placeholder="Посада"
            mb={5}
          />
          <InputRightElement width="9rem">
            <Button
              type="submit"
              onClick={() => navigate('vacancy/search')}
              colorScheme="pink"
            >
              Знайти вакансії
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText color="white" fontSize="md">
          Наприклад:
          <Flex gap={2}>
            <Link onClick={() => dispatch(setSearch('касир'))}>касир</Link>
            <Link onClick={() => dispatch(setSearch('продавець'))}>
              продавець
            </Link>
            <Text>або</Text>
            <Link onClick={() => dispatch(setSearch('водій'))}>водій</Link>
          </Flex>
        </FormHelperText>
      </FormControl>
    </Stack>
  )
}
