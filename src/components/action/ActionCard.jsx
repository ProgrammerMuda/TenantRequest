/**
 * [V] VIEW COMPONENT: ActionCard
 * Renders individual action items with modern card layout, Preline status colors,
 * Montserrat typography, and Phosphor icons.
 */

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Calendar,
  Clock,
  CheckCircle,
  WarningCircle,
  DotsThreeVertical,
  Trash,
  Tag,
  ArrowRight
} from '@phosphor-icons/react';
import { ACTION_STATUS, ACTION_PRIORITY } from '../../models/ActionItemModel';

export function ActionCard({ item, onToggleComplete, onUpdateStatus, onDelete }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const isCompleted = item.status === ACTION_STATUS.COMPLETED;

  // Status configuration with Preline color tokens
  const statusConfig = {
    [ACTION_STATUS.PENDING]: {
      label: 'Need Action',
      color: '#f59e0b', // Amber
      bgColor: 'rgba(245, 158, 11, 0.1)',
      icon: Clock
    },
    [ACTION_STATUS.IN_PROGRESS]: {
      label: 'Diproses',
      color: '#06b6d4', // Cyan
      bgColor: 'rgba(6, 182, 212, 0.1)',
      icon: WarningCircle
    },
    [ACTION_STATUS.COMPLETED]: {
      label: 'Selesai',
      color: '#10b981', // Emerald
      bgColor: 'rgba(16, 185, 129, 0.1)',
      icon: CheckCircle
    }
  };

  // Priority configuration
  const priorityConfig = {
    [ACTION_PRIORITY.HIGH]: {
      label: 'High Priority',
      color: '#f43f5e', // Rose
      bgColor: 'rgba(244, 63, 94, 0.1)'
    },
    [ACTION_PRIORITY.MEDIUM]: {
      label: 'Medium',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    [ACTION_PRIORITY.LOW]: {
      label: 'Low',
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)'
    }
  };

  const currentStatus = statusConfig[item.status] || statusConfig[ACTION_STATUS.PENDING];
  const currentPriority = priorityConfig[item.priority] || priorityConfig[ACTION_PRIORITY.MEDIUM];
  const StatusIcon = currentStatus.icon;

  return (
    <Card
      sx={{
        transition: 'all 0.25s ease-in-out',
        borderLeft: `4px solid ${isCompleted ? '#10b981' : '#27b29b'}`,
        opacity: isCompleted ? 0.85 : 1,
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 12px 28px rgba(0,0,0,0.5)'
            : '0 12px 28px rgba(39, 178, 155, 0.12)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={isCompleted ? 'Mark as Pending' : 'Mark as Complete'}>
              <Checkbox
                checked={isCompleted}
                onChange={() => onToggleComplete(item.id)}
                sx={{
                  color: '#27b29b',
                  '&.Mui-checked': {
                    color: '#10b981',
                  },
                  p: 0.5
                }}
              />
            </Tooltip>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: theme.palette.text.secondary, fontWeight: 600 }}>
              {item.id}
            </Typography>
            <Chip
              label={item.category}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.72rem',
                fontWeight: 600,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                color: theme.palette.text.secondary
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              icon={<StatusIcon size={14} weight="bold" style={{ color: currentStatus.color }} />}
              label={currentStatus.label}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: currentStatus.bgColor,
                color: currentStatus.color,
                border: `1px solid ${currentStatus.color}33`
              }}
            />

            <IconButton size="small" onClick={handleOpenMenu}>
              <DotsThreeVertical size={20} weight="bold" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              PaperProps={{
                sx: { borderRadius: 3, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', minWidth: 160 }
              }}
            >
              <MenuItem
                onClick={() => {
                  onUpdateStatus(item.id, ACTION_STATUS.PENDING);
                  handleCloseMenu();
                }}
                disabled={item.status === ACTION_STATUS.PENDING}
              >
                Set Pending
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onUpdateStatus(item.id, ACTION_STATUS.IN_PROGRESS);
                  handleCloseMenu();
                }}
                disabled={item.status === ACTION_STATUS.IN_PROGRESS}
              >
                Set Diproses
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onUpdateStatus(item.id, ACTION_STATUS.COMPLETED);
                  handleCloseMenu();
                }}
                disabled={item.status === ACTION_STATUS.COMPLETED}
              >
                Set Selesai
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDelete(item.id);
                  handleCloseMenu();
                }}
                sx={{ color: '#f43f5e' }}
              >
                <Trash size={16} style={{ marginRight: 8 }} />
                Hapus Action
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            lineHeight: 1.4,
            mb: 1,
            textDecoration: isCompleted ? 'line-through' : 'none',
            color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary
          }}
        >
          {item.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {item.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
          {item.tags.map((tag, idx) => (
            <Chip
              key={idx}
              icon={<Tag size={12} />}
              label={tag}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                backgroundColor: 'rgba(39, 178, 155, 0.08)',
                color: '#27b29b',
                fontWeight: 600
              }}
            />
          ))}
        </Box>

        {/* Footer info: Priority, Assignee, Due Date */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1.5,
            borderTop: `1px solid ${theme.palette.divider}`
          }}
        >
          <Chip
            label={currentPriority.label}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.72rem',
              fontWeight: 700,
              backgroundColor: currentPriority.bgColor,
              color: currentPriority.color
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: theme.palette.text.secondary }}>
              <Calendar size={15} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {item.dueDate}
              </Typography>
            </Box>

            <Tooltip title={`Assignee: ${item.assignee.name}`}>
              <Avatar
                src={item.assignee.avatar}
                alt={item.assignee.name}
                sx={{ width: 26, height: 26, border: '2px solid #27b29b' }}
              >
                {item.assignee.name.charAt(0)}
              </Avatar>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
