import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Plane, Heart, Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function HomeScreen({ onNavigate }) {
  const quickOptions = [
    { icon: Plane, label: 'Air Taxi', color: 'from-orange-500 to-orange-600' },
    { icon: Heart, label: 'Medical Evac', color: 'from-red-500 to-red-600' },
    { icon: MapPin, label: 'Tourism', color: 'from-blue-500 to-blue-600' },
    { icon: Package, label: 'Cargo', color: 'from-green-500 to-green-600' }
  ];

  const vertiports = [
    { id: 1, name: 'Mumbai Central', x: '30%', y: '40%' },
    { id: 2, name: 'Pune Tech Park', x: '60%', y: '60%' },
    { id: 3, name: 'Bangalore Hub', x: '45%', y: '80%' },
    { id: 4, name: 'Delhi Gateway', x: '25%', y: '20%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-6 px-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="text-white font-roboto">Mumbai, Maharashtra</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('bookings')}
            className="text-white hover:bg-white/10"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('booking')}
          className="glass-panel rounded-2xl p-4 cursor-pointer hover:bg-white/20 transition-all"
        >
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 font-roboto">Where would you like to fly today?</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Vertiport Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-6 mb-6"
      >
        <h2 className="font-montserrat font-semibold text-xl text-white mb-4">Nearby Vertiports</h2>
        <div className="glass-panel rounded-2xl p-6 relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl" />
          {vertiports.map((port, index) => (
            <motion.div
              key={port.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="absolute map-pin"
              style={{ left: port.x, top: port.y }}
            >
              <div className="w-4 h-4 bg-orange-500 rounded-full glow-orange cursor-pointer" 
                   onClick={() => toast({ title: "Vertiport Selected", description: `${port.name} selected as pickup point` })} />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-roboto whitespace-nowrap">
                {port.name}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6"
      >
        <h2 className="font-montserrat font-semibold text-xl text-white mb-4">Quick Options</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickOptions.map((option, index) => (
            <motion.div
              key={option.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-panel rounded-xl p-4 cursor-pointer bg-gradient-to-br ${option.color}`}
              onClick={() => toast({ title: "Service Selected", description: `${option.label} service coming soon!` })}
            >
              <option.icon className="w-8 h-8 text-white mb-2" />
              <p className="font-roboto font-medium text-white">{option.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 pb-20"
      >
        <Button
          onClick={() => onNavigate('booking')}
          className="w-full gradient-orange text-white font-montserrat font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all"
        >
          Book Your Flight
        </Button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('mr')}
            className="text-blue-400 hover:text-blue-300 font-roboto"
          >
            Experience MR Flight Simulation →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}