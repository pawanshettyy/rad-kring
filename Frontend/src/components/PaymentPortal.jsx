import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Wallet, Check, Tag, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function PaymentPortal({ isOpen, onClose, onSuccess, bookingData }) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState(''); // 'valid', 'invalid', 'applied'
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'text-blue-500' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, color: 'text-purple-500' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: 'text-green-500' }
  ];

  const availableCoupons = [
    { code: 'WELCOME20', discount: 20, type: 'percentage', description: '20% off for new users' },
    { code: 'MRFLY50', discount: 500, type: 'fixed', description: '₹500 off MR experience' },
    { code: 'EARLY10', discount: 10, type: 'percentage', description: '10% early bird discount' },
    { code: 'STUDENT15', discount: 15, type: 'percentage', description: '15% student discount' }
  ];

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      toast({ title: "Enter Coupon Code", description: "Please enter a coupon code to validate" });
      return;
    }

    setIsValidatingCoupon(true);
    setCouponStatus('');

    // Simulate API call
    setTimeout(() => {
      const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
      
      if (coupon) {
        setAppliedCoupon(coupon);
        setCouponStatus('valid');
        toast({ 
          title: "Coupon Applied!", 
          description: `${coupon.description} - ${coupon.type === 'percentage' ? coupon.discount + '%' : '₹' + coupon.discount} off` 
        });
      } else {
        setCouponStatus('invalid');
        toast({ title: "Invalid Coupon", description: "The coupon code you entered is not valid" });
      }
      
      setIsValidatingCoupon(false);
    }, 1500);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponStatus('');
    toast({ title: "Coupon Removed", description: "Discount has been removed from your booking" });
  };

  const calculatePrice = () => {
    const originalPrice = getSelectedCenterData()?.price || 0;
    
    if (!appliedCoupon) return originalPrice;
    
    if (appliedCoupon.type === 'percentage') {
      return originalPrice - (originalPrice * appliedCoupon.discount / 100);
    } else {
      return Math.max(0, originalPrice - appliedCoupon.discount);
    }
  };

  const getDiscountAmount = () => {
    const originalPrice = getSelectedCenterData()?.price || 0;
    return originalPrice - calculatePrice();
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({ title: "Select Payment Method", description: "Please choose a payment method to continue" });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onSuccess(bookingData);
        onClose();
      }, 2000);
    }, 3000);
  };

  const getSelectedCenterData = () => {
    return bookingData?.centerData;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-panel rounded-2xl p-6 w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-michroma font-bold text-xl text-white">Payment</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Booking Summary */}
          <div className="glass-panel rounded-xl p-4 mb-6">
            <h3 className="font-michroma font-semibold text-white mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Experience</span>
                <span className="text-white">MR Flight Simulation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location</span>
                <span className="text-white">{getSelectedCenterData()?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white">{bookingData?.date} at {bookingData?.time}</span>
              </div>
              
              {/* Price Breakdown */}
              <div className="border-t border-gray-600 pt-2 mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Price</span>
                  <span className="text-white">₹{getSelectedCenterData()?.price}</span>
                </div>
                
                {appliedCoupon && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between"
                  >
                    <span className="text-green-400 flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      Discount ({appliedCoupon.code})
                    </span>
                    <span className="text-green-400">-₹{getDiscountAmount()}</span>
                  </motion.div>
                )}
                
                <div className="flex justify-between border-t border-gray-600 pt-2">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-orange-500 font-michroma font-bold text-lg">₹{calculatePrice()}</span>
                </div>
              </div>
            </div>
          </div>

          {!isSuccess ? (
            <>
              {/* Coupon Section */}
              <div className="mb-6">
                <h3 className="font-michroma font-semibold text-white mb-4">Discount Coupon</h3>
                
                {!appliedCoupon ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="w-full bg-white/10 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                          disabled={isValidatingCoupon}
                        />
                      </div>
                      <Button
                        onClick={validateCoupon}
                        disabled={!couponCode.trim() || isValidatingCoupon}
                        className="px-6 gradient-orange text-white font-sans font-medium rounded-xl hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {isValidatingCoupon ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Apply'
                        )}
                      </Button>
                    </div>
                    
                    {/* Coupon Status */}
                    {couponStatus === 'invalid' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 text-red-400 text-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Invalid coupon code</span>
                      </motion.div>
                    )}
                    
                    {/* Available Coupons Hint */}
                    <div className="text-xs text-gray-400">
                      <p className="mb-2">Try these codes:</p>
                      <div className="flex flex-wrap gap-2">
                        {availableCoupons.slice(0, 3).map((coupon) => (
                          <button
                            key={coupon.code}
                            onClick={() => setCouponCode(coupon.code)}
                            className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20 transition-colors"
                          >
                            {coupon.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel rounded-xl p-4 border border-green-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-white font-sans font-medium">{appliedCoupon.code}</p>
                          <p className="text-green-400 text-sm">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <Button
                        onClick={removeCoupon}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-michroma font-semibold text-white mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? 'bg-orange-500/20 border-orange-500/50'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className={`w-6 h-6 ${method.color}`} />
                        <span className="text-white font-sans font-medium">{method.name}</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-gray-400'
                        }`}>
                          {selectedMethod === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className="w-full gradient-orange text-white font-michroma font-semibold py-4 rounded-xl glow-orange hover:scale-105 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </div>
                                 ) : (
                   `Pay ₹${calculatePrice()}`
                 )}
              </Button>
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-michroma font-bold text-xl text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400 font-sans">Your booking is confirmed</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
