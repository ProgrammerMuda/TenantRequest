/**
 * [V] VIEW COMPONENT: Header
 * Application navigation header using MUI, Montserrat font, Phosphor Icons,
 * and #27b29b primary color accents.
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Container,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  ListChecks,
  Sun,
  Moon,
  Plus,
  Palette,
  SquaresFour,
  Bell
} from '@phosphor-icons/react';

export function Header({ mode, onToggleTheme, activeTab, onSelectTab, onOpenNewAction, pendingCount }) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        backdropFilter: 'blur(8px)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
          {/* Logo & Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: { xs: 1, md: 0 } }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                backgroundColor: '#27b29b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(39, 178, 155, 0.35)',
                color: '#ffffff'
              }}
            >
              <ListChecks size={26} weight="bold" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                List Need Action
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                MVC Architecture • React + MUI
              </Typography>
            </Box>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 4, mr: 'auto' }}>
            <Button
              onClick={() => onSelectTab('dashboard')}
              startIcon={<SquaresFour size={20} weight={activeTab === 'dashboard' ? 'fill' : 'regular'} />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: '10px',
                fontWeight: 600,
                color: activeTab === 'dashboard' ? '#27b29b' : theme.palette.text.secondary,
                backgroundColor: activeTab === 'dashboard' ? 'rgba(39, 178, 155, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: activeTab === 'dashboard' ? 'rgba(39, 178, 155, 0.12)' : theme.palette.action.hover,
                }
              }}
            >
              Dashboard Action
              {pendingCount > 0 && (
                <Chip
                  label={pendingCount}
                  size="small"
                  sx={{
                    ml: 1,
                    height: 20,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    backgroundColor: '#27b29b',
                    color: '#ffffff'
                  }}
                />
              )}
            </Button>

            <Button
              onClick={() => onSelectTab('showcase')}
              startIcon={<Palette size={20} weight={activeTab === 'showcase' ? 'fill' : 'regular'} />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: '10px',
                fontWeight: 600,
                color: activeTab === 'showcase' ? '#27b29b' : theme.palette.text.secondary,
                backgroundColor: activeTab === 'showcase' ? 'rgba(39, 178, 155, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: activeTab === 'showcase' ? 'rgba(39, 178, 155, 0.12)' : theme.palette.action.hover,
                }
              }}
            >
              Theme & Preline Tokens
            </Button>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              disableElevation
              onClick={onOpenNewAction}
              startIcon={<Plus size={20} weight="bold" />}
              sx={{
                backgroundColor: '#27b29b',
                color: '#ffffff',
                fontWeight: 700,
                px: 2.5,
                py: 1,
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#1c8b78',
                }
              }}
            >
              Action Baru
            </Button>

            <Tooltip title="Notifikasi System">
              <IconButton
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '10px',
                  p: 1
                }}
              >
                <Bell size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
              <IconButton
                onClick={onToggleTheme}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '10px',
                  p: 1,
                  color: mode === 'dark' ? '#fbbf24' : '#64748b'
                }}
              >
                {mode === 'light' ? <Moon size={20} weight="fill" /> : <Sun size={20} weight="fill" />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
