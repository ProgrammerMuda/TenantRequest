/**
 * [V] VIEW COMPONENT: GridMenu
 * 4x2 Shortcut Grid Menu rendering 8 operational menus using Phosphor Icons,
 * soft rounded cards, Montserrat typography, and #27b29b primary accents.
 */

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  Badge
} from '@mui/material';

export function GridMenu({ items, onClickMenu }) {
  const theme = useTheme();

  return (
    <Grid container spacing={1.5} sx={{ my: 1 }}>
      {items.map(item => {
        const Icon = item.icon;

        return (
          <Grid item xs={3} key={item.id}>
            <Paper
              elevation={0}
              onClick={() => onClickMenu(item)}
              sx={{
                p: 1.5,
                py: 2,
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#f1f5f9'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.2,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: 112,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(39, 178, 155, 0.15)',
                  borderColor: '#27b29b',
                  backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#ffffff'
                },
                '&:active': {
                  transform: 'scale(0.96)'
                }
              }}
            >
              {/* Phosphor Icon Container with Badge */}
              <Badge 
                badgeContent={item.badgeCount} 
                color="error" 
                sx={{ 
                  '& .MuiBadge-badge': { 
                    fontWeight: 800, 
                    right: 4, 
                    top: 4,
                    minWidth: 18,
                    height: 18,
                    fontSize: '0.65rem'
                  } 
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '14px',
                    backgroundColor: item.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    boxShadow: `0 4px 10px ${item.bgColor}`
                  }}
                >
                  <Icon size={24} weight="bold" />
                </Box>
              </Badge>

              {/* Title Label */}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.73rem',
                  lineHeight: 1.25,
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  color: theme.palette.text.primary,
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
