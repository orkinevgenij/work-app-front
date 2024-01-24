import { useToast as chakraUseToast } from '@chakra-ui/react'

interface IToast {
  showToast: (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined,
  ) => void
}

export const useShowToast = (): IToast => {
  const toast = chakraUseToast()
  const showToast = (
    title: string,
    status?: 'info' | 'warning' | 'success' | 'error' | 'loading',
  ) => {
    toast({
      title: title,
      duration: 3000,
      isClosable: true,
      status: status,
      position: 'top',
    })
  }

  return { showToast }
}
