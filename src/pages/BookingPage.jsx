import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import BookingScreen from '@/components/BookingScreen';
import PricingScreen from '@/components/PricingScreen';
import AircraftSelectionScreen from '@/components/AircraftSelectionScreen';
import PaymentScreen from '@/components/PaymentScreen';
import BoardingPassScreen from '@/components/BoardingPassScreen';

const bookingSteps = ['booking', 'pricing', 'aircraft', 'payment', 'boarding'];

export default function BookingPage() {
    const [currentStep, setCurrentStep] = useState('booking');
    const [bookingData, setBookingData] = useState({});

    const handleNavigate = (step) => {
        setCurrentStep(step);
    };

    const handleBookingUpdate = (data) => {
        setBookingData(prev => ({ ...prev, ...data }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'booking':
                return <BookingScreen onNavigate={handleNavigate} onBookingUpdate={handleBookingUpdate} />;
            case 'pricing':
                return <PricingScreen onNavigate={handleNavigate} bookingData={bookingData} />;
            case 'aircraft':
                return <AircraftSelectionScreen onNavigate={handleNavigate} bookingData={bookingData} onBookingUpdate={handleBookingUpdate} />;
            case 'payment':
                return <PaymentScreen onNavigate={handleNavigate} bookingData={bookingData} />;
            case 'boarding':
                return <BoardingPassScreen onNavigate={handleNavigate} bookingData={bookingData} />;
            default:
                return <BookingScreen onNavigate={handleNavigate} onBookingUpdate={handleBookingUpdate} />;
        }
    };

    return (
        <>
            <Helmet>
                <title>Book Your eVTOL Flight - RAD KRING AVIATION</title>
                <meta name="description" content="Seamlessly book your eVTOL air taxi flight with RAD KRING AVIATION. Select your route, aircraft, and payment method." />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                 <div className="max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}