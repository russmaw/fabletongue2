import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useSecurity } from '../contexts/SecurityContext';
import { useTutorialStore } from '../stores/tutorialStore';
import LoadingSpinner from './LoadingSpinner';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { isAuthenticated } = useSecurity();
  const { isCompleted } = useTutorialStore();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to access this page.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isAuthenticated, toast]);

  if (isAuthenticated === undefined) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  // If user is authenticated but hasn't completed tutorial and tries to access story
  if (!isCompleted && location.pathname === '/story') {
    toast({
      title: 'Complete Tutorial First',
      description: 'Please complete the tutorial before starting your story.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/tutorial" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard; 