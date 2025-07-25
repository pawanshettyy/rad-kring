import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function PaymentScreen({ onNavigate, bookingData, goBack }) {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const baseFare = bookingData.estimatedFare || 2500;
  const taxes = Math.round(baseFare * 0.18);
  const discount = promoApplied ? Math.round(baseFare * 0.1) : 0;
  const totalFare = baseFare + taxes - discount;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'PhonePe, GPay, Paytm' },
    { id: 'card', name: 'Debit/Credit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Paytm, Amazon Pay' }
  ];

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'first10') {
      setPromoApplied(true);
      toast({ title: "Promo Applied!", description: "10% discount applied successfully" });
    } else {
      toast({ title: "Invalid Code", description: "Please enter a valid promo code" });
    }
  };

  const handlePayment = () => {
    toast({ 
      title: "Payment Processing", 
      description: "🚧 Payment integration isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" 
    });
    
    // Simulate payment success and navigate to boarding pass
    setTimeout(() => {
      onNavigate('boarding');
    }, 2000);
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
          <h1 className="font-montserrat font-bold text-2xl text-white">Payment</h1>
        </div>
      </motion.div>

      {/* Fare Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="font-montserrat font-semibold text-lg text-white mb-4">Fare Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 font-roboto">Base Fare</span>
              <span className="text-white font-roboto">₹{baseFare.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-roboto">Taxes & Fees</span>
              <span className="text-white font-roboto">₹{taxes.toLocaleString()}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between">
                <span className="text-green-400 font-roboto">Discount (FIRST10)</span>
                <span className="text-green-400 font-roboto">-₹{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-white font-montserrat font-semibold text-lg">Total</span>
                <span className="text-orange-500 font-montserrat font-bold text-xl">₹{totalFare.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Promo Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-6 mb-6"
      >
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-orange-500" />
            <h3 className="font-montserrat font-semibold text-lg text-white">Promo Code</h3>
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              disabled={promoApplied}
              className="flex-1 bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white font-roboto focus:outline-none focus:border-orange-500 disabled:opacity-50"
            />
            <Button
              onClick={applyPromo}
              disabled={promoApplied || !promoCode}
              className="gradient-orange text-white font-roboto font-medium px-6 rounded-xl disabled:opacity-50"
            >
              Apply
            </Button>
          </div>
          
          {!promoApplied && (
            <p className="text-gray-400 text-sm font-roboto mt-2">Try: FIRST10 for 10% off</p>
          )}
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <h3 className="font-montserrat font-semibold text-lg text-white mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPayment(method.id)}
              className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
                selectedPayment === method.id
                  ? 'bg-orange-500/20 border-orange-500/50'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <method.icon className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="text-white font-roboto font-medium">{method.name}</p>
                    <p className="text-gray-400 text-sm font-roboto">{method.description}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  selectedPayment === method.id
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-gray-400'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pay Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 pb-20"
      >
        <Button
          onClick={handlePayment}
          className="w-full gradient-orange text-white font-montserrat font-semibold text-lg py-6 rounded-2xl glow-orange hover:scale-105 transition-all animate-pulse-glow"
        >
          Pay ₹{totalFare.toLocaleString()} Now
        </Button>
      </motion.div>
    </div>
  );
}