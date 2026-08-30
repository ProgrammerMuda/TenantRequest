/**
 * [M] MODEL: RoleModel.js
 * Comprehensive mock data and menus for 6 property management roles:
 * - bm: Building Manager
 * - tenant: Tenant / Resident
 * - eng: Engineering
 * - sec: Security
 * - hk: Housekeeping
 * - tr: Tenant Relations
 */

import {
  Receipt,
  HouseLine,
  Armchair,
  ClipboardText,
  Toolbox,
  Package,
  Certificate,
  SquaresFour,
  UsersThree,
  Gauge,
  CheckSquare,
  Wrench,
  ClockCounterClockwise,
  WarningCircle,
  IdentificationCard,
  EnvelopeSimple,
  ShieldCheck,
  Warning,
  Car,
  VideoCamera,
  Broom,
  Sparkle,
  CalendarCheck,
  Trash,
  FileText,
  ChatDots,
  Users,
  Megaphone,
  Star,
  Key
} from '@phosphor-icons/react';

import billing3d from '../assets/menu_icons/billing_3d.png';
import homeService3d from '../assets/menu_icons/home_service_3d.png';
import reservation3d from '../assets/menu_icons/reservation_3d.png';
import workRequest3d from '../assets/menu_icons/work_request_3d.png';
import gigo3d from '../assets/menu_icons/gigo_3d.png';
import workPermit3d from '../assets/menu_icons/work_permit_3d.png';
import fitOutPermit3d from '../assets/menu_icons/fit_out_permit_3d.png';
import allMenu3d from '../assets/menu_icons/all_menu_3d.png';

export const ROLE_DEFINITIONS = [
  { id: 'bm', label: 'Building Manager', shortLabel: 'BM', icon: '🏢' },
  { id: 'tenant', label: 'Tenant', shortLabel: 'Tenant', icon: '🏠' },
  { id: 'eng', label: 'ENG', shortLabel: 'ENG', icon: '🔧' },
  { id: 'sec', label: 'SEC', shortLabel: 'SEC', icon: '🛡️' },
  { id: 'hk', label: 'HK', shortLabel: 'HK', icon: '🧹' },
  { id: 'tr', label: 'TR', shortLabel: 'TR', icon: '📋' }
];

