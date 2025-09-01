import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import MRExperienceScreen from '@/components/MRExperienceScreen'; // Re-using the mobile component for now

export default function MRExperiencePage() {
    // This is a dummy navigator function. In a real scenario, this would be handled by react-router.
    const mockNavigate = (path) => {
        console.log(`Navigating to ${path}`);
    };
    return (
        <>
            <Helmet>
                <title>Mixed Reality Experience - RAD KRING AVIATION</title>
                <meta name="description" content="Book your immersive Mixed Reality flight experience and feel the future of aviation today." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full px-2 md:px-4 py-6 md:py-8 flex flex-col items-center"
            >
                <div className="w-full max-w-full md:max-w-4xl mx-auto">
                     <MRExperienceScreen onNavigate={mockNavigate} />
                </div>
            </motion.div>
        </>
    );
}