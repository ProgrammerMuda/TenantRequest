/**
 * [V] VIEW: DashboardView (Mobile Master Layout)
 * Combines DeviceFrame wrapper, HomeView, ThemeShowcaseView, and CustomBottomNav.
 */

import React from 'react';
import { Box } from '@mui/material';
import { DeviceFrame } from '../components/common/DeviceFrame';
import { CustomBottomNav } from '../components/common/CustomBottomNav';
import { RoleSelectionView } from './RoleSelectionView';
import { HomeView } from './HomeView';
import { ThemeShowcaseView } from './ThemeShowcaseView';
import { MobileInfoView } from './MobileInfoView';
import { FitOutPermitView } from './FitOutPermitView';
import { WorkOrderView } from './WorkOrderView';
import { GoodsInOutView } from './GoodsInOutView';
import { WorkRequestView } from './WorkRequestView';
import { FitOutPermitDetailView } from './FitOutPermitDetailView';

export function DashboardView({ homeController, themeController }) {
  const { activeTab, setActiveTab, selectedPermit } = homeController;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'role_select':
        return <RoleSelectionView controller={homeController} />;
      case 'home':
        return <HomeView controller={homeController} />;
      case 'fit_out_permit':
        return <FitOutPermitView controller={homeController} />;
      case 'permit_detail':
        return <FitOutPermitDetailView permit={selectedPermit} controller={homeController} />;
      case 'work_order':
        return <WorkOrderView controller={homeController} />;
      case 'work_request':
        return <WorkRequestView controller={homeController} />;
      case 'goods_in_out':
        return <GoodsInOutView controller={homeController} />;
      case 'showcase':
        return (
          <Box sx={{ p: 2, pb: 10, overflowY: 'auto', flexGrow: 1 }}>
            <ThemeShowcaseView />
          </Box>
        );
      case 'info':
      case 'profile':
      case 'notif':
      case 'chat':
        return <MobileInfoView />;
      default:
        return <HomeView controller={homeController} />;
    }
  };

  return (
    <DeviceFrame>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff' }}>
        {/* Main View Area (minHeight 0 prevents flex overflow from squeezing navbar) */}
        <Box sx={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {renderActiveView()}
        </Box>

        {/* Custom Bottom Navigation Bar */}
        {!['role_select', 'fit_out_permit', 'permit_detail', 'work_order', 'work_request', 'goods_in_out'].includes(activeTab) && (
          <CustomBottomNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />
        )}
      </Box>
    </DeviceFrame>
  );
}
