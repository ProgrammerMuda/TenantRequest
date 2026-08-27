/**
 * [C] CONTROLLER: useActionListController
 * Custom React hook encapsulating state and actions for managing Action Items.
 * Keeps business logic decoupled from View rendering.
 */

import { useState, useMemo } from 'react';
import { initialActionItems, ActionItemModel, ACTION_STATUS } from '../models/ActionItemModel';
import { FilterModel } from '../models/FilterModel';

export function useActionListController() {
  const [items, setItems] = useState(initialActionItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Modal State for New Action
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Approval Request',
    priority: 'MEDIUM',
    dueDate: '',
    tagsInput: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Computed Filtered List
  const filteredItems = useMemo(() => {
    return FilterModel.filterItems(items, {
      search: searchQuery,
      status: selectedStatus,
      priority: selectedPriority,
      category: selectedCategory
    });
  }, [items, searchQuery, selectedStatus, selectedPriority, selectedCategory]);

  // Computed Statistics
  const statistics = useMemo(() => {
    return FilterModel.getStatistics(items);
  }, [items]);

  // Handler: Add New Action Item
  const handleCreateAction = (e) => {
    e.preventDefault();
    const tags = formData.tagsInput
      ? formData.tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : ['General'];

    const newItemData = {
      ...formData,
      tags
    };

    const validation = ActionItemModel.validate(newItemData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const newItem = ActionItemModel.create(newItemData);
    setItems(prev => [newItem, ...prev]);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      category: 'Approval Request',
      priority: 'MEDIUM',
      dueDate: '',
      tagsInput: ''
    });
    setFormErrors({});
  };

  // Handler: Change Status
  const handleUpdateStatus = (id, newStatus) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  // Handler: Toggle Done
  const handleToggleComplete = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === ACTION_STATUS.COMPLETED
          ? ACTION_STATUS.PENDING
          : ACTION_STATUS.COMPLETED;
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  // Handler: Delete Item
  const handleDeleteAction = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('ALL');
    setSelectedPriority('ALL');
    setSelectedCategory('ALL');
  };

  return {
    // State
    items: filteredItems,
    allItemsCount: items.length,
    statistics,
    searchQuery,
    selectedStatus,
    selectedPriority,
    selectedCategory,
    isModalOpen,
    formData,
    formErrors,

    // Action Handlers
    setSearchQuery,
    setSelectedStatus,
    setSelectedPriority,
    setSelectedCategory,
    setIsModalOpen,
    setFormData,
    handleCreateAction,
    handleUpdateStatus,
    handleToggleComplete,
    handleDeleteAction,
    handleResetFilters
  };
}
