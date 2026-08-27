/**
 * [V] VIEW: WorkOrderView
 * View showing the list of work orders.
 */
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase
} from '@mui/material';
import { CaretLeft, MagnifyingGlass, FunnelSimple, Warning, ListBullets } from '@phosphor-icons/react';
import { workOrderMockData } from '../models/WorkOrderModel';
import { WorkOrderCard } from '../components/workorder/WorkOrderCard';

export function WorkOrderView({ controller }) {
  const handleBack = () => {
    controller.setActiveTab('home');
  };

  const actionItems = workOrderMockData.filter(p => p.needAction);
  const regularItems = workOrderMockData.filter(p => !p.needAction);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1, overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
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
          Work Order
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
            placeholder="Find request number"
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
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, pb: 6 }}>
        
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
              {actionItems.map((wo) => (
                <WorkOrderCard key={wo.id} data={wo} />
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
                All Work Orders
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '100px', px: 1.5, py: 0.35, fontSize: '0.75rem', fontWeight: 600 }}>
              {regularItems.length} Request
            </Box>
          </Box>
          {regularItems.map((wo) => (
            <WorkOrderCard key={wo.id} data={wo} />
          ))}
        </Box>

      </Box>
    </Box>
  );
}
