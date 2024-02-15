import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import { useChangePasswordMutation } from '../store/api/services/user'
import { useShowToast } from './hooks/useShowToast'
interface ErrorResponse {
  data: {
    error: string
    message: string
  }
  status: number
}
interface IFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Введіть ваш пароль')
    .min(6, 'Пароль не менше 6 символів'),
  newPassword: Yup.string()
    .required('Введіть ваш пароль')
    .min(6, 'Пароль не менше 6 символів'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Паролі повинні збігатися')
    .required('Введіть ваш пароль'),
})
type Props = {
  isOpen: boolean
  onClose: () => void
}
export const ModalComponent: FC<Props> = ({ isOpen, onClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [changePassword] = useChangePasswordMutation()
  const { showToast } = useShowToast()

  const { handleSubmit, handleChange, resetForm, values, touched, errors } =
    useFormik({
      initialValues: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: async (values: IFormValues) => {
        try {
          const result = await changePassword({
            password: values.currentPassword,
            newPassword: values.newPassword,
          }).unwrap()
          onClose()
          resetForm()
          if (result) {
            showToast('Пароль успішно змінено', 'success')
          }
        } catch (error: unknown) {
          const customError = error as ErrorResponse
          const errorMessage =
            customError && customError.data
              ? customError.data.message
              : 'An error occurred'
          showToast(errorMessage, 'error')
        }
      },
    })
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Box as="form" onSubmit={handleSubmit}>
          <ModalContent bg={useColorModeValue('white', 'black.600')}>
            <ModalHeader>Зміна пароля</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="currentPassword">
                <FormLabel>Поточний або тимчасовий пароль</FormLabel>
                <InputGroup>
                  <Input
                    name="currentPassword"
                    onChange={handleChange}
                    value={values.currentPassword}
                    type={showCurrentPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowCurrentPassword(
                          showCurrentPassword => !showCurrentPassword,
                        )
                      }
                    >
                      {showCurrentPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {touched.currentPassword && errors.currentPassword ? (
                <Text color="red">{errors.currentPassword}</Text>
              ) : null}
              <FormControl id="newPassword">
                <FormLabel>Новий пароль</FormLabel>
                <InputGroup>
                  <Input
                    name="newPassword"
                    onChange={handleChange}
                    value={values.newPassword}
                    type={showNewPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowNewPassword(showNewPassword => !showNewPassword)
                      }
                    >
                      {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {touched.newPassword && errors.newPassword ? (
                <Text color="red">{errors.newPassword}</Text>
              ) : null}
              <FormControl id="confirmPassword">
                <FormLabel>Новий пароль ще раз</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowConfirmPassword(
                          showConfirmPassword => !showConfirmPassword,
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {touched.confirmPassword && errors.confirmPassword ? (
                <Text color="red">{errors.confirmPassword}</Text>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={onClose}>
                Скасувати
              </Button>
              <Button type="submit" variant="ghost">
                Зберегти
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}
