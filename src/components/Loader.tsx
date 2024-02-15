import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'

export const Loader = () => {
  return (
    <Flex justify="center" align="center" height="100vh">
      <Spinner color="purple.500" />
    </Flex>
  )
}
