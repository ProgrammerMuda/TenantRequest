/**
 * [V] COMPONENT: AllServicesBottomSheet
 * Pixel-perfect bottom sheet modal matching design reference:
 * - Rounded sheet with smooth backdrop
 * - Pill view toggle (Grid / List)
 * - Borderless rounded search bar
 * - Squircle tile boxes (icon inside card, text outside below)
 * - Tenant Menu & Management Menu sections
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

// 3D Menu Icons
import billing3d from '../../assets/menu_icons/billing_3d.png';
import homeService3d from '../../assets/menu_icons/home_service_3d.png';
import reservation3d from '../../assets/menu_icons/reservation_3d.png';
import workRequest3d from '../../assets/menu_icons/work_request_3d.png';
import gigo3d from '../../assets/menu_icons/gigo_3d.png';
import workPermit3d from '../../assets/menu_icons/work_permit_3d.png';
import fitOutPermit3d from '../../assets/menu_icons/fit_out_permit_3d.png';
import package3d from '../../assets/menu_icons/package_3d.png';
import visitor3d from '../../assets/menu_icons/visitor_3d.png';
import asset3d from '../../assets/menu_icons/asset_3d.png';
import attendance3d from '../../assets/menu_icons/attendance_3d.png';
import incidental3d from '../../assets/menu_icons/incidental_3d.png';
import inspection3d from '../../assets/menu_icons/inspection_3d.png';
import payslip3d from '../../assets/menu_icons/payslip_3d.png';
import scanmeter3d from '../../assets/menu_icons/scanmeter_3d.png';
import tenantUnit3d from '../../assets/menu_icons/tenant_unit_3d.png';

const ALL_TENANT_SERVICES = [
  { id: 'billing', title: 'Billing &\nPayment', cleanTitle: 'Billing & Payment', icon: billing3d, category: 'Finance' },
  { id: 'goods_in_out', title: 'Goods In/Out', cleanTitle: 'Goods In/Out', icon: gigo3d, category: 'Logistics' },
  { id: 'home_service', title: 'Home Service', cleanTitle: 'Home Service', icon: homeService3d, category: 'Maintenance' },
  { id: 'package', title: 'Package', cleanTitle: 'Package', icon: package3d, category: 'Delivery' },
  { id: 'facility_reservation', title: 'Reservation', cleanTitle: 'Reservation', icon: reservation3d, category: 'Facilities' },
  { id: 'visitor', title: 'Visitor', cleanTitle: 'Visitor', icon: visitor3d, category: 'Security' },
  { id: 'work_order', title: 'Work Request', cleanTitle: 'Work Request', icon: workRequest3d, category: 'Engineering' },
  { id: 'work_permit', title: 'Work Permit', cleanTitle: 'Work Permit', icon: workPermit3d, category: 'Permits' },
  { id: 'fit_out_permit', title: 'Fit Out Permit', cleanTitle: 'Fit Out Permit', icon: fitOutPermit3d, category: 'Permits' }
];

const ALL_MANAGEMENT_SERVICES = [
  { id: 'tenant_unit', title: 'Tenant Unit', cleanTitle: 'Tenant Unit', icon: tenantUnit3d, category: 'Property Management' },
  { id: 'asset', title: 'Asset', cleanTitle: 'Asset Management', icon: asset3d, category: 'Operations' },
  { id: 'attendance', title: 'Attendance', cleanTitle: 'Attendance', icon: attendance3d, category: 'HR & Staff' },
  { id: 'incidental_report', title: 'Incidental\nReport', cleanTitle: 'Incidental Report', icon: incidental3d, category: 'Safety & Security' },
  { id: 'inspection', title: 'Inspection', cleanTitle: 'Inspection', icon: inspection3d, category: 'Quality Control' },
  { id: 'payslip', title: 'Pay Slip', cleanTitle: 'Pay Slip', icon: payslip3d, category: 'Payroll' },
  { id: 'scan_meter', title: 'Scan Meter', cleanTitle: 'Scan Meter', icon: scanmeter3d, category: 'Utilities' }
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
          animation: 'fadeIn 0.2s ease-out forwards',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 }
          }
        }}
      />

      {/* Sliding Sheet Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '92%',
          maxHeight: '92%',
          minHeight: 0,
          backgroundColor: '#ffffff',
          borderRadius: '32px 32px 0 0',
          boxShadow: '0 -12px 48px rgba(0, 0, 0, 0.28)',
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
        {/* Top Drag Handle Notch */}
        <Box sx={{ pt: 1.5, pb: 1.2, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: 50,
              height: 4.5,
              borderRadius: '4px',
              backgroundColor: '#cbd5e1'
            }}
          />
        </Box>

        {/* Header: Title + Segmented View Toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            pt: 0.5,
            pb: 2
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '1.32rem',
              color: '#1e293b',
              letterSpacing: '-0.02em',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            All Services
          </Typography>

          {/* Segmented View Toggle Button */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              borderRadius: '24px',
              p: '3.5px'
            }}
          >
            <Box
              onClick={() => setViewMode('grid')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                px: 1.8,
                py: 0.65,
                borderRadius: '20px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: viewMode === 'grid' ? '#20b29a' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#64748b',
                boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(32, 178, 154, 0.25)' : 'none'
              }}
            >
              <SquaresFour size={17} weight={viewMode === 'grid' ? 'fill' : 'bold'} />
              Grid
            </Box>

            <Box
              onClick={() => setViewMode('list')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                px: 1.8,
                py: 0.65,
                borderRadius: '20px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: viewMode === 'list' ? '#20b29a' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#64748b',
                boxShadow: viewMode === 'list' ? '0 2px 8px rgba(32, 178, 154, 0.25)' : 'none'
              }}
            >
              <ListIcon size={17} weight="bold" />
              List
            </Box>
          </Box>
        </Box>

        {/* Search Services Field */}
        <Box sx={{ px: 3, pb: 2.2 }}>
          <TextField
            fullWidth
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 1 }}>
                  <MagnifyingGlass size={22} color="#94a3b8" weight="bold" />
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
                borderRadius: '18px',
                backgroundColor: '#f8fafc',
                fontSize: '0.94rem',
                py: 0.4,
                px: 1,
                '& fieldset': {
                  border: 'none'
                },
                '& input::placeholder': {
                  color: '#94a3b8',
                  opacity: 1
                }
              }
            }}
          />
        </Box>

        {/* Scrollable Content Body */}
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 0,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            px: 3,
            pb: 6,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* SECTION 1: Tenant Menu */}
          {filteredTenantServices.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: '#1e293b',
                  mb: 1.8,
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                Tenant Menu
              </Typography>

              {viewMode === 'grid' ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: 1.6,
                    rowGap: 2.2
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
                        cursor: 'pointer',
                        userSelect: 'none',
                        '&:hover .icon-box': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateY(-3px)'
                        },
                        '&:active .icon-box': {
                          transform: 'scale(0.95)'
                        }
                      }}
                    >
                      {/* Squircle Card Container specifically for the icon */}
                      <Box
                        className="icon-box"
                        sx={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          backgroundColor: '#f8fafc',
                          borderRadius: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          p: 1.2
                        }}
                      >
                        <Box
                          component="img"
                          src={service.icon}
                          alt={service.cleanTitle}
                          sx={{
                            width: '58%',
                            height: '58%',
                            objectFit: 'contain',
                            display: 'block',
                            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.08))'
                          }}
                        />
                      </Box>

                      {/* Text strictly OUTSIDE the card below */}
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.74rem',
                          color: '#475569',
                          textAlign: 'center',
                          mt: 0.9,
                          lineHeight: 1.25,
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
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateX(3px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                          }}
                        >
                          <Box
                            component="img"
                            src={service.icon}
                            alt={service.cleanTitle}
                            sx={{
                              width: 28,
                              height: 28,
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
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
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: '#1e293b',
                  mb: 1.8,
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                Building Management
              </Typography>

              {viewMode === 'grid' ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: 1.6,
                    rowGap: 2.2
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
                        cursor: 'pointer',
                        userSelect: 'none',
                        '&:hover .icon-box': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateY(-3px)'
                        },
                        '&:active .icon-box': {
                          transform: 'scale(0.95)'
                        }
                      }}
                    >
                      {/* Squircle Card Container specifically for the icon */}
                      <Box
                        className="icon-box"
                        sx={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          backgroundColor: '#f8fafc',
                          borderRadius: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          p: 1.2
                        }}
                      >
                        <Box
                          component="img"
                          src={service.icon}
                          alt={service.cleanTitle}
                          sx={{
                            width: '58%',
                            height: '58%',
                            objectFit: 'contain',
                            display: 'block',
                            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.08))'
                          }}
                        />
                      </Box>

                      {/* Text strictly OUTSIDE the card below */}
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.74rem',
                          color: '#475569',
                          textAlign: 'center',
                          mt: 0.9,
                          lineHeight: 1.25,
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
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateX(3px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                          }}
                        >
                          <Box
                            component="img"
                            src={service.icon}
                            alt={service.cleanTitle}
                            sx={{
                              width: 28,
                              height: 28,
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
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
