// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // ← IMPORTAR
import './assets/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ← ENVOLVER APP CON EL PROVIDER */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);