/**
 * [V] VIEW: WorkPermitView
 * View showing the list of Work Permits (Izin Kerja) with Need Action approvals and filter tabs.
 */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Chip,
  Paper,
  Button
} from '@mui/material';
import {
  CaretLeft,
  MagnifyingGlass,
  FunnelSimple,
  Warning,
  CheckCircle,
  Clock,
  FileText,
  CalendarBlank,
  User,
  MapPin
} from '@phosphor-icons/react';

export const workPermitMockData = [
  {
    id: 'WP-2026-0088',
    permitType: 'Hot Work Permit (Pengelasan)',
    contractor: 'PT Teknik Mandiri Bersama',
    applicant: 'Budi Santoso (Supervisor)',
    location: 'Tower A - Lantai 8 (Ruang Chiller)',
    validPeriod: '31 Aug 2026 - 02 Sep 2026',
    needAction: true,
    actionType: 'Menunggu Persetujuan BM',
    status: 'Pending',
    statusColor: '#f59e0b',
    safetyOfficers: '2 Personil Bersertifikat K3',
    tools: 'Inverter Welding, Fire Extinguisher 6kg'
  },
  {
    id: 'WP-2026-0085',
    permitType: 'Working at Heights (> 2m)',
    contractor: 'CV Facade Clean Indonesia',
    applicant: 'Ahmad Fauzi',
    location: 'Exterior Facade Tower B Lt. 12-25',
    validPeriod: '01 Sep 2026 - 05 Sep 2026',
    needAction: true,
    actionType: 'Safety Inspection Checklist',
    status: 'Pending',
    statusColor: '#f59e0b',
    safetyOfficers: 'Full Body Harness + Gondola Inspected',
    tools: 'Gondola Motorized, Lifeline 16mm'
  },
  {
    id: 'WP-2026-0079',
    permitType: 'Electrical & Cable Routing',
    contractor: 'PT Cipta Daya Elektrik',
    applicant: 'Hendra Wijaya',
    location: 'Basement 1 - Main Distribution Panel',
    validPeriod: '28 Aug 2026 - 31 Aug 2026',
    needAction: false,
    status: 'Approved',
    statusColor: '#27b29b',
    safetyOfficers: 'Certified Electrician (LOTO ready)',
    tools: 'Megger Tester, Insulated Toolset'
  },
  {
    id: 'WP-2026-0062',
    permitType: 'General Civil & Fit Out',
    contractor: 'PT Graha Estetika Pratama',
    applicant: 'Dian Permana',
    location: 'Unit 15A - Renovasi Interior',
    validPeriod: '20 Aug 2026 - 29 Aug 2026',
    needAction: false,
    status: 'Completed',
    statusColor: '#64748b',
    safetyOfficers: 'Supervised by Security Post 2',
    tools: 'Drill, Sanding Machine, Vacuum'
  }
];

export function WorkPermitView({ controller }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    controller.setActiveTab('home');
  };

  const actionItems = workPermitMockData.filter(p => p.needAction);
  const filteredItems = workPermitMockData.filter(item => {
    if (activeFilter === 'action') return item.needAction;
    if (activeFilter === 'approved') return item.status === 'Approved';
    if (activeFilter === 'completed') return item.status === 'Completed';
    return true;
  }).filter(item => 
    item.permitType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contractor.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          zIndex: 10,
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <IconButton onClick={handleBack} sx={{ color: '#334155', p: 0, mr: 2 }}>
          <CaretLeft size={24} weight="bold" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#334155', fontSize: '1.1rem', flexGrow: 1, textAlign: 'center', pr: 4 }}>
          Work Permit
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, pb: 6 }}>
        {/* Search Bar */}
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            px: 1.5,
            py: 0.8,
            mb: 2,
            border: '1px solid #e2e8f0'
          }}
        >
          <MagnifyingGlass size={20} color="#94a3b8" />
          <InputBase
            placeholder="Cari nomor izin, jenis pekerjaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1, flexGrow: 1, fontSize: '0.85rem' }}
          />
          <IconButton size="small" sx={{ color: '#64748b' }}>
            <FunnelSimple size={18} />
          </IconButton>
        </Paper>

        {/* Action Needed Section */}
        {actionItems.length > 0 && activeFilter !== 'approved' && activeFilter !== 'completed' && (
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
              <Warning size={18} weight="fill" color="#e11d48" />
              <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                Need Action ({actionItems.length})
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {actionItems.map(item => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 1.8,
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #fecdd3',
                    boxShadow: '0 2px 8px rgba(225, 29, 72, 0.06)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Chip
                      label={item.id}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        backgroundColor: '#ffe4e6',
                        color: '#e11d48',
                        borderRadius: '6px'
                      }}
                    />
                    <Chip
                      icon={<Clock size={13} weight="fill" />}
                      label={item.actionType}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        backgroundColor: '#fffbeb',
                        color: '#b45309',
                        borderRadius: '6px'
                      }}
                    />
                  </Box>

                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', mb: 0.4 }}>
                    {item.permitType}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      <User size={14} color="#64748b" />
                      <Typography sx={{ fontSize: '0.76rem', color: '#475569' }}>
                        {item.contractor} ({item.applicant})
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      <MapPin size={14} color="#64748b" />
                      <Typography sx={{ fontSize: '0.76rem', color: '#475569' }}>
                        {item.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      <CalendarBlank size={14} color="#64748b" />
                      <Typography sx={{ fontSize: '0.76rem', color: '#475569' }}>
                        {item.validPeriod}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#27b29b',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        borderRadius: '6px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1aa38e' }
                      }}
                    >
                      Setujui Izin
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#cbd5e1',
                        color: '#475569',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        borderRadius: '6px',
                        textTransform: 'none',
                        '&:hover': { borderColor: '#94a3b8' }
                      }}
                    >
                      Periksa K3
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* All / Filtered Permits Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
              Daftar Work Permit ({filteredItems.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {['all', 'action', 'approved'].map(tab => (
                <Chip
                  key={tab}
                  label={tab === 'all' ? 'Semua' : tab === 'action' ? 'Perlu Aksi' : 'Aktif'}
                  size="small"
                  onClick={() => setActiveFilter(tab)}
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: activeFilter === tab ? 700 : 500,
                    backgroundColor: activeFilter === tab ? '#27b29b' : '#e2e8f0',
                    color: activeFilter === tab ? '#ffffff' : '#475569',
                    borderRadius: '6px'
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            {filteredItems.map(item => (
              <Paper
                key={item.id}
                elevation={0}
                sx={{
                  p: 1.6,
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>
                    {item.permitType}
                  </Typography>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      backgroundColor: item.status === 'Approved' ? '#ecfdf5' : '#f8fafc',
                      color: item.status === 'Approved' ? '#059669' : '#64748b',
                      borderRadius: '6px'
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: '0.76rem', color: '#64748b', mb: 0.4 }}>
                  {item.id} • {item.contractor}
                </Typography>
                <Typography sx={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  Lokasi: {item.location}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
