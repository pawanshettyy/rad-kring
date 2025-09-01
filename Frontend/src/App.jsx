import React from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import TeamPage from '@/pages/TeamPage';
import MRExperiencePage from '@/pages/MRExperiencePage';
import NewsPage from '@/pages/NewsPage';
import ContactPage from '@/pages/ContactPage';
import BookingPage from '@/pages/BookingPage';
import PreOrderPage from '@/pages/PreOrderPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CareersPage from '@/components/CareersPage';


function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen background-grid">
  <ScrollToTop />
  <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/mr-experience" element={<MRExperiencePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/pre-order" element={<PreOrderPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;