/**
 * [M] MODEL: TenantUnitModel.js
 * Comprehensive mock data and helpers for Tenant Unit management in ProApps.
 * Supports:
 * - Towers with occupancy calculations
 * - Units with legal owners, tenant members, vehicles, and bill settings
 * - Status logic: Occupied (Owner), Disewakan (Tenant), Vacant
 */

export const UNIT_STATUS = {
  OCCUPIED: 'Occupied',
  RENTED: 'Disewakan',
  VACANT: 'Vacant'
};

export const MEMBER_ROLES = [
  'Penyewa',
  'Suami/Istri',
  'Keluarga',
  'Karyawan',
  'Kerabat'
];

export const initialTowersData = [
  {
    id: 'tower-a',
    name: 'Tower A',
    siteName: 'Paladian Park',
    totalUnits: 48,
    occupiedUnits: 41,
    vacantUnits: 7,
    occupancyRate: 85,
    description: 'Tower residensial utama dengan fasilitas lobby concierge'
  },
  {
    id: 'tower-b',
    name: 'Tower B',
    siteName: 'Paladian Park',
    totalUnits: 36,
    occupiedUnits: 26,
    vacantUnits: 10,
    occupancyRate: 72,
    description: 'Tower residensial barat dekat area taman dan gym'
  },
  {
    id: 'tower-c',
    name: 'Tower C',
    siteName: 'Paladian Park',
    totalUnits: 24,
    occupiedUnits: 12,
    vacantUnits: 12,
    occupancyRate: 50,
    description: 'Tower residensial timur dekat playground dan tennis court'
  }
];

