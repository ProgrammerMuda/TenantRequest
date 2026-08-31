/**
 * [M] MODEL: TenantUnitModel.js
 * Comprehensive mock data and generator for Tenant Unit management in ProApps.
 * Supports hundreds of units per tower across multiple floors with:
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

const INDONESIAN_NAMES = [
  'Budi Santoso', 'Hendrawan Kusuma', 'Maya Indah Permata', 'Dr. Gunawan Wibowo',
  'Iwan Setiawan', 'Farhan Maulana', 'Stephanie Tan', 'Kurniawan Hidayat',
  'Cindy Claudia', 'Ahmad Fauzi', 'Siti Nurhaliza', 'Bambang Sutrisno',
  'Dewi Sartika', 'Eko Prasetyo', 'Ratna Sari', 'Agus Haryanto',
  'Sri Wahyuni', 'Tri Wibowo', 'Indah Permata', 'Hadi Wijaya',
  'Lestari Handayani', 'Rizky Ramadhan', 'Nurul Aini', 'Bayu Pratama',
  'Yulia Citra', 'Fajar Nugroho', 'Dina Mariana', 'Aris Munandar'
];

const CAR_MODELS = [
  { brand: 'Toyota Fortuner GR', type: 'Mobil', color: 'Hitam Metalik' },
  { brand: 'Honda CR-V Turbo', type: 'Mobil', color: 'Abu-abu Metalik' },
  { brand: 'BMW 530i M Sport', type: 'Mobil', color: 'Sophisto Grey' },
  { brand: 'Hyundai Ioniq 5', type: 'Mobil', color: 'Gravity Gold' },
  { brand: 'Mazda CX-5 Elite', type: 'Mobil', color: 'Soul Red Crystal' },
  { brand: 'Mitsubishi Pajero Sport', type: 'Mobil', color: 'Putih Mutiara' },
  { brand: 'Honda HR-V RS', type: 'Mobil', color: 'Sand Khaki Pearl' },
  { brand: 'Toyota Innova Zenix', type: 'Mobil', color: 'Attitude Black' },
  { brand: 'Honda PCX 160', type: 'Motor', color: 'Putih Mutiara' },
  { brand: 'Yamaha Fazzio', type: 'Motor', color: 'Tosca Blue' },
  { brand: 'Vespa Sprint S', type: 'Motor', color: 'Yellow Sole' }
];

const UNIT_SPECS = [
  { type: 'Studio Compact', beds: 1, area: '34 m²', cap: '1300 VA' },
  { type: '1BR Deluxe', beds: 1, area: '48 m²', cap: '2200 VA' },
  { type: '2BR Standard', beds: 2, area: '68 m²', cap: '3500 VA' },
  { type: '2BR Suite', beds: 2, area: '74 m²', cap: '3500 VA' },
  { type: '3BR Family', beds: 3, area: '96 m²', cap: '4400 VA' },
  { type: '3BR Executive', beds: 3, area: '108 m²', cap: '5500 VA' }
];

/**
 * Generate programmatic realistic units for a tower with hundreds of units
 */
