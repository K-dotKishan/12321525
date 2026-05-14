import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme.js';
import { NotificationProvider } from './store/NotificationStore.jsx';
import AppRouter from './router/AppRouter.jsx';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </ThemeProvider>
  );
}