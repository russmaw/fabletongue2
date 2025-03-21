import React, { Suspense } from 'react'
import { ChakraProvider, Box, Spinner } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import fantasyTheme from './theme/fantasyTheme'
import AppRoutes from './routes'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} textAlign="center">
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </Box>
      )
    }

    return this.props.children
  }
}

// Load fonts using preconnect and preload
const Fonts = () => (
  <>
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
      crossOrigin="anonymous"
    />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap"
      rel="stylesheet"
      crossOrigin="anonymous"
    />
  </>
)

const LoadingSpinner = () => (
  <Box
    height="100vh"
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
)

function App() {
  return (
    <ErrorBoundary>
      <ChakraProvider theme={fantasyTheme}>
        <Fonts />
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App 