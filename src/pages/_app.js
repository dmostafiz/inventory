import { ChakraProvider } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }) {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'light',
    }}
  >
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </MantineProvider>
}

export default MyApp
