/**
 * [V] VIEW COMPONENT: ActionModal
 * Modal dialog for creating new action items with form inputs.
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Grid,
  useTheme
} from '@mui/material';
import { X, Plus, NotePencil } from '@phosphor-icons/react';
import { ACTION_CATEGORY, ACTION_PRIORITY } from '../../models/ActionItemModel';

export function ActionModal({ open, onClose, formData, formErrors, setFormData, onSubmit }) {
  const theme = useTheme();

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          backgroundImage: 'none'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              backgroundColor: '#27b29b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <NotePencil size={20} weight="bold" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Tambah Action Need Item
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent dividers sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Judul Action Item *"
                placeholder="Contoh: Audit Laporan Keuangan Q3 & Sign-off"
                value={formData.title}
                onChange={handleChange('title')}
                error={Boolean(formErrors.title)}
                helperText={formErrors.title}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Kategori *"
                value={formData.category}
                onChange={handleChange('category')}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
              >
                {Object.values(ACTION_CATEGORY).map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Prioritas *"
                value={formData.priority}
                onChange={handleChange('priority')}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
              >
                <MenuItem value={ACTION_PRIORITY.HIGH}>HIGH (Tinggi)</MenuItem>
                <MenuItem value={ACTION_PRIORITY.MEDIUM}>MEDIUM (Sedang)</MenuItem>
                <MenuItem value={ACTION_PRIORITY.LOW}>LOW (Rendah)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Tenggat Waktu (Due Date)"
                InputLabelProps={{ shrink: true }}
                value={formData.dueDate}
                onChange={handleChange('dueDate')}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tags (pisahkan koma)"
                placeholder="Audit, Q3, Keuangan"
                value={formData.tagsInput}
                onChange={handleChange('tagsInput')}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Deskripsi Detail Action Item"
                placeholder="Jelaskan kebutuhan aksi yang harus diambil..."
                value={formData.description}
                onChange={handleChange('description')}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} variant="text" sx={{ color: theme.palette.text.secondary }}>
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            startIcon={<Plus size={18} weight="bold" />}
            sx={{
              backgroundColor: '#27b29b',
              color: '#ffffff',
              px: 3,
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#1c8b78',
              }
            }}
          >
            Simpan Action Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
