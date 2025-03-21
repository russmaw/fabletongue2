import React, { Suspense } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import Navigation from './components/Navigation'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'))
const Story = React.lazy(() => import('./pages/Story'))
const Profile = React.lazy(() => import('./pages/Profile'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navigation />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ChakraProvider>
  )
}

export default App 