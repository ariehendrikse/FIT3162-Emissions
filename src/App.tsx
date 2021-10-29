import React from 'react';
import logo from './logo.svg';
import './App.css';
import  AuthPage from './packages/frontend/components/site-wide/AuthPage';
import { AuthProvider } from './packages/frontend/components/site-wide/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  );
}

export default App;