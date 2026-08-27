/**
 * [C] CONTROLLER: useThemeController
 * Custom React hook for controlling theme mode (light/dark) and active layout tabs.
 */

import { useState, useMemo } from 'react';
import { createAppTheme } from '../theme/theme';

export function useThemeController() {
  const [mode, setMode] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'showcase'

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleThemeMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    mode,
    theme,
    activeTab,
    setActiveTab,
    toggleThemeMode
  };
}
