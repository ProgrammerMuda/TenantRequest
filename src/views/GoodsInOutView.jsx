/**
 * [V] VIEW: GoodsInOutView
 * View showing the list of Goods In & Out requests.
 */
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Button
} from '@mui/material';
import { CaretLeft, MagnifyingGlass, FunnelSimple, Warning, ListBullets, ArrowRight } from '@phosphor-icons/react';
import { goodsInOutMockData } from '../models/GoodsInOutModel';
import { GoodsCard } from '../components/goods/GoodsCard';

export function GoodsInOutView({ controller }) {
  const handleBack = () => {
    controller.setActiveTab('home');
  };

  const actionItems = goodsInOutMockData.filter(p => p.needAction);
  const regularItems = goodsInOutMockData.filter(p => !p.needAction);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <Box 
        sx={{ 
          backgroundColor: '#ffffff', 
          px: 2,
          pb: 2,
          pt: 4,
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <IconButton onClick={handleBack} sx={{ color: '#334155', p: 0, mr: 2 }}>
          <CaretLeft size={24} weight="bold" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#334155', fontSize: '1.1rem', flexGrow: 1, textAlign: 'center', pr: 4 }}>
          Goods In & Out
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ px: 2, py: 2, backgroundColor: '#ffffff', display: 'flex', gap: 1.5 }}>
        <Box 
          sx={{ 
            flexGrow: 1, 
            backgroundColor: '#f1f5f9', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            px: 2,
            py: 1
          }}
        >
          <MagnifyingGlass size={20} color="#94a3b8" weight="bold" />
          <InputBase
            placeholder="Find goods in & out number"
            sx={{ 
              ml: 1, 
              flexGrow: 1, 
              fontSize: '1rem', 
              color: '#334155',
              '& .MuiInputBase-input::placeholder': {
                color: '#cbd5e1',
                opacity: 1,
                fontWeight: 500
              }
            }}
          />
        </Box>
        <IconButton 
          sx={{ 
            border: '1px solid #cbd5e1', 
            borderRadius: '8px', 
            width: 46,
            height: 46,
            color: '#64748b'
          }}
        >
          <FunnelSimple size={22} weight="bold" />
        </IconButton>
      </Box>

      {/* List Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, pb: 12 }}>
        
        {/* Action Required Section */}
        {actionItems.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '8px', backgroundColor: '#ffedd5', color: '#ea580c' }}>
                  <Warning size={16} weight="fill" />
                </Box>
                <Typography variant="subtitle2" sx={{ color: '#334155', fontWeight: 600, fontSize: '0.95rem' }}>
                  Need Action
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: '#e2e8f0', color: '#334155', borderRadius: '100px', px: 1.5, py: 0.35, fontSize: '0.75rem', fontWeight: 600 }}>
                {actionItems.length} Request
              </Box>
            </Box>
            <Box>
              {actionItems.map((item) => (
                <GoodsCard key={item.id} data={item} />
              ))}
            </Box>
          </Box>
        )}

        {/* Regular List Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '8px', backgroundColor: '#e2e8f0', color: '#64748b' }}>
                <ListBullets size={16} weight="fill" />
              </Box>
              <Typography variant="subtitle2" sx={{ color: '#334155', fontWeight: 600, fontSize: '0.95rem' }}>
                All Requests
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '100px', px: 1.5, py: 0.35, fontSize: '0.75rem', fontWeight: 600 }}>
              {regularItems.length} Request
            </Box>
          </Box>
          {regularItems.map((item) => (
            <GoodsCard key={item.id} data={item} />
          ))}
        </Box>
      </Box>

      {/* Fixed Bottom Action Button */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 2, 
          pt: 2, 
          pb: { xs: 4, sm: 3 }, 
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          zIndex: 10
        }}
      >
        <Button
          fullWidth
          variant="contained"
          disableElevation
          endIcon={<ArrowRight size={20} weight="bold" />}
          sx={{
            backgroundColor: '#27b29b',
            color: '#ffffff',
            borderRadius: '12px',
            py: 1.8,
            fontSize: '1rem',
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#209884'
            }
          }}
        >
          Add Request
        </Button>
      </Box>
    </Box>
  );
}
