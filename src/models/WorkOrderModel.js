/**
 * [M] MODEL: WorkOrderModel
 * Contains mock data and constants for the Work Order feature.
 */

export const WORK_ORDER_STATUS = {
  WAITING_APPROVAL: 'Waiting Approval',
  SURVEY_SCHEDULED: 'Survey Scheduled',
  ON_SURVEY: 'On Survey',
  ON_REVIEW: 'On Review',
  WORK_SCHEDULED: 'Work Scheduled',
  ON_WORK: 'On Work',
  COMPLETE: 'Complete'
};

export const workOrderMockData = [
  {
    id: 'WO-001',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.WAITING_APPROVAL,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: false
  },
  {
    id: 'WO-002',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.SURVEY_SCHEDULED,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: true
  },
  {
    id: 'WO-003',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.ON_SURVEY,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: true
  },
  {
    id: 'WO-004',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.ON_REVIEW,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: false
  },
  {
    id: 'WO-005',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.WORK_SCHEDULED,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: true
  },
  {
    id: 'WO-006',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.ON_WORK,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: true
  },
  {
    id: 'WO-007',
    unitNumber: 'A0101',
    locationSubtitle: 'Unit Location',
    title: 'Pintu Saya Rusak',
    description: 'Tolong benerin pintu saya gagangnya pat...',
    status: WORK_ORDER_STATUS.COMPLETE,
    requestNumber: 'PRO/REQ/122025/000006',
    date: '12 Feb 2026 16:07 PM',
    thumbnail: '/broken_door_handle.jpg',
    needAction: false
  }
];
