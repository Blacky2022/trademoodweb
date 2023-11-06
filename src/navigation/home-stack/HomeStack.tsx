import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileView from '../../views/Profile/ProfileView';
import DashboardView from '../../views/Dashboard/DashboardView';
import CommunityView from '../../views/Community/CommunityView';
import MarketView from '../../views/Market/MarketView';
import TrendsView from '../../views/Trends/TrendsView';
import MainLayout from '../../components/Mainlayout/MainLayout';
import { NotFoundView } from '../../views/NotFound/NotFoundView';
import About from '../../views/About/About';

const HomeStack = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/profile' element={<ProfileView />} />
        <Route path='/dashboard' element={<DashboardView />} />
        <Route path='/community' element={<CommunityView />} />
        <Route path='/market' element={<MarketView />} />
        <Route path='/trends' element={<TrendsView />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </MainLayout>
  );
};

export default HomeStack;
