import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, User, CreditCard, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function BookingsScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('bookings');

  const bookings = [
    {
      id: 1,
      ref: 'RK123456',
      from: 'Mumbai',
      to: 'Pune',
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'Confirmed',
      amount: 2500
    },
    {
      id: 2,
      ref: 'RK123457',
      from: 'Bangalore',
      to: 'Chennai',
      date: '2024-01-10',
      time: '02:15 PM',
      status: 'Completed',
      amount: 3200
    }
  ];

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderBookings = () => (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-roboto">Booking Ref</p>
              <p className="text-white font-montserrat font-semibold">{booking.ref}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-roboto ${
              booking.status === 'Confirmed' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {booking.status}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-white font-roboto font-medium">{booking.from}</p>
                <p className="text-gray-400 text-sm">{booking.time}</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-0.5 bg-gradient-to-r from-orange-500 to-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-white font-roboto font-medium">{booking.to}</p>
                <p className="text-gray-400 text-sm">{booking.date}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-orange-500 font-montserrat font-bold">₹{booking.amount.toLocaleString()}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "View Details", description: "🚧 Booking details view isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              className="text-blue-400 hover:text-blue-300"
            >
              View Details
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4">
      <div className="glass-panel rounded-2xl p-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-montserrat font-bold text-xl text-white mb-2">John Doe</h3>
        <p className="text-gray-400 font-roboto">john.doe@email.com</p>
        <p className="text-gray-400 font-roboto">+91 98765 43210</p>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <h4 className="font-montserrat font-semibold text-lg text-white mb-4">Flight Statistics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-orange-500 font-montserrat font-bold text-2xl">12</p>
            <p className="text-gray-400 text-sm font-roboto">Total Flights</p>
          </div>
          <div className="text-center">
            <p className="text-blue-500 font-montserrat font-bold text-2xl">850</p>
            <p className="text-gray-400 text-sm font-roboto">km Traveled</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return renderBookings();
      case 'profile':
        return renderProfile();
      case 'payment':
        return (
          <div className="glass-panel rounded-2xl p-6 text-center">
            <CreditCard className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <p className="text-white font-roboto">Payment methods and billing history</p>
            <Button
              className="mt-4"
              onClick={() => toast({ title: "Payment Settings", description: "🚧 Payment management isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            >
              Manage Payment Methods
            </Button>
          </div>
        );
      case 'notifications':
        return (
          <div className="glass-panel rounded-2xl p-6 text-center">
            <Bell className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <p className="text-white font-roboto">Notification preferences and alerts</p>
            <Button
              className="mt-4"
              onClick={() => toast({ title: "Notification Settings", description: "🚧 Notification management isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            >
              Manage Notifications
            </Button>
          </div>
        );
      default:
        return renderBookings();
    }
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
            <h1 className="font-montserrat font-bold text-2xl text-white">Account</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast({ title: "Settings", description: "🚧 Settings panel isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            className="text-white hover:bg-white/10"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-2">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-roboto">{tab.label}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 pb-20"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}