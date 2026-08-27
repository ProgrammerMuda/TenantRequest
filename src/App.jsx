/**
 * App.jsx Entry Point
 * Orchestrates MVC Controllers (useThemeController & useHomeController),
 * injects MUI ThemeProvider & CssBaseline, and passes controller instances to DashboardView.
 */

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeController } from './controllers/useThemeController';
import { useHomeController } from './controllers/useHomeController';
import { DashboardView } from './views/DashboardView';

export default function App() {
  const themeController = useThemeController();
  const homeController = useHomeController();

  return (
    <ThemeProvider theme={themeController.theme}>
      <CssBaseline />
      <DashboardView
        homeController={homeController}
        themeController={themeController}
      />
    </ThemeProvider>
  );
}
