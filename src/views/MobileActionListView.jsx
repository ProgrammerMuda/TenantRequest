/**
 * [V] VIEW: MobileActionListView
 * Native mobile action feed with horizontal status summary chips,
 * search input, touch-friendly action cards, and FAB button.
 */

import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Fab,
  InputBase,
  useTheme
} from '@mui/material';
import {
  Plus,
  Clock,
  Flame,
  WarningCircle,
  CheckCircle,
  MagnifyingGlass,
  FolderOpen,
  Funnel
} from '@phosphor-icons/react';
import { ActionCard } from '../components/action/ActionCard';
import { ActionModal } from '../components/action/ActionModal';

export function MobileActionListView({ controller }) {
  const theme = useTheme();
  const {
    items,
    allItemsCount,
    statistics,
    searchQuery,
    selectedStatus,
    selectedPriority,
    selectedCategory,
    isModalOpen,
    formData,
    formErrors,
    setSearchQuery,
    setSelectedStatus,
    setIsModalOpen,
    setFormData,
    handleCreateAction,
    handleUpdateStatus,
    handleToggleComplete,
    handleDeleteAction,
    handleResetFilters
  } = controller;

  // Horizontal Quick Filter Chips
  const filterChips = [
    { id: 'ALL', label: 'Semua', count: statistics.total, color: '#6366f1' },
    { id: 'PENDING', label: 'Need Action', count: statistics.pending, color: '#f59e0b' },
    { id: 'IN_PROGRESS', label: 'Diproses', count: statistics.inProgress, color: '#06b6d4' },
    { id: 'COMPLETED', label: 'Selesai', count: statistics.completed, color: '#10b981' }
  ];

  return (
    <Box sx={{ p: 2, pb: 10, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flexGrow: 1 }}>
      {/* Mobile Search Bar */}
      <Paper
        elevation={0}
        sx={{
          p: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <MagnifyingGlass size={20} color="#27b29b" weight="bold" />
        <InputBase
          placeholder="Cari action item, tag, atau ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: '0.88rem' }}
        />
        {searchQuery && (
          <Typography
            variant="caption"
            onClick={() => setSearchQuery('')}
            sx={{ color: '#f43f5e', fontWeight: 700, cursor: 'pointer' }}
          >
            Clear
          </Typography>
        )}
      </Paper>

      {/* Horizontal Status Chips Scroll */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          pb: 0.5,
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {filterChips.map(chip => {
          const isSelected = selectedStatus === chip.id;
          return (
            <Chip
              key={chip.id}
              label={`${chip.label} (${chip.count})`}
              onClick={() => setSelectedStatus(chip.id)}
              sx={{
                fontWeight: 700,
                fontSize: '0.78rem',
                height: 32,
                borderRadius: '10px',
                backgroundColor: isSelected ? '#27b29b' : (theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9'),
                color: isSelected ? '#ffffff' : theme.palette.text.primary,
                border: `1px solid ${isSelected ? '#27b29b' : theme.palette.divider}`,
                '&:hover': {
                  backgroundColor: isSelected ? '#1c8b78' : undefined
                }
              }}
            />
          );
        })}
      </Box>

      {/* Quick Summary Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.95rem' }}>
          Daftar Action ({items.length})
        </Typography>

        {selectedPriority !== 'ALL' || selectedCategory !== 'ALL' ? (
          <Chip
            icon={<Funnel size={12} />}
            label="Filter Aktif"
            size="small"
            onDelete={handleResetFilters}
            sx={{ backgroundColor: 'rgba(39, 178, 155, 0.1)', color: '#27b29b', fontWeight: 700 }}
          />
        ) : (
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
            {statistics.highPriority} High Priority
          </Typography>
        )}
      </Box>

      {/* Action Items List */}
      {items.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map(item => (
            <ActionCard
              key={item.id}
              item={item}
              onToggleComplete={handleToggleComplete}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteAction}
            />
          ))}
        </Box>
      ) : (
        /* Empty State */
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 2,
            borderRadius: 4,
            border: `1px dashed ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'rgba(39, 178, 155, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#27b29b'
            }}
          >
            <FolderOpen size={30} weight="duotone" />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Tidak Ada Action Item
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Coba sesuaikan pencarian atau filter status.
          </Typography>
        </Paper>
      )}

      {/* Mobile Floating Action Button (FAB) */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsModalOpen(true)}
        sx={{
          position: 'absolute',
          bottom: 76,
          right: 20,
          backgroundColor: '#27b29b',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(39, 178, 155, 0.4)',
          '&:hover': {
            backgroundColor: '#1c8b78'
          }
        }}
      >
        <Plus size={26} weight="bold" />
      </Fab>

      {/* New Action Item Modal */}
      <ActionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        formErrors={formErrors}
        setFormData={setFormData}
        onSubmit={handleCreateAction}
      />
    </Box>
  );
}
