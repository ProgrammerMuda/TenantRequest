/**
 * [V] VIEW COMPONENT: BottomNav
 * Fixed mobile bottom navigation bar with active highlights in #27b29b.
 */

import React from 'react';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  useTheme
} from '@mui/material';
import {
  ListChecks,
  Palette,
  Funnel,
  ShieldCheck
} from '@phosphor-icons/react';

export function BottomNav({ activeTab, onSelectTab, pendingCount }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <BottomNavigation
        value={activeTab}
        onChange={(event, newValue) => onSelectTab(newValue)}
        showLabels
        sx={{
          height: 64,
          backgroundColor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: theme.palette.text.secondary,
            minWidth: 'auto',
            padding: '6px 0',
            '&.Mui-selected': {
              color: '#27b29b',
              fontWeight: 700
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Actions"
          value="dashboard"
          icon={
            <Badge badgeContent={pendingCount} color="error" max={99}>
              <ListChecks size={22} weight={activeTab === 'dashboard' ? 'fill' : 'regular'} />
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Filter"
          value="filter"
          icon={<Funnel size={22} weight={activeTab === 'filter' ? 'fill' : 'regular'} />}
        />
        <BottomNavigationAction
          label="Preline Tokens"
          value="showcase"
          icon={<Palette size={22} weight={activeTab === 'showcase' ? 'fill' : 'regular'} />}
        />
        <BottomNavigationAction
          label="MVC Info"
          value="info"
          icon={<ShieldCheck size={22} weight={activeTab === 'info' ? 'fill' : 'regular'} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