function generateTowerUnits(towerLetter, towerId, totalFloors, unitsPerFloor) {
  const result = [];

  for (let f = 1; f <= totalFloors; f++) {
    const floorStr = f < 10 ? `0${f}` : `${f}`;

    for (let u = 1; u <= unitsPerFloor; u++) {
      const unitNumStr = u < 10 ? `0${u}` : `${u}`;
      const unitName = `Unit ${towerLetter}-${floorStr}${unitNumStr}`;
      const unitId = `unit-${towerLetter.toLowerCase()}-${floorStr}${unitNumStr}`;

      // Pseudo-random deterministic assignment based on floor and unit number
      const hash = (f * 17 + u * 31) % 100;
      const nameIndex = (f * 3 + u * 5) % INDONESIAN_NAMES.length;
      const ownerName = INDONESIAN_NAMES[nameIndex];
      const spec = UNIT_SPECS[(f + u) % UNIT_SPECS.length];

      let status = UNIT_STATUS.OCCUPIED;
      let members = [];
      let vehicles = [];

      if (hash < 20) {
        // ~20% Vacant
        status = UNIT_STATUS.VACANT;
        members = [];
        vehicles = [];
      } else if (hash < 55) {
        // ~35% Disewakan (Rented)
        status = UNIT_STATUS.RENTED;
        const tenantNameIndex = (nameIndex + 7) % INDONESIAN_NAMES.length;
        const tenantName = INDONESIAN_NAMES[tenantNameIndex];
        const memberId1 = `m-${unitId}-1`;
        const memberId2 = `m-${unitId}-2`;

        members = [
          { id: memberId1, name: tenantName, role: 'Penyewa', is_occupant: true, since: '15 Jan 2025' },
          { id: memberId2, name: `Keluarga ${tenantName.split(' ')[0]}`, role: 'Suami/Istri', is_occupant: false, since: '15 Jan 2025' }
        ];

        const car = CAR_MODELS[(f + u) % CAR_MODELS.length];
        vehicles = [
          {
            id: `v-${unitId}-1`,
            plate_number: `B ${1000 + f * 40 + u} ${towerLetter}${String.fromCharCode(65 + (u % 26))}`,
            brand_model: car.brand,
            color: car.color,
            type: car.type,
            member_id: memberId1,
            member_name: tenantName
          }
        ];
      } else {
        // ~45% Occupied by Owner
        status = UNIT_STATUS.OCCUPIED;
        const memberId1 = `m-${unitId}-own`;
        members = [
          { id: memberId1, name: ownerName, role: 'Pemilik', is_occupant: true, since: '10 Feb 2021' }
        ];

        if (f % 2 === 0) {
          members.push({
            id: `m-${unitId}-spouse`,
            name: `Ibu ${ownerName.split(' ')[0]}`,
            role: 'Suami/Istri',
            is_occupant: false,
            since: '10 Feb 2021'
          });
        }

        const car = CAR_MODELS[(f + u) % CAR_MODELS.length];
        vehicles = [
          {
            id: `v-${unitId}-1`,
            plate_number: `B ${2000 + f * 50 + u} ${towerLetter}P`,
            brand_model: car.brand,
            color: car.color,
            type: car.type,
            member_id: memberId1,
            member_name: ownerName
          }
        ];
      }

      result.push({
        id: unitId,
        unit_name: unitName,
        tower: `Tower ${towerLetter}`,
        tower_id: towerId,
        floor: floorStr,
        type: spec.type,
        bedroom_count: spec.beds,
        area: spec.area,
        npp: `NPP-PLD-${towerLetter}${floorStr}${unitNumStr}`,
        description: `Unit ${spec.type} lantai ${floorStr} Tower ${towerLetter} dengan fasilitas lengkap dan akses lift pribadi.`,
        ownership_letter: `SHM Sarusun No. ${1000 + f * 10 + u}/PLD/2021`,
        status: status,
        owner: {
          id: `own-${towerLetter}-${floorStr}${unitNumStr}`,
          name: ownerName,
          phone: `+62 812-${1000 + f * 10}-${2000 + u * 10}`,
          email: `${ownerName.toLowerCase().replace(/[^a-z]/g, '.')}@property.com`
        },
        members: members,
        vehicles: vehicles,
        electric_capacity: spec.cap,
        water_meter_no: `PAM-TW${towerLetter}-${floorStr}${unitNumStr}`,
        electric_meter_no: `PLN-TW${towerLetter}-${floorStr}${unitNumStr}`,
        water_meter_initial: `${(f * 12 + u * 3.5).toFixed(1)} m³`,
        electric_meter_initial: `${f * 150 + u * 45} kWh`,
        bill_settings: {
          insert_electric: status !== UNIT_STATUS.VACANT,
          insert_water: status !== UNIT_STATUS.VACANT,
          insert_ipl: true,
          ipl_target: status === UNIT_STATUS.RENTED ? 'Penyewa' : 'Pemilik',
          ipl_interval: 'Bulanan',
          last_ipl_bill: `Rp ${(850000 + spec.beds * 250000).toLocaleString('id-ID')} (Jan 2026)`
        }
      });
    }
  }

  return result;
}

