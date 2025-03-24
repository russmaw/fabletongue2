import React, { Suspense, lazy } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SecurityProvider } from './contexts/SecurityContext'
import { theme } from './theme'
import LoadingSpinner from './components/LoadingSpinner'
import RouteGuard from './components/RouteGuard'

// Lazy load components
const Tutorial = lazy(() => import('./components/Tutorial'))
const Story = lazy(() => import('./components/story/InteractiveStory'))
const Welcome = lazy(() => import('./components/onboarding/Welcome'))
const Home = lazy(() => import('./pages/Home'))

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SecurityProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/" element={<RouteGuard><Home /></RouteGuard>} />
                <Route path="/tutorial" element={<RouteGuard><Tutorial /></RouteGuard>} />
                <Route path="/story" element={<RouteGuard><Story /></RouteGuard>} />
              </Routes>
            </Suspense>
          </Router>
        </SecurityProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App 