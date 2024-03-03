import { Container, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { FC } from 'react'

export const RootLayout: FC = () => {
  return (
    <>
      <NavBar />
      <Container
        maxW="100vw"
        sx={{
          minHeight: '100vh',
          p: '0',
          backgroundColor: useColorModeValue('gray.100', 'black.700'),
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}
