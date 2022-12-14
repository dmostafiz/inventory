import { ChakraProvider } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core'
import '../../styles/globals.css'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'light',
    }}
  >
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </MantineProvider>
}

export default MyApp