export const initialUnitsData = [
  // ==========================================
  // TOWER A UNITS
  // ==========================================
  {
    id: 'unit-a-1201',
    unit_name: 'Unit A-1201',
    tower: 'Tower A',
    tower_id: 'tower-a',
    floor: '12',
    type: '3BR Penthouse',
    bedroom_count: 3,
    area: '108 m²',
    npp: 'NPP-PLD-001201',
    description: 'Unit lantai 12 dengan balkon hadap utara dan pemandangan kolam renang.',
    ownership_letter: 'SHM Sarusun No. 0482/PLD/2021',
    status: UNIT_STATUS.RENTED, // Disewakan
    owner: {
      id: 'own-001',
      name: 'Budi Santoso',
      phone: '+62 812-3456-7890',
      email: 'budi.santoso@email.com'
    },
    // Karena disewakan: Pemilik TIDAK masuk ke members, Penyewa (Rendra Pratama) adalah is_occupant: true
    members: [
      { id: 'm-1', name: 'Rendra Pratama', role: 'Penyewa', is_occupant: true, since: '01 Jan 2025' },
      { id: 'm-2', name: 'Siti Rahma', role: 'Suami/Istri', is_occupant: false, since: '01 Jan 2025' },
      { id: 'm-3', name: 'Dimas Pratama', role: 'Keluarga', is_occupant: false, since: '01 Jan 2025' }
    ],
    vehicles: [
      { id: 'v-1', plate_number: 'B 1234 KLR', brand_model: 'Toyota Fortuner GR', color: 'Hitam Metalik', type: 'Mobil', member_id: 'm-1', member_name: 'Rendra Pratama' },
      { id: 'v-2', plate_number: 'B 5678 SMR', brand_model: 'Honda PCX 160', color: 'Putih Mutiara', type: 'Motor', member_id: 'm-2', member_name: 'Siti Rahma' }
    ],
    electric_capacity: '4400 VA',
    water_meter_no: 'PAM-TWA-1201-99',
    electric_meter_no: 'PLN-TWA-1201-44',
    water_meter_initial: '124.5 m³',
    electric_meter_initial: '3412 kWh',
    bill_settings: {
      insert_electric: true,
      insert_water: true,
      insert_ipl: true,
      ipl_target: 'Penyewa',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 1.450.000 (Jan 2026)'
    }
  },
  {
    id: 'unit-a-0805',
    unit_name: 'Unit A-0805',
    tower: 'Tower A',
    tower_id: 'tower-a',
    floor: '08',
    type: '2BR Corner',
    bedroom_count: 2,
    area: '74 m²',
    npp: 'NPP-PLD-000805',
    description: 'Unit sudut lantai 8 dengan pencahayaan alami maksimal.',
    ownership_letter: 'SHM Sarusun No. 0319/PLD/2020',
    status: UNIT_STATUS.OCCUPIED, // Dihuni Pemilik Sendiri
    owner: {
      id: 'own-002',
      name: 'Hendrawan Kusuma',
      phone: '+62 811-9876-5432',
      email: 'hendrawan.k@gmail.com'
    },
    // Karena dihuni sendiri: Pemilik masuk ke members sebagai kepala penghuni
    members: [
      { id: 'm-4', name: 'Hendrawan Kusuma', role: 'Pemilik', is_occupant: true, since: '15 Mei 2021' },
      { id: 'm-5', name: 'Dewi Lestari', role: 'Suami/Istri', is_occupant: false, since: '15 Mei 2021' }
    ],
    vehicles: [
      { id: 'v-3', plate_number: 'B 8899 HK', brand_model: 'Honda CR-V Turbo', color: 'Abu-abu Metalik', type: 'Mobil', member_id: 'm-4', member_name: 'Hendrawan Kusuma' }
    ],
    electric_capacity: '3500 VA',
    water_meter_no: 'PAM-TWA-0805-12',
    electric_meter_no: 'PLN-TWA-0805-88',
    water_meter_initial: '98.2 m³',
    electric_meter_initial: '2870 kWh',
    bill_settings: {
      insert_electric: true,
      insert_water: true,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 980.000 (Jan 2026)'
    }
  },
  {
    id: 'unit-a-0302',
    unit_name: 'Unit A-0302',
    tower: 'Tower A',
    tower_id: 'tower-a',
    floor: '03',
    type: '1BR Deluxe',
    bedroom_count: 1,
    area: '48 m²',
    npp: 'NPP-PLD-000302',
    description: 'Unit 1 kamar tidur dekat dengan fasilitas lift dan tangga darurat.',
    ownership_letter: 'SHM Sarusun No. 0112/PLD/2022',
    status: UNIT_STATUS.VACANT, // Vacant (belum berpenghuni)
    owner: {
      id: 'own-003',
      name: 'Maya Indah Permata',
      phone: '+62 813-1122-3344',
      email: 'maya.indah@permatagroup.com'
    },
    members: [],
    vehicles: [],
    electric_capacity: '2200 VA',
    water_meter_no: 'PAM-TWA-0302-05',
    electric_meter_no: 'PLN-TWA-0302-21',
    water_meter_initial: '15.0 m³',
    electric_meter_initial: '450 kWh',
    bill_settings: {
      insert_electric: false,
      insert_water: false,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 650.000 (Jan 2026)'
    }
  },
  {
    id: 'unit-a-1503',
    unit_name: 'Unit A-1503',
    tower: 'Tower A',
    tower_id: 'tower-a',
    floor: '15',
    type: '3BR Executive',
    bedroom_count: 3,
    area: '115 m²',
    npp: 'NPP-PLD-001503',
    description: 'Unit lantai tinggi dengan pemandangan cakrawala kota 180 derajat.',
    ownership_letter: 'SHM Sarusun No. 0599/PLD/2019',
    status: UNIT_STATUS.OCCUPIED,
    owner: {
      id: 'own-004',
      name: 'Dr. Gunawan Wibowo',
      phone: '+62 815-5566-7788',
      email: 'dr.gunawan@hospital.co.id'
    },
    members: [
      { id: 'm-6', name: 'Dr. Gunawan Wibowo', role: 'Pemilik', is_occupant: true, since: '10 Nov 2019' },
      { id: 'm-7', name: 'Anindya Wibowo', role: 'Suami/Istri', is_occupant: false, since: '10 Nov 2019' },
      { id: 'm-8', name: 'Mba Sumi', role: 'Karyawan', is_occupant: false, since: '01 Feb 2020' }
    ],
    vehicles: [
      { id: 'v-4', plate_number: 'B 1980 GW', brand_model: 'BMW 530i M Sport', color: 'Sophisto Grey', type: 'Mobil', member_id: 'm-6', member_name: 'Dr. Gunawan Wibowo' }
    ],
    electric_capacity: '5500 VA',
    water_meter_no: 'PAM-TWA-1503-60',
    electric_meter_no: 'PLN-TWA-1503-77',
    water_meter_initial: '310.4 m³',
    electric_meter_initial: '6890 kWh',
    bill_settings: {
      insert_electric: true,
      insert_water: true,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 1.600.000 (Jan 2026)'
    }
  },

  // ==========================================
  // TOWER B UNITS
  // ==========================================
  {
    id: 'unit-b-0601',
    unit_name: 'Unit B-0601',
    tower: 'Tower B',
    tower_id: 'tower-b',
    floor: '06',
    type: '2BR Suite',
    bedroom_count: 2,
    area: '72 m²',
    npp: 'NPP-PLD-002601',
    description: 'Unit tower B dengan pemandangan taman tengah asri.',
    ownership_letter: 'SHM Sarusun No. 0288/PLD/2021',
    status: UNIT_STATUS.RENTED,
    owner: {
      id: 'own-005',
      name: 'Iwan Setiawan',
      phone: '+62 817-4433-2211',
      email: 'iwan.setiawan@property.id'
    },
    members: [
      { id: 'm-9', name: 'Kevin Wijaya', role: 'Penyewa', is_occupant: true, since: '15 Mar 2025' },
      { id: 'm-10', name: 'Agus Santoso', role: 'Kerabat', is_occupant: false, since: '01 Apr 2025' }
    ],
    vehicles: [
      { id: 'v-5', plate_number: 'B 2345 KW', brand_model: 'Hyundai Ioniq 5', color: 'Gravity Gold Matte', type: 'Mobil', member_id: 'm-9', member_name: 'Kevin Wijaya' }
    ],
    electric_capacity: '3500 VA',
    water_meter_no: 'PAM-TWB-0601-33',
    electric_meter_no: 'PLN-TWB-0601-55',
    water_meter_initial: '88.0 m³',
    electric_meter_initial: '2100 kWh',
    bill_settings: {
      insert_electric: true,
      insert_water: true,
      insert_ipl: true,
      ipl_target: 'Penyewa',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 950.000 (Jan 2026)'
    }
  },
  {
    id: 'unit-b-0904',
    unit_name: 'Unit B-0904',
    tower: 'Tower B',
    tower_id: 'tower-b',
    floor: '09',
    type: '2BR Standard',
    bedroom_count: 2,
    area: '68 m²',
    npp: 'NPP-PLD-002904',
    description: 'Unit 2 kamar tidur siap huni lengkap dengan perabotan built-in.',
    ownership_letter: 'SHM Sarusun No. 0344/PLD/2020',
    status: UNIT_STATUS.OCCUPIED,
    owner: {
      id: 'own-006',
      name: 'Farhan Maulana',
      phone: '+62 818-7766-5544',
      email: 'farhan.m@techdev.com'
    },
    members: [
      { id: 'm-11', name: 'Farhan Maulana', role: 'Pemilik', is_occupant: true, since: '20 Jul 2022' },
      { id: 'm-12', name: 'Nadia Az-Zahra', role: 'Suami/Istri', is_occupant: false, since: '20 Jul 2022' }
    ],
    vehicles: [
      { id: 'v-6', plate_number: 'B 3456 FM', brand_model: 'Mazda CX-5 Elite', color: 'Soul Red Crystal', type: 'Mobil', member_id: 'm-11', member_name: 'Farhan Maulana' },
      { id: 'v-7', plate_number: 'B 6789 NA', brand_model: 'Yamaha Fazzio', color: 'Tosca Blue', type: 'Motor', member_id: 'm-12', member_name: 'Nadia Az-Zahra' }
    ],
    electric_capacity: '3500 VA',
    water_meter_no: 'PAM-TWB-0904-77',
    electric_meter_no: 'PLN-TWB-0904-90',
    water_meter_initial: '142.1 m³',
    electric_meter_initial: '3150 kWh',
    bill_settings: {
      insert_electric: true,
      insert_water: true,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 890.000 (Jan 2026)'
    }
  },
  {
    id: 'unit-b-0201',
    unit_name: 'Unit B-0201',
    tower: 'Tower B',
    tower_id: 'tower-b',
    floor: '02',
    type: 'Studio Compact',
    bedroom_count: 1,
    area: '34 m²',
    npp: 'NPP-PLD-002201',
    description: 'Unit studio praktis lantai rendah dekat lobby dan drop-off.',
    ownership_letter: 'SHM Sarusun No. 0098/PLD/2023',
    status: UNIT_STATUS.VACANT,
    owner: {
      id: 'own-007',
      name: 'Stephanie Tan',
      phone: '+62 819-0099-8877',
      email: 'stephanie.tan@capital.sg'
    },
    members: [],
    vehicles: [],
    electric_capacity: '1300 VA',
    water_meter_no: 'PAM-TWB-0201-11',
    electric_meter_no: 'PLN-TWB-0201-18',
    water_meter_initial: '5.2 m³',
    electric_meter_initial: '120 kWh',
    bill_settings: {
      insert_electric: false,
      insert_water: false,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 450.000 (Jan 2026)'
    }
  },

  // ==========================================
  // TOWER C UNITS
  // ==========================================
  {
    id: 'unit-c-0502',
    unit_name: 'Unit C-0502',
    tower: 'Tower C',
    tower_id: 'tower-c',
    floor: '05',
    type: '3BR Family',
    bedroom_count: 3,
    area: '96 m²',
    npp: 'NPP-PLD-003502',
    description: 'Unit keluarga luas dekat playground anak-anak.',
    ownership_letter: 'SHM Sarusun No. 0411/PLD/2021',
    status: UNIT_STATUS.OCCUPIED,
    owner: {
      id: 'own-008',
      name: 'Kurniawan Hidayat',
      phone: '+62 812-9988-7766',
      email: 'kurniawan.h@hidayat.id'
    },
    members: [
      { id: 'm-13', name: 'Kurniawan Hidayat', role: 'Pemilik', is_occupant: true, since: '01 Sep 2021' },
      { id: 'm-14', name: 'Rina Marlina', role: 'Suami/Istri', is_occupant: false, since: '01 Sep 2021' }
    ],
    vehicles: [
      { id: 'v-8', plate_number: 'B 7788 KH', brand_model: 'Mitsubishi Pajero Sport', color: 'Hitam', type: 'Mobil', member_id: 'm-13', member_name: 'Kurniawan Hidayat' }
    ],
    electric_capacity: '4400 VA',
    water_meter_no: 'PAM-TWC-0502-45',
    electric_meter_no: 'PLN-TWC-0502-67',
    water_meter_initial: '165.0 m³',
    electric_meter_initial: '4120 kWh',
    bill_settings: {
      insert_electric: true,
      insert_water: true,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 1.250.000 (Jan 2026)'
    }
  },
  {
    id: 'unit-c-1001',
    unit_name: 'Unit C-1001',
    tower: 'Tower C',
    tower_id: 'tower-c',
    floor: '10',
    type: '2BR Sky',
    bedroom_count: 2,
    area: '78 m²',
    npp: 'NPP-PLD-003001',
    description: 'Unit lantai 10 dengan balkon luas hadap timur.',
    ownership_letter: 'SHM Sarusun No. 0520/PLD/2022',
    status: UNIT_STATUS.VACANT,
    owner: {
      id: 'own-009',
      name: 'Cindy Claudia',
      phone: '+62 811-2233-4455',
      email: 'cindy.claudia@invest.co.id'
    },
    members: [],
    vehicles: [],
    electric_capacity: '3500 VA',
    water_meter_no: 'PAM-TWC-1001-89',
    electric_meter_no: 'PLN-TWC-1001-92',
    water_meter_initial: '8.0 m³',
    electric_meter_initial: '210 kWh',
    bill_settings: {
      insert_electric: false,
      insert_water: false,
      insert_ipl: true,
      ipl_target: 'Pemilik',
      ipl_interval: 'Bulanan',
      last_ipl_bill: 'Rp 980.000 (Jan 2026)'
    }
  }
];
