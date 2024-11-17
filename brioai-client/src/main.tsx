// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the import path is 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
