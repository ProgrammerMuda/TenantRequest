/**
 * [V] VIEW COMPONENT: MobileHeader
 * Sleek native mobile app top bar with status bar, avatar, title, and theme toggle.
 */

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
  useTheme
} from '@mui/material';
import {
  ListChecks,
  Bell,
  Sun,
  Moon,
  WifiHigh,
  BatteryFull
} from '@phosphor-icons/react';

export function MobileHeader({ mode, onToggleTheme, pendingCount }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        sticky: 'top',
        top: 0,
        zIndex: 1100,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pt: 1,
        pb: 1.5,
        px: 2.5
      }}
    >
      {/* Native Mobile Status Bar Mockup */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
          color: theme.palette.text.secondary,
          fontSize: '0.72rem',
          fontWeight: 600
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
          09:41
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WifiHigh size={14} weight="bold" />
          <BatteryFull size={16} weight="bold" />
        </Box>
      </Box>

      {/* Main Mobile App Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand & App Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              backgroundColor: '#27b29b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(39, 178, 155, 0.35)'
            }}
          >
            <ListChecks size={24} weight="bold" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
              List Need Action
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
              Mobile MVC App
            </Typography>
          </Box>
        </Box>

        {/* Right Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '10px',
              p: 0.8
            }}
          >
            <Badge badgeContent={pendingCount} color="error" max={9}>
              <Bell size={18} />
            </Badge>
          </IconButton>

          <IconButton
            size="small"
            onClick={onToggleTheme}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '10px',
              p: 0.8,
              color: mode === 'dark' ? '#fbbf24' : '#64748b'
            }}
          >
            {mode === 'light' ? <Moon size={18} weight="fill" /> : <Sun size={18} weight="fill" />}
          </IconButton>

          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="User"
            sx={{ width: 34, height: 34, border: '2px solid #27b29b', ml: 0.5 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