// Generate hundreds of units per tower across 5 towers:
// Tower A: 20 floors x 9 units = 180 units!
const towerAUnits = generateTowerUnits('A', 'tower-a', 20, 9);
// Tower B: 15 floors x 8 units = 120 units!
const towerBUnits = generateTowerUnits('B', 'tower-b', 15, 8);
// Tower C: 10 floors x 8 units = 80 units!
const towerCUnits = generateTowerUnits('C', 'tower-c', 10, 8);
// Tower D: 18 floors x 8 units = 144 units!
const towerDUnits = generateTowerUnits('D', 'tower-d', 18, 8);
// Tower E: 12 floors x 6 units = 72 units!
const towerEUnits = generateTowerUnits('E', 'tower-e', 12, 6);

// Combine all units into master dataset (596 units total across 5 towers!)
export const initialUnitsData = [
  ...towerAUnits,
  ...towerBUnits,
  ...towerCUnits,
  ...towerDUnits,
  ...towerEUnits
];

// Calculate dynamic tower summary stats based on actual generated units
export const initialTowersData = [
  {
    id: 'tower-a',
    name: 'Tower A',
    siteName: 'Paladian Park',
    totalUnits: towerAUnits.length,
    occupiedUnits: towerAUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length,
    vacantUnits: towerAUnits.filter(u => u.status === UNIT_STATUS.VACANT).length,
    occupancyRate: Math.round((towerAUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length / towerAUnits.length) * 100),
    description: 'Tower residensial utama 20 lantai dengan fasilitas lobby concierge'
  },
  {
    id: 'tower-b',
    name: 'Tower B',
    siteName: 'Paladian Park',
    totalUnits: towerBUnits.length,
    occupiedUnits: towerBUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length,
    vacantUnits: towerBUnits.filter(u => u.status === UNIT_STATUS.VACANT).length,
    occupancyRate: Math.round((towerBUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length / towerBUnits.length) * 100),
    description: 'Tower residensial barat 15 lantai dekat area taman dan gym'
  },
  {
    id: 'tower-c',
    name: 'Tower C',
    siteName: 'Paladian Park',
    totalUnits: towerCUnits.length,
    occupiedUnits: towerCUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length,
    vacantUnits: towerCUnits.filter(u => u.status === UNIT_STATUS.VACANT).length,
    occupancyRate: Math.round((towerCUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length / towerCUnits.length) * 100),
    description: 'Tower residensial timur 10 lantai dekat playground dan tennis court'
  },
  {
    id: 'tower-d',
    name: 'Tower D',
    siteName: 'Paladian Park',
    totalUnits: towerDUnits.length,
    occupiedUnits: towerDUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length,
    vacantUnits: towerDUnits.filter(u => u.status === UNIT_STATUS.VACANT).length,
    occupancyRate: Math.round((towerDUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length / towerDUnits.length) * 100),
    description: 'Tower Diamond Suite 18 lantai dekat clubhouse dan kolam olimpiade'
  },
  {
    id: 'tower-e',
    name: 'Tower E',
    siteName: 'Paladian Park',
    totalUnits: towerEUnits.length,
    occupiedUnits: towerEUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length,
    vacantUnits: towerEUnits.filter(u => u.status === UNIT_STATUS.VACANT).length,
    occupancyRate: Math.round((towerEUnits.filter(u => u.status !== UNIT_STATUS.VACANT).length / towerEUnits.length) * 100),
    description: 'Tower Emerald Executive 12 lantai dengan sky garden dan private lounge'
  }
];
