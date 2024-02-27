import { FaFilePdf } from 'react-icons/fa6'
import { FaFileWord, FaFile } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'
export const getFileIcon = (fileType: string) => {
  if (fileType === 'application/pdf') {
    return <Icon as={FaFilePdf} color="red" />
  } else if (
    fileType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <Icon as={FaFileWord} color="blue.500" />
  } else {
    return <Icon as={FaFile} color="gray.600" />
  }
}
