/**
 * [V] VIEW COMPONENT: WorkOrderCard
 * Displays a single work order ticket in the list.
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Wrench, Warning, ArrowRight } from '@phosphor-icons/react';
import { WORK_ORDER_STATUS } from '../../models/WorkOrderModel';

export function WorkOrderCard({ data }) {
  // Determine status color
  let statusColor = '#ffffff'; 
  let statusBg = '#94a3b8'; 

  switch (data.status) {
    case WORK_ORDER_STATUS.WAITING_APPROVAL:
    case WORK_ORDER_STATUS.ON_REVIEW:
      statusBg = '#f97316'; // Orange
      break;
    case WORK_ORDER_STATUS.SURVEY_SCHEDULED:
    case WORK_ORDER_STATUS.WORK_SCHEDULED:
      statusBg = '#a855f7'; // Purple
      break;
    case WORK_ORDER_STATUS.ON_SURVEY:
    case WORK_ORDER_STATUS.ON_WORK:
      statusBg = '#3b82f6'; // Blue
      break;
    case WORK_ORDER_STATUS.COMPLETE:
      statusBg = '#22c55e'; // Green
      break;
    default:
      statusBg = '#94a3b8';
  }

  return (
    <Box sx={{ mb: 2, position: 'relative' }}>
      {/* Main White Card */}
      <Box 
        sx={{ 
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          p: 2,
          position: 'relative',
          zIndex: 2,
          boxShadow: data.needAction ? '0 -4px 12px rgba(0,0,0,0.04)' : '0 2px 10px rgba(0,0,0,0.03)',
          border: '1px solid #f1f5f9'
        }}
      >
        {/* Top Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            {/* Icon Box */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                color: '#10b981', // Emerald green
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Wrench size={20} weight="fill" />
            </Box>
            
            {/* Unit & Location */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, pt: 0.2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#334155', lineHeight: 1.1 }}>
                {data.unitNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.85rem' }}>
                {data.locationSubtitle}
              </Typography>
            </Box>
          </Box>
          
          {/* Status Badge */}
          <Box
            sx={{
              backgroundColor: statusBg,
              color: statusColor,
              px: 1.5,
              py: 0.5,
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 500,
              whiteSpace: 'nowrap'
            }}
          >
            {data.status}
          </Box>
        </Box>

        {/* Middle Section: Image and Details */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 2 }}>
          {/* Thumbnail Image */}
          <Box
            component="img"
            src={data.thumbnail}
            alt="Work Order"
            sx={{
              width: 48,
              height: 48,
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
          
          {/* Title & Description */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, pt: 0.2, overflow: 'hidden' }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '0.95rem', 
                color: '#1e293b', 
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {data.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                fontWeight: 400, 
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {data.description}
            </Typography>
          </Box>
        </Box>

        {/* Dashed Divider */}
        <Box 
          sx={{ 
            width: '100%', 
            height: '2px', 
            my: 1.5, 
            backgroundImage: 'linear-gradient(to right, #cbd5e1 50%, transparent 50%)',
            backgroundSize: '8px 2px',
            backgroundRepeat: 'repeat-x'
          }} 
        />

        {/* Bottom Section: Meta Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem' }}>
            {data.requestNumber}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
            {data.date}
          </Typography>
        </Box>
      </Box>

      {/* Attached Action Required Banner (Background Layer, at Bottom) */}
      {data.needAction && (
        <Box 
          sx={{ 
            backgroundColor: '#ffedd5', 
            color: '#ea580c', 
            px: 2, 
            pt: 2.5, 
            pb: 1.2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontSize: '0.8rem', 
            fontWeight: 700, 
            letterSpacing: '0.2px',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            mt: -1.5 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning size={16} weight="fill" />
            Action Required
          </Box>
          <ArrowRight size={16} weight="bold" />
        </Box>
      )}
    </Box>
  );
}
