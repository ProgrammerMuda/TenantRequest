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
    <Box sx={{ width: '100%', m: 0 }}>
      <Grid container spacing={1.5}>
        {items.map(item => {
        const Icon = item.icon;

        return (
          <Grid item xs={3} key={item.id}>
            <Paper
              elevation={0}
              onClick={() => onClickMenu(item)}
              sx={{
                p: 1.2,
                py: 1.8,
                borderRadius: '8px',
                backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc', // Slate-50
                border: 'none',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: 108,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#f1f5f9', // Slate-100 on hover
                  boxShadow: 'none'
                },
                '&:active': {
                  transform: 'scale(0.97)'
                }
              }}
            >
              {/* Icon Container with Badge placed directly on top-right */}
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {item.imageIcon ? (
                  <Box
                    component="img"
                    src={item.imageIcon}
                    alt={item.title?.replace('\n', ' ')}
                    sx={{
                      width: item.id === 'fit_out_permit' ? 56 : 52,
                      height: item.id === 'fit_out_permit' ? 56 : 52,
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.14))',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.06)'
                      }
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '10px',
                      backgroundColor: item.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      boxShadow: `0 2px 8px ${item.bgColor}`
                    }}
                  >
                    <Icon size={26} weight="bold" />
                  </Box>
                )}

                {/* Badge Count pinned directly on top-right corner of the icon */}
                {Boolean(item.badgeCount) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      minWidth: 18,
                      height: 18,
                      borderRadius: '9px',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      fontFamily: "'Montserrat', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 0.5,
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}
                  >
                    {item.badgeCount}
                  </Box>
                )}
              </Box>

              {/* Title Label */}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  lineHeight: 1.25,
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#334155',
                  fontFamily: "'Montserrat', sans-serif",
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
      </Grid>
    </Box>
  );
}
