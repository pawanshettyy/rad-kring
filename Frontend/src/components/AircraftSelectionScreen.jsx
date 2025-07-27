import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Zap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function AircraftSelectionScreen({ onNavigate, bookingData, goBack, onBookingUpdate }) {
  const [selectedTime, setSelectedTime] = useState('');
  const [additionalServices, setAdditionalServices] = useState([]);

  const timeSlots = [
    '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', 
    '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'
  ];

  const services = [
    { id: 'medical', name: 'Medical Support', price: 2000, icon: '🏥' },
    { id: 'baggage', name: 'Extra Baggage', price: 500, icon: '🧳' },
    { id: 'priority', name: 'Priority Boarding', price: 1000, icon: '⚡' },
    { id: 'meal', name: 'In-flight Refreshments', price: 800, icon: '🥤' }
  ];

  const flightDuration = Math.round((bookingData.distance || 50) / 150 * 60); // minutes

  const toggleService = (serviceId) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (!selectedTime) {
      toast({ title: "Select Time", description: "Please select a departure time" });
      return;
    }
    onBookingUpdate({
        time: selectedTime,
        services: additionalServices
    })
    onNavigate('payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-6 px-6"
      >
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-montserrat font-bold text-2xl text-white">Aircraft & Time</h1>
        </div>
      </motion.div>

      {/* Aircraft Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-6 text-center">
          <div className="mb-4">
            <img 
              className="w-full h-32 object-contain mx-auto" 
              alt="Sankalpa v1 eVTOL aircraft"
             src="https://images.unsplash.com/photo-1596610848314-cb56f9f0a986" />
          </div>
          <h2 className="font-montserrat font-bold text-xl text-white mb-2">Sankalpa v1</h2>
          <p className="text-gray-400 font-roboto mb-4">Electric Vertical Takeoff & Landing Aircraft</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-white font-roboto font-semibold">{flightDuration} min</p>
              <p className="text-gray-400 text-xs">Flight Time</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-white font-roboto font-semibold">6 Seats</p>
              <p className="text-gray-400 text-xs">Capacity</p>
            </div>
            <div className="text-center">
              <Zap className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-white font-roboto font-semibold">100%</p>
              <p className="text-gray-400 text-xs">Electric</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Time Slot Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <h3 className="font-montserrat font-semibold text-lg text-white mb-4">Select Departure Time</h3>
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

      {/* Additional Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Plus className="w-5 h-5 text-orange-500" />
          <h3 className="font-montserrat font-semibold text-lg text-white">Additional Services</h3>
        </div>
        
        <div className="space-y-3">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleService(service.id)}
              className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
                additionalServices.includes(service.id)
                  ? 'bg-orange-500/20 border-orange-500/50'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <p className="text-white font-roboto font-medium">{service.name}</p>
                    <p className="text-orange-500 font-montserrat font-semibold">+₹{service.price}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  additionalServices.includes(service.id)
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-gray-400'
                }`}>
                  {additionalServices.includes(service.id) && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 pb-20"
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedTime}
          className="w-full gradient-orange text-white font-montserrat font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all disabled:opacity-50"
        >
          Continue to Payment
        </Button>
      </motion.div>
    </div>
  );
}