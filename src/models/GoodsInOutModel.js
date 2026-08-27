/**
 * [M] MODEL: GoodsInOutModel
 * Contains mock data and constants for the Goods In & Out feature.
 */

export const GOODS_STATUS = {
  WAITING_APPROVAL: 'Waiting Approval',
  TR_CONFIRMATION: 'TR Confirmation',
  APPROVED: 'Approved',
  SECURITY_CHECK: 'Security Check',
  GIGO_REJECTED: 'Gigo Rejected',
  COMPLETED: 'Completed',
  CANCELED: 'Canceled'
};

export const goodsInOutMockData = [
  {
    id: 'GIO-001',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.WAITING_APPROVAL,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: true
  },
  {
    id: 'GIO-002',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.TR_CONFIRMATION,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: true
  },
  {
    id: 'GIO-003',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.APPROVED,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: false
  },
  {
    id: 'GIO-004',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.SECURITY_CHECK,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: true
  },
  {
    id: 'GIO-005',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.GIGO_REJECTED,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: false
  },
  {
    id: 'GIO-006',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.COMPLETED,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: false
  },
  {
    id: 'GIO-007',
    unitNumber: 'A0101',
    type: 'Goods in',
    itemName: 'Kulkas',
    itemQuantity: 1,
    additionalItems: 2,
    schedule: 'Schedule 12 Feb 2026, 16:07',
    status: GOODS_STATUS.CANCELED,
    requestNumber: 'PRO/FP/122025/000006',
    submitDate: 'Submitted 12 Feb 16:07 PM',
    needAction: false
  }
];
