/**
 * [M] MODEL: FilterModel
 * Pure logic functions for filtering, searching, and sorting Action Items
 */

import { ACTION_STATUS, ACTION_PRIORITY } from './ActionItemModel';

export class FilterModel {
  static filterItems(items, { search = '', status = 'ALL', priority = 'ALL', category = 'ALL' }) {
    return items.filter(item => {
      // Search term matching
      const matchesSearch = search.trim() === '' ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      // Status matching
      const matchesStatus = status === 'ALL' || item.status === status;

      // Priority matching
      const matchesPriority = priority === 'ALL' || item.priority === priority;

      // Category matching
      const matchesCategory = category === 'ALL' || item.category === category;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }

  static getStatistics(items) {
    const total = items.length;
    const pending = items.filter(i => i.status === ACTION_STATUS.PENDING).length;
    const inProgress = items.filter(i => i.status === ACTION_STATUS.IN_PROGRESS).length;
    const completed = items.filter(i => i.status === ACTION_STATUS.COMPLETED).length;
    const highPriority = items.filter(i => i.priority === ACTION_PRIORITY.HIGH && i.status !== ACTION_STATUS.COMPLETED).length;

    return {
      total,
      pending,
      inProgress,
      completed,
      highPriority,
      needActionCount: pending + inProgress
    };
  }
}
