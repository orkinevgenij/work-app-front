import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
} from '@chakra-ui/layout'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { NavLink as RouterNavLink, useParams } from 'react-router-dom'
import { Chat } from '../components/Chat'
import { formatDate } from '../helpers/date.helper'
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../store/api/services/chat'
import {
  useChangeStatusResponseMutation,
  useGetOneResponseQuery,
} from '../store/api/services/response'
import { useProfileQuery } from '../store/api/services/user'
import { checkAuth } from '../store/features/user/authSlice'
import { useAppSelector } from '../store/hooks'
import { Loader } from '../components/Loader'

export const ResponseDetail = () => {
  const { id } = useParams()
  const { role } = useAppSelector(checkAuth)
  const [message, setMessage] = useState<string>('')
  const { data: profile } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: messages = [], isLoading: isLoadingMessage } =
    useGetMessagesQuery(id)
  const { data: response, isLoading: isLoadingResponse } =
    useGetOneResponseQuery(id)
  const [createMessage, { isLoading }] = useCreateMessageMutation()
  const [changeStatusResponse] = useChangeStatusResponseMutation()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createMessage({
      responseId: response?.id,
      message,
    })
    setMessage('')
  }
  if (isLoadingResponse && isLoadingMessage) {
    return <Loader />
  }
  const handleChangeStatusResponse = async () => {
    await changeStatusResponse({
      id: response?.id,
      status: 'Відмова',
    })
  }
  return (
    <Container maxW={{ base: '100%', sm: '100%', md: '80%' }}>
      <Grid templateColumns={{ base: '1fr ', md: '30% 70%' }} p={6} gap={4}>
        <GridItem
          bg={useColorModeValue('white', 'black.500')}
          rounded={'lg'}
          boxShadow={'lg'}
          w="100%"
          textAlign={{ base: 'center', md: 'unset' }}
          order={{ base: 2, md: 1 }}
          p={5}
        >
          <Stack>
            <Box p={3} rounded={'lg'} boxShadow={'md'}>
              <Text fontSize="xl" color="gray">
                Компанія
              </Text>
              <Text fontWeight="bold">{response?.vacancy?.company.title}</Text>
            </Box>

            <Box p={3} rounded={'lg'} boxShadow={'lg'}>
              <Text fontSize="xl" color="gray">
                Вакансія
              </Text>
              <Text>
                <Link
                  fontWeight="bold"
                  color={useColorModeValue('purple', 'white')}
                  as={RouterNavLink}
                  to={`/vacancy/${response?.vacancy?.id}`}
                >
                  {response?.vacancy?.title}
                </Link>
              </Text>
            </Box>

            <Box p={3} rounded={'lg'} boxShadow={'lg'}>
              <Text fontSize="xl" color="gray">
                Резюме шукача
              </Text>
              <Text>
                <Link
                  fontWeight="bold"
                  color={useColorModeValue('purple', 'white')}
                  as={RouterNavLink}
                  to={`/resume/${response?.resume?.id}`}
                >
                  {response?.resume?.position}
                </Link>
              </Text>
            </Box>
          </Stack>
        </GridItem>
        <GridItem
          rounded={'lg'}
          boxShadow={'lg'}
          p={5}
          bg={useColorModeValue('white', 'black.500')}
          maxW="100%"
          order={{ base: 1, md: 2 }}
          pl={4}
        >
          <Stack maxW="100%">
            <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text fontWeight="bold">
                  {profile?.name === response?.user?.name
                    ? 'Ви'
                    : response?.user?.name}
                </Text>
                <Text color="gray.400">
                  {formatDate(response?.vacancy.createdAt)}
                </Text>
              </Box>
              <Text color="gray" mb={3} whiteSpace="pre-wrap">
                {response?.message}
              </Text>
              {response?.user.role === 'user' && response.resume.file ? (
                <Box mb={3}>
                  <Text>
                    <Link
                      fontWeight="bold"
                      color="purple"
                      href={response?.resume?.file?.url}
                      download
                    >
                      Резюме
                    </Link>
                  </Text>
                  <Text fontWeight="bold">
                    Вакансія:{' '}
                    <Link
                      color="purple"
                      as={RouterNavLink}
                      to={`/vacancy/${response?.vacancy?.id}`}
                    >
                      {response?.vacancy?.title}
                    </Link>
                  </Text>
                </Box>
              ) : null}
            </Box>
            <Divider />
            <Chat messages={messages} />
            {response?.status && (
              <Box
                mt={5}
                mb={5}
                p="10px"
                rounded={'lg'}
                boxShadow={'lg'}
                bg="purple.100"
                border="1px purple solid"
              >
                <Text textAlign="center" color="gray">
                  {response?.status}
                </Text>
              </Box>
            )}

            <Box as="form" mt={10} onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>
                  {role === 'user'
                    ? 'Відповісти роботодавцю'
                    : 'Відповісти шукачу'}
                </FormLabel>
                <Textarea
                  required
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(e.target.value)
                  }
                  h="600px"
                  mb={5}
                />
              </FormControl>
              <ButtonGroup>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="purple"
                >
                  Відповісти
                </Button>
                {role === 'employer' && (
                  <Button
                    colorScheme="red"
                    onClick={handleChangeStatusResponse}
                  >
                    Відмовити
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  )
}
