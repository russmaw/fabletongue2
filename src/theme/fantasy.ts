import { extendTheme } from '@chakra-ui/react'

const fantasyTheme = extendTheme({
  fonts: {
    heading: '"Cinzel", serif',
    body: '"Crimson Text", serif',
  },
  colors: {
    brand: {
      50: '#f7f2e9',
      100: '#e6d5c3',
      200: '#d4b89d',
      300: '#c29b77',
      400: '#b07e51',
      500: '#9d6238',
      600: '#7c4e2d',
      700: '#5b3a22',
      800: '#3a2616',
      900: '#19120b',
    },
    scroll: {
      50: '#fff9ed',
      100: '#ffefd4',
      200: '#ffe4ba',
      300: '#ffd9a1',
      400: '#ffce87',
      500: '#ffc36e',
      600: '#cc9c58',
      700: '#997542',
      800: '#664e2c',
      900: '#332716',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: '"Cinzel", serif',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
      variants: {
        solid: {
          bg: 'brand.600',
          color: 'scroll.50',
          _hover: {
            bg: 'brand.700',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'brand.800',
          },
        },
        outline: {
          borderWidth: '2px',
          borderColor: 'brand.600',
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderWidth: '2px',
          borderRadius: 'lg',
          overflow: 'hidden',
          boxShadow: 'xl',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: '"Cinzel", serif',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: '"Crimson Text", serif',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
    },
  },
})

export default fantasyTheme 