/**
 * [V] VIEW COMPONENT: OverviewSection
 * Displays property operational KPI metrics in a 2x2 grid matching the screenshot:
 * - INVOICE: 381 / 1079 paid, 698 unpaid
 * - ATTENDANCE: 108 / 218, 50% present
 * - REQUEST: 13 pending, Needs review
 * - UTILITY: 0 / 2032 scanned, 0% recorded
 */

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import {
  Receipt,
  UsersThree,
  ClipboardText,
  Gauge,
  CaretRight
} from '@phosphor-icons/react';

export function OverviewSection({ data, onFullReportClick }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const defaultData = [
    {
      id: 'invoice',
      title: 'INVOICE',
      icon: Receipt,
      mainValue: '381',
      subValue: '/ 1079 paid',
      statusText: '698 unpaid'
    },
    {
      id: 'attendance',
      title: 'ATTENDANCE',
      icon: UsersThree,
      mainValue: '108',
      subValue: '/ 218',
      statusText: '50% present'
    },
    {
      id: 'request',
      title: 'REQUEST',
      icon: ClipboardText,
      mainValue: '13',
      subValue: 'pending',
      statusText: 'Needs review'
    },
    {
      id: 'utility',
      title: 'UTILITY',
      icon: Gauge,
      mainValue: '0',
      subValue: '/ 2032 scanned',
      statusText: '0% recorded'
    }
  ];

  const overviewData = data || defaultData;

  return (
    <Box sx={{ mb: 0 }}>
      {/* Header Row: Overview & Full Report > */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
          px: 0.5
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            color: theme.palette.text.primary,
            letterSpacing: '-0.3px'
          }}
        >
          Overview
        </Typography>

        <Box
          onClick={onFullReportClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.4,
            cursor: 'pointer',
            color: '#20b29c',
            transition: 'all 0.2s',
            '&:hover': {
              opacity: 0.8,
              transform: 'translateX(2px)'
            }
          }}
        >
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: "'Montserrat', sans-serif",
              color: '#20b29c'
            }}
          >
            Full Report
          </Typography>
          <CaretRight size={15} weight="bold" color="#20b29c" />
        </Box>
      </Box>

      {/* 2x2 Metric Cards Grid */}
      <Grid container spacing={1.5}>
        {overviewData.map(card => {
          const Icon = card.icon;

          return (
            <Grid item xs={6} key={card.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.6,
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1.5px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.8,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: '#20b29c',
                    boxShadow: 'none'
                  }
                }}
              >
                {/* Header: Icon & Category Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Icon size={18} weight="fill" color="#20b29c" />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      fontFamily: "'Montserrat', sans-serif",
                      color: isDark ? '#94a3b8' : '#526071',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>

                {/* Big Metric with Subvalue */}
                <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.45rem',
                      fontFamily: "'Montserrat', sans-serif",
                      color: theme.palette.text.primary,
                      lineHeight: 1.1
                    }}
                  >
                    {card.mainValue}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      fontFamily: "'Montserrat', sans-serif",
                      color: isDark ? '#64748b' : '#8898aa',
                      lineHeight: 1
                    }}
                  >
                    {card.subValue}
                  </Typography>
                </Box>

                {/* Subtitle / Status indicator in Teal */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#20b29c',
                    lineHeight: 1.2
                  }}
                >
                  {card.statusText}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
