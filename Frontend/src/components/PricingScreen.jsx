import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Crown, Building, Infinity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingScreen({ onNavigate, bookingData, goBack }) {
  const [selectedPlan, setSelectedPlan] = useState('single');

  const plans = [
    {
      id: 'single',
      name: 'Single Trip',
      icon: Leaf,
      price: bookingData.estimatedFare || 2500,
      description: 'Pay per flight',
      features: ['One-time booking', 'Standard priority', 'Basic support'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'monthly',
      name: 'Monthly Pass',
      icon: Crown,
      price: 15000,
      description: '5 flights included',
      features: ['5 flights per month', 'Priority booking', '24/7 support', '20% savings'],
      color: 'from-orange-500 to-orange-600',
      popular: true
    },
    {
      id: 'corporate',
      name: 'Corporate',
      icon: Building,
      price: 45000,
      description: '20 flights included',
      features: ['20 flights per month', 'Dedicated support', 'Custom routes', 'Invoice billing'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      icon: Infinity,
      price: 99000,
      description: 'Unlimited flights',
      features: ['Unlimited flights', 'VIP treatment', 'Concierge service', 'Private terminals'],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const co2Saved = Math.round((bookingData.distance || 50) * 0.8); // kg CO2 saved vs car

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
          <h1 className="font-montserrat font-bold text-2xl text-white">Choose Plan</h1>
        </div>
      </motion.div>

      {/* Environmental Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20">
          <div className="flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-white font-montserrat font-semibold">Environmental Impact</p>
              <p className="text-green-400 font-roboto">{co2Saved} kg CO₂ saved vs traditional transport</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 space-y-4"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlan(plan.id)}
            className={`glass-panel rounded-2xl p-6 cursor-pointer transition-all relative ${
              selectedPlan === plan.id ? 'ring-2 ring-orange-500 bg-orange-500/10' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2 left-6 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                Most Popular
              </div>
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-white">{plan.name}</h3>
                  <p className="text-gray-400 font-roboto text-sm">{plan.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-montserrat font-bold text-2xl text-white">
                  ₹{plan.price.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm font-roboto">
                  {plan.id === 'single' ? 'one-time' : 'per month'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <p className="text-gray-300 font-roboto text-sm">{feature}</p>
                </div>
              ))}
            </div>

            {selectedPlan === plan.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 pt-8 pb-20"
      >
        <Button
          onClick={() => onNavigate('aircraft')}
          className="w-full gradient-orange text-white font-montserrat font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all"
        >
          Select Aircraft & Time
        </Button>
      </motion.div>
    </div>
  );
}