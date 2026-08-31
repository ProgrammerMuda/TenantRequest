/**
 * [V] VIEW: TenantUnitView
 * Complete multi-level management view for Tenant Unit (Building Management):
 * - Level 1: Tower List (per site) with cross-tower search & site occupancy stats
 * - Level 2: Unit List (per tower) with status filter chips & search
 * - Level 3: Unit Detail with persistent summary header & 4 tabs:
 *     1. Overview (Unit specs, legal letter, & utilities/meter)
 *     2. Members (Tenant members with role badges, add/edit/delete drawers)
 *     3. Kendaraan (Vehicles linked to tenant members)
 *     4. Bill Settings (Utility toggles, IPL settings, & QR meter previews)
 * - Interactive Bottom Sheet Drawers:
 *     - Assign / Ganti Penghuni Drawer
 *     - Tambah / Edit Tenant Member Drawer
 *     - Tambah Kendaraan Drawer (linked to tenant members)
 *     - QR Meter Preview & Download Modal
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Alert
} from '@mui/material';
import {
  CaretLeft,
  CaretRight,
  Building,
  Door,
  User,
  Users,
  Car,
  Receipt,
  QrCode,
  Plus,
  Trash,
  PencilSimple,
  CheckCircle,
  Lightning,
  Drop,
  ShieldCheck,
  UserPlus,
  ArrowSquareOut,
  DownloadSimple,
  X,
  IdentificationBadge,
  Sparkle,
  Phone,
  Envelope,
  Info
} from '@phosphor-icons/react';

import {
  UNIT_STATUS,
  MEMBER_ROLES,
  initialTowersData,
  initialUnitsData
} from '../models/TenantUnitModel';

export function TenantUnitView({ controller }) {
  // Navigation levels: 'towers' | 'units' | 'unit_detail'
  const [navLevel, setNavLevel] = useState('towers');
  const [selectedTower, setSelectedTower] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [towerSheetTower, setTowerSheetTower] = useState(null); // bottom sheet preview

  // Dynamic Units State
  const [units, setUnits] = useState(initialUnitsData);

  // Unit Detail Tab: 'overview' | 'members' | 'vehicles' | 'bill_settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Filter States
  const [unitStatusFilter, setUnitStatusFilter] = useState('All'); // 'All' | 'Occupied' | 'Vacant' | 'Disewakan'
  const [floorFilter, setFloorFilter] = useState('All'); // 'All' | '01' | '02' ...
  const [displayLimit, setDisplayLimit] = useState(25); // Progressive load limit for hundreds of units

  // Drawers & Modals State
  const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);
  const [memberDrawerOpen, setMemberDrawerOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [vehicleDrawerOpen, setVehicleDrawerOpen] = useState(false);
  const [qrModalData, setQrModalData] = useState(null); // { title, code, type }

  // Assign Form State
  const [assignType, setAssignType] = useState('Penyewa'); // 'Pemilik' | 'Penyewa'
  const [assignName, setAssignName] = useState('');
  const [assignSince, setAssignSince] = useState('01 Feb 2026');

  // Member Form State
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('Keluarga');

  // Vehicle Form State
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleType, setVehicleType] = useState('Mobil');
  const [vehicleMemberId, setVehicleMemberId] = useState('');

  // Selected Unit Data Lookup
  const selectedUnit = useMemo(() => {
    return units.find(u => u.id === selectedUnitId) || null;
  }, [units, selectedUnitId]);

  // Site Stats Calculation
  const siteStats = useMemo(() => {
    const total = units.length;
    const occupied = units.filter(u => u.status === UNIT_STATUS.OCCUPIED || u.status === UNIT_STATUS.RENTED).length;
    const vacant = units.filter(u => u.status === UNIT_STATUS.VACANT).length;
    const rate = total > 0 ? Math.round((occupied / total) * 100) : 0;
    return { total, occupied, vacant, rate };
  }, [units]);

  // Unique Floors for selected tower
  const availableFloors = useMemo(() => {
    if (!selectedTower) return [];
    const towerUnits = units.filter(u => u.tower_id === selectedTower.id);
    const floors = [...new Set(towerUnits.map(u => u.floor))].sort((a, b) => parseInt(a) - parseInt(b));
    return ['All', ...floors];
  }, [units, selectedTower]);

  // Filtered Units in Selected Tower (supporting hundreds of units)
  const filteredUnits = useMemo(() => {
    if (!selectedTower) return [];
    return units.filter(u => {
      if (u.tower_id !== selectedTower.id) return false;
      if (unitStatusFilter !== 'All' && u.status !== unitStatusFilter) return false;
      if (floorFilter !== 'All' && u.floor !== floorFilter) return false;
      return true;
    });
  }, [units, selectedTower, unitStatusFilter, floorFilter]);

  // Displayed Units (with progressive pagination when browsing hundreds of units)
  const displayedUnits = useMemo(() => {
    if (floorFilter !== 'All') {
      return filteredUnits;
    }
    return filteredUnits.slice(0, displayLimit);
  }, [filteredUnits, floorFilter, displayLimit]);

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const handleBack = () => {
    if (navLevel === 'unit_detail') {
      setNavLevel('units');
    } else if (navLevel === 'units') {
      setNavLevel('towers');
      setSelectedTower(null);
    } else {
      controller.setActiveTab('home');
    }
  };

  const handleSelectTower = (tower) => {
    setTowerSheetTower(tower); // open bottom sheet preview instead of direct navigation
  };

  const handleEnterTower = (tower) => {
    setSelectedTower(tower);
    setUnitStatusFilter('All');
    setFloorFilter('All');
    setDisplayLimit(25);
    setNavLevel('units');
    setTowerSheetTower(null);
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnitId(unit.id);
    setActiveTab('overview');
    setNavLevel('unit_detail');
  };

  // Toggle Bill Settings
  const handleToggleBillSetting = (key) => {
    if (!selectedUnit) return;
    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnit.id) {
        return {
          ...u,
          bill_settings: {
            ...u.bill_settings,
            [key]: !u.bill_settings[key]
          }
        };
      }
      return u;
    }));
  };

  // Assign Occupant Handler
  const handleOpenAssignDrawer = () => {
    if (!selectedUnit) return;
    setAssignType(selectedUnit.status === UNIT_STATUS.RENTED ? 'Penyewa' : 'Pemilik');
    setAssignName(selectedUnit.status === UNIT_STATUS.RENTED ? (selectedUnit.members.find(m => m.role === 'Penyewa')?.name || '') : '');
    setAssignSince('01 Feb 2026');
    setAssignDrawerOpen(true);
  };

  const handleSaveAssign = () => {
    if (!selectedUnit) return;
    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnit.id) {
        if (assignType === 'Pemilik') {
          // Owner moves in: status becomes Occupied
          const newMember = {
            id: `m-${Date.now()}`,
            name: u.owner.name,
            role: 'Pemilik',
            is_occupant: true,
            since: assignSince || '01 Feb 2026'
          };
          return {
            ...u,
            status: UNIT_STATUS.OCCUPIED,
            members: [newMember]
          };
        } else {
          // Tenant moves in: status becomes Disewakan
          const tenantName = assignName.trim() || 'Penyewa Baru';
          const newMember = {
            id: `m-${Date.now()}`,
            name: tenantName,
            role: 'Penyewa',
            is_occupant: true,
            since: assignSince || '01 Feb 2026'
          };
          return {
            ...u,
            status: UNIT_STATUS.RENTED,
            members: [newMember]
          };
        }
      }
      return u;
    }));
    setAssignDrawerOpen(false);
  };

  // Member Handlers
  const handleOpenAddMember = () => {
    setEditingMember(null);
    setMemberName('');
    setMemberRole('Keluarga');
    setMemberDrawerOpen(true);
  };

  const handleOpenEditMember = (m) => {
    setEditingMember(m);
    setMemberName(m.name);
    setMemberRole(m.role);
    setMemberDrawerOpen(true);
  };

  const handleSaveMember = () => {
    if (!selectedUnit || !memberName.trim()) return;
    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnit.id) {
        if (editingMember) {
          return {
            ...u,
            members: u.members.map(m => m.id === editingMember.id ? { ...m, name: memberName.trim(), role: memberRole } : m)
          };
        } else {
          const newMember = {
            id: `m-${Date.now()}`,
            name: memberName.trim(),
            role: memberRole,
            is_occupant: false,
            since: 'Hari ini'
          };
          return {
            ...u,
            members: [...u.members, newMember]
          };
        }
      }
      return u;
    }));
    setMemberDrawerOpen(false);
  };

  const handleDeleteMember = (memberId) => {
    if (!selectedUnit) return;
    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnit.id) {
        const updatedMembers = u.members.filter(m => m.id !== memberId);
        // If all members deleted, mark as Vacant
        const newStatus = updatedMembers.length === 0 ? UNIT_STATUS.VACANT : u.status;
        return {
          ...u,
          status: newStatus,
          members: updatedMembers,
          vehicles: u.vehicles.filter(v => v.member_id !== memberId)
        };
      }
      return u;
    }));
  };

  // Vehicle Handlers
  const handleOpenAddVehicle = () => {
    setVehiclePlate('');
    setVehicleBrand('');
    setVehicleColor('');
    setVehicleType('Mobil');
    // Default member link
    if (selectedUnit && selectedUnit.members.length > 0) {
      setVehicleMemberId(selectedUnit.members[0].id);
    } else {
      setVehicleMemberId('');
    }
    setVehicleDrawerOpen(true);
  };

  const handleSaveVehicle = () => {
    if (!selectedUnit || !vehiclePlate.trim() || !vehicleMemberId) return;
    const ownerMember = selectedUnit.members.find(m => m.id === vehicleMemberId);
    const newVehicle = {
      id: `v-${Date.now()}`,
      plate_number: vehiclePlate.toUpperCase().trim(),
      brand_model: vehicleBrand.trim() || 'Kendaraan',
      color: vehicleColor.trim() || 'Standar',
      type: vehicleType,
      member_id: vehicleMemberId,
      member_name: ownerMember ? ownerMember.name : '-'
    };
    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnit.id) {
        return {
          ...u,
          vehicles: [...u.vehicles, newVehicle]
        };
      }
      return u;
    }));
    setVehicleDrawerOpen(false);
  };

  const handleDeleteVehicle = (vehicleId) => {
    if (!selectedUnit) return;
    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnit.id) {
        return {
          ...u,
          vehicles: u.vehicles.filter(v => v.id !== vehicleId)
        };
      }
      return u;
    }));
  };

  // Status Badge Component (reusing existing token colors)
  const renderStatusBadge = (status) => {
    let bg = '#f1f5f9';
    let text = '#64748b';
    let border = '#e2e8f0';

    if (status === UNIT_STATUS.OCCUPIED) {
      bg = '#ecfdf5';
      text = '#059669';
      border = '#a7f3d0';
    } else if (status === UNIT_STATUS.RENTED) {
      bg = '#eff6ff';
      text = '#2563eb';
      border = '#bfdbfe';
    } else if (status === UNIT_STATUS.VACANT) {
      bg = '#fff7ed';
      text = '#ea580c';
      border = '#ffedd5';
    }

    return (
      <Box
        sx={{
          backgroundColor: bg,
          color: text,
          border: `1px solid ${border}`,
          borderRadius: '8px',
          px: 1.2,
          py: 0.35,
          fontSize: '0.72rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          lineHeight: 1.2
        }}
      >
        {status}
      </Box>
    );
  };

  // Active Occupant resolver based on prompt rules:
  // If occupied by Owner: Owner is the occupant
  // If rented: Tenant with is_occupant: true is the occupant
  // If vacant: null
  const activeOccupant = useMemo(() => {
    if (!selectedUnit || selectedUnit.status === UNIT_STATUS.VACANT) return null;
    const headMember = selectedUnit.members.find(m => m.is_occupant) || selectedUnit.members[0];
    return headMember || null;
  }, [selectedUnit]);

  // Tenant members list rule from prompt:
  // "Pemilik TIDAK otomatis masuk ke list ini kecuali pemilik sendiri yang menghuni unit"
  // If unit is 'Disewakan', only show members where role !== 'Pemilik'
  const displayedTenantMembers = useMemo(() => {
    if (!selectedUnit) return [];
    if (selectedUnit.status === UNIT_STATUS.RENTED) {
      return selectedUnit.members.filter(m => m.role !== 'Pemilik');
    }
    return selectedUnit.members;
  }, [selectedUnit]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1, overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
      
      {/* ========================================================================= */}
      {/* MASTER TOP HEADER */}
      {/* ========================================================================= */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          px: 2,
          pt: 4,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f1f5f9',
          position: 'relative',
          zIndex: 10
        }}
      >
        <IconButton onClick={handleBack} sx={{ color: '#334155', p: 0.6, width: 40, height: 40 }}>
          <CaretLeft size={24} weight="bold" />
        </IconButton>

        <Box sx={{ flexGrow: 1, textAlign: 'center', px: 1 }}>
          <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem', lineHeight: 1.2 }}>
            {navLevel === 'towers' && 'Tenant Unit'}
            {navLevel === 'units' && selectedTower?.name}
            {navLevel === 'unit_detail' && selectedUnit?.unit_name}
          </Typography>
        </Box>

        <Box sx={{ width: navLevel === 'unit_detail' ? 'auto' : 40, minWidth: 40, display: 'flex', justifyContent: 'flex-end' }}>
          {navLevel === 'unit_detail' && selectedUnit ? (
            renderStatusBadge(selectedUnit.status)
          ) : (
            <Box sx={{ width: 40 }} />
          )}
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* LEVEL 1: TOWER LIST (PER SITE) */}
      {/* ========================================================================= */}
      {navLevel === 'towers' && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', p: 2, pb: 4 }}>
          {/* Site Overview Banner */}
          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              p: 2,
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Box>
                <Typography sx={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>
                  Site
                </Typography>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
                  Apartemen Paladian Park
                </Typography>
              </Box>
              <Chip
                label={`${siteStats.rate}% Occupied`}
                size="small"
                sx={{
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  borderRadius: '8px',
                  border: '1px solid #bfdbfe'
                }}
              />
            </Box>

            {/* Stats Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, pt: 1.5, mt: 0.5, borderTop: '1.5px solid #e2e8f0' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
                  {siteStats.total}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                  Total Unit
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', borderLeft: '1.5px solid #e2e8f0', borderRight: '1.5px solid #e2e8f0' }}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
                  {siteStats.occupied}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                  Occupied
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#ea580c' }}>
                  {siteStats.vacant}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                  Vacant
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Section: Tower List */}
          <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b', mb: 1.4, mt: 0.5 }}>
            Daftar Tower
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {initialTowersData.map((tower) => {
              const towerUnits = units.filter(u => u.tower_id === tower.id);
              const occCount = towerUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length;
              const totalCount = towerUnits.length;
              const rate = totalCount > 0 ? Math.round((occCount / totalCount) * 100) : tower.occupancyRate;

              return (
                <Box
                  key={tower.id}
                  onClick={() => handleSelectTower(tower)}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    p: 2,
                    cursor: 'pointer',
                    '&:active': {
                      transform: 'scale(0.99)'
                    }
                  }}
                >
                  {/* Top Row: Icon + Tower Name & Total Units + Blue Occupied Badge */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: '8px',
                          backgroundColor: '#ecfdf5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Building size={26} color="#27b29b" weight="fill" />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b' }}>
                          {tower.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: '#64748b', mt: 0.2 }}>
                          {totalCount} Total Unit
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        px: 1.2,
                        py: 0.4,
                        fontSize: '0.74rem',
                        fontWeight: 700
                      }}
                    >
                      {rate}% Occupied
                    </Box>
                  </Box>

                  {/* Clean Divider */}
                  <Box sx={{ height: '1.5px', backgroundColor: '#f1f5f9', my: 1.6 }} />

                  {/* Bottom Row: Breakdown Counters & Tap CTA */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.6,
                          backgroundColor: '#ecfdf5',
                          borderRadius: '8px',
                          px: 1,
                          py: 0.4
                        }}
                      >
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#059669' }} />
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#065f46' }}>
                          {occCount} Terhuni
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.6,
                          backgroundColor: '#fff7ed',
                          borderRadius: '8px',
                          px: 1,
                          py: 0.4
                        }}
                      >
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ea580c' }} />
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#9a3412' }}>
                          {totalCount - occCount} Vacant
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: '#27b29b' }}>
                      <Typography sx={{ fontSize: '0.76rem', fontWeight: 700 }}>
                        Pilih Tower
                      </Typography>
                      <CaretRight size={16} weight="bold" />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Tower Bottom Sheet Backdrop */}
      <Box
        onClick={() => setTowerSheetTower(null)}
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(2px)',
          zIndex: 40,
          opacity: towerSheetTower ? 1 : 0,
          pointerEvents: towerSheetTower ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* Tower Bottom Sheet */}
      {(() => {
        const tw = towerSheetTower;
        if (!tw) return null;
        const towerUnits = units.filter(u => u.tower_id === tw.id);
        const occCount = towerUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length;
        const vacCount = towerUnits.length - occCount;
        const rate = towerUnits.length > 0 ? Math.round((occCount / towerUnits.length) * 100) : tw.occupancyRate;
        return (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
              zIndex: 50,
              transform: towerSheetTower ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: towerSheetTower ? 'auto' : 'none',
              overflow: 'hidden'
            }}
          >
            {/* Handle */}
            <Box sx={{ pt: 1.5, px: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Box sx={{ width: 40, height: 4, borderRadius: '4px', backgroundColor: '#cbd5e1', mx: 'auto', mb: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building size={24} color="#27b29b" weight="fill" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b', letterSpacing: '-0.3px' }}>
                      {tw.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.76rem', color: '#94a3b8', mt: 0.1 }}>
                      {towerUnits.length} Total Unit
                    </Typography>
                  </Box>
                </Box>
                <Box
                  onClick={() => setTowerSheetTower(null)}
                  sx={{ cursor: 'pointer', p: 0.5, color: '#94a3b8' }}
                >
                  <X size={20} weight="bold" />
                </Box>
              </Box>
            </Box>

            {/* Body */}
            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Occupancy Rate */}
              <Box sx={{ backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Occupancy Rate</Typography>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#2563eb' }}>{rate}%</Typography>
                </Box>
                {/* Progress Bar */}
                <Box sx={{ height: 8, borderRadius: '100px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                  <Box sx={{ height: '100%', width: `${rate}%`, borderRadius: '100px', backgroundColor: '#2563eb', transition: 'width 0.5s ease' }} />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 2 }}>
                  <Box sx={{ backgroundColor: '#ecfdf5', borderRadius: '10px', p: 1.2, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>{occCount}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#065f46' }}>Occupied</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#fff7ed', borderRadius: '10px', p: 1.2, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#ea580c' }}>{vacCount}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#9a3412' }}>Vacant</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer CTA */}
            <Box sx={{ px: 2.5, pb: { xs: 5, sm: 3 }, pt: 0.5 }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                disableRipple
                onClick={() => handleEnterTower(tw)}
                sx={{
                  backgroundColor: '#27b29b !important',
                  color: '#ffffff !important',
                  borderRadius: '12px',
                  py: 1.4,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  boxShadow: 'none !important',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8
                }}
              >
                Lihat Semua Unit
                <CaretRight size={18} weight="bold" />
              </Button>
            </Box>
          </Box>
        );
      })()}

      {/* ========================================================================= */}
      {/* LEVEL 2: UNIT LIST (PER TOWER) */}
      {/* ========================================================================= */}
      {navLevel === 'units' && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', p: 2, pb: 4 }}>
          {/* Breadcrumb Info Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ fontSize: '0.76rem', color: '#64748b' }}>
              Site: <strong>Paladian Park</strong> / <strong>{selectedTower?.name}</strong>
            </Typography>
            <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#27b29b' }}>
              {filteredUnits.length} Unit
            </Typography>
          </Box>

          {/* Status Filter Chips (Horizontal Scrollable) */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              pb: 1,
              mb: 0.5,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
          >
            {['All', UNIT_STATUS.OCCUPIED, UNIT_STATUS.RENTED, UNIT_STATUS.VACANT].map((status) => {
              const isSelected = unitStatusFilter === status;
              return (
                <Chip
                  key={status}
                  label={status}
                  onClick={() => setUnitStatusFilter(status)}
                  sx={{
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    px: 0.6,
                    height: 30,
                    backgroundColor: isSelected ? '#27b29b' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#64748b',
                    border: `1px solid ${isSelected ? '#27b29b' : '#cbd5e1'}`,
                    cursor: 'pointer'
                  }}
                />
              );
            })}
          </Box>

          {/* Floor Quick Jump Filter (For towers with hundreds of units) */}
          {availableFloors.length > 2 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                overflowX: 'auto',
                pb: 1.5,
                mb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', flexShrink: 0 }}>
                Lantai:
              </Typography>
              {availableFloors.map((floor) => {
                const isSelected = floorFilter === floor;
                return (
                  <Chip
                    key={floor}
                    label={floor === 'All' ? 'Semua Lt.' : `Lt. ${parseInt(floor)}`}
                    size="small"
                    onClick={() => setFloorFilter(floor)}
                    sx={{
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      height: 26,
                      px: 0.4,
                      backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#64748b',
                      border: `1px solid ${isSelected ? '#0f172a' : '#e2e8f0'}`,
                      cursor: 'pointer'
                    }}
                  />
                );
              })}
            </Box>
          )}

          {/* Units List */}
          {filteredUnits.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
              <Door size={48} color="#cbd5e1" weight="duotone" />
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', mt: 1.5 }}>
                Tidak ada unit yang cocok
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.5 }}>
                Silakan ganti kata kunci pencarian atau filter status.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {displayedUnits.map((unit) => (
                <Box
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    p: 1.8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:active': {
                      transform: 'scale(0.99)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Door size={22} color="#334155" weight="fill" />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b' }}>
                        {unit.unit_name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.74rem', color: '#64748b', mt: 0.2 }}>
                        Pemilik: <strong>{unit.owner?.name || '-'}</strong>
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        {unit.type} • Lantai {unit.floor} • {unit.area}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    {renderStatusBadge(unit.status)}
                    <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
                      {unit.members.length} Penghuni
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Progressive Load / Pagination for hundreds of units */}
              {displayedUnits.length < filteredUnits.length && (
                <Box sx={{ textAlign: 'center', pt: 1.5, pb: 2 }}>
                  <Typography sx={{ fontSize: '0.74rem', color: '#64748b', mb: 1 }}>
                    Menampilkan {displayedUnits.length} dari {filteredUnits.length} Unit di {selectedTower?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setDisplayLimit(prev => prev + 25)}
                      sx={{
                        borderRadius: '8px',
                        borderColor: '#cbd5e1',
                        color: '#334155',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        py: 0.8,
                        px: 2
                      }}
                    >
                      Muat 25 Unit Lagi
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => setDisplayLimit(filteredUnits.length)}
                      sx={{
                        color: '#27b29b',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'none'
                      }}
                    >
                      Tampilkan Semua ({filteredUnits.length})
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 3: UNIT DETAIL */}
      {/* ========================================================================= */}
      {navLevel === 'unit_detail' && selectedUnit && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          
          {/* ------------------------------------------------------------- */}
          {/* PERSISTENT HEADER SUMMARY CARD (Always shown across all tabs) */}
          {/* ------------------------------------------------------------- */}
          <Box sx={{ p: 2, pb: 1, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
            
            {/* Owner vs Active Occupant 2-Column Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.2, mb: 1.5 }}>
              
              {/* Card 1: Legal Owner (Always shown) */}
              <Box
                sx={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  p: 1.4
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.6 }}>
                  <IdentificationBadge size={16} color="#64748b" weight="fill" />
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Pemilik
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.86rem', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedUnit.owner?.name || '-'}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', mt: 0.2 }}>
                  {selectedUnit.owner?.phone || 'Legal Owner'}
                </Typography>
              </Box>

              {/* Card 2: Penghuni Saat Ini (Accented border/bg, or Empty State with CTA if vacant) */}
              {selectedUnit.status === UNIT_STATUS.VACANT ? (
                <Box
                  onClick={handleOpenAssignDrawer}
                  sx={{
                    backgroundColor: '#fff7ed',
                    borderRadius: '8px',
                    p: 1.4,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:active': {
                      transform: 'scale(0.99)'
                    }
                  }}
                >
                  <UserPlus size={18} color="#ea580c" weight="bold" />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.76rem', color: '#c2410c', mt: 0.3 }}>
                    Assign Penghuni
                  </Typography>
                  <Typography sx={{ fontSize: '0.66rem', color: '#ea580c' }}>
                    Unit masih kosong
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    backgroundColor: '#ecfdf5',
                    borderRadius: '8px',
                    p: 1.4,
                    position: 'relative'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <User size={16} color="#059669" weight="fill" />
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                        Penghuni Aktif
                      </Typography>
                    </Box>
                    <Box
                      onClick={handleOpenAssignDrawer}
                      sx={{
                        cursor: 'pointer',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        color: '#059669',
                        textDecoration: 'underline'
                      }}
                    >
                      Ganti
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.86rem', color: '#064e3b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeOccupant ? activeOccupant.name : selectedUnit.owner?.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: '#047857', mt: 0.2, fontWeight: 600 }}>
                    Role: {activeOccupant ? activeOccupant.role : 'Pemilik'}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Quick Counters Row */}
            <Box sx={{ display: 'flex', gap: 2, pt: 1, borderTop: '1px solid #f1f5f9' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Users size={16} color="#27b29b" weight="fill" />
                <Typography sx={{ fontSize: '0.76rem', color: '#64748b' }}>
                  Total Anggota: <strong>{displayedTenantMembers.length} Orang</strong>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Car size={16} color="#2563eb" weight="fill" />
                <Typography sx={{ fontSize: '0.76rem', color: '#64748b' }}>
                  Kendaraan: <strong>{selectedUnit.vehicles.length} Unit</strong>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ------------------------------------------------------------- */}
          {/* TAB NAVIGATION BAR */}
          {/* ------------------------------------------------------------- */}
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              px: 1,
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'members', label: `Members (${displayedTenantMembers.length})` },
              { id: 'vehicles', label: `Kendaraan (${selectedUnit.vehicles.length})` },
              { id: 'bill_settings', label: 'Bill Settings' }
            ].map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <Box
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  sx={{
                    px: 1.8,
                    py: 1.4,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 800 : 600,
                    color: isSelected ? '#27b29b' : '#64748b',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 14,
                        right: 14,
                        height: 3,
                        backgroundColor: '#27b29b',
                        borderRadius: '3px 3px 0 0'
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          {/* ------------------------------------------------------------- */}
          {/* TAB 1: OVERVIEW (Unit Specs + Utilities/Meter) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* Unit Specifications Card */}
              <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 2 }}>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b', mb: 1.5 }}>
                  Informasi Fisik & Legal Unit
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.6 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Nama Unit</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 600 }}>{selectedUnit.unit_name}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Tipe Unit</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 600 }}>{selectedUnit.type}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Bedroom Count</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 600 }}>{selectedUnit.bedroom_count} Kamar Tidur</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Tower / Lantai</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 600 }}>{selectedUnit.tower} / Lantai {selectedUnit.floor}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Luas Unit</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 600 }}>{selectedUnit.area}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>NPP</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 600 }}>{selectedUnit.npp}</Typography>
                  </Box>
                </Box>

                <Box sx={{ height: '1px', backgroundColor: '#f1f5f9', my: 1.8 }} />

                <Box sx={{ mb: 1.4 }}>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Ownership Letter (Legalitas)</Typography>
                  <Typography sx={{ fontSize: '0.84rem', color: '#059669', fontWeight: 700, mt: 0.2 }}>
                    {selectedUnit.ownership_letter}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Description</Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, mt: 0.3 }}>
                    {selectedUnit.description}
                  </Typography>
                </Box>
              </Box>

              {/* Utilities & Meter Section (Merged into Overview per prompt instructions) */}
              <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b' }}>
                    Utilities & Meter Unit
                  </Typography>
                  <Chip
                    label="Active Monitoring"
                    size="small"
                    sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700, borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669' }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
                  {/* Electricity Spec */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.4, backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <Box sx={{ width: 38, height: 38, borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lightning size={22} color="#2563eb" weight="fill" />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Electric Capacity</Typography>
                      <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                        {selectedUnit.electric_capacity}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#64748b', mt: 0.2 }}>
                        No Meter: <strong>{selectedUnit.electric_meter_no}</strong> • Awal: {selectedUnit.electric_meter_initial}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => setQrModalData({ title: 'Barcode Meter Listrik', code: selectedUnit.electric_meter_no, type: 'PLN Meter' })}
                      sx={{ color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '8px' }}
                    >
                      <QrCode size={18} weight="bold" />
                    </IconButton>
                  </Box>

                  {/* Water Spec */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.4, backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <Box sx={{ width: 38, height: 38, borderRadius: '8px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Drop size={22} color="#059669" weight="fill" />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Water Meter (PAM)</Typography>
                      <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                        {selectedUnit.water_meter_no}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#64748b', mt: 0.2 }}>
                        Meter Air Awal: <strong>{selectedUnit.water_meter_initial}</strong>
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => setQrModalData({ title: 'Barcode Meter Air', code: selectedUnit.water_meter_no, type: 'PAM Meter' })}
                      sx={{ color: '#059669', border: '1px solid #a7f3d0', borderRadius: '8px' }}
                    >
                      <QrCode size={18} weight="bold" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: MEMBERS (Tenant Members) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'members' && (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* Header + Add Member CTA */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b' }}>
                    Anggota Penghuni Unit
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Daftar yang berdomisili sah di unit ini
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Plus size={16} weight="bold" />}
                  onClick={handleOpenAddMember}
                  sx={{
                    backgroundColor: '#27b29b',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    px: 1.5
                  }}
                >
                  Tambah Anggota
                </Button>
              </Box>

              {/* Note on Pemilik rule */}
              {selectedUnit.status === UNIT_STATUS.RENTED && (
                <Box sx={{ p: 1.4, backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Info size={18} color="#2563eb" weight="fill" />
                  <Typography sx={{ fontSize: '0.74rem', color: '#1e40af', lineHeight: 1.4 }}>
                    Unit ini dalam status <strong>Disewakan</strong>. Pemilik legal (<strong>{selectedUnit.owner.name}</strong>) tidak ditampilkan di list anggota ini.
                  </Typography>
                </Box>
              )}

              {/* Members List or Empty State */}
              {displayedTenantMembers.length === 0 ? (
                <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 4, textAlign: 'center' }}>
                  <Users size={44} color="#cbd5e1" weight="duotone" />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', mt: 1 }}>
                    Belum Ada Anggota Terdaftar
                  </Typography>
                  <Typography sx={{ fontSize: '0.76rem', color: '#94a3b8', mt: 0.4, mb: 2 }}>
                    Tambahkan data penghuni keluarga, penyewa, atau karyawan di unit ini.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Plus size={16} weight="bold" />}
                    onClick={handleOpenAddMember}
                    sx={{
                      borderColor: '#27b29b',
                      color: '#27b29b',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 700
                    }}
                  >
                    Tambah Anggota Pertama
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {displayedTenantMembers.map((member) => (
                    <Box
                      key={member.id}
                      sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        p: 1.6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '8px',
                            backgroundColor: member.role === 'Penyewa' ? '#eff6ff' : member.role === 'Pemilik' ? '#ecfdf5' : '#f8fafc',
                            color: member.role === 'Penyewa' ? '#2563eb' : member.role === 'Pemilik' ? '#059669' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}
                        >
                          {member.name.substring(0, 2).toUpperCase()}
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                              {member.name}
                            </Typography>
                            {member.is_occupant && (
                              <Chip
                                label="Kepala Penghuni"
                                size="small"
                                sx={{ height: 18, fontSize: '0.64rem', fontWeight: 700, borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669' }}
                              />
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.3 }}>
                            <Box
                              sx={{
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                borderRadius: '8px',
                                px: 0.8,
                                py: 0.2,
                                fontSize: '0.68rem',
                                fontWeight: 700
                              }}
                            >
                              {member.role}
                            </Box>
                            <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                              Tinggal sejak: {member.since}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => handleOpenEditMember(member)} sx={{ color: '#64748b' }}>
                          <PencilSimple size={16} weight="bold" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteMember(member.id)} sx={{ color: '#ef4444' }}>
                          <Trash size={16} weight="bold" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: KENDARAAN (Vehicles Linked to Tenant Members) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'vehicles' && (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* Header + Add Vehicle CTA */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b' }}>
                    Kendaraan Terdaftar
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Akses parkir resmi unit di gedung
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Plus size={16} weight="bold" />}
                  onClick={handleOpenAddVehicle}
                  sx={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    px: 1.5
                  }}
                >
                  Tambah Kendaraan
                </Button>
              </Box>

              {/* Vehicles List or Empty State */}
              {selectedUnit.vehicles.length === 0 ? (
                <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 4, textAlign: 'center' }}>
                  <Car size={44} color="#cbd5e1" weight="duotone" />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', mt: 1 }}>
                    Belum Ada Kendaraan Terdaftar
                  </Typography>
                  <Typography sx={{ fontSize: '0.76rem', color: '#94a3b8', mt: 0.4, mb: 2 }}>
                    Daftarkan nomor plat mobil atau motor penghuni unit ini.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Plus size={16} weight="bold" />}
                    onClick={handleOpenAddVehicle}
                    sx={{
                      borderColor: '#2563eb',
                      color: '#2563eb',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 700
                    }}
                  >
                    Daftarkan Kendaraan
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {selectedUnit.vehicles.map((v) => (
                    <Box
                      key={v.id}
                      sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        p: 1.8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '8px',
                            backgroundColor: v.type === 'Mobil' ? '#eff6ff' : '#f0fdf4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Car size={22} color={v.type === 'Mobil' ? '#2563eb' : '#059669'} weight="fill" />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 800, fontSize: '0.96rem', color: '#0f172a', letterSpacing: '0.5px' }}>
                            {v.plate_number}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem', color: '#475569', mt: 0.2 }}>
                            {v.brand_model} • {v.color}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.4 }}>
                            <Box
                              sx={{
                                backgroundColor: '#f1f5f9',
                                color: '#64748b',
                                borderRadius: '8px',
                                px: 0.8,
                                py: 0.15,
                                fontSize: '0.68rem',
                                fontWeight: 700
                              }}
                            >
                              {v.type}
                            </Box>
                            <Typography sx={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>
                              Pemilik: {v.member_name}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <IconButton size="small" onClick={() => handleDeleteVehicle(v.id)} sx={{ color: '#ef4444' }}>
                        <Trash size={17} weight="bold" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: BILL SETTINGS (Utility & IPL Invoicing Configurations) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'bill_settings' && (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* Utility to Invoice Toggles */}
              <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 2 }}>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b', mb: 1.8 }}>
                  Pengaturan Masuk Tagihan (Invoicing)
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {/* Insert Electric Utility To Invoice */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ pr: 2 }}>
                      <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>
                        Insert Electric Utility To Invoice
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Otomatis cantumkan pemakaian listrik ke tagihan bulanan
                      </Typography>
                    </Box>
                    <Switch
                      checked={Boolean(selectedUnit.bill_settings?.insert_electric)}
                      onChange={() => handleToggleBillSetting('insert_electric')}
                      color="primary"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#27b29b'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#27b29b'
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ height: '1px', backgroundColor: '#f1f5f9' }} />

                  {/* Insert Water Utility To Invoice */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ pr: 2 }}>
                      <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>
                        Insert Water Utility To Invoice
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Otomatis cantumkan pemakaian air PAM ke tagihan bulanan
                      </Typography>
                    </Box>
                    <Switch
                      checked={Boolean(selectedUnit.bill_settings?.insert_water)}
                      onChange={() => handleToggleBillSetting('insert_water')}
                      color="primary"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#27b29b'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#27b29b'
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ height: '1px', backgroundColor: '#f1f5f9' }} />

                  {/* Insert IPL To Invoice */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ pr: 2 }}>
                      <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>
                        Insert IPL To Invoice
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Iuran Pengelolaan Lingkungan (IPL) rutin bulanan
                      </Typography>
                    </Box>
                    <Switch
                      checked={Boolean(selectedUnit.bill_settings?.insert_ipl)}
                      onChange={() => handleToggleBillSetting('insert_ipl')}
                      color="primary"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#27b29b'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#27b29b'
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* IPL Parameters Card */}
              <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 2 }}>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b', mb: 1.5 }}>
                  Target & Parameter IPL
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.6 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>IPL Bill Target</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 700, mt: 0.2 }}>
                      {selectedUnit.bill_settings?.ipl_target || 'Pemilik'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>IPL Bill Interval</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 700, mt: 0.2 }}>
                      {selectedUnit.bill_settings?.ipl_interval || 'Bulanan'}
                    </Typography>
                  </Box>
                  <Box sx={{ gridColumn: 'span 2' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Last IPL Bill</Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: '#059669', fontWeight: 700, mt: 0.2 }}>
                      {selectedUnit.bill_settings?.last_ipl_bill || '-'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Barcode & QR Meters Download Card */}
              <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 2 }}>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b', mb: 1.5 }}>
                  Barcode & QR Scanner Meter
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<QrCode size={18} weight="bold" />}
                    onClick={() => setQrModalData({ title: 'Barcode Meter Listrik', code: selectedUnit.electric_meter_no, type: 'PLN Meter Unit' })}
                    sx={{
                      borderColor: '#cbd5e1',
                      color: '#334155',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      py: 1
                    }}
                  >
                    QR Meter Listrik
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<QrCode size={18} weight="bold" />}
                    onClick={() => setQrModalData({ title: 'Barcode Meter Air', code: selectedUnit.water_meter_no, type: 'PAM Meter Unit' })}
                    sx={{
                      borderColor: '#cbd5e1',
                      color: '#334155',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      py: 1
                    }}
                  >
                    QR Meter Air
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

        </Box>
      )}

      {/* ========================================================================= */}
      {/* DRAWER 1: ASSIGN / GANTI PENGHUNI (BOTTOM SHEET PATTERN) */}
      {/* ========================================================================= */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1300,
          opacity: assignDrawerOpen ? 1 : 0,
          pointerEvents: assignDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
        onClick={() => setAssignDrawerOpen(false)}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: 430,
          mx: 'auto',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
          zIndex: 1400,
          overflow: 'hidden',
          transform: assignDrawerOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh'
        }}
      >
        <Box sx={{ pt: 1.5, px: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
          <Box sx={{ width: 40, height: 4, borderRadius: '8px', backgroundColor: '#cbd5e1', mx: 'auto', mb: 1.5 }} />
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b' }}>
            Set / Ganti Penghuni Unit
          </Typography>
          <Typography sx={{ fontSize: '0.76rem', color: '#94a3b8', mt: 0.2 }}>
            Tentukan siapa yang menempati {selectedUnit?.unit_name} saat ini.
          </Typography>
        </Box>

        <Box sx={{ p: 2.5, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Skema Hunian
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              <Box
                onClick={() => setAssignType('Pemilik')}
                sx={{
                  p: 1.4,
                  borderRadius: '8px',
                  border: `1.5px solid ${assignType === 'Pemilik' ? '#27b29b' : '#e2e8f0'}`,
                  backgroundColor: assignType === 'Pemilik' ? '#ecfdf5' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '0.84rem', color: assignType === 'Pemilik' ? '#059669' : '#334155' }}>
                  Dihuni Pemilik
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#64748b', mt: 0.2 }}>
                  Owner menempati sendiri
                </Typography>
              </Box>

              <Box
                onClick={() => setAssignType('Penyewa')}
                sx={{
                  p: 1.4,
                  borderRadius: '8px',
                  border: `1.5px solid ${assignType === 'Penyewa' ? '#27b29b' : '#e2e8f0'}`,
                  backgroundColor: assignType === 'Penyewa' ? '#ecfdf5' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '0.84rem', color: assignType === 'Penyewa' ? '#059669' : '#334155' }}>
                  Disewakan
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#64748b', mt: 0.2 }}>
                  Ditempati pihak penyewa
                </Typography>
              </Box>
            </Box>
          </Box>

          {assignType === 'Penyewa' && (
            <Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
                Nama Kepala Penyewa
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Contoh: Rendra Pratama"
                value={assignName}
                onChange={(e) => setAssignName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' }
                }}
              />
            </Box>
          )}

          {assignType === 'Pemilik' && (
            <Box sx={{ p: 1.4, backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontSize: '0.74rem', color: '#64748b' }}>
                Pemilik terdaftar: <strong>{selectedUnit?.owner?.name}</strong> akan otomatis ditetapkan sebagai kepala penghuni aktif.
              </Typography>
            </Box>
          )}

          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Tanggal Mulai Tinggal
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: 01 Feb 2026"
              value={assignSince}
              onChange={(e) => setAssignSince(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: '8px' }
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveAssign}
            sx={{
              backgroundColor: '#27b29b',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              py: 1.2,
              textTransform: 'none',
              mt: 1
            }}
          >
            Simpan Penghuni
          </Button>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* DRAWER 2: TAMBAH / EDIT MEMBER */}
      {/* ========================================================================= */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1300,
          opacity: memberDrawerOpen ? 1 : 0,
          pointerEvents: memberDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
        onClick={() => setMemberDrawerOpen(false)}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: 430,
          mx: 'auto',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
          zIndex: 1400,
          overflow: 'hidden',
          transform: memberDrawerOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh'
        }}
      >
        <Box sx={{ pt: 1.5, px: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
          <Box sx={{ width: 40, height: 4, borderRadius: '8px', backgroundColor: '#cbd5e1', mx: 'auto', mb: 1.5 }} />
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b' }}>
            {editingMember ? 'Edit Anggota Penghuni' : 'Tambah Anggota Penghuni'}
          </Typography>
          <Typography sx={{ fontSize: '0.76rem', color: '#94a3b8', mt: 0.2 }}>
            Masukkan data individu yang tinggal di {selectedUnit?.unit_name}.
          </Typography>
        </Box>

        <Box sx={{ p: 2.5, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Nama Lengkap
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: Siti Rahma"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Hubungan / Role
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                sx={{ borderRadius: '8px', fontSize: '0.86rem' }}
              >
                {MEMBER_ROLES.map(role => (
                  <MenuItem key={role} value={role} sx={{ fontSize: '0.86rem' }}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveMember}
            sx={{
              backgroundColor: '#27b29b',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              py: 1.2,
              textTransform: 'none',
              mt: 1
            }}
          >
            {editingMember ? 'Simpan Perubahan' : 'Tambah Anggota'}
          </Button>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* DRAWER 3: TAMBAH KENDARAAN (Linked to Tenant Members) */}
      {/* ========================================================================= */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1300,
          opacity: vehicleDrawerOpen ? 1 : 0,
          pointerEvents: vehicleDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
        onClick={() => setVehicleDrawerOpen(false)}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: 430,
          mx: 'auto',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
          zIndex: 1400,
          overflow: 'hidden',
          transform: vehicleDrawerOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh'
        }}
      >
        <Box sx={{ pt: 1.5, px: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
          <Box sx={{ width: 40, height: 4, borderRadius: '8px', backgroundColor: '#cbd5e1', mx: 'auto', mb: 1.5 }} />
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b' }}>
            Daftarkan Kendaraan Baru
          </Typography>
          <Typography sx={{ fontSize: '0.76rem', color: '#94a3b8', mt: 0.2 }}>
            Link kendaraan ke salah satu tenant member di {selectedUnit?.unit_name}.
          </Typography>
        </Box>

        <Box sx={{ p: 2.5, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Nomor Plat Kendaraan
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: B 1234 KLR"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
                Merk & Model
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Contoh: Honda HR-V"
                value={vehicleBrand}
                onChange={(e) => setVehicleBrand(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
                Warna
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Contoh: Putih"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Jenis Kendaraan
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              {['Mobil', 'Motor'].map(t => (
                <Box
                  key={t}
                  onClick={() => setVehicleType(t)}
                  sx={{
                    p: 1.2,
                    borderRadius: '8px',
                    border: `1.5px solid ${vehicleType === t ? '#2563eb' : '#e2e8f0'}`,
                    backgroundColor: vehicleType === t ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: vehicleType === t ? '#1d4ed8' : '#475569'
                  }}
                >
                  {t}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Linked to Tenant Member Dropdown (Strict requirement from prompt) */}
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 0.8 }}>
              Pemilik Kendaraan (Pilih dari Anggota)
            </Typography>
            {selectedUnit && selectedUnit.members.length > 0 ? (
              <FormControl fullWidth size="small">
                <Select
                  value={vehicleMemberId}
                  onChange={(e) => setVehicleMemberId(e.target.value)}
                  sx={{ borderRadius: '8px', fontSize: '0.86rem' }}
                >
                  {selectedUnit.members.map(m => (
                    <MenuItem key={m.id} value={m.id} sx={{ fontSize: '0.86rem' }}>
                      {m.name} ({m.role})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Box sx={{ p: 1.5, backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <Typography sx={{ fontSize: '0.74rem', color: '#b91c1c' }}>
                  Belum ada tenant member di unit ini. Daftarkan anggota terlebih dahulu sebelum menambahkan kendaraan.
                </Typography>
              </Box>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={!selectedUnit || selectedUnit.members.length === 0}
            onClick={handleSaveVehicle}
            sx={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              py: 1.2,
              textTransform: 'none',
              mt: 1
            }}
          >
            Daftarkan Kendaraan
          </Button>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* MODAL: QR CODE METER PREVIEW & DOWNLOAD */}
      {/* ========================================================================= */}
      <Dialog
        open={Boolean(qrModalData)}
        onClose={() => setQrModalData(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>
            {qrModalData?.title}
          </Typography>
          <IconButton size="small" onClick={() => setQrModalData(null)}>
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', py: 2 }}>
          <Box
            sx={{
              width: 180,
              height: 180,
              mx: 'auto',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <QrCode size={130} weight="fill" color="#0f172a" />
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', mt: 2, letterSpacing: '1px' }}>
            {qrModalData?.code}
          </Typography>
          <Typography sx={{ fontSize: '0.76rem', color: '#64748b', mt: 0.3 }}>
            {qrModalData?.type} • {selectedUnit?.unit_name}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadSimple size={18} weight="bold" />}
            onClick={() => setQrModalData(null)}
            sx={{
              backgroundColor: '#27b29b',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              textTransform: 'none',
              py: 1.1
            }}
          >
            Download Barcode
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
