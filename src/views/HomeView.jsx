/**
 * [V] VIEW: HomeView
 * Main Property & Facility Management Home View matching the user screenshot layout:
 * - Hero Building Header with greeting & location pills
 * - White Curved Card Body with 4x2 Grid Menu (8 items)
 * - Promo Banner Carousel
 */

import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import { X, ArrowRight, Buildings, CaretDown } from '@phosphor-icons/react';
import { HeroHeader } from '../components/home/HeroHeader';
import { GridMenu } from '../components/home/GridMenu';
import { PromoBanner } from '../components/home/PromoBanner';
import homeHeaderBg from '../assets/home_header_bg.png';

export function HomeView({ controller }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    menuItems,
    profile,
    promos,
    selectedLocation,
    isLocationMenuOpen,
    selectedMenuItem,
    setIsLocationMenuOpen,
    setSelectedMenuItem,
    handleSelectLocation,
    handleClickMenu
  } = controller;

  // Dynamic Time-Based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  };

  const handleOpenLoc = (e) => {
    setAnchorEl(e.currentTarget);
    setIsLocationMenuOpen(true);
  };

  const handleCloseLoc = () => {
    setAnchorEl(null);
    setIsLocationMenuOpen(false);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1, 
        overflowY: 'auto', 
        backgroundColor: theme.palette.background.default,
        position: 'relative'
      }}
    >
      {/* 1. Full Background Illustration Layer (100% Uncropped 2:1 Fit) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          aspectRatio: '2 / 1',
          backgroundImage: `url(${homeHeaderBg})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        {/* Subtle Top Scrim Gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '70%',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.05) 60%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />
      </Box>

      {/* 2. Top Status Bar & Floating Header Widget Container */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, p: 2.2, pt: 1.4, pb: 0 }}>
        <HeroHeader profile={profile} selectedLocation={selectedLocation} />
      </Box>

      {/* 3. White Curved Card Body */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          mt: { xs: '160px', sm: '175px' },
          borderRadius: '30px 30px 0 0',
          backgroundColor: theme.palette.background.paper,
          p: 2,
          pt: 2.5,
          pb: 12,
          flexGrow: 1,
          boxShadow: '0 -8px 25px rgba(0,0,0,0.07)'
        }}
      >
        {/* 4x2 Grid Menu (8 Items) */}
        <GridMenu
          items={menuItems}
          onClickMenu={handleClickMenu}
        />

        {/* Promo Banner Slider */}
        <PromoBanner promos={promos} />
      </Box>

      {/* Menu Detail Popup Modal */}
      {selectedMenuItem && (
        <Dialog
          open={Boolean(selectedMenuItem)}
          onClose={() => setSelectedMenuItem(null)}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: { borderRadius: 4, p: 1 }
          }}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 3,
                  backgroundColor: selectedMenuItem.bgColor,
                  color: selectedMenuItem.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {React.createElement(selectedMenuItem.icon, { size: 20, weight: 'bold' })}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem' }}>
                {selectedMenuItem.title.replace('\n', ' ')}
              </Typography>
            </Box>
            <IconButton onClick={() => setSelectedMenuItem(null)} size="small">
              <X size={20} />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
              Layanan <strong>{selectedMenuItem.title.replace('\n', ' ')}</strong> untuk unit Anda di <strong>{selectedLocation}</strong>.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ p: 1.5 }}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              endIcon={<ArrowRight size={18} weight="bold" />}
              onClick={() => setSelectedMenuItem(null)}
              sx={{
                backgroundColor: '#27b29b',
                color: '#ffffff',
                borderRadius: 3,
                fontWeight: 700,
                py: 1,
                '&:hover': {
                  backgroundColor: '#1c8b78'
                }
              }}
            >
              Buka Layanan
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
