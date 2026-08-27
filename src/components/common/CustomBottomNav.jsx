/**
 * [V] VIEW COMPONENT: CustomBottomNav
 * Custom mobile bottom navigation bar with centered floating QR scanner FAB button,
 * 4 bottom navigation tabs (Home, Chat, Notif, Profile), and #27b29b active color.
 */

import React from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Badge,
  useTheme
} from '@mui/material';
import {
  HouseLine,
  ChatCircleDots,
  Bell,
  UserCircle,
  QrCode
} from '@phosphor-icons/react';

export function CustomBottomNav({ activeTab, onSelectTab }) {
  const theme = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: HouseLine },
    { id: 'chat', label: 'Chat', icon: ChatCircleDots },
    { id: 'qr', isCenter: true },
    { id: 'notif', label: 'Notif', icon: Bell, hasBadge: true },
    { id: 'profile', label: 'Profile', icon: UserCircle }
  ];

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: 'transparent'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: '24px 24px 0 0',
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          px: 1.5,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'relative'
        }}
      >
        {navItems.map((item, index) => {
          if (item.isCenter) {
            return (
              <Box
                key="center-qr"
                sx={{
                  position: 'relative',
                  top: -24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60
                }}
              >
                <IconButton
                  onClick={() => onSelectTab('qr')}
                  sx={{
                    width: 58,
                    height: 58,
                    backgroundColor: '#27b29b',
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(39, 178, 155, 0.45)',
                    border: `4px solid ${theme.palette.background.paper}`,
                    '&:hover': {
                      backgroundColor: '#1c8b78',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <QrCode size={30} weight="bold" />
                </IconButton>
              </Box>
            );
          }

          const Icon = item.icon;
          const isSelected = activeTab === item.id;

          return (
            <Box
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.3,
                cursor: 'pointer',
                color: isSelected ? '#27b29b' : theme.palette.text.secondary,
                py: 0.5,
                px: 1.5,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  color: '#27b29b'
                }
              }}
            >
              {item.hasBadge ? (
                <Badge variant="dot" color="error">
                  <Icon size={24} weight={isSelected ? 'fill' : 'regular'} />
                </Badge>
              ) : (
                <Icon size={24} weight={isSelected ? 'fill' : 'regular'} />
              )}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: isSelected ? 800 : 500,
                  fontSize: '0.72rem',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
}
