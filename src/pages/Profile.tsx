import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useProfileQuery } from '../store/api/services/user'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Profile: FC = () => {
  const navigate = useNavigate()
  const { data: profile } = useProfileQuery(undefined, {})

  return (
    <Stack>
      <Card
        maxW="md"
        margin="10px auto"
        width="70%"
        bg={useColorModeValue('white', 'black.600')}
      >
        <CardHeader>
          <VStack>
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={() =>
                navigate('/auth/profile/edit', {
                  state: profile,
                })
              }
            >
              Редактировать
            </Button>
            <Flex>
              <Text mr={1}>{profile?.name}</Text>
              <Text>{profile?.lastname}</Text>
            </Flex>
            <Text>{profile?.email}</Text>
            <Text>{profile?.phone}</Text>
            <Text>{profile?.role === 'user' ? 'Шукач' : 'Роботодавець'}</Text>
          </VStack>
        </CardHeader>
      </Card>
    </Stack>
  )
}
