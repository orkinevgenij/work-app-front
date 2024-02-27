import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiEye } from 'react-icons/fi'
import { IoArrowBack } from 'react-icons/io5'
import { MdCorporateFare } from 'react-icons/md'
import { PiCurrencyDollarSimpleFill } from 'react-icons/pi'
import { NavLink as RouterNavLink, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { ResponseForm } from '../components/ResponseForm'
import { SimilarVacancies } from '../components/SimilarVacancies'
import { formatCurrency } from '../helpers/currency.helper'
import { formatDate } from '../helpers/date.helper'
import {
  useGetOneVacancyQuery,
  useGetSimilarVacancyQuery,
} from '../store/api/services/vacancy'

export const VacancyDetail: FC = () => {
  const { id } = useParams()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const { data: vacancy, isLoading } = useGetOneVacancyQuery(id, {})
  const { data: similarVacancies = [] } = useGetSimilarVacancyQuery(
    {
      companyId: vacancy?.category.id,
      vacancyId: vacancy?.id,
    },
    {
      skip: vacancy ? false : true,
    },
  )

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <Flex direction="column" align="center">
        <Card
          variant="elevated"
          minHeight="80vh"
          w="80vw"
          mt={10}
          bg={useColorModeValue('white', 'black.600')}
        >
          <Flex p={5}>
            <IconButton
              fontSize="xl"
              aria-label="Search database"
              icon={<IoArrowBack />}
              as={RouterNavLink}
              to="/"
              color="purple.500"
            />
            <Button
              ml={5}
              onClick={() => setIsVisible(true)}
              bg="purple.400"
              color="white"
              _hover={{
                bg: 'purple.500',
              }}
            >
              Відгукнутися
            </Button>

            <Menu>
              <MenuButton as={Button} ml="auto" rightIcon={<ChevronDownIcon />}>
                Щє
              </MenuButton>
              <MenuList bg={useColorModeValue('white', 'black.600')}>
                <MenuItem onClick={() => window.print()}>Друк</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Divider color="gray.300" />
          <CardBody>
            <Stack display="flex" mb={10}>
              <HStack>
                <Icon color="gray.400" boxSize={4} as={FaEdit} />
                <Text color="gray" size={'md'}>
                  Вакансія опублікована {formatDate(vacancy?.createdAt || '')}
                </Text>
              </HStack>
              <HStack>
                <Icon color="gray.400" boxSize={4} as={FiEye} />
                <Text fontSize="md" color="gray">
                  {vacancy?.views} перегляди
                </Text>
              </HStack>
              <Heading size="xl" fontWeight="600" mb={5}>
                {vacancy?.title}
              </Heading>

              <HStack>
                <Icon
                  color="gray.400"
                  boxSize={5}
                  as={PiCurrencyDollarSimpleFill}
                />
                <Text fontSize="md" fontWeight="bold">
                  {formatCurrency.format(vacancy?.salary)}
                </Text>
              </HStack>
              <HStack>
                <Icon color="gray.400" boxSize={5} as={MdCorporateFare} />
                <Text fontSize="xl" fontWeight="bold" color="purple.500">
                  {vacancy?.company.title}
                </Text>
              </HStack>
              <HStack>
                <Icon color="gray.400" boxSize={5} as={FaLocationDot} />
                <Text fontSize="xl">{vacancy?.city?.name}</Text>
              </HStack>
              <Heading size="md">Опис вакансії</Heading>
              <Text noOfLines={3} fontSize="xl">
                {vacancy?.description}
              </Text>
            </Stack>
          </CardBody>
        </Card>
        {isVisible && <ResponseForm vacancy={vacancy} isVisible={isVisible} />}
      </Flex>
      <Flex direction="column" align="center" p={10}>
        <Heading size="xl" fontWeight="500" mb={5}>
          Схожі вакансії
        </Heading>
        <SimilarVacancies similarVacancies={similarVacancies} />
      </Flex>
    </>
  )
}
