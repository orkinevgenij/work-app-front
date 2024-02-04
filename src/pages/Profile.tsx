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
  useDisclosure,
} from '@chakra-ui/react'
import { useProfileQuery } from '../store/api/services/user'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalComponent } from '../components/ModalComponent'

export const Profile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  const { data: profile } = useProfileQuery(undefined, {})

  return (
    <>
      <ModalComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
                size="sm"
                colorScheme="purple"
                onClick={() =>
                  navigate('/auth/profile/edit', {
                    state: profile,
                  })
                }
              >
                Редагувати
              </Button>
              <Flex>
                <Text mr={1}>{profile?.name}</Text>
                <Text>{profile?.lastname}</Text>
              </Flex>
              <Text>{profile?.email}</Text>
              <Text>{profile?.phone}</Text>
              <Text>{profile?.role === 'user' ? 'Шукач' : 'Роботодавець'}</Text>
              <Button size="sm" colorScheme="purple" onClick={() => onOpen()}>
                Змінити пароль
              </Button>
            </VStack>
          </CardHeader>
        </Card>
      </Stack>
    </>
  )
}
