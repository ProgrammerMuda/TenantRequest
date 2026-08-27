/**
 * [V] VIEW: ActionListView
 * Main task management view rendering statistics cards, search filter bar,
 * action item cards grid, and empty state.
 */

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import {
  Clock,
  WarningCircle,
  CheckCircle,
  FolderOpen,
  Plus,
  Flame,
  SquaresFour
} from '@phosphor-icons/react';
import { ActionCard } from '../components/action/ActionCard';
import { FilterBar } from '../components/action/FilterBar';
import { ActionModal } from '../components/action/ActionModal';

export function ActionListView({ controller }) {
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
    setSelectedPriority,
    setSelectedCategory,
    setIsModalOpen,
    setFormData,
    handleCreateAction,
    handleUpdateStatus,
    handleToggleComplete,
    handleDeleteAction,
    handleResetFilters
  } = controller;

  // Stat card config with Preline UI color scheme
  const statsCards = [
    {
      title: 'Need Action',
      value: statistics.needActionCount,
      subtitle: `${statistics.pending} Pending • ${statistics.inProgress} Diproses`,
      color: '#f59e0b', // Amber
      bgColor: 'rgba(245, 158, 11, 0.08)',
      icon: Clock,
      statusKey: 'PENDING'
    },
    {
      title: 'High Priority',
      value: statistics.highPriority,
      subtitle: 'Membutuhkan perhatian mendesak',
      color: '#f43f5e', // Rose
      bgColor: 'rgba(244, 63, 94, 0.08)',
      icon: Flame,
      statusKey: 'ALL'
    },
    {
      title: 'Sedang Diproses',
      value: statistics.inProgress,
      subtitle: 'Dalam tahap pengerjaan',
      color: '#06b6d4', // Cyan
      bgColor: 'rgba(6, 182, 212, 0.08)',
      icon: WarningCircle,
      statusKey: 'IN_PROGRESS'
    },
    {
      title: 'Selesai',
      value: statistics.completed,
      subtitle: 'Telah berhasil diselesaikan',
      color: '#10b981', // Emerald
      bgColor: 'rgba(16, 185, 129, 0.08)',
      icon: CheckCircle,
      statusKey: 'COMPLETED'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Title & Quick Action */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Daftar Action Item
            </Typography>
            <Chip
              label={`${items.length} of ${allItemsCount}`}
              size="small"
              sx={{ fontWeight: 700, backgroundColor: 'rgba(39, 178, 155, 0.1)', color: '#27b29b' }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
            Daftar tugas & persetujuan yang memerlukan tindakan dari tim Anda.
          </Typography>
        </Box>

        <Button
          variant="contained"
          disableElevation
          onClick={() => setIsModalOpen(true)}
          startIcon={<Plus size={18} weight="bold" />}
          sx={{
            backgroundColor: '#27b29b',
            color: '#ffffff',
            fontWeight: 700,
            px: 2.5,
            py: 1,
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#1c8b78',
            }
          }}
        >
          Tambah Action Item
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2}>
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={0}
                onClick={() => setSelectedStatus(stat.statusKey)}
                sx={{
                  p: 2.5,
                  borderRadius: 3.5,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: stat.color,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                    {stat.title}
                  </Typography>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      backgroundColor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color
                    }}
                  >
                    <Icon size={20} weight="bold" />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  {stat.subtitle}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Filter Bar Component */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onResetFilters={handleResetFilters}
      />

      {/* Action Items List Grid */}
      {items.length > 0 ? (
        <Grid container spacing={2.5}>
          {items.map(item => (
            <Grid item xs={12} md={6} key={item.id}>
              <ActionCard
                item={item}
                onToggleComplete={handleToggleComplete}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDeleteAction}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* Empty State */
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            border: `1px dashed ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'rgba(39, 178, 155, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#27b29b'
            }}
          >
            <FolderOpen size={36} weight="duotone" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Tidak Ada Action Item Ditemukan
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5, maxWidth: 400 }}>
              Coba sesuaikan kata kunci pencarian atau reset filter untuk melihat semua daftar tindakan.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            sx={{ borderColor: '#27b29b', color: '#27b29b', borderRadius: '10px' }}
          >
            Reset Filter
          </Button>
        </Paper>
      )}

      {/* New Action Modal */}
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
