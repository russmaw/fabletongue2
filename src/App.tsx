import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './styles/theme'

// Pages
import Home from './pages/Home'
import Story from './pages/Story'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Components
import Navigation from './components/Navigation'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#F7FAFC' }}>
          <Navigation />
          <main style={{ padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story/:id" element={<Story />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ChakraProvider>
  )
}

export default App 