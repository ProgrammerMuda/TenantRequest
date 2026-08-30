/**
 * [V] VIEW COMPONENT: PromoBanner
 * Horizontally scrollable promo carousel with interactive active indicator dots
 */

import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  useTheme
} from '@mui/material';
import { PhoneCall, HouseLine, Sparkle } from '@phosphor-icons/react';

export function PromoBanner({ promos = [] }) {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const step = clientWidth + 12;
      const index = Math.round(scrollLeft / step);
      if (index !== activeIndex && index >= 0 && index < promos.length) {
        setActiveIndex(index);
      }
    }
  };

  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const step = scrollRef.current.clientWidth + 12;
      scrollRef.current.scrollTo({
        left: index * step,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <Box sx={{ m: 0, width: '100%' }}>
      {/* Horizontal Scrollable Carousel Container */}
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          py: 0.5,
          px: 0,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {promos.map((promo, idx) => (
          <Paper
            key={promo.id || idx}
            elevation={0}
            sx={{
              flex: '0 0 100%',
              width: '100%',
              scrollSnapAlign: 'start',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              backgroundColor: '#f8fafc',
              position: 'relative',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.01)'
              },
              '&:active': {
                transform: 'scale(0.99)'
              }
            }}
          >
            {promo.image ? (
              <Box
                component="img"
                src={promo.image}
                alt={promo.title || 'Pengumuman'}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Box sx={{ p: 2.2, position: 'relative', background: promo.gradient || 'linear-gradient(135deg, #e0f2fe 0%, #e0f7fa 40%, #ffffff 100%)' }}>
                {/* Background Decorative Circles */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    pointerEvents: 'none'
                  }}
                />

            {/* Brand & Badge Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '8px',
                    backgroundColor: promo.textColor || '#0284c7',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <HouseLine size={16} weight="fill" />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: promo.textColor || '#0369a1', letterSpacing: '0.04em', fontSize: '0.75rem' }}>
                  {promo.brand}
                </Typography>
              </Box>

              <Chip
                icon={<Sparkle size={12} weight="fill" color="#ffffff" />}
                label={promo.badge}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  height: 22,
                  backgroundColor: promo.badgeColor || '#65a30d',
                  color: '#ffffff'
                }}
              />
            </Box>

            {/* Main Promo Text */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: promo.textColor || '#0284c7', fontSize: '0.78rem', letterSpacing: '0.02em', mb: 0.2 }}>
              {promo.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: promo.badgeColor || '#65a30d', fontSize: '0.98rem', mb: 1.4, lineHeight: 1.2 }}>
              {promo.subtitle}
            </Typography>

            {/* Offer Tag Pill */}
            <Box
              sx={{
                backgroundColor: promo.badgeColor || '#65a30d',
                color: '#ffffff',
                px: 1.8,
                py: 0.7,
                borderRadius: '8px',
                width: 'fit-content',
                mb: 1.5,
                boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.02em', fontSize: '0.88rem' }}>
                {promo.offerText}
              </Typography>
            </Box>

            {/* Footer info: Validity & Hotline */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.8, pt: 1, borderTop: '1px dashed rgba(0, 0, 0, 0.12)' }}>
              <Typography variant="caption" sx={{ color: promo.textColor || '#0369a1', fontWeight: 600, fontSize: '0.72rem' }}>
                Berlaku Hingga: <strong>{promo.validUntil}</strong>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: promo.textColor || '#0284c7' }}>
                <PhoneCall size={13} weight="fill" />
                <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.72rem' }}>
                  {promo.hotline}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        </Paper>
        ))}
      </Box>

      {/* Interactive Carousel Indicator Dots */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, mt: 1.8 }}>
        {promos.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Box
              key={idx}
              onClick={() => handleDotClick(idx)}
              sx={{
                width: isActive ? 22 : 6,
                height: 6,
                borderRadius: '10px',
                backgroundColor: isActive ? '#27b29b' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: isActive ? '#27b29b' : '#94a3b8'
                }
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
