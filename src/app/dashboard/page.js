import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ScrollableList from '../components/ScrollableList';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection/>
      <ScrollableList/>
    </div>
  );
};

export default DashboardPage;
