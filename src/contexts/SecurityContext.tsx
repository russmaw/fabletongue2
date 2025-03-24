import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface SecurityContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const SecurityContext = createContext<SecurityContextType>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export const useSecurity = () => useContext(SecurityContext);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    toast({
      title: 'Login Successful',
      description: 'Welcome to FableTongue!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setIsAuthenticated(false);
    toast({
      title: 'Logged Out',
      description: 'Come back soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <SecurityContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </SecurityContext.Provider>
  );
}; 