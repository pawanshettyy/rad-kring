import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, QrCode, Calendar, MapPin, Clock, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function BoardingPassScreen({ onNavigate, bookingData }) {
  const bookingRef = `RK${Date.now().toString().slice(-6)}`;
  const departureTime = bookingData.time || '10:30 AM';
  const flightDuration = Math.round((bookingData.distance || 50) / 150 * 60);
  const arrivalTime = new Date(new Date(`1970-01-01T${departureTime.replace(' AM', ':00').replace(' PM', ':00')}`).getTime() + flightDuration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const gate = 'A3';

  const addToWallet = () => {
    toast({ 
      title: "Add to Wallet", 
      description: "🚧 Wallet integration isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" 
    });
  };

  const sharePass = () => {
    toast({ 
      title: "Share Boarding Pass", 
      description: "🚧 Share functionality isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-6 px-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('home')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-montserrat font-bold text-2xl text-white">Boarding Pass</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={sharePass}
            className="text-white hover:bg-white/10"
          >
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="text-center mb-6"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-blue">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-3xl"
          >
            ✓
          </motion.div>
        </div>
        <h2 className="font-montserrat font-bold text-xl text-white">Booking Confirmed!</h2>
        <p className="text-gray-400 font-roboto">Your eVTOL flight is ready</p>
      </motion.div>

      {/* Boarding Pass */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-montserrat font-bold text-lg">RAD KRING AVIATION</h3>
                <p className="font-roboto text-sm opacity-90">eVTOL Air Taxi</p>
              </div>
              <div className="text-right">
                <p className="font-roboto text-sm opacity-90">Booking Ref</p>
                <p className="font-montserrat font-bold text-lg">{bookingRef}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-roboto text-sm opacity-90">From</p>
                <p className="font-montserrat font-semibold">{bookingData.pickup?.split(' ')[0] || 'Mumbai'}</p>
              </div>
              <div>
                <p className="font-roboto text-sm opacity-90">To</p>
                <p className="font-montserrat font-semibold">{bookingData.dropoff?.split(' ')[0] || 'Pune'}</p>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-roboto">Departure</p>
                <p className="text-white font-montserrat font-semibold">{departureTime}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-roboto">Gate</p>
                <p className="text-white font-montserrat font-semibold">{gate}</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-roboto">Arrival</p>
                <p className="text-white font-montserrat font-semibold">{arrivalTime}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
                <QrCode className="w-24 h-24 text-black" />
              </div>
              <p className="text-gray-400 text-sm font-roboto">Scan at vertiport for boarding</p>
            </div>

            {/* Flight Route */}
            <div className="glass-panel rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1" />
                  <p className="text-white font-roboto font-medium text-sm">{bookingData.pickup?.split(' ')[0] || 'Mumbai'}</p>
                  <p className="text-gray-400 text-xs">{departureTime}</p>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gradient-to-r from-green-500 to-red-500 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-center text-gray-400 text-xs mt-1">{bookingData.distance || 50} km</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1" />
                  <p className="text-white font-roboto font-medium text-sm">{bookingData.dropoff?.split(' ')[0] || 'Pune'}</p>
                  <p className="text-gray-400 text-xs">{arrivalTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 space-y-4 pb-20"
      >
        <Button
          onClick={addToWallet}
          className="w-full glass-panel text-white font-roboto font-medium py-4 rounded-xl hover:bg-white/20 transition-all"
        >
          <Download className="w-5 h-5 mr-2" />
          Add to Apple Wallet
        </Button>
        
        <Button
          onClick={() => onNavigate('home')}
          className="w-full gradient-orange text-white font-montserrat font-semibold py-4 rounded-xl glow-orange hover:scale-105 transition-all"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Another Flight
        </Button>
      </motion.div>
    </div>
  );
}