export const ROLE_DATA = {
  bm: {
    profile: {
      name: 'Raga',
      roleBadge: 'Building Manager',
      currentLocation: 'Paladian Park'
    },
    overview: [
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
    ],
    menuItems: [
      { id: 'billing', title: 'Billing\n& Payment', icon: Receipt, imageIcon: billing3d, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
      { id: 'home_service', title: 'Home\nservice', icon: HouseLine, imageIcon: homeService3d, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'facility_reservation', title: 'Facility\nReservation', icon: Armchair, imageIcon: reservation3d, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' },
      { id: 'work_order', title: 'Work\nOrder', icon: Toolbox, imageIcon: workRequest3d, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', badgeCount: 2 },
      { id: 'goods_in_out', title: 'In & Out\nGoods', icon: Package, imageIcon: gigo3d, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', badgeCount: 1 },
      { id: 'work_permit', title: 'Work\nPermit', icon: Certificate, imageIcon: workPermit3d, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)', badgeCount: 2 },
      { id: 'fit_out_permit', title: 'Fit Out\nPermit', icon: Certificate, imageIcon: fitOutPermit3d, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)', badgeCount: 2 },
      { id: 'all_menu', title: 'All\nMenu', icon: SquaresFour, imageIcon: allMenu3d, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
    ]
  },

  tenant: {
    profile: {
      name: 'Aldy Mahardiansyah',
      roleBadge: 'Tenant',
      currentLocation: 'Apartement A'
    },
    overview: [
      {
        id: 'my_bill',
        title: 'TAGIHAN SAYA',
        icon: Receipt,
        mainValue: 'Rp 1.2M',
        subValue: '/ Jatuh tempo 5 Sept',
        statusText: '1 Tagihan Belum Dibayar'
      },
      {
        id: 'my_request',
        title: 'WORK REQUEST',
        icon: ClipboardText,
        mainValue: '2',
        subValue: '/ 3 Total Request',
        statusText: '1 Dalam Pengerjaan'
      },
      {
        id: 'my_booking',
        title: 'BOOKING FASILITAS',
        icon: Armchair,
        mainValue: '1',
        subValue: 'Aktif hari ini',
        statusText: 'Gym 18:00 WIB'
      },
      {
        id: 'my_pass',
        title: 'GATE PASS',
        icon: Package,
        mainValue: '1',
        subValue: 'Izin Disetujui',
        statusText: 'Siap Digunakan'
      }
    ],
    menuItems: [
      { id: 'billing', title: 'Tagihan\nSaya', icon: Receipt, imageIcon: billing3d, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)', badgeCount: 1 },
      { id: 'home_service', title: 'Home\nService', icon: HouseLine, imageIcon: homeService3d, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'facility_reservation', title: 'Booking\nFasilitas', icon: Armchair, imageIcon: reservation3d, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' },
      { id: 'work_request', title: 'Ajukan\nRequest', icon: ClipboardText, imageIcon: workRequest3d, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', badgeCount: 2 },
      { id: 'goods_in_out', title: 'Izin Keluar\nMasuk Barang', icon: Package, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'fit_out_permit', title: 'Izin\nRenovasi', icon: Certificate, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
      { id: 'announcement', title: 'Info &\nPengumuman', icon: Megaphone, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', badgeCount: 3 },
      { id: 'all_menu', title: 'Semua\nMenu', icon: SquaresFour, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
    ]
  },

  eng: {
    profile: {
      name: 'Joko Prasetyo',
      roleBadge: 'Chief Engineering',
      currentLocation: 'Paladian Park - Workshop'
    },
    overview: [
      {
        id: 'wo_assigned',
        title: 'WORK ORDER',
        icon: Toolbox,
        mainValue: '18',
        subValue: '/ 25 Ditugaskan',
        statusText: '5 Sedang Dikerjakan'
      },
      {
        id: 'meter_reading',
        title: 'CATAT METER',
        icon: Gauge,
        mainValue: '1.420',
        subValue: '/ 2.032 Unit',
        statusText: '70% Selesai Dicatat'
      },
      {
        id: 'preventive',
        title: 'PREVENTIVE',
        icon: Wrench,
        mainValue: '4',
        subValue: 'Jadwal Hari Ini',
        statusText: 'Genset & Lift Tower A'
      },
      {
        id: 'tools',
        title: 'ALAT TEKNIS',
        icon: Package,
        mainValue: '12',
        subValue: 'Tersedia di Gudang',
        statusText: '2 Dalam Kalibrasi'
      }
    ],
    menuItems: [
      { id: 'work_order', title: 'Work Order\nMasuk', icon: Toolbox, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', badgeCount: 5 },
      { id: 'meter_reading', title: 'Catat Meter\nUtilitas', icon: Gauge, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)', badgeCount: 12 },
      { id: 'preventive_maint', title: 'Preventive\nMaintenance', icon: Wrench, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'checklist_genset', title: 'Checklist\nGenset & Lift', icon: CheckSquare, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' },
      { id: 'findings', title: 'Lapor\nTemuan', icon: WarningCircle, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', badgeCount: 2 },
      { id: 'history', title: 'Riwayat\nService', icon: ClockCounterClockwise, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
      { id: 'tool_inventory', title: 'Gudang\nAlat & Sparepart', icon: Package, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
      { id: 'all_menu', title: 'Semua\nTugas', icon: SquaresFour, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
    ]
  },

  sec: {
    profile: {
      name: 'Bambang Wijaya',
      roleBadge: 'Chief Security',
      currentLocation: 'Paladian Park - Pos Utama'
    },
    overview: [
      {
        id: 'visitor_log',
        title: 'BUKU TAMU',
        icon: IdentificationCard,
        mainValue: '45',
        subValue: 'Masuk Hari Ini',
        statusText: '12 Masih di Dalam'
      },
      {
        id: 'goods_gate',
        title: 'BARANG MASUK/KELUAR',
        icon: Package,
        mainValue: '24',
        subValue: '/ 26 Terverifikasi',
        statusText: '2 Menunggu di Pos'
      },
      {
        id: 'package_hold',
        title: 'TITIPAN PAKET',
        icon: EnvelopeSimple,
        mainValue: '38',
        subValue: 'Paket di Lobby',
        statusText: '14 Belum Diambil'
      },
      {
        id: 'patrol_route',
        title: 'PATROLI KELILING',
        icon: ShieldCheck,
        mainValue: '6',
        subValue: '/ 8 Checkpoint',
        statusText: '75% Selesai (Aman)'
      }
    ],
    menuItems: [
      { id: 'visitor_log', title: 'Buku Tamu\nVisitor Log', icon: IdentificationCard, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)', badgeCount: 4 },
      { id: 'goods_in_out', title: 'Izin Barang\nGate Pass', icon: Package, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)', badgeCount: 2 },
      { id: 'package_drop', title: 'Titipan\nPaket Tenant', icon: EnvelopeSimple, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', badgeCount: 14 },
      { id: 'patrol_sched', title: 'Jadwal\nPatroli', icon: ShieldCheck, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
      { id: 'incident', title: 'Laporan\nInsiden', icon: Warning, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
      { id: 'parking_gate', title: 'Akses Parkir\nKendaraan', icon: Car, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' },
      { id: 'cctv_view', title: 'Monitoring\nCCTV Area', icon: VideoCamera, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
      { id: 'all_menu', title: 'Semua\nLog Satpam', icon: SquaresFour, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
    ]
  },

  hk: {
    profile: {
      name: 'Siti Rahayu',
      roleBadge: 'Supervisor Housekeeping',
      currentLocation: 'Paladian Park - HK Office'
    },
    overview: [
      {
        id: 'cleaning_area',
        title: 'CHECKLIST AREA',
        icon: CheckSquare,
        mainValue: '28',
        subValue: '/ 35 Area',
        statusText: '80% Selesai Dibersihkan'
      },
      {
        id: 'clean_request',
        title: 'REQUEST KHUSUS',
        icon: Sparkle,
        mainValue: '8',
        subValue: 'Masuk Hari Ini',
        statusText: '2 Sedang Dikerjakan'
      },
      {
        id: 'chemical_stock',
        title: 'STOK CHEMICAL',
        icon: Package,
        mainValue: '85%',
        subValue: 'Level Persediaan',
        statusText: '2 Perlu Restock'
      },
      {
        id: 'shift_team',
        title: 'PETUGAS AKTIF',
        icon: UsersThree,
        mainValue: '12',
        subValue: '/ 14 Personel',
        statusText: 'Shift Pagi Siaga'
      }
    ],
    menuItems: [
      { id: 'checklist_area', title: 'Checklist\nArea & Fasilitas', icon: CheckSquare, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'special_request', title: 'Request\nKebersihan', icon: Sparkle, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)', badgeCount: 2 },
      { id: 'schedule_toilet', title: 'Jadwal & Log\nToilet Bersih', icon: CalendarCheck, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
      { id: 'waste_mgmt', title: 'Pengelolaan\nSampah', icon: Trash, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
      { id: 'damage_report', title: 'Lapor Kerusakan\nArea Publik', icon: WarningCircle, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', badgeCount: 1 },
      { id: 'chemical_supplies', title: 'Gudang Chemical\n& Linen', icon: Package, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
      { id: 'handover_log', title: 'Log Serah\nTerima Shift', icon: FileText, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'all_menu', title: 'Semua\nModul HK', icon: SquaresFour, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
    ]
  },

  tr: {
    profile: {
      name: 'Dina Safitri',
      roleBadge: 'Tenant Relations',
      currentLocation: 'Paladian Park - TR Counter'
    },
    overview: [
      {
        id: 'complaint_tickets',
        title: 'KOMPLAIN MASUK',
        icon: ChatDots,
        mainValue: '14',
        subValue: 'Tiket Hari Ini',
        statusText: '3 Butuh Follow Up'
      },
      {
        id: 'fitout_review',
        title: 'PERMIT FIT OUT',
        icon: Certificate,
        mainValue: '6',
        subValue: 'Pengajuan Baru',
        statusText: '2 Siap Disetujui'
      },
      {
        id: 'tenant_db',
        title: 'OKUPANSI UNIT',
        icon: Users,
        mainValue: '92%',
        subValue: '248 / 270 Unit',
        statusText: 'Terisi Penghuni'
      },
      {
        id: 'satisfaction',
        title: 'KEPUASAN TENANT',
        icon: Star,
        mainValue: '4.8',
        subValue: '/ 5.0 Rating',
        statusText: 'Sangat Memuaskan'
      }
    ],
    menuItems: [
      { id: 'complaints', title: 'Tiket\nKomplain', icon: ChatDots, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', badgeCount: 3 },
      { id: 'fit_out_permit', title: 'Verifikasi\nFit Out Permit', icon: Certificate, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)', badgeCount: 2 },
      { id: 'tenant_directory', title: 'Database\nPenghuni', icon: Users, color: '#27b29b', bgColor: 'rgba(39, 178, 155, 0.1)' },
      { id: 'broadcast_announcement', title: 'Broadcast\nPengumuman', icon: Megaphone, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
      { id: 'handover_keys', title: 'Serah Terima\nKunci Unit', icon: Key, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' },
      { id: 'survey_feedback', title: 'Survei\nKepuasan', icon: Star, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
      { id: 'contract_docs', title: 'Dokumen &\nPerjanjian', icon: FileText, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
      { id: 'all_menu', title: 'Semua\nMenu TR', icon: SquaresFour, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
    ]
  }
};
