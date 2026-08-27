/**
 * [V] VIEW: ThemeShowcaseView
 * Documentation view showcasing Primary color #27b29b, Preline color design tokens,
 * Montserrat font specimens, and Phosphor icons.
 */

import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { ColorPalette } from '../components/showcase/ColorPalette';
import { TypographySpecimen } from '../components/showcase/TypographySpecimen';
import { IconGallery } from '../components/showcase/IconGallery';

export function ThemeShowcaseView() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* View Header */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Design Tokens & System Architecture
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
          Preview sistem visual dengan Primary Color <strong>#27b29b</strong>, <strong>Preline.co</strong> Palette, <strong>Montserrat</strong> Font, dan <strong>Phosphor Icons</strong>.
        </Typography>
      </Box>

      {/* Color Palette Showcase */}
      <ColorPalette />

      {/* Typography Specimen */}
      <TypographySpecimen />

      {/* Icon Gallery */}
      <IconGallery />
    </Box>
  );
}
