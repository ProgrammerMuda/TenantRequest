/**
 * [V] VIEW COMPONENT: PermitCard
 * Card item for Fit Out Permit List
 */
import React from 'react';
import { Box, Typography, Card, Divider } from '@mui/material';
import { FileText, Warning, ArrowRight } from '@phosphor-icons/react';
import { PERMIT_STATUS } from '../../models/FitOutPermitModel';

export function PermitCard({ data, onClick }) {
  // Determine status color
  let statusColor = '#ffffff'; // White text for all badges
  let statusBg = '#94a3b8';    // Default slate

  switch (data.status) {
    case PERMIT_STATUS.WAITING_APPROVAL:
    case PERMIT_STATUS.WAITING_CONFIRMATION:
    case PERMIT_STATUS.WAITING_PAYMENT:
      statusBg = '#f97316'; // Orange
      break;
    case PERMIT_STATUS.INSPECTION:
      statusBg = '#eab308'; // Yellow
      break;
    case PERMIT_STATUS.APPROVED:
      statusBg = '#a855f7'; // Purple
      break;
    case PERMIT_STATUS.ON_WORK:
      statusBg = '#3b82f6'; // Blue
      break;
    case PERMIT_STATUS.INSPECTED:
    case PERMIT_STATUS.COMPLETE:
      statusBg = '#22c55e'; // Green
      break;
    case PERMIT_STATUS.SETTLEMENT:
      statusBg = '#334155'; // Slate 700
      break;
    default:
      statusBg = '#94a3b8';
  }

  return (
    <Box 
      onClick={onClick}
      sx={{ 
        mb: 2, 
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:active': onClick ? { transform: 'scale(0.985)' } : {}
      }}
    >
      
      {/* Main White Card (Foreground Layer) */}
      <Box 
        sx={{ 
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          p: 2,
          position: 'relative',
          zIndex: 2,
          boxShadow: data.needAction ? '0 -4px 12px rgba(0,0,0,0.04)' : '0 1px 3px rgba(0,0,0,0.02)'
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
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              color: '#10b981', // Emerald green icon
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FileText size={20} weight="fill" />
          </Box>
          
          {/* Title & Unit */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#334155', lineHeight: 1.1 }}>
              {data.unitNumber}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.9rem' }}>
              {data.title}
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
            whiteSpace: 'nowrap',
            flexShrink: 0,
            ml: 1 // Add a little margin left just in case title gets too close
          }}
        >
          {data.status}
        </Box>
      </Box>

      {/* Timeline Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 1, position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.1 }}>
            Start Date
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', fontSize: '1rem' }}>
            {data.startDate}
          </Typography>
        </Box>

        {/* Connecting Line with Duration */}
        <Box sx={{ flexGrow: 1, mx: 3, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
           <Typography 
            variant="caption" 
            sx={{ 
              position: 'absolute', 
              top: -24, 
              color: '#3b82f6', 
              fontWeight: 500, 
              fontSize: '0.9rem',
            }}
          >
            {data.duration}
          </Typography>
          
          <Box sx={{ width: '100%', height: '1.5px', backgroundColor: '#3b82f6', position: 'relative' }}>
            <Box sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#3b82f6' }} />
            <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.1 }}>
            End Date
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', fontSize: '1rem' }}>
            {data.endDate}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ fontWeight: 500, color: '#334155', fontSize: '0.9rem' }}>
          {data.permitNumber}
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Submitted {data.submittedAt}
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
            pt: 2.5, // Extra padding to hide behind the white card
            pb: 1.2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontSize: '0.8rem', 
            fontWeight: 700, 
            letterSpacing: '0.2px',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            mt: -1.5 // Pull up behind the white card
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
