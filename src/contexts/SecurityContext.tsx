import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateNonce } from '../utils/scriptLoader';

interface SecurityContextType {
  nonce: string;
  refreshNonce: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nonce, setNonce] = useState<string>(generateNonce());

  const refreshNonce = () => {
    setNonce(generateNonce());
  };

  useEffect(() => {
    // Update meta tag with nonce
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = `script-src 'self' 'nonce-${nonce}' 'strict-dynamic';`;
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [nonce]);

  return (
    <SecurityContext.Provider value={{ nonce, refreshNonce }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}; 