/**
 * [M] MODEL: MenuModel
 * Menu items, user profile, and promo banners model definitions for the Home App screen.
 */

import {
  Receipt,
  HouseLine,
  Armchair,
  ClipboardText,
  Toolbox,
  Package,
  Certificate,
  SquaresFour
} from '@phosphor-icons/react';

export const initialMenuItems = [
  {
    id: 'billing',
    title: 'Billing\n& Payment',
    icon: Receipt,
    color: '#06b6d4', // Cyan
    bgColor: 'rgba(6, 182, 212, 0.1)'
  },
  {
    id: 'home_service',
    title: 'Home\nservice',
    icon: HouseLine,
    color: '#27b29b', // Primary Teal
    bgColor: 'rgba(39, 178, 155, 0.1)'
  },
  {
    id: 'facility_reservation',
    title: 'Facility\nReservation',
    icon: Armchair,
    color: '#6366f1', // Indigo
    bgColor: 'rgba(99, 102, 241, 0.1)'
  },
  {
    id: 'work_request',
    title: 'Work\nRequest',
    icon: ClipboardText,
    color: '#10b981', // Emerald
    bgColor: 'rgba(16, 185, 129, 0.1)'
  },
  {
    id: 'work_order',
    title: 'Work\nOrder',
    icon: Toolbox,
    color: '#f59e0b', // Amber
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  {
    id: 'goods_in_out',
    title: 'Goods In\nGoods Out',
    icon: Package,
    color: '#27b29b', // Primary Teal
    bgColor: 'rgba(39, 178, 155, 0.1)'
  },
  {
    id: 'fit_out_permit',
    title: 'Fit Out\nPermit',
    icon: Certificate,
    color: '#06b6d4', // Cyan
    bgColor: 'rgba(6, 182, 212, 0.1)'
  },
  {
    id: 'all_menu',
    title: 'All\nMenu',
    icon: SquaresFour,
    color: '#6366f1', // Indigo
    bgColor: 'rgba(99, 102, 241, 0.1)'
  }
];

export const userProfileData = {
  name: 'Raga',
  roleBadge: 'BM',
  currentLocation: 'Paladian Park',
  availableLocations: ['Paladian Park', 'Sudirman Park', 'Thamrin Executive', 'Kemang Village']
};

export const promoBannersData = [
  {
    id: 'promo-1',
    title: 'HOME SERVICE :',
    subtitle: 'SOLUSI PRAKTIS RUMAH ANDA!',
    badge: 'PROMO',
    offerText: 'CUCI AC : RP. 50.000,-',
    validUntil: '31 April 2026',
    hotline: '081181221985',
    brand: 'PROCARE HOME SERVICE',
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #e0f7fa 40%, #ffffff 100%)',
    borderColor: '#06b6d4',
    badgeColor: '#65a30d',
    textColor: '#0284c7'
  },
  {
    id: 'promo-2',
    title: 'FACILITY RESERVATION :',
    subtitle: 'DISCOUNT 20% FITNESS & POOL',
    badge: 'EXCLUSIVE',
    offerText: 'MEMBERSHIP DISC 20%',
    validUntil: '15 Mei 2026',
    hotline: '081181221985',
    brand: 'PALADIAN CLUBHOUSE',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 40%, #ffffff 100%)',
    borderColor: '#f59e0b',
    badgeColor: '#ea580c',
    textColor: '#d97706'
  },
  {
    id: 'promo-3',
    title: 'DEEP CLEANING SERVICE :',
    subtitle: 'FREE DISINFECTANT MISTING',
    badge: 'SPECIAL',
    offerText: 'START FROM RP. 150.000,-',
    validUntil: '30 Juni 2026',
    hotline: '081181221985',
    brand: 'PROCARE CLEANING',
    gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 40%, #ffffff 100%)',
    borderColor: '#10b981',
    badgeColor: '#059669',
    textColor: '#047857'
  }
];
