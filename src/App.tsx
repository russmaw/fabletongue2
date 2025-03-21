import React, { Suspense } from 'react'
import { ChakraProvider, Box, Spinner, Text } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import fantasyTheme from './theme/fantasyTheme'
import AppRoutes from './routes'
import { SecurityProvider } from './contexts/SecurityContext'

// Fonts Component
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

// Error Boundary Component
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
        <Box p={4} textAlign="center">
          <Text fontSize="xl" color="red.500">
            Something went wrong. Please refresh the page.
          </Text>
        </Box>
      )
    }

    return this.props.children
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minH="100vh"
    bg="gray.50"
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
        <SecurityProvider>
          <Fonts />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </SecurityProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App 