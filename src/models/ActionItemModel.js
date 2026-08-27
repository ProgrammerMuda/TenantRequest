/**
 * [M] MODEL: ActionItemModel
 * Encapsulates the domain model, validation rules, enums, and initial mock data
 * for the "List Need Action" application.
 */

export const ACTION_PRIORITY = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

export const ACTION_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export const ACTION_CATEGORY = {
  APPROVAL: 'Approval Request',
  FINANCE: 'Financial Review',
  TECHNICAL: 'Technical Audit',
  COMPLIANCE: 'Legal & Compliance',
  STRATEGY: 'Strategic Plan'
};

export const initialActionItems = [
  {
    id: 'ACT-101',
    title: 'Review Q3 Budget Allocation & Vendor Contracts',
    description: 'Verify department expenditure proposals against Q3 targets and sign off on pending vendor renewals.',
    category: ACTION_CATEGORY.FINANCE,
    priority: ACTION_PRIORITY.HIGH,
    status: ACTION_STATUS.PENDING,
    assignee: { name: 'Ahmad Faisal', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120' },
    dueDate: '2026-08-16',
    createdAt: '2026-08-12',
    tags: ['Budget', 'Q3', 'Urgent']
  },
  {
    id: 'ACT-102',
    title: 'Authorize Security Compliance Certificate for Mobile API',
    description: 'Final sign-off required for ISO 27001 audit report before shipping the production mobile build.',
    category: ACTION_CATEGORY.COMPLIANCE,
    priority: ACTION_PRIORITY.HIGH,
    status: ACTION_STATUS.IN_PROGRESS,
    assignee: { name: 'Siti Rahma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' },
    dueDate: '2026-08-15',
    createdAt: '2026-08-10',
    tags: ['Security', 'Mobile', 'ISO27001']
  },
  {
    id: 'ACT-103',
    title: 'Approve New Hires Onboarding Workflow & Equipment Requests',
    description: 'Review workstation requests for 4 senior developers joining next week in Jakarta Office.',
    category: ACTION_CATEGORY.APPROVAL,
    priority: ACTION_PRIORITY.MEDIUM,
    status: ACTION_STATUS.PENDING,
    assignee: { name: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120' },
    dueDate: '2026-08-18',
    createdAt: '2026-08-11',
    tags: ['HR', 'Onboarding']
  },
  {
    id: 'ACT-104',
    title: 'Perform Infrastructure Load Test & Cache Optimization',
    description: 'Evaluate Redis cluster latency spikes during peak transaction hours and optimize query indices.',
    category: ACTION_CATEGORY.TECHNICAL,
    priority: ACTION_PRIORITY.MEDIUM,
    status: ACTION_STATUS.COMPLETED,
    assignee: { name: 'Devi Permata', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120' },
    dueDate: '2026-08-14',
    createdAt: '2026-08-08',
    tags: ['DevOps', 'Redis', 'Performance']
  },
  {
    id: 'ACT-105',
    title: 'Draft Product Roadmap Alignment for Q4 Growth',
    description: 'Prepare executive summary deck outlining key feature milestones and resource allocation for Q4.',
    category: ACTION_CATEGORY.STRATEGY,
    priority: ACTION_PRIORITY.LOW,
    status: ACTION_STATUS.IN_PROGRESS,
    assignee: { name: 'Ahmad Faisal', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120' },
    dueDate: '2026-08-22',
    createdAt: '2026-08-09',
    tags: ['Strategy', 'Roadmap']
  }
];

export class ActionItemModel {
  static create(data) {
    return {
      id: `ACT-${Math.floor(100 + Math.random() * 900)}`,
      title: data.title || 'Untitled Action Item',
      description: data.description || '',
      category: data.category || ACTION_CATEGORY.APPROVAL,
      priority: data.priority || ACTION_PRIORITY.MEDIUM,
      status: ACTION_STATUS.PENDING,
      assignee: data.assignee || { name: 'User Team', avatar: '' },
      dueDate: data.dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      tags: data.tags || []
    };
  }

  static validate(item) {
    const errors = {};
    if (!item.title || item.title.trim() === '') {
      errors.title = 'Judul action item wajib diisi';
    }
    if (!item.category) {
      errors.category = 'Kategori wajib dipilih';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}
