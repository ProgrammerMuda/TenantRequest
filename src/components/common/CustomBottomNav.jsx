/**
 * [V] VIEW COMPONENT: CustomBottomNav
 * 100% Solid Pure White Notched Bottom Navigation Bar:
 * - Full solid white background from edge-to-edge (no grey strips on Home or Profile)
 * - Taller height (94px) with elevated tabs & spacious safe-area breathing room
 * - Smooth S-curve notch contour
 * - Floating teal QR button with crisp white border and drop shadow
 * - Home (active teal), Chat (inactive grey), Notif (inactive grey + red badge), Profile (inactive grey)
 */

import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import {
  House,
  ChatCircleDots,
  Bell,
  UserCircle,
  QrCode
} from '@phosphor-icons/react';

export function CustomBottomNav({ activeTab, onSelectTab }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navBg = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#f1f5f9';
  const activeColor = '#20b29c';
  const inactiveColor = isDark ? '#64748b' : '#94a3b8';

  const leftTabs = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'chat', label: 'Chat', icon: ChatCircleDots }
  ];

  const rightTabs = [
    { id: 'notif', label: 'Notif', icon: Bell, hasBadge: true },
    { id: 'profile', label: 'Profile', icon: UserCircle }
  ];

  // Sleek, compact standard mobile navbar height (74px)
  const H = 74;
  const notchW = 102; // Wider notch for prominent enlarged QR button
  const notchD = 21;  // Smooth scoop depth

  return (
    <Box
      sx={{
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        height: H,
        minHeight: H,
        maxHeight: H,
        flexShrink: 0,
        backgroundColor: 'transparent',
        filter: isDark 
          ? 'drop-shadow(0 -3px 12px rgba(0, 0, 0, 0.4))' 
          : 'drop-shadow(0 -3px 14px rgba(15, 23, 42, 0.07))'
      }}
    >
      {/* 1. Full White Edge-to-Edge Background (No Grey Strips Ever) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'stretch',
          width: '100%',
          height: H,
          pointerEvents: 'none'
        }}
      >
        {/* Left 100% Solid White Bar */}
        <Box
          sx={{
            width: `calc(50% - ${notchW / 2}px)`,
            backgroundColor: navBg,
            height: '100%',
            borderTop: `1px solid ${borderColor}`
          }}
        />

        {/* Center Seamless White Notch */}
        <Box
          sx={{
            width: notchW,
            height: H,
            position: 'relative',
            flexShrink: 0
          }}
        >
          <svg
            width={notchW}
            height={H}
            viewBox={`0 0 ${notchW} ${H}`}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            {/* White Body Fill */}
            <path
              d={`M 0 0 L 14 0 C 24 0, 28 8, 36 14 C 45 ${notchD}, 48 ${notchD}, 51 ${notchD} C 54 ${notchD}, 57 ${notchD}, 66 14 C 74 8, 78 0, 88 0 L ${notchW} 0 L ${notchW} ${H} L 0 ${H} Z`}
              fill={navBg}
            />
            {/* Top Border Stroke */}
            <path
              d={`M 0 0.5 L 14 0.5 C 24 0.5, 28 8, 36 14 C 45 ${notchD}, 48 ${notchD}, 51 ${notchD} C 54 ${notchD}, 57 ${notchD}, 66 14 C 74 8, 78 0.5, 88 0.5 L ${notchW} 0.5`}
              fill="none"
              stroke={borderColor}
              strokeWidth="1"
            />
          </svg>
        </Box>

        {/* Right 100% Solid White Bar */}
        <Box
          sx={{
            width: `calc(50% - ${notchW / 2}px)`,
            backgroundColor: navBg,
            height: '100%',
            borderTop: `1px solid ${borderColor}`
          }}
        />
      </Box>

      {/* 2. Elevated Floating QR Action Button (Enlarged & Prominent) */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: -24,
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconButton
          onClick={() => onSelectTab('qr')}
          sx={{
            width: 66,
            height: 66,
            backgroundColor: activeColor,
            color: '#ffffff',
            border: `4px solid ${navBg}`,
            boxShadow: isDark
              ? '0 5px 18px rgba(0, 0, 0, 0.5)'
              : '0 6px 20px rgba(32, 178, 156, 0.42)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: '#1aa38e',
              transform: 'scale(1.05)'
            },
            '&:active': {
              transform: 'scale(0.95)'
            }
          }}
        >
          <QrCode size={36} weight="fill" color="#ffffff" />
        </IconButton>
      </Box>

      {/* 3. Interactive Tabs Layer (Sleek & Perfectly Centered in 74px Bar) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          pt: 0.6,
          pb: 0.8,
          zIndex: 5
        }}
      >
        {/* Left Tabs Container (Home, Chat) */}
        <Box
          sx={{
            width: `calc(50% - ${notchW / 2}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
            px: 0.5
          }}
        >
          {leftTabs.map(item => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            const color = isSelected ? activeColor : inactiveColor;

            return (
              <Box
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.4,
                  cursor: 'pointer',
                  py: 0.5,
                  px: 1.2,
                  userSelect: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-1px)'
                  },
                  '&:active': {
                    transform: 'scale(0.96)'
                  }
                }}
              >
                <Icon
                  size={25}
                  weight={isSelected ? 'fill' : item.id === 'chat' ? 'fill' : 'bold'}
                  color={color}
                />
                <Typography
                  sx={{
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.72rem',
                    fontFamily: "'Montserrat', sans-serif",
                    color: color,
                    lineHeight: 1.15,
                    letterSpacing: '-0.2px'
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Center Gap for Notch */}
        <Box sx={{ width: notchW, height: '100%', flexShrink: 0 }} />

        {/* Right Tabs Container (Notif, Profile) */}
        <Box
          sx={{
            width: `calc(50% - ${notchW / 2}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
            px: 0.5
          }}
        >
          {rightTabs.map(item => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            const color = isSelected ? activeColor : inactiveColor;

            return (
              <Box
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.3,
                  cursor: 'pointer',
                  py: 0.4,
                  px: 1,
                  userSelect: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-1px)'
                  },
                  '&:active': {
                    transform: 'scale(0.96)'
                  }
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <Icon
                    size={25}
                    weight="fill"
                    color={color}
                  />
                  {item.hasBadge && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#e11d48',
                        border: `1.5px solid ${navBg}`
                      }}
                    />
                  )}
                </Box>
                <Typography
                  sx={{
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.72rem',
                    fontFamily: "'Montserrat', sans-serif",
                    color: color,
                    lineHeight: 1.15,
                    letterSpacing: '-0.2px'
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
