import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Eye, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import PaymentPortal from './PaymentPortal';
import MRExperienceTicketScreen from './MRExperienceTicketScreen';

export default function MRExperienceScreen({ onNavigate }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentStep, setCurrentStep] = useState('region'); // 'region', 'center', 'booking'
  const [showPayment, setShowPayment] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const regions = {
    'Mumbai': [
      { id: 1, name: 'Churchgate VR Hub', location: 'Churchgate', price: 1500 },
      { id: 2, name: 'Mumbai Tech Center', location: 'Andheri East', price: 1400 },
      { id: 3, name: 'Mumbai Innovation Lab', location: 'Powai', price: 1600 }
    ],
    'Pune': [
      { id: 4, name: 'Pune Tech Center', location: 'Hinjewadi', price: 1200 },
      { id: 5, name: 'Pune VR Experience', location: 'Baner', price: 1300 },
      { id: 6, name: 'Pune Innovation Hub', location: 'Koregaon Park', price: 1350 }
    ],
    'Bangalore': [
      { id: 7, name: 'Bangalore Innovation Lab', location: 'Koramangala', price: 1800 },
      { id: 8, name: 'Bangalore Tech Hub', location: 'Whitefield', price: 1700 },
      { id: 9, name: 'Bangalore VR Center', location: 'Indiranagar', price: 1850 }
    ],
    'Delhi': [
      { id: 10, name: 'Delhi Experience Zone', location: 'Connaught Place', price: 2000 },
      { id: 11, name: 'Delhi Tech Center', location: 'Gurgaon', price: 1900 },
      { id: 12, name: 'Delhi Innovation Lab', location: 'Noida', price: 1950 }
    ]
  };

  const timeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', 
    '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'
  ];

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentStep('center');
  };

  const handleCenterSelect = (centerId) => {
    setSelectedCenter(centerId);
    setCurrentStep('booking');
  };

  const handleBackToRegion = () => {
    setCurrentStep('region');
    setSelectedRegion('');
    setSelectedCenter('');
  };

  const handleBackToCenter = () => {
    setCurrentStep('center');
    setSelectedCenter('');
  };

  const handleBooking = () => {
    if (!selectedCenter || !selectedDate || !selectedTime) {
      toast({ title: "Missing Information", description: "Please select center, date and time" });
      return;
    }
    
    const selectedCenterData = regions[selectedRegion].find(c => c.id === selectedCenter);
    const booking = {
      region: selectedRegion,
      subRegion: selectedCenterData.location,
      center: selectedCenterData.name,
      centerData: selectedCenterData,
      date: selectedDate,
      time: selectedTime,
      price: selectedCenterData.price
    };
    
    setBookingData(booking);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (bookingData) => {
    setShowTicket(true);
  };

  const handleBackToBooking = () => {
    setShowTicket(false);
    setShowPayment(false);
    setBookingData(null);
    setCurrentStep('region');
    setSelectedRegion('');
    setSelectedCenter('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const getSelectedCenterData = () => {
    return regions[selectedRegion]?.find(c => c.id === selectedCenter);
  };

  // Show ticket screen if booking is complete
  if (showTicket && bookingData) {
    return (
      <MRExperienceTicketScreen 
        bookingData={bookingData} 
        onBack={handleBackToBooking}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-6 px-6"
      >
        <div className="flex items-center space-x-4 mb-6">
          {currentStep === 'region' ? (
            <Link to="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={currentStep === 'center' ? handleBackToRegion : handleBackToCenter}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="font-michroma font-bold text-2xl text-white">MR Experience</h1>
            {currentStep === 'center' && (
              <p className="text-gray-400 text-sm font-sans">Select a center in {selectedRegion}</p>
            )}
            {currentStep === 'booking' && (
              <p className="text-gray-400 text-sm font-sans">{getSelectedCenterData()?.name}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero Section - Show only on region selection */}
      {currentStep === 'region' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-6 mb-6"
        >
          <div className="glass-panel rounded-2xl p-6 text-center">
            <div className="mb-4">
              <img 
                className="w-full h-80 object-cover rounded-xl" 
                alt="Mixed Reality eVTOL flight simulation experience"
                src="/images/Interior View Sky Roof.png" />
            </div>
            <h2 className="font-michroma font-bold text-xl text-white mb-2">Virtual Flight Experience</h2>
            <p className="text-gray-400 font-sans mb-4">
              Experience the future of aviation with our immersive Mixed Reality flight simulation
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Eye className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-white font-sans font-semibold">VR/AR</p>
                <p className="text-gray-400 text-xs">Technology</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-white font-sans font-semibold">30 min</p>
                <p className="text-gray-400 text-xs">Duration</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-white font-sans font-semibold">4 Cities</p>
                <p className="text-gray-400 text-xs">Locations</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Region Selection */}
      {currentStep === 'region' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6 mb-6"
        >
          <h3 className="font-michroma font-semibold text-lg text-white mb-4">Select Your Region</h3>
          <div className="space-y-3">
            {Object.keys(regions).map((region) => (
              <motion.div
                key={region}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRegionSelect(region)}
                className="glass-panel rounded-xl p-4 cursor-pointer transition-all hover:bg-white/10"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-sans font-medium">{region}</p>
                    <p className="text-gray-400 text-sm font-sans">{regions[region].length} centers available</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 font-michroma font-semibold">From ₹{Math.min(...regions[region].map(c => c.price))}</p>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 mt-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Experience Centers */}
      {currentStep === 'center' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6 mb-6"
        >
          <h3 className="font-michroma font-semibold text-lg text-white mb-4">Select Experience Center</h3>
          <div className="space-y-3">
            {regions[selectedRegion]?.map((center) => (
              <motion.div
                key={center.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCenterSelect(center.id)}
                className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
                  selectedCenter === center.id
                    ? 'bg-orange-500/20 border-orange-500/50'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-sans font-medium">{center.name}</p>
                    <p className="text-gray-400 text-sm font-sans">{center.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 font-michroma font-semibold">₹{center.price}</p>
                    <div className={`w-6 h-6 rounded-full border-2 mt-1 ${
                      selectedCenter === center.id
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-gray-400'
                    }`}>
                      {selectedCenter === center.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Date Selection */}
      {currentStep === 'booking' && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-6 mb-6"
          >
            <h3 className="font-michroma font-semibold text-lg text-white mb-4">Select Date</h3>
            <div className="glass-panel rounded-xl p-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-transparent text-white font-sans focus:outline-none"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </motion.div>

          {/* Time Slots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-6 mb-6"
          >
            <h3 className="font-michroma font-semibold text-lg text-white mb-4">Select Time</h3>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`glass-panel rounded-xl p-4 transition-all ${
                    selectedTime === time 
                      ? 'bg-orange-500/20 border-orange-500/50 text-orange-500' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <p className="font-sans font-medium">{time}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Book Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-6 pb-20"
          >
            <Button
              onClick={handleBooking}
              disabled={!selectedCenter || !selectedDate || !selectedTime}
              className="w-full gradient-orange text-white font-michroma font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all disabled:opacity-50"
            >
              Book MR Experience
            </Button>
          </motion.div>
        </>
      )}

      {/* Payment Portal */}
      <PaymentPortal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        bookingData={bookingData}
      />
    </div>
  );
}