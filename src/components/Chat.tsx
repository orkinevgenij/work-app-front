import { Box, Divider, Stack, Text } from '@chakra-ui/layout'
import { FC } from 'react'
import { formatDate } from '../helpers/date.helper'
import { useProfileQuery } from '../store/api/services/user'
import { Message } from '../types/types'
type Props = {
  messages: Message[]
}
export const Chat: FC<Props> = ({ messages }) => {
  const { data: profile } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <>
      {messages.map((message: Message) => (
        <Stack maxW="100%" gap={3}>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="bold" pr={3}>
              {profile?.name === message.user.name ? 'Ви' : message.user.name}
            </Text>
            <Text color="gray.400">{formatDate(message.createdAt)}</Text>
          </Box>
          <Text
            color="gray"
            wordBreak="break-all"
            overflowWrap="break-word"
            whiteSpace="pre-wrap"
          >
            {message.message}
          </Text>
          <Divider />
        </Stack>
      ))}
    </>
  )
}
