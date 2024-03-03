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
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import {
  useCreateMessageMutation,
  useGetOfferMessagesQuery,
} from '../store/api/services/chat'
import { useGetOneOfferQuery } from '../store/api/services/offer'
import { useParams } from 'react-router-dom'
import { formatDate } from '../helpers/date.helper'
import { checkAuth } from '../store/features/user/authSlice'
import { useAppSelector } from '../store/hooks'
import { NavLink as RouterNavLink } from 'react-router-dom'

export const OfferDetail = () => {
  const { id } = useParams()
  const { role } = useAppSelector(checkAuth)
  const [message, setMessage] = useState<string>('')
  const { data: messages = [] } = useGetOfferMessagesQuery(id)
  const [create] = useCreateMessageMutation()
  const { data: offer } = useGetOneOfferQuery(id)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await create({
      offerId: offer.id,
      message,
      author:
        role === 'employer' ? offer.vacancy.company.title : offer.resume.name,
    })
    setMessage('')
  }
  return (
    <Container maxW="80%">
      <Grid templateColumns={{ base: '1fr ', md: '30% 70%' }} p={10}>
        <GridItem
          w="100%"
          textAlign={{ base: 'center', md: 'unset' }}
          order={{ base: 2, md: 1 }}
        >
          <Stack>
            <Text>{offer?.vacancy.company.title}</Text>
            <Text>
              <Link
                color="blue.600"
                as={RouterNavLink}
                to={`/resume/${offer?.resume.id}`}
              >
                {offer?.vacancy.title}
              </Link>
            </Text>
            <Text>{formatDate(offer?.vacancy.company.createdAt)}</Text>
          </Stack>
        </GridItem>
        <GridItem maxW="100%" order={{ base: 1, md: 2 }} pl={4}>
          <Stack maxW="100%">
            <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text fontWeight="bold">{offer?.vacancy.company.title}</Text>
                <Text>{formatDate(offer?.vacancy.createdAt)}</Text>
              </Box>
              <Text> {offer?.message}</Text>
            </Box>
            {messages.map((message: any) => (
              <Stack maxW="100%">
                <Box display="flex" justifyContent="space-between">
                  <Text fontWeight="bold">{message.author}</Text>
                  <Text>{formatDate(message.createdAt)}</Text>
                </Box>
                <Text
                  wordBreak="break-all"
                  overflowWrap="break-word"
                  whiteSpace="pre-wrap"
                >
                  {message.message}
                </Text>

                <Divider />
              </Stack>
            ))}

            <Box as="form" mt={10} onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Відповісти роботодавцю</FormLabel>
                <Textarea
                  required
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(e.target.value)
                  }
                  height="200px"
                  mb={5}
                />
              </FormControl>
              <Button type="submit" colorScheme="purple" mb={5}>
                Відповісти
              </Button>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  )
}
