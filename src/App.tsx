import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConnectionStatus />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;