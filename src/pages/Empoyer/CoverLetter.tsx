import { Box, Text, VStack } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export const CoverLetter = () => {
  const { state } = useLocation()
  const { coverLetter } = state
  return (
    <VStack>
      <Box
        p={5}
        m={5}
        rounded={'lg'}
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'black.600')}
        minH="100vh"
        w="80%"
      >
        <Text fontSize="20px" textAlign="center">
          {coverLetter}
        </Text>
      </Box>
    </VStack>
  )
}
