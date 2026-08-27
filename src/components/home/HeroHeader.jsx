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

export function HeroHeader({ profile, selectedLocation }) {
  const userName = profile?.name || 'Raga';
  const locationName = selectedLocation || profile?.currentLocation || 'Paladian Park';

  // Dynamic Time-Based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Status Bar (Standard Compact Mobile Size) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          px: 0.5,
          pt: 0.2
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
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)'
          }}
        >
          9:41
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          {/* Signal Indicator (4 compact bars) */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.3, height: 12, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
            <Box sx={{ width: 3, height: 3.5, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
            <Box sx={{ width: 3, height: 6, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
            <Box sx={{ width: 3, height: 9, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
            <Box sx={{ width: 3, height: 12, backgroundColor: '#ffffff', borderRadius: 0.4 }} />
          </Box>
          <WifiHigh size={17} weight="bold" color="#ffffff" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
          <BatteryFull size={20} weight="bold" color="#ffffff" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
        </Box>
      </Box>

      {/* 2. Sleek Floating Header Pill Widget */}
      <Box sx={{ mt: 1.2 }}>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 0.25,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '20px',
            px: 1.8,
            py: 0.8,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)'
          }}
        >
          {/* User & Role Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <Typography 
              sx={{ 
                fontSize: '0.98rem', 
                fontWeight: 800, 
                color: '#ffffff', 
                letterSpacing: '-0.2px',
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: 1.2
              }}
            >
              Hi, {userName} 👋
            </Typography>
            <Box
              sx={{
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                borderRadius: '999px',
                px: 1,
                py: 0.1,
                fontWeight: 700,
                fontSize: '0.62rem',
                letterSpacing: '0.02em',
                lineHeight: 1.2
              }}
            >
              Owner
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: '#93c5fd', mt: 0.1 }}>
            <MapPin size={12} weight="fill" color="#93c5fd" />
            <Typography 
              sx={{ 
                fontSize: '0.74rem', 
                fontWeight: 600, 
                color: '#93c5fd',
                lineHeight: 1
              }}
            >
              {locationName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
