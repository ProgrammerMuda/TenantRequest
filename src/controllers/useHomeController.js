/**
 * [C] CONTROLLER: useHomeController
 * Encapsulates state management for the Home screen UI, active menu items,
 * location selector, promo slider, and bottom tab selection.
 */

import { useState } from 'react';
import { initialMenuItems, userProfileData, promoBannersData } from '../models/MenuModel';
import { permitMockData } from '../models/FitOutPermitModel';
import { workOrderMockData } from '../models/WorkOrderModel';
import { goodsInOutMockData } from '../models/GoodsInOutModel';
import { workRequestMockData } from '../models/WorkRequestModel';

export function useHomeController() {
  const permitActionCount = permitMockData.filter(p => p.needAction).length;
  const woActionCount = workOrderMockData.filter(p => p.needAction).length;
  const goodsActionCount = goodsInOutMockData.filter(p => p.needAction).length;
  const wrActionCount = workRequestMockData.filter(p => p.needAction).length;
  
  const menuItems = initialMenuItems.map(item => {
    if (item.id === 'fit_out_permit') {
      return { ...item, badgeCount: permitActionCount };
    }
    if (item.id === 'work_order') {
      return { ...item, badgeCount: woActionCount };
    }
    if (item.id === 'work_request') {
      return { ...item, badgeCount: wrActionCount };
    }
    if (item.id === 'goods_in_out') {
      return { ...item, badgeCount: goodsActionCount };
    }
    return item;
  });
  const [profile, setProfile] = useState(userProfileData);
  const [promos] = useState(promoBannersData);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'chat' | 'qr' | 'notif' | 'profile'
  const [selectedLocation, setSelectedLocation] = useState(userProfileData.currentLocation);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedPermit, setSelectedPermit] = useState(null);

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
    menuItems,
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
