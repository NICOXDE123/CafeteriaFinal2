// frontend/src/main.jsx
import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';         // Base Vite
import './assets/styles.css'; // Tus estilos globales

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
