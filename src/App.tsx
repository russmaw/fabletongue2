import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import fantasyTheme from './theme/fantasyTheme'
import AppRoutes from './routes'

// Add Google Fonts for fantasy theme
const Fonts = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap"
    rel="stylesheet"
  />
)

function App() {
  return (
    <ChakraProvider theme={fantasyTheme}>
      <Fonts />
      <Router>
        <AppRoutes />
      </Router>
    </ChakraProvider>
  )
}

export default App 