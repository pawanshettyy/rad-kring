import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation, RotateCcw, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function BookingScreen({ onNavigate, onBookingUpdate, goBack }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [returnFlight, setReturnFlight] = useState(false);
  const [distance, setDistance] = useState(0);
  const [currentStep, setCurrentStep] = useState('region'); // 'region', 'locations', 'booking'

  const regions = {
  'Mumbai': [
  'Churchgate Vertiport',
      'Bandra West Hub',
      'Andheri East Terminal',
      'Powai Sky Station',
      'Thane Gateway'
    ],
    'Pune': [
    'Pune Tech Park Hub',
      'Hinjewadi Terminal',
      'Baner Sky Station',
      'Koregaon Park Hub',
      'Pimpri Gateway'
    ],
    'Bangalore': [
    'Bangalore Innovation Center',
      'Koramangala Hub',
      'Whitefield Terminal',
      'Indiranagar Sky Station',
      'Electronic City Gateway'
    ],
    'Delhi': [
    'Delhi Gateway Terminal',
      'Connaught Place Hub',
      'Gurgaon Sky Station',
      'Noida Terminal',
      'Dwarka Gateway'
    ],
    'Hyderabad': [
    'Hyderabad Sky Station',
      'HITEC City Hub',
      'Gachibowli Terminal',
      'Banjara Hills Gateway',
      'Secunderabad Hub'
    ],
    'Chennai': [
      'Chennai Marina Port',
      'OMR Tech Hub',
      'Anna Nagar Terminal',
      'T. Nagar Sky Station',
      'Velachery Gateway'
    ]
  };

  const calculateFare = (dist, isReturn = false) => {
    if (dist < 20) return 0;
    const baseFare = Math.round(dist * 70); // ₹70/km
    return isReturn ? baseFare * 2 : baseFare;
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentStep('locations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToRegion = () => {
    setCurrentStep('region');
    setSelectedRegion('');
    setPickup('');
    setDropoff('');
    setDistance(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      estimatedFare: calculateFare(distance, returnFlight),
      returnFlight
    };

    onBookingUpdate(bookingData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {currentStep === 'region' ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToRegion}
              className="text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="font-michroma font-bold text-2xl text-white">Book Flight</h1>
            {currentStep === 'locations' && (
              <p className="text-gray-400 text-sm font-sans">Select locations in {selectedRegion}</p>
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
              <Navigation className="w-16 h-16 text-orange-500 mx-auto mb-3" />
            </div>
            <h2 className="font-michroma font-bold text-xl text-white mb-2">Book Your eVTOL Flight</h2>
            <p className="text-gray-400 font-sans mb-4">
              Experience the future of urban air mobility with our electric vertical takeoff and landing aircraft
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-500 text-sm font-michroma font-bold">0</span>
                </div>
                <p className="text-white font-sans font-semibold">Zero Emissions</p>
                <p className="text-gray-400 text-xs">Eco-friendly</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-500 text-sm font-michroma font-bold">15</span>
                </div>
                <p className="text-white font-sans font-semibold">15 min</p>
                <p className="text-gray-400 text-xs">Average flight</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-500 text-sm font-michroma font-bold">6</span>
                </div>
                <p className="text-white font-sans font-semibold">6 Cities</p>
                <p className="text-gray-400 text-xs">Available</p>
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
          <div className="mb-4">
            <h3 className="font-michroma font-semibold text-lg text-white mb-2">Choose Your Region</h3>
            <p className="text-gray-400 text-sm font-sans">
              Select your region to view available vertiports and book your flight
            </p>
          </div>
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
                    <p className="text-gray-400 text-sm font-sans">{regions[region].length} vertiports available</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 font-michroma font-semibold">From ₹1,400</p>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 mt-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Additional Info Section */}
      {currentStep === 'region' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 mb-6"
        >
          <div className="glass-panel rounded-xl p-4">
            <h4 className="font-michroma font-semibold text-white mb-3">Why Choose eVTOL?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300 font-sans">Zero emissions and noise pollution</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-300 font-sans">3x faster than ground transportation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-gray-300 font-sans">Direct point-to-point connectivity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-gray-300 font-sans">Advanced safety systems</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Interface - Show only on location selection */}
      {currentStep === 'locations' && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-6 h-64 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                <p className="text-white font-sans">Interactive Route Map</p>
              <p className="text-gray-400 text-sm">Select locations below to view route</p>
            </div>
          </div>
          
          {pickup && dropoff && distance > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 glass-panel rounded-lg p-2"
            >
                <p className="text-orange-500 font-michroma font-semibold">{distance} km</p>
                              <p className="text-white text-sm">₹{calculateFare(distance, returnFlight).toLocaleString()}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
      )}

      {/* Location Selection */}
      {currentStep === 'locations' && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 space-y-4"
      >
        {/* Pickup Location */}
        <div>
            <label className="block text-white font-sans font-medium mb-2">
            <MapPin className="w-4 h-4 inline mr-2 text-green-500" />
            Pickup Point
          </label>
          <div className="glass-panel rounded-xl p-4">
            <select
              value={pickup}
              onChange={(e) => handleLocationSelect(e.target.value, 'pickup')}
                className="w-full bg-transparent text-white font-sans focus:outline-none"
            >
              <option value="" className="bg-gray-800">Select pickup location</option>
                {regions[selectedRegion]?.map((location) => (
                <option key={location} value={location} className="bg-gray-800">
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Drop-off Location */}
        <div>
            <label className="block text-white font-sans font-medium mb-2">
            <MapPin className="w-4 h-4 inline mr-2 text-red-500" />
            Drop-off Point
          </label>
          <div className="glass-panel rounded-xl p-4">
            <select
              value={dropoff}
              onChange={(e) => handleLocationSelect(e.target.value, 'dropoff')}
                className="w-full bg-transparent text-white font-sans focus:outline-none"
            >
              <option value="" className="bg-gray-800">Select drop-off location</option>
                {regions[selectedRegion]?.filter(loc => loc !== pickup).map((location) => (
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
                <span className="text-white font-sans">Return Flight</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 ${
              returnFlight ? 'bg-orange-500 border-orange-500' : 'border-gray-400'
            }`}>
              {returnFlight && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />}
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}

      {/* Distance & Fare Display */}
      {currentStep === 'locations' && distance > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-6"
        >
          <div className="glass-panel rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm font-sans">Estimated Distance</p>
                <p className="text-white font-michroma font-semibold text-lg">{distance} km</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-sans">
                  {returnFlight ? 'Total Fare (Return)' : 'Estimated Fare'}
                </p>
                <p className="text-orange-500 font-michroma font-bold text-xl">
                  ₹{calculateFare(distance, returnFlight).toLocaleString()}
                </p>
                {returnFlight && (
                  <p className="text-gray-400 text-xs font-sans">
                    ₹{calculateFare(distance, false).toLocaleString()} × 2
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      {currentStep === 'locations' && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 pt-8 pb-20"
      >
        <Button
          onClick={handleContinue}
          disabled={!pickup || !dropoff || distance < 20}
            className="w-full gradient-orange text-white font-michroma font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Pricing
        </Button>
      </motion.div>
      )}
    </div>
  );
}