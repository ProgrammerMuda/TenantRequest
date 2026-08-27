/**
 * [V] VIEW: MobileInfoView
 * Mobile view displaying MVC architecture breakdown and system highlights.
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import {
  ShieldCheck,
  Code,
  Palette,
  SquaresFour
} from '@phosphor-icons/react';

export function MobileInfoView() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 2.5, pb: 10, display: 'flex', flexDirection: 'column', gap: 2.5, overflowY: 'auto', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 3,
            backgroundColor: '#27b29b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}
        >
          <ShieldCheck size={24} weight="bold" />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
            Arsitektur MVC Mobile
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Model-View-Controller Structure
          </Typography>
        </Box>
      </Box>

      {/* Model Section */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Code size={20} color="#27b29b" weight="bold" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#27b29b' }}>
            1. MODELS (src/models/)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          Definisi skema data <code>ActionItemModel.js</code>, validasi entitas, enums status (Pending, Diproses, Selesai), dan fungsi pure filter di <code>FilterModel.js</code>.
        </Typography>
      </Paper>

      {/* Controller Section */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SquaresFour size={20} color="#6366f1" weight="bold" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6366f1' }}>
            2. CONTROLLERS (src/controllers/)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          Custom React hooks <code>useActionListController.js</code> dan <code>useThemeController.js</code> mengisolasi seluruh logika state & bisnis dari UI.
        </Typography>
      </Paper>

      {/* View Section */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Palette size={20} color="#f59e0b" weight="bold" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b' }}>
            3. VIEWS (src/views/ & src/components/)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          Komponen UI berbasis Material UI, font Montserrat, Phosphor Icons, warna Primary <strong>#27b29b</strong>, dan palet warna <strong>Preline.co</strong>.
        </Typography>
      </Paper>
    </Box>
  );
}
