import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
