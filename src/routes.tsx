import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import Welcome from './components/onboarding/Welcome'
import useOnboardingStore from './stores/onboardingStore'

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'))
const Story = React.lazy(() => import('./pages/Story'))
const Profile = React.lazy(() => import('./pages/Profile'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasCompletedTutorial } = useOnboardingStore()
  
  if (!hasCompletedTutorial) {
    return <Navigate to="/welcome" replace />
  }
  
  return <>{children}</>
}

const AppRoutes = () => {
  const { hasCompletedTutorial } = useOnboardingStore()
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/"
          element={
            hasCompletedTutorial ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />
        <Route path="/welcome" element={<Welcome />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

    <Routes>
      <Route path="/" element={<FantasyUIExample />} />
    </Routes>
  );
};

export default AppRoutes; 