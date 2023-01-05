import { ChakraProvider } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core'
import '../../styles/globals.css'
import theme from '../theme'
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from '../Contexts/AuthContext';
import AppContextProvider from '../Contexts/AppContext';
import InvoiceContextProvider from '../Contexts/InvoiceContext';
import BusinessContextProvider from '../Contexts/BusinessContext';

const queryClient = new QueryClient()

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

      <NextNProgress
        color="#00776B"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppContextProvider>
            <InvoiceContextProvider>
              <BusinessContextProvider>
                <Component {...pageProps} />
              </BusinessContextProvider>
            </InvoiceContextProvider>
          </AppContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>

    </ChakraProvider>
  </MantineProvider>
}

export default MyApp
