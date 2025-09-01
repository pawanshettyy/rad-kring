import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import BookingScreen from '@/components/BookingScreen';
import PricingScreen from '@/components/PricingScreen';
import AircraftSelectionScreen from '@/components/AircraftSelectionScreen';
import PaymentScreen from '@/components/PaymentScreen';
import BoardingPassScreen from '@/components/BoardingPassScreen';

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
            <div className="min-h-screen background-grid flex items-center justify-center px-2 md:px-4 py-6 md:py-8 w-full">
                <div className="max-w-full md:max-w-4xl w-full mx-auto glass-panel rounded-2xl overflow-hidden">
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