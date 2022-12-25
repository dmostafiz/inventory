import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Input: {
      focusBorderColor: 'lime',
      _focus: {
        ring: '1px',
        ringColor: '#00B29E',
        borderColor: '#00B29E'
      },
    },

  },

  fonts: {
    heading: `'Open Sans', sans-serif`,
  },

})

export default theme