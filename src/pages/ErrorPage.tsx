import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorPage: FC = () => {
  const navigate = useNavigate()
  return (
    <Flex direction="column" justify="center" align="center" minH="100vh">
      <Image
        src="./icons/not-found.svg"
        alt="not found"
        w="80px"
        h="auto"
        color="red"
      />
      <Text mb={5} fontSize="xx-large">
        Not Found 😞
      </Text>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="red"
        onClick={() => navigate('/')}
      >
        Повернутись
      </Button>
    </Flex>
  )
}
