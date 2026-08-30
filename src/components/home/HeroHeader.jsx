/**
 * [V] VIEW COMPONENT: HeroHeader
 * High-end architectural property header with Glassmorphism pills,
 * modern teal-sky background gradient, and status bar.
 */

import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import {
  WifiHigh,
  BatteryFull,
  MapPin
} from '@phosphor-icons/react';
import homeHeaderBg from '../../assets/home_header_bg.png';

export function HeroHeader({ profile, selectedLocation, onChangeRole }) {
  const userName = profile?.name || 'Aldy Mahardiansyah';
  const locationName = selectedLocation || profile?.currentLocation || 'Apartement A';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Status Bar (With Dynamic Island matching screenshot) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          px: 0.5,
          pt: 0.2,
          position: 'relative'
        }}
      >
        <Typography 
          sx={{ 
            fontWeight: 700, 
            fontFamily: "'Montserrat', sans-serif", 
            fontSize: '0.95rem', 
            lineHeight: 1,
            color: '#ffffff',
            letterSpacing: '-0.2px',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          9:41
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          {/* Signal Indicator (4 compact bars) */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.3, height: 12, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}>
            <Box sx={{ width: 3, height: 3.5, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
            <Box sx={{ width: 3, height: 6, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
            <Box sx={{ width: 3, height: 9, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
            <Box sx={{ width: 3, height: 12, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
          </Box>
          <WifiHigh size={18} weight="bold" color="#ffffff" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }} />
          <BatteryFull size={22} weight="bold" color="#ffffff" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }} />
        </Box>
      </Box>

      {/* 2. Direct Greeting & Location with Ganti Role Button */}
      <Box sx={{ mt: { xs: 2.4, sm: 3 }, px: 0.5 }}>
        <Typography 
          component="h1"
          sx={{ 
            fontSize: { xs: '1.28rem', sm: '1.4rem' }, 
            fontWeight: 800, 
            color: '#ffffff', 
            letterSpacing: '-0.3px',
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.2,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.6
          }}
        >
          Hi {userName} <span style={{ fontSize: '1.3rem' }}>👋</span>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography 
            sx={{ 
              fontSize: { xs: '1.08rem', sm: '1.2rem' }, 
              fontWeight: 700, 
              color: '#ffffff',
              letterSpacing: '-0.2px',
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: 1.25,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.55)'
            }}
          >
            {locationName}
          </Typography>

          {onChangeRole && (
            <Box
              onClick={onChangeRole}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '999px',
                px: 1.2,
                py: 0.35,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(32, 178, 156, 0.85)',
                  borderColor: '#20b29c'
                },
                '&:active': {
                  transform: 'scale(0.96)'
                }
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                Ganti Role ▾
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
