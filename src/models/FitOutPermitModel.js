/**
 * [M] MODEL: FitOutPermitModel
 * Data structures and mock data for Fit Out Permit feature.
 */

export const PERMIT_STATUS = {
  WAITING_APPROVAL: 'Waiting Approval',
  WAITING_CONFIRMATION: 'Waiting Confirmation',
  WAITING_PAYMENT: 'Waiting Payment',
  INSPECTION: 'Inspection',
  APPROVED: 'Approved',
  ON_WORK: 'On Work',
  INSPECTED: 'Inspected',
  SETTLEMENT: 'Settlement',
  COMPLETE: 'Complete'
};

export const permitMockData = [
  {
    id: 'P-001',
    unitNumber: 'A0101',
    title: 'Renovasi kamar mandi',
    startDate: '14 Feb 2026',
    endDate: '18 Feb 2026',
    duration: '4 Days',
    permitNumber: 'PRO/FP/122025/000001',
    submittedAt: '12 Feb 16:07 PM',
    status: PERMIT_STATUS.WAITING_APPROVAL,
    category: 'Renovation',
    needAction: true,
    photos: ['/renovasi_kamar_1.jpg', '/renovasi_kamar_2.jpg'],
    notes: 'Renovasi kamar mandi dan instalasi sanitari baru.',
    location: { tower: 'Tower A', floor: 'Lantai 1', unit: 'A0101' }
  },
  {
    id: 'P-002',
    unitNumber: 'A0105',
    title: 'Pengecatan interior',
    startDate: '15 Feb 2026',
    endDate: '20 Feb 2026',
    duration: '5 Days',
    permitNumber: 'PRO/FP/122025/000002',
    submittedAt: '13 Feb 10:15 AM',
    status: PERMIT_STATUS.WAITING_CONFIRMATION,
    category: 'Painting',
    needAction: true,
    photos: ['/renovasi_kamar_1.jpg', '/renovasi_kamar_2.jpg'],
    notes: 'Pengecatan ulang seluruh dinding interior unit.',
    location: { tower: 'Tower A', floor: 'Lantai 1', unit: 'A0105' }
  },
  {
    id: 'P-003',
    unitNumber: 'A0201',
    title: 'Perbaikan partisi',
    startDate: '16 Feb 2026',
    endDate: '21 Feb 2026',
    duration: '5 Days',
    permitNumber: 'PRO/FP/122025/000003',
    submittedAt: '14 Feb 09:30 AM',
    status: PERMIT_STATUS.WAITING_PAYMENT,
    category: 'Repair',
    needAction: false,
    photos: ['/renovasi_kamar_1.jpg'],
    notes: 'Perbaikan partisi gypsum antara ruang tamu dan kamar tidur.',
    location: { tower: 'Tower A', floor: 'Lantai 2', unit: 'A0201' }
  },
  {
    id: 'P-004',
    unitNumber: 'B0102',
    title: 'Instalasi AC Sentral',
    startDate: '18 Feb 2026',
    endDate: '19 Feb 2026',
    duration: '1 Day',
    permitNumber: 'PRO/FP/122025/000004',
    submittedAt: '15 Feb 11:00 AM',
    status: PERMIT_STATUS.INSPECTION,
    category: 'Installation',
    location: { tower: 'Tower B', floor: 'Lantai 1', unit: 'B0102' }
  },
  {
    id: 'P-005',
    unitNumber: 'B0205',
    title: 'Pemasangan lantai vinyl',
    startDate: '20 Feb 2026',
    endDate: '23 Feb 2026',
    duration: '3 Days',
    permitNumber: 'PRO/FP/122025/000005',
    submittedAt: '16 Feb 14:20 PM',
    status: PERMIT_STATUS.APPROVED,
    category: 'Flooring',
    location: { tower: 'Tower B', floor: 'Lantai 2', unit: 'B0205' }
  },
  {
    id: 'P-006',
    unitNumber: 'A1202',
    title: 'Renovasi Kamar',
    startDate: '12 - 14 Feb 2026',
    endDate: '14 Feb 2026',
    duration: '3 Days',
    permitNumber: 'PRO/FP/122025/000032',
    submittedAt: '11/02/2025 12:00 PM',
    status: PERMIT_STATUS.ON_WORK,
    category: 'Renovation',
    needAction: true,
    fileInfo: {
      name: 'work permit letter',
      size: '200kb'
    },
    workingHours: {
      weekday: '12.00 - 17.00',
      weekend: '08.00 - 14.00'
    },
    photos: ['/renovasi_kamar_1.jpg', '/renovasi_kamar_2.jpg'],
    notes: 'Saya mau renovasi kamar saya',
    startWork: '12 Feb 2026, 22:33',
    endWork: 'Not Finished yet',
    location: {
      tower: 'Tower A',
      floor: 'Lantai 1',
      unit: 'A1202'
    },
    dailyInspections: [
      {
        id: 'INS-01',
        code: 'PRO/INS/022026/A1202/0004',
        title: 'Fitout Inspection',
        pic: 'Security',
        date: '12/01/2026, 14:20 PM'
      },
      {
        id: 'INS-02',
        code: 'PRO/INS/022026/A1202/0005',
        title: 'Fitout Inspection',
        pic: 'Security',
        date: '12/01/2026, 17:20 PM'
      }
    ],
    trackingProgress: [
      {
        id: 1,
        title: 'Request Fit Out Permit Submitted',
        role: 'Raga Murtadha - Tenant',
        time: '12/01/2026 12:00 PM',
        status: 'completed',
        note: 'Photos, files and notes attached.'
      },
      {
        id: 2,
        title: 'Waiting for Management Approval',
        role: 'Tenant Relation, Building Manager, Engineering',
        time: '12/01/2026 12:00 PM',
        status: 'completed',
        approvals: [
          { name: 'Administrative Review', dept: 'Tenant Relation', status: 'Approved' },
          { name: 'Document & Technical Review', dept: 'Engineering', status: 'Approved' },
          { name: 'Final & Authorization', dept: 'Building Management', status: 'Approved' }
        ]
      },
      {
        id: 3,
        title: 'Awaiting Early Inspection Schedule',
        role: 'Tenant Relation',
        time: '12/01/2026 12:00 PM',
        status: 'completed'
      },
      {
        id: 4,
        title: 'Early Inspection Scheduled',
        role: 'Tenant Relation',
        time: '12/01/2026 13:28 PM',
        status: 'completed',
        note: 'Early Inspection by engineering scheduled for 12/01/2026 14:20 PM'
      },
      {
        id: 5,
        title: 'Early Inspection Finish',
        role: 'Engineering',
        time: '12/01/2026 12:00 PM',
        status: 'completed'
      },
      {
        id: 6,
        title: 'Early Inspection Scheduled',
        role: 'Tenant Relation',
        time: '12/01/2026 13:28 PM',
        status: 'completed'
      },
      {
        id: 7,
        title: 'Awaiting Deposit Payment',
        role: 'Raga Murtadha - Tenant',
        time: '12/01/2026 13:20 PM',
        status: 'completed',
        note: 'Deposit Bill: Rp 2.000.000,00'
      },
      {
        id: 8,
        title: 'Deposit Payment Confirmed',
        role: 'Raga Murtadha - Tenant',
        time: '12/01/2026 13:23 PM',
        status: 'completed'
      },
      {
        id: 9,
        title: 'Fit Out on Progress',
        role: 'Raga Murtadha - Tenant',
        time: '12/01/2026 13:24 PM',
        status: 'current'
      }
    ]
  },
  {
    id: 'P-007',
    unitNumber: 'C0305',
    title: 'Pengecekan instalasi pipa',
    startDate: '24 Feb 2026',
    endDate: '24 Feb 2026',
    duration: '1 Day',
    permitNumber: 'PRO/FP/122025/000007',
    submittedAt: '20 Feb 09:00 AM',
    status: PERMIT_STATUS.INSPECTED,
    category: 'Plumbing',
    location: { tower: 'Tower C', floor: 'Lantai 3', unit: 'C0305' }
  },
  {
    id: 'P-008',
    unitNumber: 'D0102',
    title: 'Finishing interior',
    startDate: '25 Feb 2026',
    endDate: '28 Feb 2026',
    duration: '3 Days',
    permitNumber: 'PRO/FP/122025/000008',
    submittedAt: '21 Feb 13:45 PM',
    status: PERMIT_STATUS.SETTLEMENT,
    category: 'Finishing',
    location: { tower: 'Tower D', floor: 'Lantai 1', unit: 'D0102' }
  },
  {
    id: 'P-009',
    unitNumber: 'D0505',
    title: 'Pembersihan sisa material',
    startDate: '01 Mar 2026',
    endDate: '02 Mar 2026',
    duration: '1 Day',
    permitNumber: 'PRO/FP/122025/000009',
    submittedAt: '28 Feb 10:30 AM',
    status: PERMIT_STATUS.COMPLETE,
    category: 'Cleaning',
    location: { tower: 'Tower D', floor: 'Lantai 5', unit: 'D0505' }
  }
];

export function getPermitDetailData(permit) {
  if (!permit) return permitMockData[5]; // default to P-006 On Work
  const base = permitMockData.find(p => p.id === permit.id) || permit;
  return {
    ...permitMockData[5],
    ...base,
    unitNumber: base.unitNumber || 'A1202',
    title: base.title || 'Renovasi Kamar',
    permitNumber: base.permitNumber || 'PRO/FP/122025/000032',
    status: base.status || PERMIT_STATUS.ON_WORK,
    photos: base.photos && base.photos.length > 0 ? base.photos : ['/renovasi_kamar_1.jpg', '/renovasi_kamar_2.jpg'],
    notes: base.notes || 'Saya mau renovasi kamar saya'
  };
}
