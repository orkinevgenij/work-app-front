import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { Button, ButtonGroup, Icon, useColorModeValue } from '@chakra-ui/react'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../helpers/currency.helper'
import {
  useGetMyResumeQuery,
  useRemoveResumeMutation,
} from '../../store/api/services/resume'
import { useShowToast } from '../../components/hooks/useShowToast'
import { FC } from 'react'

export const MyResume: FC = () => {
  const { showToast } = useShowToast()
  const { data: resume } = useGetMyResumeQuery(undefined, {})
  const [remove] = useRemoveResumeMutation()

  const handleRemove = async (id: number) => {
    try {
      const result = await remove(id)
      if (result) {
        showToast('Резюме удалено', 'warning')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Flex
      align="center"
      direction="column"
      bg={useColorModeValue('gray.100', 'black.600')}
    >
      {resume ? (
        <>
          <ButtonGroup mt={5} colorScheme="purple" variant="outline">
            <Button
              size="md"
              as={RouterNavLink}
              to={`/resume/edit/${resume.id}`}
            >
              Редагувати
            </Button>
            <Button onClick={() => handleRemove(resume.id)} size="md">
              Видалити
            </Button>
          </ButtonGroup>
          <Stack
            bg={useColorModeValue('white', 'black.600')}
            rounded={'lg'}
            boxShadow={'lg'}
            mt={10}
            mb={5}
            p={5}
            w="80vw"
            h="40%"
            direction="column"
          >
            <Heading fontSize="xl" fontWeight="700">
              {resume.name} {resume.lastname}
            </Heading>
            <Flex gap={3}>
              <Text fontSize="xl">Місто:</Text>
              <Text fontSize="xl" fontWeight="700">
                {resume.city}
              </Text>
            </Flex>
            <Flex gap={3}>
              <Text fontSize="xl">Зарплатні очікування:</Text>
              <Text fontSize="xl" fontWeight="700">
                {formatCurrency.format(resume.salary)}
              </Text>
            </Flex>
          </Stack>
          <Stack
            bg={useColorModeValue('gray.100', 'black.500')}
            rounded={'lg'}
            boxShadow={'lg'}
            p={5}
            mb={5}
            w="80vw"
            h="20%"
          >
            <Flex gap={3}>
              <Icon
                aria-label="Call Sage"
                color="gray.400"
                fontSize="20px"
                as={FiPhone}
              />
              <Text fontSize="sm" fontWeight="700">
                {resume.phone}
              </Text>
            </Flex>
            <Flex gap={3}>
              <Icon
                aria-label="Call Sage"
                color="gray.400"
                fontSize="20px"
                as={MdOutlineEmail}
              />
              <Text fontSize="sm" fontWeight="700">
                {resume.email}
              </Text>
            </Flex>
          </Stack>
          <Stack
            bg={useColorModeValue('white', 'black.600')}
            rounded={'lg'}
            boxShadow={'lg'}
            p={5}
            mb={5}
            w="80vw"
            h="20%"
          >
            <Box
              display="flex"
              alignItems="center"
              gap={3}
              bg={useColorModeValue('white', 'black.600')}
            >
              <Text fontSize="2xl" fontWeight="400">
                Цель:
              </Text>
              <Text fontSize="2xl" fontWeight="700">
                {resume.position}
              </Text>
            </Box>
          </Stack>
          <Stack
            direction="column"
            bg={useColorModeValue('white', 'black.600')}
            rounded={'lg'}
            boxShadow={'lg'}
            mb={5}
            p={5}
            w="80vw"
            h="20%"
          >
            <Flex direction="column" gap={3}>
              <Heading fontSize="2xl" fontWeight="700">
                О себе
              </Heading>
              <Text fontSize="2xl">{resume.profile}</Text>
            </Flex>
          </Stack>
        </>
      ) : (
        <Box textAlign="center">
          <Text fontSize="xl" m={5}>
            У вас щє нема резюме
          </Text>
          <Button colorScheme="purple" as={RouterNavLink} to="/resume/create">
            Створити резюме?
          </Button>
        </Box>
      )}
    </Flex>
  )
}
