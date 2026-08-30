/**
 * [V] COMPONENT: AllServicesBottomSheet
 * Bottom sheet modal displaying all Tenant and Management services.
 * Features:
 * - Clean drag notch and curved sheet styling (matching design screenshot)
 * - Grid & List view toggle
 * - Instant search filter across all services
 * - 3D icons for all service tiles
 * - Seamless navigation on service click
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  SquaresFour,
  List as ListIcon,
  MagnifyingGlass,
  CaretRight,
  X
} from '@phosphor-icons/react';

// Existing 3D Icons
import billing3d from '../../assets/menu_icons/billing_3d.png';
import homeService3d from '../../assets/menu_icons/home_service_3d.png';
import reservation3d from '../../assets/menu_icons/reservation_3d.png';
import workRequest3d from '../../assets/menu_icons/work_request_3d.png';
import gigo3d from '../../assets/menu_icons/gigo_3d.png';
import workPermit3d from '../../assets/menu_icons/work_permit_3d.png';
import fitOutPermit3d from '../../assets/menu_icons/fit_out_permit_3d.png';

// Extracted Management & Tenant 3D Icons
import package3d from '../../assets/menu_icons/package_3d.png';
import visitor3d from '../../assets/menu_icons/visitor_3d.png';
import asset3d from '../../assets/menu_icons/asset_3d.png';
import attendance3d from '../../assets/menu_icons/attendance_3d.png';
import incidental3d from '../../assets/menu_icons/incidental_3d.png';
import inspection3d from '../../assets/menu_icons/inspection_3d.png';
import payslip3d from '../../assets/menu_icons/payslip_3d.png';
import scanmeter3d from '../../assets/menu_icons/scanmeter_3d.png';

const ALL_TENANT_SERVICES = [
  { id: 'billing', title: 'Billing &\nPayment', cleanTitle: 'Billing & Payment', icon: billing3d, category: 'Finance' },
  { id: 'goods_in_out', title: 'Goods\nIn/Out', cleanTitle: 'Goods In/Out', icon: gigo3d, category: 'Logistics' },
  { id: 'home_service', title: 'Home\nService', cleanTitle: 'Home Service', icon: homeService3d, category: 'Maintenance' },
  { id: 'package', title: 'Package', cleanTitle: 'Package', icon: package3d, category: 'Delivery' },
  { id: 'facility_reservation', title: 'Reservation', cleanTitle: 'Reservation', icon: reservation3d, category: 'Facilities' },
  { id: 'visitor', title: 'Visitor', cleanTitle: 'Visitor', icon: visitor3d, category: 'Security' },
  { id: 'work_order', title: 'Work\nOrder', cleanTitle: 'Work Order', icon: workRequest3d, category: 'Engineering' },
  { id: 'work_permit', title: 'Work\nPermit', cleanTitle: 'Work Permit', icon: workPermit3d, category: 'Permits' },
  { id: 'fit_out_permit', title: 'Fit Out\nPermit', cleanTitle: 'Fit Out Permit', icon: fitOutPermit3d, category: 'Permits' }
];

const ALL_MANAGEMENT_SERVICES = [
  { id: 'asset', title: 'Asset', cleanTitle: 'Asset Management', icon: asset3d, category: 'Operations' },
  { id: 'attendance', title: 'Attendance', cleanTitle: 'Staff Attendance', icon: attendance3d, category: 'HR & Staff' },
  { id: 'incidental_report', title: 'Incidental\nReport', cleanTitle: 'Incidental Report', icon: incidental3d, category: 'Safety & Security' },
  { id: 'inspection', title: 'Inspection', cleanTitle: 'Facility Inspection', icon: inspection3d, category: 'Quality Control' },
  { id: 'payslip', title: 'Pay Slip', cleanTitle: 'Staff Pay Slip', icon: payslip3d, category: 'Payroll' },
  { id: 'scan_meter', title: 'Scan\nMeter', cleanTitle: 'Scan Meter Utility', icon: scanmeter3d, category: 'Utilities & Engineering' }
];

export function AllServicesBottomSheet({ open, onClose, onSelectService }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services by search term
  const filteredTenantServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_TENANT_SERVICES;
    return ALL_TENANT_SERVICES.filter(s =>
      s.cleanTitle.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredManagementServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_MANAGEMENT_SERVICES;
    return ALL_MANAGEMENT_SERVICES.filter(s =>
      s.cleanTitle.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!open) return null;

  const handleItemClick = (service) => {
    onClose();
    if (onSelectService) {
      onSelectService(service);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        pointerEvents: open ? 'auto' : 'none'
      }}
    >
      {/* Dimmed Backdrop Overlay */}
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(3px)',
          animation: 'fadeIn 0.25s ease-out forwards',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 }
          }
        }}
      />

      {/* Sliding Sheet Card Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxHeight: '85%',
          backgroundColor: '#ffffff',
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1401,
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          '@keyframes slideUp': {
            from: { transform: 'translateY(100%)' },
            to: { transform: 'translateY(0)' }
          }
        }}
      >
        {/* Drag Handle Notch */}
        <Box sx={{ pt: 1.5, pb: 1, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: 44,
              height: 5,
              borderRadius: '3px',
              backgroundColor: '#cbd5e1'
            }}
          />
        </Box>

        {/* Header: Title + View Toggle (Grid / List) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            pt: 0.5,
            pb: 1.8
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: '1.25rem',
              color: '#0f172a',
              letterSpacing: '-0.01em'
            }}
          >
            All Services
          </Typography>

          {/* Segmented View Mode Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              borderRadius: '10px',
              p: '3px',
              gap: '4px'
            }}
          >
            <Box
              onClick={() => setViewMode('grid')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1.4,
                py: 0.5,
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: viewMode === 'grid' ? '#27b29b' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#64748b'
              }}
            >
              <SquaresFour size={16} weight={viewMode === 'grid' ? 'fill' : 'regular'} />
              Grid
            </Box>

            <Box
              onClick={() => setViewMode('list')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1.4,
                py: 0.5,
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: viewMode === 'list' ? '#27b29b' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#64748b'
              }}
            >
              <ListIcon size={16} weight={viewMode === 'list' ? 'bold' : 'regular'} />
              List
            </Box>
          </Box>
        </Box>

        {/* Search Services Field */}
        <Box sx={{ px: 2.5, pb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlass size={18} color="#94a3b8" weight="bold" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <X size={16} color="#94a3b8" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: '14px',
                backgroundColor: '#f8fafc',
                fontSize: '0.9rem',
                '& fieldset': {
                  borderColor: '#e2e8f0'
                },
                '&:hover fieldset': {
                  borderColor: '#cbd5e1'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#27b29b'
                }
              }
            }}
          />
        </Box>

        {/* Scrollable Content Body */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            px: 2.5,
            pb: 5,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* SECTION 1: Tenant Menu */}
          {filteredTenantServices.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  color: '#1e293b',
                  mb: 1.5
                }}
              >
                Tenant Menu
              </Typography>

              {viewMode === 'grid' ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1.2
                  }}
                >
                  {filteredTenantServices.map((service) => (
                    <Box
                      key={service.id}
                      onClick={() => handleItemClick(service)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1.2,
                        minHeight: 96,
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        userSelect: 'none',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateY(-2px)'
                        },
                        '&:active': {
                          transform: 'scale(0.96)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={service.icon}
                        alt={service.cleanTitle}
                        sx={{
                          width: 44,
                          height: 44,
                          objectFit: 'contain',
                          display: 'block',
                          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.08))'
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          color: '#334155',
                          textAlign: 'center',
                          mt: 0.8,
                          lineHeight: 1.2,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                /* List Mode */
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {filteredTenantServices.map((service) => (
                    <Box
                      key={service.id}
                      onClick={() => handleItemClick(service)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.2,
                        px: 1.6,
                        backgroundColor: '#f8fafc',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateX(3px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          component="img"
                          src={service.icon}
                          alt={service.cleanTitle}
                          sx={{
                            width: 38,
                            height: 38,
                            objectFit: 'contain'
                          }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                            {service.cleanTitle}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.72rem' }}>
                            {service.category}
                          </Typography>
                        </Box>
                      </Box>
                      <CaretRight size={18} color="#94a3b8" weight="bold" />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* SECTION 2: Management Menu */}
          {filteredManagementServices.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  color: '#1e293b',
                  mb: 1.5
                }}
              >
                Management Menu
              </Typography>

              {viewMode === 'grid' ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1.2
                  }}
                >
                  {filteredManagementServices.map((service) => (
                    <Box
                      key={service.id}
                      onClick={() => handleItemClick(service)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1.2,
                        minHeight: 96,
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        userSelect: 'none',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateY(-2px)'
                        },
                        '&:active': {
                          transform: 'scale(0.96)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={service.icon}
                        alt={service.cleanTitle}
                        sx={{
                          width: 44,
                          height: 44,
                          objectFit: 'contain',
                          display: 'block',
                          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.08))'
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          color: '#334155',
                          textAlign: 'center',
                          mt: 0.8,
                          lineHeight: 1.2,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                /* List Mode */
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {filteredManagementServices.map((service) => (
                    <Box
                      key={service.id}
                      onClick={() => handleItemClick(service)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.2,
                        px: 1.6,
                        backgroundColor: '#f8fafc',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateX(3px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          component="img"
                          src={service.icon}
                          alt={service.cleanTitle}
                          sx={{
                            width: 38,
                            height: 38,
                            objectFit: 'contain'
                          }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                            {service.cleanTitle}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.72rem' }}>
                            {service.category}
                          </Typography>
                        </Box>
                      </Box>
                      <CaretRight size={18} color="#94a3b8" weight="bold" />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* Empty Search Results Feedback */}
          {filteredTenantServices.length === 0 && filteredManagementServices.length === 0 && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Typography sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.92rem' }}>
                No services found for "{searchQuery}"
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block' }}>
                Try searching with different keywords
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
