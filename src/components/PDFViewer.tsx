import { Box, Link, Stack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

export const PDFViewer = ({ fileUrl }: { fileUrl: string }) => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
  }, [])
  return (
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
      <Text ml={5} fontSize="2xl" fontWeight="700">
        Завантажений файл
      </Text>
      <Box
        sx={{
          width: '100px',
          height: '150px',
          overflow: 'hidden',
          opacity: 0.8,
          ml: 5,
          border: '1px purple[400] solid',
        }}
        _hover={{
          border: '1px black solid',
          cursor: 'pointer',
        }}
        as={Link}
        href={fileUrl}
      >
        <Document file={fileUrl}>
          <Page pageNumber={1} width={100} height={100} />
        </Document>
      </Box>
      <Link p={5} href={fileUrl} fontSize="xl">
        Переглянути
      </Link>
    </Stack>
  )
}
