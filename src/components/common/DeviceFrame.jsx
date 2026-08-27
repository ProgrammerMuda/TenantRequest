/**
 * [V] VIEW COMPONENT: DeviceFrame
 * Mobile device frame wrapper providing a native phone interface layout.
 */

import React from 'react';
import { Box, useTheme } from '@mui/material';

export function DeviceFrame({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh', // strictly 100vh to prevent page scroll
        maxHeight: '100vh',
        overflow: 'hidden', // prevent any scrolling outside the frame
        backgroundColor: theme.palette.mode === 'dark' ? '#090d16' : '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 0, sm: 3 },
        px: { xs: 0, sm: 2 }
      }}
    >
      {/* Phone Device Viewport Container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          height: '100%', // use available height safely
          maxHeight: { xs: '100%', sm: 900 }, // never exceed the screen
          borderRadius: { xs: 0, sm: '48px' },
          border: { xs: 'none', sm: `12px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#0f172a'}` },
          boxShadow: { xs: 'none', sm: '0 25px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' },
          backgroundColor: theme.palette.background.default,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
