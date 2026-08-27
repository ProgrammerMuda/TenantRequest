/**
 * [V] VIEW COMPONENT: FilterBar
 * Toolbar for searching, filtering by priority, category, and status.
 */

import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { MagnifyingGlass, Funnel, XCircle } from '@phosphor-icons/react';
import { ACTION_PRIORITY, ACTION_CATEGORY } from '../../models/ActionItemModel';

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  selectedCategory,
  onCategoryChange,
  onResetFilters
}) {
  const theme = useTheme();

  const isFiltered = searchQuery !== '' || selectedPriority !== 'ALL' || selectedCategory !== 'ALL';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 2
      }}
    >
      {/* Search Input */}
      <TextField
        fullWidth
        placeholder="Cari action item, tag, atau ID..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MagnifyingGlass size={20} color="#27b29b" weight="bold" />
            </InputAdornment>
          ),
          sx: { borderRadius: '10px' }
        }}
      />

      {/* Priority Dropdown */}
      <TextField
        select
        size="small"
        label="Prioritas"
        value={selectedPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        sx={{ minWidth: { xs: '100%', md: 160 } }}
        InputProps={{ sx: { borderRadius: '10px' } }}
      >
        <MenuItem value="ALL">Semua Prioritas</MenuItem>
        <MenuItem value={ACTION_PRIORITY.HIGH}>High Priority</MenuItem>
        <MenuItem value={ACTION_PRIORITY.MEDIUM}>Medium Priority</MenuItem>
        <MenuItem value={ACTION_PRIORITY.LOW}>Low Priority</MenuItem>
      </TextField>

      {/* Category Dropdown */}
      <TextField
        select
        size="small"
        label="Kategori"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        sx={{ minWidth: { xs: '100%', md: 200 } }}
        InputProps={{ sx: { borderRadius: '10px' } }}
      >
        <MenuItem value="ALL">Semua Kategori</MenuItem>
        {Object.values(ACTION_CATEGORY).map(cat => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      {/* Reset Filters */}
      {isFiltered && (
        <Button
          size="small"
          onClick={onResetFilters}
          startIcon={<XCircle size={18} />}
          sx={{
            color: '#f43f5e',
            whiteSpace: 'nowrap',
            fontWeight: 600,
            borderRadius: '10px'
          }}
        >
          Reset Filter
        </Button>
      )}
    </Paper>
  );
}
