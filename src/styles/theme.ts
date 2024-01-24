import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/poppins'

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}
const colors = {
  brand: {
    900: '#24fc9',
    800: '#146af5',
    700: '#2977f2',
    600: '#337df2',
    500: '#4287f5',
  },
  black: {
    800: '#1a1a1a',
    700: '#212121',
    600: '#292929',
    500: '#333333',
  },
}
const fonts = {
  // heading: `'Poppins', 'sans-serif'`,
  // body: `'Poppins', 'sans-serif'`,
}

const theme = extendTheme({ config, colors, fonts })

export default theme
