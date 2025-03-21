import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FantasyUIExample from './components/examples/FantasyUIExample';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FantasyUIExample />} />
    </Routes>
  );
};

export default AppRoutes; 