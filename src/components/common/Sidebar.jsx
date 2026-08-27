/**
 * [V] VIEW COMPONENT: Sidebar Navigation
 * Sidebar navigation component supporting mobile view and desktop menu items.
 */

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import {
  SquaresFour,
  Clock,
  CheckCircle,
  WarningCircle,
  Palette,
  ShieldCheck
} from '@phosphor-icons/react';

export function Sidebar({ stats, selectedStatus, onSelectStatus, activeTab, onSelectTab }) {
  const theme = useTheme();

  const menuItems = [
    { id: 'ALL', label: 'Semua Action Item', icon: SquaresFour, count: stats.total, color: '#6366f1' },
    { id: 'PENDING', label: 'Need Action (Pending)', icon: Clock, count: stats.pending, color: '#f59e0b' },
    { id: 'IN_PROGRESS', label: 'Sedang Diproses', icon: WarningCircle, count: stats.inProgress, color: '#06b6d4' },
    { id: 'COMPLETED', label: 'Selesai (Completed)', icon: CheckCircle, count: stats.completed, color: '#10b981' }
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        height: '100%'
      }}
    >
      <Typography variant="overline" sx={{ fontWeight: 700, color: theme.palette.text.secondary, letterSpacing: '0.08em' }}>
        STATUS ACTION
      </Typography>

      <List sx={{ mt: 1, mb: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isSelected = activeTab === 'dashboard' && selectedStatus === item.id;

          return (
            <ListItemButton
              key={item.id}
              onClick={() => {
                onSelectTab('dashboard');
                onSelectStatus(item.id);
              }}
              sx={{
                borderRadius: '10px',
                py: 1.2,
                px: 2,
                backgroundColor: isSelected ? 'rgba(39, 178, 155, 0.1)' : 'transparent',
                borderLeft: isSelected ? '4px solid #27b29b' : '4px solid transparent',
                '&:hover': {
                  backgroundColor: isSelected ? 'rgba(39, 178, 155, 0.15)' : theme.palette.action.hover,
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isSelected ? '#27b29b' : item.color }}>
                <Icon size={22} weight={isSelected ? 'fill' : 'bold'} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.9rem',
                  color: isSelected ? '#27b29b' : theme.palette.text.primary
                }}
              />
              <Chip
                label={item.count}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: isSelected ? '#27b29b' : theme.palette.action.selected,
                  color: isSelected ? '#ffffff' : theme.palette.text.secondary
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="overline" sx={{ fontWeight: 700, color: theme.palette.text.secondary, letterSpacing: '0.08em' }}>
        SISTEM & TOKENS
      </Typography>

      <List sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <ListItemButton
          onClick={() => onSelectTab('showcase')}
          sx={{
            borderRadius: '10px',
            py: 1.2,
            px: 2,
            backgroundColor: activeTab === 'showcase' ? 'rgba(39, 178, 155, 0.1)' : 'transparent',
            borderLeft: activeTab === 'showcase' ? '4px solid #27b29b' : '4px solid transparent',
            '&:hover': {
              backgroundColor: activeTab === 'showcase' ? 'rgba(39, 178, 155, 0.15)' : theme.palette.action.hover,
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: activeTab === 'showcase' ? '#27b29b' : '#6366f1' }}>
            <Palette size={22} weight={activeTab === 'showcase' ? 'fill' : 'bold'} />
          </ListItemIcon>
          <ListItemText
            primary="Preline & #27b29b Palette"
            primaryTypographyProps={{
              fontWeight: activeTab === 'showcase' ? 700 : 500,
              fontSize: '0.9rem',
              color: activeTab === 'showcase' ? '#27b29b' : theme.palette.text.primary
            }}
          />
        </ListItemButton>
      </List>

      {/* Info Card Widget */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(39, 178, 155, 0.08)' : '#f0fdfa',
          border: '1px solid rgba(39, 178, 155, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShieldCheck size={20} color="#27b29b" weight="fill" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#27b29b' }}>
            Architecture MVC
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, lineHeight: 1.4 }}>
          Tersusun rapi dalam <strong>models</strong>, <strong>controllers</strong>, dan <strong>views</strong> untuk kemudahan maintenance & scaling.
        </Typography>
      </Box>
    </Paper>
  );
}
