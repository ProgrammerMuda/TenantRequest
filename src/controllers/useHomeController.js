/**
 * [C] CONTROLLER: useHomeController
 * Encapsulates state management for the Home screen UI, active menu items,
 * location selector, promo slider, and bottom tab selection.
 */

import { useState } from 'react';
import { promoBannersData } from '../models/MenuModel';
import { ROLE_DATA } from '../models/RoleModel';

export function useHomeController() {
  const [activeRole, setActiveRole] = useState('bm'); // 'bm' | 'tenant' | 'eng' | 'sec' | 'hk' | 'tr'
  const currentRoleData = ROLE_DATA[activeRole] || ROLE_DATA.bm;

  const [profile, setProfile] = useState(currentRoleData.profile);
  const [promos] = useState(promoBannersData);
  const [activeTab, setActiveTab] = useState('role_select'); // 'role_select' | 'home' | 'chat' | 'qr' | 'notif' | 'profile'
  const [selectedLocation, setSelectedLocation] = useState(currentRoleData.profile.currentLocation);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedPermit, setSelectedPermit] = useState(null);

  // Switch Role
  const handleSelectRole = (roleId) => {
    setActiveRole(roleId);
    const targetData = ROLE_DATA[roleId];
    if (targetData) {
      setProfile(targetData.profile);
      setSelectedLocation(targetData.profile.currentLocation);
    }
  };

  const openPermitDetail = (permit) => {
    setSelectedPermit(permit);
    setActiveTab('permit_detail');
  };

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setProfile(prev => ({ ...prev, currentLocation: loc }));
    setIsLocationMenuOpen(false);
  };

  const handleClickMenu = (item) => {
    if (item.id === 'fit_out_permit') {
      setActiveTab('fit_out_permit');
    } else if (item.id === 'work_order') {
      setActiveTab('work_order');
    } else if (item.id === 'work_request') {
      setActiveTab('work_request');
    } else if (item.id === 'goods_in_out') {
      setActiveTab('goods_in_out');
    } else {
      setSelectedMenuItem(item);
    }
  };

  return {
    activeRole,
    handleSelectRole,
    menuItems: currentRoleData.menuItems,
    overview: currentRoleData.overview,
    profile,
    promos,
    activeTab,
    selectedLocation,
    isLocationMenuOpen,
    selectedMenuItem,
    selectedPermit,
    openPermitDetail,
    setActiveTab,
    setIsLocationMenuOpen,
    setSelectedMenuItem,
    setSelectedPermit,
    handleSelectLocation,
    handleClickMenu
  };
}
