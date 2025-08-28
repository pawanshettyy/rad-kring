import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, QrCode, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MRExperienceTicketScreen({ bookingData, onBack }) {
  const bookingRef = `MR${Date.now().toString().slice(-6)}`;
  const { region, subRegion, center, centerPrice, date, time, price } = bookingData;

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
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-michroma font-bold text-2xl text-white">MR Experience Ticket</h1>
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
        <h2 className="font-michroma font-bold text-xl text-white">Booking Confirmed!</h2>
        <p className="text-gray-400 font-sans">Your MR session is ready</p>
      </motion.div>

      {/* Ticket Details */}
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
                <h3 className="font-michroma font-bold text-lg">RAD KRING AVIATION</h3>
                <p className="font-sans text-sm opacity-90">Mixed Reality Experience</p>
              </div>
              <div className="text-right">
                <p className="font-sans text-sm opacity-90">Booking Ref</p>
                <p className="font-michroma font-bold text-lg">{bookingRef}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-sans text-sm opacity-90">City</p>
                <p className="font-michroma font-semibold">{region}</p>
              </div>
              <div>
                <p className="font-sans text-sm opacity-90">Sub-Region</p>
                <p className="font-michroma font-semibold">{subRegion}</p>
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-sans">Time</p>
                <p className="text-white font-michroma font-semibold">{time}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-sans">Center</p>
                <p className="text-white font-michroma font-semibold">{center}</p>
              </div>
              <div className="text-center">
                <Calendar className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm font-sans">Date</p>
                <p className="text-white font-michroma font-semibold">{date}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
                <QrCode className="w-24 h-24 text-black" />
              </div>
              <p className="text-gray-400 text-sm font-sans">Scan at center for entry</p>
            </div>

            {/* Price */}
            <div className="glass-panel rounded-xl p-4 mb-4 text-center">
              <p className="text-gray-400 text-sm font-sans mb-1">Price</p>
              <p className="text-orange-500 font-michroma font-bold text-2xl">₹{centerPrice ?? price ?? 'N/A'}</p>
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
          onClick={onBack}
          className="w-full gradient-orange text-white font-michroma font-semibold py-4 rounded-xl glow-orange hover:scale-105 transition-all"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Another MR Session
        </Button>
      </motion.div>
    </div>
  );
}
