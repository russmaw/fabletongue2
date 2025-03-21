import React, { Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import Welcome from './components/onboarding/Welcome'
import useOnboardingStore from './stores/onboardingStore'

// Lazy load pages
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

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/welcome" 
          element={<Welcome />} 
        />
        
        <Route
          path="/story"
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes 