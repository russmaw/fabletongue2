import React, { Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import useOnboardingStore from './stores/onboardingStore'

// Lazy load all major components
const Welcome = React.lazy(() => import('./components/onboarding/Welcome'))
const Home = React.lazy(() => import('./pages/Home'))
const Story = React.lazy(() => import('./pages/Story'))
const Profile = React.lazy(() => import('./pages/Profile'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { hasCompletedTutorial } = useOnboardingStore()
  const location = useLocation()
  
  if (!hasCompletedTutorial && location.pathname !== '/welcome') {
    return <Navigate to="/welcome" replace state={{ from: location }} />
  }
  
  return <>{children}</>
}

// Wrap each route in its own Suspense boundary for better code splitting
const SuspenseRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
)

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SuspenseRoute>
              <Home />
            </SuspenseRoute>
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/welcome" 
        element={
          <SuspenseRoute>
            <Welcome />
          </SuspenseRoute>
        }
      />
      
      <Route
        path="/story"
        element={
          <ProtectedRoute>
            <SuspenseRoute>
              <Story />
            </SuspenseRoute>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <SuspenseRoute>
              <Profile />
            </SuspenseRoute>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <SuspenseRoute>
              <NotFound />
            </SuspenseRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes 