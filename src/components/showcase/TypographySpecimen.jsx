/**
 * [V] VIEW COMPONENT: TypographySpecimen
 * Montserrat Font Specimen Showcase
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  useTheme
} from '@mui/material';
import { TextAa } from '@phosphor-icons/react';

export function TypographySpecimen() {
  const theme = useTheme();

  const fontWeights = [
    { label: 'Light', weight: 300 },
    { label: 'Regular', weight: 400 },
    { label: 'Medium', weight: 500 },
    { label: 'SemiBold', weight: 600 },
    { label: 'Bold', weight: 700 },
    { label: 'ExtraBold', weight: 800 }
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <TextAa size={28} color="#27b29b" weight="bold" />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Font Family: Montserrat
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Clean, modern geometric sans-serif loaded from Google Fonts / Fontsource.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#27b29b', fontWeight: 700 }}>H1 • 800 EXTRA BOLD</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>List Need Action</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#27b29b', fontWeight: 700 }}>H2 • 700 BOLD</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>Kelola Prioritas Kerja</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#27b29b', fontWeight: 700 }}>H3 • 600 SEMIBOLD</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Tindakan Cepat & Efisien</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#27b29b', fontWeight: 700 }}>BODY1 • 400 REGULAR</Typography>
              <Typography variant="body1">
                Sistem manajemen task ini dirancang khusus dengan arsitektur MVC (Model-View-Controller) menggunakan React JS, Vite, Material UI, dan Phosphor Icons.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="overline" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
            WEIGHT VARIATIONS
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
            {fontWeights.map((f, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1" sx={{ fontWeight: f.weight, fontSize: '1.05rem' }}>
                  Montserrat {f.label}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace' }}>
                  {f.weight}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
