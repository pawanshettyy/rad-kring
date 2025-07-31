import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

export default function MRExperienceScreen({ onNavigate }) {
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const centers = [
    { id: 1, name: 'Mumbai VR Hub', location: 'Bandra West', price: 1500 },
    { id: 2, name: 'Pune Tech Center', location: 'Hinjewadi', price: 1200 },
    { id: 3, name: 'Bangalore Innovation Lab', location: 'Koramangala', price: 1800 },
    { id: 4, name: 'Delhi Experience Zone', location: 'Connaught Place', price: 2000 }
  ];

  const timeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', 
    '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'
  ];

  const handleBooking = () => {
    if (!selectedCenter || !selectedDate || !selectedTime) {
      toast({ title: "Missing Information", description: "Please select center, date and time" });
      return;
    }
    
    toast({ 
      title: "MR Experience Booked!", 
      description: "🚧 MR booking system isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-6 px-6"
      >
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-montserrat font-bold text-2xl text-white">MR Experience</h1>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-6 text-center">
          <div className="mb-4">
            <img 
              className="w-full h-40 object-cover rounded-xl" 
              alt="Mixed Reality eVTOL flight simulation experience"
             src="https://images.unsplash.com/photo-1539109523166-85417acfcdb7" />
          </div>
          <h2 className="font-montserrat font-bold text-xl text-white mb-2">Virtual Flight Experience</h2>
          <p className="text-gray-400 font-roboto mb-4">
            Experience the future of aviation with our immersive Mixed Reality flight simulation
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Eye className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-white font-roboto font-semibold">VR/AR</p>
              <p className="text-gray-400 text-xs">Technology</p>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-white font-roboto font-semibold">30 min</p>
              <p className="text-gray-400 text-xs">Duration</p>
            </div>
            <div className="text-center">
              <MapPin className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-white font-roboto font-semibold">4 Cities</p>
              <p className="text-gray-400 text-xs">Locations</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience Centers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <h3 className="font-montserrat font-semibold text-lg text-white mb-4">Select Experience Center</h3>
        <div className="space-y-3">
          {centers.map((center) => (
            <motion.div
              key={center.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCenter(center.id)}
              className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
                selectedCenter === center.id
                  ? 'bg-orange-500/20 border-orange-500/50'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-roboto font-medium">{center.name}</p>
                  <p className="text-gray-400 text-sm font-roboto">{center.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-500 font-montserrat font-semibold">₹{center.price}</p>
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

      {/* Date Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <h3 className="font-montserrat font-semibold text-lg text-white mb-4">Select Date</h3>
        <div className="glass-panel rounded-xl p-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-transparent text-white font-roboto focus:outline-none"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </motion.div>

      {/* Time Slots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6"
      >
        <h3 className="font-montserrat font-semibold text-lg text-white mb-4">Select Time</h3>
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
              <p className="font-roboto font-medium">{time}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Book Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 pb-20"
      >
        <Button
          onClick={handleBooking}
          disabled={!selectedCenter || !selectedDate || !selectedTime}
          className="w-full gradient-orange text-white font-montserrat font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all disabled:opacity-50"
        >
          Book MR Experience
        </Button>
      </motion.div>
    </div>
  );
}