import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection/>
    </div>
  );
};

export default DashboardPage;
