/**
 * [V] VIEW: MobileFilterView
 * Mobile view for filtering actions by Priority, Category, and Status.
 */

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import { Funnel, XCircle, Check } from '@phosphor-icons/react';
import { ACTION_PRIORITY, ACTION_CATEGORY, ACTION_STATUS } from '../models/ActionItemModel';

export function MobileFilterView({ controller, onApplyFilter }) {
  const theme = useTheme();
  const {
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedCategory,
    setSelectedCategory,
    handleResetFilters
  } = controller;

  return (
    <Box sx={{ p: 2.5, pb: 10, display: 'flex', flexDirection: 'column', gap: 2.5, overflowY: 'auto', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Funnel size={22} color="#27b29b" weight="bold" />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
            Filter & Kategorisasi
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={handleResetFilters}
          startIcon={<XCircle size={16} />}
          sx={{ color: '#f43f5e', fontWeight: 600 }}
        >
          Reset
        </Button>
      </Box>

      {/* Status Filter */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          Status Action
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[
            { id: 'ALL', label: 'Semua Status' },
            { id: ACTION_STATUS.PENDING, label: 'Need Action' },
            { id: ACTION_STATUS.IN_PROGRESS, label: 'Sedang Diproses' },
            { id: ACTION_STATUS.COMPLETED, label: 'Selesai' }
          ].map(st => (
            <Chip
              key={st.id}
              label={st.label}
              onClick={() => setSelectedStatus(st.id)}
              icon={selectedStatus === st.id ? <Check size={14} weight="bold" /> : undefined}
              sx={{
                fontWeight: 600,
                backgroundColor: selectedStatus === st.id ? '#27b29b' : theme.palette.action.hover,
                color: selectedStatus === st.id ? '#ffffff' : theme.palette.text.primary
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Priority Filter */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          Tingkat Prioritas
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          InputProps={{ sx: { borderRadius: 3 } }}
        >
          <MenuItem value="ALL">Semua Prioritas</MenuItem>
          <MenuItem value={ACTION_PRIORITY.HIGH}>HIGH (Tinggi)</MenuItem>
          <MenuItem value={ACTION_PRIORITY.MEDIUM}>MEDIUM (Sedang)</MenuItem>
          <MenuItem value={ACTION_PRIORITY.LOW}>LOW (Rendah)</MenuItem>
        </TextField>
      </Paper>

      {/* Category Filter */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          Kategori Bisnis
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          InputProps={{ sx: { borderRadius: 3 } }}
        >
          <MenuItem value="ALL">Semua Kategori</MenuItem>
          {Object.values(ACTION_CATEGORY).map(cat => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      {/* Apply Button */}
      <Button
        variant="contained"
        disableElevation
        onClick={onApplyFilter}
        sx={{
          py: 1.2,
          borderRadius: 3,
          backgroundColor: '#27b29b',
          color: '#ffffff',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#1c8b78'
          }
        }}
      >
        Terapkan Filter
      </Button>
    </Box>
  );
}
