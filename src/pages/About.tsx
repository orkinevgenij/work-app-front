import { Box, Heading } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

export const About: FC = () => {
  return (
    <Box
      pt={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box textAlign="center">
        <Heading size="md" fontWeight="none" textAlign="center" mb={3}>
          Сайт пошуку роботи. Допомогаемо в пошуку роботи.
        </Heading>
        <Button colorScheme="purple" as={RouterNavLink} to="/">
          Перейти до вакансій
        </Button>
      </Box>
    </Box>
  )
}
