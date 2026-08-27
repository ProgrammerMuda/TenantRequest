/**
 * [V] VIEW COMPONENT: ColorPalette
 * Showcase for Primary color (#27b29b) and Preline.co color design tokens.
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { CheckCircle, Palette, Sparkle } from '@phosphor-icons/react';
import { prelineColors } from '../../theme/theme';

export function ColorPalette() {
  const theme = useTheme();

  const prelineSwatches = [
    { title: 'Preline Indigo (Secondary)', hex: prelineColors.secondary.main, bg: prelineColors.secondary.main, text: '#ffffff' },
    { title: 'Preline Slate 900', hex: prelineColors.slate[900], bg: prelineColors.slate[900], text: '#ffffff' },
    { title: 'Preline Slate 800', hex: prelineColors.slate[800], bg: prelineColors.slate[800], text: '#ffffff' },
    { title: 'Preline Slate 500', hex: prelineColors.slate[500], bg: prelineColors.slate[500], text: '#ffffff' },
    { title: 'Preline Slate 200', hex: prelineColors.slate[200], bg: prelineColors.slate[200], text: '#0f172a' },
    { title: 'Preline Slate 50', hex: prelineColors.slate[50], bg: prelineColors.slate[50], text: '#0f172a' },
    { title: 'Preline Emerald (Success)', hex: prelineColors.success.main, bg: prelineColors.success.main, text: '#ffffff' },
    { title: 'Preline Amber (Warning)', hex: prelineColors.warning.main, bg: prelineColors.warning.main, text: '#ffffff' },
    { title: 'Preline Rose (Error)', hex: prelineColors.rose ? prelineColors.rose.main : prelineColors.error.main, bg: prelineColors.error.main, text: '#ffffff' },
    { title: 'Preline Cyan (Info)', hex: prelineColors.info.main, bg: prelineColors.info.main, text: '#ffffff' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Primary Color Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #27b29b 0%, #1c8b78 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(39, 178, 155, 0.3)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Sparkle size={24} weight="fill" color="#ffffff" />
            <Chip label="PRIMARY COLOR" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', fontWeight: 800 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            HEX #27b29b
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Primary brand color used across main action buttons, active navigation indicators, progress bars, and highlighted cards.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>Light Accent</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>#54cbb6</Typography>
          </Box>
          <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)' }}>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>Dark Shade</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>#1c8b78</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Preline Palette Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Palette size={24} color="#27b29b" weight="bold" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Preline.co Palette (Non-Primary Tokens)
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {prelineSwatches.map((swatch, idx) => (
            <Grid item xs={12} sm={6} md={2.4} key={idx}>
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    height: 90,
                    backgroundColor: swatch.bg,
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 1.5
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: swatch.text, fontFamily: 'monospace' }}>
                    {swatch.hex}
                  </Typography>
                </Box>
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    {swatch.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
