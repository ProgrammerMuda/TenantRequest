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
              {/* Phosphor Icon Container with Badge */}
              <Badge 
                badgeContent={item.badgeCount} 
                color="error" 
                sx={{ 
                  '& .MuiBadge-badge': { 
                    fontWeight: 800, 
                    right: 2, 
                    top: 2,
                    minWidth: 18,
                    height: 18,
                    fontSize: '0.65rem'
                  } 
                }}
              >
                {item.imageIcon ? (
                  <Box
                    component="img"
                    src={item.imageIcon}
                    alt={item.title?.replace('\n', ' ')}
                    sx={{
                      width: 44,
                      height: 44,
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
                      width: 44,
                      height: 44,
                      borderRadius: '8px',
                      backgroundColor: item.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      boxShadow: `0 2px 8px ${item.bgColor}`
                    }}
                  >
                    <Icon size={24} weight="bold" />
                  </Box>
                )}
              </Badge>

              {/* Title Label */}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  lineHeight: 1.25,
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  color: theme.palette.text.primary,
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
