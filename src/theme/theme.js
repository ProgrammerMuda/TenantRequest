import { createTheme } from '@mui/material/styles';

// Preline.co Inspired Color Palette Design Tokens
export const prelineColors = {
  primary: {
    main: '#27b29b',
    light: '#54cbb6',
    dark: '#1c8b78',
    contrastText: '#ffffff',
    bgSubtle: 'rgba(39, 178, 155, 0.08)',
    border: 'rgba(39, 178, 155, 0.25)',
  },
  secondary: {
    main: '#6366f1', // Preline Indigo
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
    bgSubtle: 'rgba(99, 102, 241, 0.08)',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    main: '#10b981', // Preline Emerald
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
    bgSubtle: 'rgba(16, 185, 129, 0.1)',
  },
  warning: {
    main: '#f59e0b', // Preline Amber
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#ffffff',
    bgSubtle: 'rgba(245, 158, 11, 0.1)',
  },
  error: {
    main: '#f43f5e', // Preline Rose
    light: '#fb7185',
    dark: '#e11d48',
    contrastText: '#ffffff',
    bgSubtle: 'rgba(244, 63, 94, 0.1)',
  },
  info: {
    main: '#06b6d4', // Preline Cyan
    light: '#22d3ee',
    dark: '#0891b2',
    contrastText: '#ffffff',
    bgSubtle: 'rgba(6, 182, 212, 0.1)',
  }
};

export const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: prelineColors.primary,
      secondary: prelineColors.secondary,
      success: prelineColors.success,
      warning: prelineColors.warning,
      error: prelineColors.error,
      info: prelineColors.info,
      background: {
        default: isDark ? '#0b1120' : '#f8fafc',
        paper: isDark ? '#1e293b' : '#ffffff',
        subtle: isDark ? '#111827' : '#f1f5f9',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#64748b',
        disabled: isDark ? '#64748b' : '#94a3b8',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      h1: { fontWeight: 800, letterSpacing: '-0.025em' },
      h2: { fontWeight: 700, letterSpacing: '-0.025em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontWeight: 600, letterSpacing: '-0.015em' },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500, fontSize: '0.875rem' },
      body1: { fontWeight: 400, lineHeight: 1.6 },
      body2: { fontWeight: 400, lineHeight: 1.5, fontSize: '0.875rem' },
      button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "'Montserrat', sans-serif",
            backgroundColor: isDark ? '#0b1120' : '#f8fafc',
            color: isDark ? '#f8fafc' : '#0f172a',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 18px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(39, 178, 155, 0.25)',
            },
          },
          containedPrimary: {
            backgroundColor: '#27b29b',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1c8b78',
            },
          },
          outlinedPrimary: {
            borderColor: '#27b29b',
            color: '#27b29b',
            '&:hover': {
              borderColor: '#1c8b78',
              backgroundColor: 'rgba(39, 178, 155, 0.06)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.4)'
              : '0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8,
            fontFamily: "'Montserrat', sans-serif",
          },
        },
      },
    },
  });
};

export default createAppTheme();
