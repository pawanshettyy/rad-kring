import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function BookingScreen({ onNavigate, onBookingUpdate, goBack }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [returnFlight, setReturnFlight] = useState(false);
  const [distance, setDistance] = useState(0);

  const locations = [
    'Mumbai Central Vertiport',
    'Pune Tech Park Hub',
    'Bangalore Innovation Center',
    'Delhi Gateway Terminal',
    'Hyderabad Sky Station',
    'Chennai Marina Port'
  ];

  const calculateFare = (dist) => {
    if (dist < 20) return 0;
    return Math.round(dist * 125); // ₹125/km average
  };

  const handleLocationSelect = (location, type) => {
    let newPickup = pickup;
    let newDropoff = dropoff;

    if (type === 'pickup') {
      newPickup = location;
      setPickup(location);
    } else {
      newDropoff = location;
      setDropoff(location);
    }
    
    if (newPickup && newDropoff && newPickup !== newDropoff) {
      const randomDistance = Math.floor(Math.random() * 80) + 25; // 25-105 km
      setDistance(randomDistance);
    } else {
      setDistance(0);
    }
  };

  const handleContinue = () => {
    if (!pickup || !dropoff) {
      toast({ title: "Missing Information", description: "Please select both pickup and drop-off locations" });
      return;
    }
    
    if (distance < 20) {
      toast({ title: "Minimum Distance", description: "Minimum flight distance is 20 km" });
      return;
    }

    const bookingData = {
      pickup,
      dropoff,
      distance,
      estimatedFare: calculateFare(distance),
      returnFlight
    };
    
    onBookingUpdate(bookingData);
    onNavigate('pricing');
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-montserrat font-bold text-2xl text-white">Book Flight</h1>
        </div>
      </motion.div>

      {/* Map Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-6 h-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <p className="text-white font-roboto">Interactive Route Map</p>
              <p className="text-gray-400 text-sm">Select locations below to view route</p>
            </div>
          </div>
          
          {pickup && dropoff && distance > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 glass-panel rounded-lg p-2"
            >
              <p className="text-orange-500 font-montserrat font-semibold">{distance} km</p>
              <p className="text-white text-sm">₹{calculateFare(distance).toLocaleString()}</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Location Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 space-y-4"
      >
        {/* Pickup Location */}
        <div>
          <label className="block text-white font-roboto font-medium mb-2">
            <MapPin className="w-4 h-4 inline mr-2 text-green-500" />
            Pickup Point
          </label>
          <div className="glass-panel rounded-xl p-4">
            <select
              value={pickup}
              onChange={(e) => handleLocationSelect(e.target.value, 'pickup')}
              className="w-full bg-transparent text-white font-roboto focus:outline-none"
            >
              <option value="" className="bg-gray-800">Select pickup location</option>
              {locations.map((location) => (
                <option key={location} value={location} className="bg-gray-800">
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Drop-off Location */}
        <div>
          <label className="block text-white font-roboto font-medium mb-2">
            <MapPin className="w-4 h-4 inline mr-2 text-red-500" />
            Drop-off Point
          </label>
          <div className="glass-panel rounded-xl p-4">
            <select
              value={dropoff}
              onChange={(e) => handleLocationSelect(e.target.value, 'dropoff')}
              className="w-full bg-transparent text-white font-roboto focus:outline-none"
            >
              <option value="" className="bg-gray-800">Select drop-off location</option>
              {locations.filter(loc => loc !== pickup).map((location) => (
                <option key={location} value={location} className="bg-gray-800">
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Return Flight Toggle */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setReturnFlight(!returnFlight)}
          className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
            returnFlight ? 'bg-orange-500/20 border-orange-500/50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-5 h-5 text-orange-500" />
              <span className="text-white font-roboto">Return Flight</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 ${
              returnFlight ? 'bg-orange-500 border-orange-500' : 'border-gray-400'
            }`}>
              {returnFlight && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Distance & Fare Display */}
      {distance > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-6"
        >
          <div className="glass-panel rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm font-roboto">Estimated Distance</p>
                <p className="text-white font-montserrat font-semibold text-lg">{distance} km</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-roboto">Estimated Fare</p>
                <p className="text-orange-500 font-montserrat font-bold text-xl">
                  ₹{calculateFare(distance).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 pt-8 pb-20"
      >
        <Button
          onClick={handleContinue}
          disabled={!pickup || !dropoff || distance < 20}
          className="w-full gradient-orange text-white font-montserrat font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Pricing
        </Button>
      </motion.div>
    </div>
  );
}