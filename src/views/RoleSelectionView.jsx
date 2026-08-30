/**
 * [V] VIEW: RoleSelectionView
 * Initial Gateway / Welcome screen displaying 6 vertical Role CTA cards:
 * 1. Building Manager
 * 2. Tenant
 * 3. Engineering (ENG)
 * 4. Security (SEC)
 * 5. Housekeeping (HK)
 * 6. Tenant Relations (TR)
 */

import React from 'react';
import {
  Box,
  Typography,
  ButtonBase,
  useTheme
} from '@mui/material';
import {
  Buildings,
  HouseLine,
  Toolbox,
  ShieldCheck,
  Broom,
  ChatDots,
  CaretRight
} from '@phosphor-icons/react';

export function RoleSelectionView({ controller }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { handleSelectRole, setActiveTab } = controller;

  const roles = [
    {
      id: 'bm',
      title: 'Building Manager',
      subtitle: 'Overview KPI, approval permit & kontrol operasional gedung',
      icon: Buildings,
      color: '#06b6d4',
      bgColor: 'rgba(6, 182, 212, 0.1)'
    },
    {
      id: 'tenant',
      title: 'Tenant',
      subtitle: 'Tagihan unit, booking fasilitas & ajukan request komplain',
      icon: HouseLine,
      color: '#20b29c',
      bgColor: 'rgba(32, 178, 156, 0.1)'
    },
    {
      id: 'eng',
      title: 'Engineering (ENG)',
      subtitle: 'Work order masuk, catat meter utilitas & perbaikan lift/AC',
      icon: Toolbox,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      id: 'sec',
      title: 'Security (SEC)',
      subtitle: 'Buku tamu visitor, pass barang keluar masuk & rute patroli',
      icon: ShieldCheck,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      id: 'hk',
      title: 'Housekeeping (HK)',
      subtitle: 'Checklist kebersihan area, request khusus & stok perlengkapan',
      icon: Broom,
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      id: 'tr',
      title: 'Tenant Relations (TR)',
      subtitle: 'Review fit-out permit, database penghuni & broadcast info',
      icon: ChatDots,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    }
  ];

  const handleChooseRole = (roleId) => {
    handleSelectRole(roleId);
    setActiveTab('home');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2.2, sm: 3 },
        pb: 6
      }}
    >
      {/* Top Header & Branding */}
      <Box sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: '16px',
            backgroundColor: 'rgba(32, 178, 156, 0.12)',
            color: '#20b29c',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1.5,
            border: '1.5px solid rgba(32, 178, 156, 0.25)'
          }}
        >
          <Buildings size={28} weight="bold" />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            fontSize: '1.35rem',
            fontFamily: "'Montserrat', sans-serif",
            color: theme.palette.text.primary,
            letterSpacing: '-0.3px',
            mb: 0.5
          }}
        >
          Pilih Akses Role
        </Typography>

        <Typography
          sx={{
            fontSize: '0.82rem',
            color: theme.palette.text.secondary,
            fontFamily: "'Montserrat', sans-serif",
            maxWidth: 320,
            mx: 'auto',
            lineHeight: 1.4
          }}
        >
          Silakan pilih peran akun untuk masuk ke halaman menu & dashboard operasional
        </Typography>
      </Box>

      {/* 6 Vertical CTA Cards (Berjejer ke bawah) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.3 }}>
        {roles.map((role) => {
          const Icon = role.icon;

          return (
            <ButtonBase
              key={role.id}
              onClick={() => handleChooseRole(role.id)}
              sx={{
                width: '100%',
                p: 1.6,
                borderRadius: '14px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: `1.5px solid ${isDark ? '#334155' : '#eef2f6'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                textAlign: 'left',
                boxShadow: 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#20b29c',
                  transform: 'translateY(-2px)',
                  backgroundColor: isDark ? '#243044' : '#ffffff'
                },
                '&:active': {
                  transform: 'scale(0.98)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, flexGrow: 1, minWidth: 0 }}>
                {/* Icon Box */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    backgroundColor: role.bgColor,
                    color: role.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={24} weight="bold" />
                </Box>

                {/* Text Labels */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      fontFamily: "'Montserrat', sans-serif",
                      color: theme.palette.text.primary,
                      lineHeight: 1.25,
                      mb: 0.2
                    }}
                  >
                    {role.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '0.73rem',
                      fontFamily: "'Montserrat', sans-serif",
                      color: theme.palette.text.secondary,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {role.subtitle}
                  </Typography>
                </Box>
              </Box>

              {/* Trailing Action Chevron */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#334155' : '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#20b29c',
                  flexShrink: 0
                }}
              >
                <CaretRight size={16} weight="bold" />
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
