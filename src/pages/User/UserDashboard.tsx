import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { useGetMyResumeQuery } from '../../store/api/services/resume'

export const UserDashboard: FC = () => {
  const [path, setPath] = useState<string>('')
  const { data: resumes = [] } = useGetMyResumeQuery(undefined, {})

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Alert isOpen={isOpen} onClose={onClose} path={path} resumes={resumes} />
      <Flex
        justify="center"
        alignItems="center"
        gap={10}
        minH="100vh"
        wrap="wrap"
      >
        <Box
          onClick={() => {
            onOpen(), setPath('/resume/create')
          }}
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
          <Icon as={BiCategory} boxSize={20} color="gray.500" />
          <Text>Створити резюме</Text>
        </Box>
        <Box
          onClick={() => {
            onOpen(), setPath('/resume/create/resume-file')
          }}
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
          <Icon as={BiCategory} boxSize={20} color="gray.500" />
          <Text>Резюме з файлу</Text>
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
          <NavLink to="/resume/resume-list">
            <Icon as={FaPlus} boxSize={20} color="gray.500" />
            <Text>Мої резюме</Text>
          </NavLink>
        </Box>
      </Flex>
    </>
  )
}
