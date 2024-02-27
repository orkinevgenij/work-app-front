import { Flex, Text } from '@chakra-ui/layout'

export const EmptyDataMessage = ({ text }: { text: string }) => {
  return (
    <Flex justify="center" align="center" height="100vh">
      <Text>{text}&#128546;</Text>
    </Flex>
  )
}
