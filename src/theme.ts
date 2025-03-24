import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
  },
  colors: {
    brand: {
      50: '#f5e9ff',
      100: '#dbc1ff',
      200: '#c198ff',
      300: '#a770ff',
      400: '#8d48ff',
      500: '#742fff',
      600: '#5a24cc',
      700: '#411a99',
      800: '#291066',
      900: '#120633',
    },
  },
});

export { theme }; 