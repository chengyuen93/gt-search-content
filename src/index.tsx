import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './router/Router';
import './index.css';
import { AuthProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
