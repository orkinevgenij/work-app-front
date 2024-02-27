import { Box, Flex, Text } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/react'
import { FC } from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaCity, FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export const EmployerDashboard: FC = () => {
  return (
    <>
      <Flex
        justify="center"
        alignItems="center"
        gap={10}
        minH="100vh"
        wrap="wrap"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            color: 'purple.500',
            textAlign: 'center',
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          w="150px"
          h="100px"
          display="flex"
          alignItems="center"
        >
          <NavLink to="/company/create">
            <Icon as={BiCategory} boxSize={20} color="gray.500" />
            <Text>Додати компанію</Text>
          </NavLink>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            color: 'purple.500',
            textAlign: 'center',
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          w="150px"
          h="100px"
          display="flex"
          alignItems="center"
        >
          <NavLink to="/vacancy/create">
            <Icon as={FaPlus} boxSize={20} color="gray.500" />
            <Text>Додати вакансію</Text>
          </NavLink>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            color: 'purple.500',
            textAlign: 'center',
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          w="150px"
          h="100px"
          display="flex"
          alignItems="center"
        >
          <NavLink to="/company/my">
            <Icon as={FaCity} color="gray.500" boxSize={16} />
            <Text>Моя компанія</Text>
          </NavLink>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            color: 'purple.500',
            textAlign: 'center',
            _hover: {
              textDecoration: 'underline',
              color: 'purple.500',
            },
          }}
          w="150px"
          h="100px"
          display="flex"
          alignItems="center"
        >
          <NavLink to="/vacancies/my">
            <Icon as={FaCity} color="gray.500" boxSize={16} />
            <Text>Мої вакансії</Text>
          </NavLink>
        </Box>
      </Flex>
    </>
  )
}
