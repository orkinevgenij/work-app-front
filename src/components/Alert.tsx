import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'
import { FC, useRef } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { IResume } from '../types/types'
type Props = {
  isOpen: boolean
  onClose: () => void
  path: string
  resumes: IResume[]
}
export const Alert: FC<Props> = ({ isOpen, onClose, path, resumes }) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Створити резюме?
          </AlertDialogHeader>
          <AlertDialogBody>
            {resumes.length > 0 && <Text>У вас вже є резюме:</Text>}
            {resumes?.map((resume: IResume) => (
              <Text
                key={resume.id}
              >{`«${resume.position}, ${resume.city}»`}</Text>
            ))}
          </AlertDialogBody>
          <AlertDialogFooter>
            {resumes.length < 3 ? (
              <Button
                colorScheme="purple"
                onClick={onClose}
                as={RouterNavLink}
                to={path}
              >
                Створити резюме
              </Button>
            ) : (
              <Button isDisabled>Максимум 3 резюме</Button>
            )}
            <Button
              ref={cancelRef}
              variant="outline"
              colorScheme="purple"
              onClick={onClose}
              ml={3}
            >
              Не створювати
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
