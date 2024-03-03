import { CloseIcon, HamburgerIcon, MoonIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'
import { checkAuth, logout } from '../store/features/user/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useGetCountOfferQuery } from '../store/api/services/offer'

const Links = [
  { label: 'Головна', path: '/' },
  { label: 'Знайти кандидатів', path: 'candidates' },
]

export default function NavBar() {
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const { accessToken, role } = useAppSelector(checkAuth)
  const { data: countOffer } = useGetCountOfferQuery(null)
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <Box>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={useColorModeValue('purple.400', 'black.800')}
        >
          <IconButton
            ml={3}
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            color="purple.500"
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box ml={3}>
              <Image src="/images/search.svg" alt="logo" w={8} color="white" />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link, idx) => (
                <Link
                  as={RouterNavLink}
                  key={idx}
                  fontSize="17px"
                  color="white"
                  _activeLink={{
                    textDecoration: 'underline',
                  }}
                  to={link.path}
                >
                  {link.label}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <Text
                ml={3}
                fontSize="xs"
                mr={3}
                sx={{
                  backgroundColor: 'gray.700',
                  color: 'white',
                  p: 1,
                  borderRadius: 10,
                  fontWeight: 'bold',
                }}
              >
                {role === 'employer' ? 'Роботодавець' : 'Шукач'}
              </Text>
              {accessToken ? (
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  {<Avatar size={'sm'} />}
                </MenuButton>
              ) : (
                <Button as={RouterNavLink} to="/auth/login">
                  Войти
                </Button>
              )}
              <IconButton
                variant="oulined"
                icon={<MoonIcon />}
                aria-label="color mode"
                onClick={toggleColorMode}
              />
              <MenuList bg={useColorModeValue('white', 'black.600')}>
                <Link as={RouterNavLink} to="/auth/profile">
                  <MenuItem
                    bg={useColorModeValue('white', 'black.600')}
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('gray.100', 'black.500'),
                    }}
                  >
                    Особисті дані
                  </MenuItem>
                </Link>
                {role === 'employer' ? (
                  <Link as={RouterNavLink} to={'/response'}>
                    <MenuItem
                      bg={useColorModeValue('white', 'black.600')}
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.100', 'black.500'),
                      }}
                    >
                      <Text mr={3}>Відгуки на вакансії </Text>
                    </MenuItem>
                  </Link>
                ) : (
                  <Link as={RouterNavLink} to={'/response/user'}>
                    <MenuItem
                      bg={useColorModeValue('white', 'black.600')}
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.100', 'black.500'),
                      }}
                    >
                      <Text mr={3}>Мої відгуки </Text>
                    </MenuItem>
                  </Link>
                )}
                {role === 'user' && (
                  <Link as={RouterNavLink} to="/offers">
                    <MenuItem
                      bg={useColorModeValue('white', 'black.600')}
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.100', 'black.500'),
                      }}
                    >
                      <Text>
                        Пропозиції
                        <Badge ml="1" colorScheme="green" rounded={'xl'}>
                          {countOffer}
                        </Badge>
                      </Text>
                    </MenuItem>
                  </Link>
                )}
                {role === 'employer' && (
                  <Link as={RouterNavLink} to="/offers/company">
                    <MenuItem
                      bg={useColorModeValue('white', 'black.600')}
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.100', 'black.500'),
                      }}
                    >
                      <Text>Відправлені пропозиції</Text>
                    </MenuItem>
                  </Link>
                )}

                <Link as={RouterNavLink} to={`${role}/dashboard`}>
                  <MenuItem
                    bg={useColorModeValue('white', 'black.600')}
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('gray.100', 'black.500'),
                    }}
                  >
                    Управління
                  </MenuItem>
                </Link>

                <MenuDivider />
                <MenuItem
                  onClick={logoutHandler}
                  bg={useColorModeValue('white', 'black.600')}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.100', 'black.500'),
                  }}
                >
                  Вихід
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box display={{ md: 'none' }}>
            <Stack
              as={'nav'}
              spacing={4}
              bg={useColorModeValue('white', 'black.600')}
            >
              {Links.map((link, idx) => (
                <Link
                  key={idx}
                  as={RouterNavLink}
                  w="100%"
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.100', 'black.500'),
                  }}
                  to={link.path}
                  onClick={isOpen ? onClose : onOpen}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
