/**
 * [V] VIEW COMPONENT: IconGallery
 * Showcase for @phosphor-icons/react integrated icons.
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import {
  ListChecks,
  Clock,
  CheckCircle,
  WarningCircle,
  Plus,
  Trash,
  Tag,
  Calendar,
  UserCircle,
  Funnel,
  MagnifyingGlass,
  Palette,
  Sun,
  Moon,
  ShieldCheck,
  NotePencil,
  Sparkle,
  Sliders,
  FolderOpen
} from '@phosphor-icons/react';

export function IconGallery() {
  const theme = useTheme();

  const icons = [
    { name: 'ListChecks', icon: ListChecks },
    { name: 'Clock', icon: Clock },
    { name: 'CheckCircle', icon: CheckCircle },
    { name: 'WarningCircle', icon: WarningCircle },
    { name: 'Plus', icon: Plus },
    { name: 'Trash', icon: Trash },
    { name: 'Tag', icon: Tag },
    { name: 'Calendar', icon: Calendar },
    { name: 'UserCircle', icon: UserCircle },
    { name: 'Funnel', icon: Funnel },
    { name: 'MagnifyingGlass', icon: MagnifyingGlass },
    { name: 'Palette', icon: Palette },
    { name: 'Sun', icon: Sun },
    { name: 'Moon', icon: Moon },
    { name: 'ShieldCheck', icon: ShieldCheck },
    { name: 'NotePencil', icon: NotePencil },
    { name: 'Sparkle', icon: Sparkle },
    { name: 'Sliders', icon: Sliders },
    { name: 'FolderOpen', icon: FolderOpen }
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Sparkle size={28} color="#27b29b" weight="bold" />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Phosphor Icons (@phosphor-icons/react)
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Set ikon modern & konsisten yang digunakan di seluruh aplikasi.
            </Typography>
          </Box>
        </Box>
        <Chip label={`${icons.length} Sample Icons`} size="small" sx={{ backgroundColor: 'rgba(39, 178, 155, 0.1)', color: '#27b29b', fontWeight: 700 }} />
      </Box>

      <Grid container spacing={1.5} sx={{ mt: 1 }}>
        {icons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Grid item xs={6} sm={4} md={2.4} key={idx}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#27b29b',
                    backgroundColor: 'rgba(39, 178, 155, 0.05)',
                    transform: 'scale(1.03)'
                  }
                }}
              >
                <Icon size={28} color="#27b29b" weight="bold" />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
