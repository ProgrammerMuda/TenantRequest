/**
 * [V] VIEW COMPONENT: RoleSwitcherBar
 * 3-button per row (2 rows) role switcher grid matching user request:
 * Row 1: [Building Manager] [Tenant] [ENG]
 * Row 2: [SEC] [HK] [TR]
 */

import React from 'react';
import {
  Box,
  Grid,
  ButtonBase,
  Typography,
  useTheme
} from '@mui/material';
import { ROLE_DEFINITIONS } from '../../models/RoleModel';

export function RoleSwitcherBar({ activeRole, onSelectRole }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ mb: 2 }}>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 0.5 }}>
        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            color: isDark ? '#94a3b8' : '#64748b',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          Login Role :
        </Typography>
        <Typography
          sx={{
            fontSize: '0.68rem',
            fontWeight: 700,
            fontFamily: "'Montserrat', sans-serif",
            color: '#20b29c'
          }}
        >
          ● Active: {ROLE_DEFINITIONS.find(r => r.id === activeRole)?.label || 'BM'}
        </Typography>
      </Box>

      {/* 2 Rows x 3 Buttons Grid */}
      <Grid container spacing={1}>
        {ROLE_DEFINITIONS.map(role => {
          const isActive = activeRole === role.id;

          return (
            <Grid item xs={4} key={role.id}>
              <ButtonBase
                onClick={() => onSelectRole(role.id)}
                sx={{
                  width: '100%',
                  py: 0.8,
                  px: 0.5,
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#20b29c' : (isDark ? '#1e293b' : '#ffffff'),
                  border: isActive
                    ? '1.5px solid #20b29c'
                    : `1.5px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  color: isActive ? '#ffffff' : (isDark ? '#cbd5e1' : '#475569'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  minHeight: 38,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive
                    ? '0 3px 10px rgba(32, 178, 156, 0.3)'
                    : 'none',
                  '&:hover': {
                    borderColor: '#20b29c',
                    color: isActive ? '#ffffff' : '#20b29c',
                    backgroundColor: isActive ? '#1aa38e' : (isDark ? '#283548' : '#f8fafc')
                  },
                  '&:active': {
                    transform: 'scale(0.96)'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.74rem',
                    fontWeight: isActive ? 800 : 700,
                    fontFamily: "'Montserrat', sans-serif",
                    lineHeight: 1.2,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {role.label}
                </Typography>
              </ButtonBase>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
