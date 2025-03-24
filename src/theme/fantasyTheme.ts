import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, type StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const fantasyTheme = extendTheme({
  config,
  colors: {
    fantasy: {
      50: '#FFF5E6',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100',
    },
    parchment: {
      50: '#FFFBF0',
      100: '#FFF4D9',
      200: '#FFECC2',
      300: '#FFE4AB',
      400: '#FFDC94',
      500: '#FFD47D',
      600: '#FFCC66',
      700: '#FFC44F',
      800: '#FFBC38',
      900: '#FFB421',
    },
  },
  fonts: {
    heading: '"Cinzel", serif',
    body: '"Crimson Text", serif',
  },
  components: {
    Button: {
      variants: {
        fantasy: (props: StyleFunctionProps) => ({
          bg: mode('fantasy.100', 'fantasy.800')(props),
          color: mode('fantasy.800', 'fantasy.100')(props),
          _hover: {
            bg: mode('fantasy.200', 'fantasy.700')(props),
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: mode('fantasy.300', 'fantasy.600')(props),
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        }),
      },
    },
    Text: {
      variants: {
        scroll: {
          fontFamily: 'body',
          color: 'gray.800',
          lineHeight: 'tall',
          fontSize: 'lg',
        },
        rune: {
          fontFamily: 'heading',
          fontWeight: 'bold',
          letterSpacing: 'wide',
        },
      },
    },
    Box: {
      variants: {
        parchment: {
          bg: 'parchment.50',
          borderRadius: 'md',
          p: 4,
          boxShadow: 'sm',
        },
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
      },
    }),
  },
})

export default fantasyTheme 