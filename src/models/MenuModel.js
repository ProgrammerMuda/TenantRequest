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

import billing3d from '../assets/menu_icons/billing_3d.png';
import homeService3d from '../assets/menu_icons/home_service_3d.png';
import reservation3d from '../assets/menu_icons/reservation_3d.png';
import workRequest3d from '../assets/menu_icons/work_request_3d.png';
import gigo3d from '../assets/menu_icons/gigo_3d.png';
import workPermit3d from '../assets/menu_icons/work_permit_3d.png';
import fitOutPermit3d from '../assets/menu_icons/fit_out_permit_3d.png';
import allMenu3d from '../assets/menu_icons/all_menu_3d.png';

export const initialMenuItems = [
  {
    id: 'billing',
    title: 'Billing\n& Payment',
    icon: Receipt,
    imageIcon: billing3d,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)'
  },
  {
    id: 'home_service',
    title: 'Home\nservice',
    icon: HouseLine,
    imageIcon: homeService3d,
    color: '#27b29b',
    bgColor: 'rgba(39, 178, 155, 0.1)'
  },
  {
    id: 'facility_reservation',
    title: 'Facility\nReservation',
    icon: Armchair,
    imageIcon: reservation3d,
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)'
  },
  {
    id: 'work_order',
    title: 'Work\nOrder',
    icon: Toolbox,
    imageIcon: workRequest3d,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    badgeCount: 2
  },
  {
    id: 'goods_in_out',
    title: 'In & Out\nGoods',
    icon: Package,
    imageIcon: gigo3d,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    badgeCount: 1
  },
  {
    id: 'work_permit',
    title: 'Work\nPermit',
    icon: Certificate,
    imageIcon: workPermit3d,
    color: '#27b29b',
    bgColor: 'rgba(39, 178, 155, 0.1)',
    badgeCount: 2
  },
  {
    id: 'fit_out_permit',
    title: 'Fit Out\nPermit',
    icon: Certificate,
    imageIcon: fitOutPermit3d,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)'
  },
  {
    id: 'all_menu',
    title: 'All\nMenu',
    icon: SquaresFour,
    imageIcon: allMenu3d,
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)'
  }
];

export const userProfileData = {
  name: 'Aldy Mahardiansyah',
  roleBadge: 'Resident',
  currentLocation: 'Apartement A',
  availableLocations: ['Apartement A', 'Paladian Park', 'Sudirman Park', 'Thamrin Executive', 'Kemang Village']
};

import bannerParkir from '../assets/banners/banner_parkir.jpg';
import bannerListrik from '../assets/banners/banner_listrik.jpg';
import bannerLift from '../assets/banners/banner_lift.jpg';
import bannerFasilitas from '../assets/banners/banner_fasilitas.jpg';

export const promoBannersData = [
  {
    id: 'banner-parkir',
    image: bannerParkir,
    title: 'Penutupan Sementara Area Parkir',
    badge: 'PENGUMUMAN'
  },
  {
    id: 'banner-listrik',
    image: bannerListrik,
    title: 'Pemadaman Listrik Sementara',
    badge: 'PENGUMUMAN'
  },
  {
    id: 'banner-lift',
    image: bannerLift,
    title: 'Maintenance Lift',
    badge: 'PENGUMUMAN'
  },
  {
    id: 'banner-fasilitas',
    image: bannerFasilitas,
    title: 'Pemeliharaan Fasilitas Apartemen',
    badge: 'PENGUMUMAN'
  }
];
