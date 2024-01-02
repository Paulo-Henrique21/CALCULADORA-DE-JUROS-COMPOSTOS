import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@/utils/Theme'
import '@fontsource/prompt/400.css'
import '@fontsource/prompt/700.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'bottom'} }}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}