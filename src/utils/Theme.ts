// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: `'Prompt', sans-serif`
      },
      h2: {
        fontFamily: `'Prompt', sans-serif`
      }
    }
  },
  components: {
    Toast: {
      fontWeight: 400
    }
  }
})
export default theme